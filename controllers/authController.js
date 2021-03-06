import User from '../models/User.js';
import { StatusCodes } from 'http-status-codes';
import {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} from '../errors/index.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import sql from 'mssql';
import config from '../db/sqlconfig.js';

const register = async (req, res, next) => {
  console.log('nizar authController env : ' + process.env.DATABASE_MODE);

  if (process.env.DATABASE_MODE === 'MONGODB') {
    console.log('nizar authController.js register');
    // res.send('register user');

    //try catch is old way without express-async-errors lib
    // try {
    //   const user = await User.create(req.body);
    //   res.status(201).json({ user });
    // } catch (error) {
    //   // res.status(500).json({ msg: 'there was an error' });
    //   next(error);
    // }

    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      // throw new Error('Please provide all values');
      throw new BadRequestError('Please provide all values.');
    }

    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      throw new BadRequestError(
        'Email already in use. Please use other email.'
      );
    }

    const user = await User.create({ name, email, password });
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({
      user: {
        name: user.name,
        email: user.email,
        lastName: user.lastName,
        location: user.location,
      },
      token,
      location: user.location,
    });
  } else {
    console.log('nizar authController.js registerMSSQL');

    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      // throw new Error('Please provide all values');
      throw new BadRequestError('Please provide all values.');
    }

    let pool = await sql.connect(config);
    let userAlreadyExists = await pool
      .request()
      .input('input_email', sql.VarChar, email)
      .query('SELECT * from myhub_users where email = @input_email');
    if (userAlreadyExists.recordsets[0].length > 0) {
      throw new BadRequestError(
        'Email already in use. Please use other email.'
      );
    }

    //create hashing password
    const salt = await bcrypt.genSalt(10);
    let newPwd = await bcrypt.hash(password, salt);

    //create user
    // let pool = await sql.connect(config);
    let user = await pool
      .request()
      .input('input_name', sql.VarChar, name)
      .input('input_email', sql.VarChar, email)
      .input('input_password', sql.VarChar, newPwd)
      .query(
        `INSERT INTO myhub_users (name, email, password, lastName, location, role) VALUES (@input_name,@input_email,@input_password, 'lastname', 'location', 'user')`
      );

    //get the new registered user
    let registeredUser = await pool
      .request()
      .input('input_email', sql.VarChar, email)
      .query('SELECT * from myhub_users where email = @input_email');
    console.log(registeredUser.recordsets[0]);
    //get single user object
    const userObj = registeredUser.recordsets[0][0];

    //create jwt token
    const token = jwt.sign(
      { userId: userObj.user_id, role: 'user' },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_LIFETIME,
      }
    );

    res.status(StatusCodes.CREATED).json({
      user: {
        name: userObj.name,
        email: userObj.email,
        lastName: userObj.lastName,
        location: userObj.location,
      },
      token,
      location: userObj.location,
    });
  }
};

const login = async (req, res) => {
  if (process.env.DATABASE_MODE === 'MONGODB') {
    // res.send('login user');
    const { email, password } = req.body;
    if (!email || !password) {
      throw new BadRequestError('Please provide all values');
    }
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new UnauthenticatedError('Invalid credentials');
    }
    console.log(user);

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      throw new UnauthenticatedError('Invalid credentials');
    }

    const token = user.createJWT();
    user.password = undefined; // will automatically hide the password on the postman response
    res.status(StatusCodes.OK).json({ user, token, location: user.location });
  } else {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new BadRequestError('Please provide all values');
    }

    let pool = await sql.connect(config);
    let user = await pool
      .request()
      .input('input_email', sql.VarChar, email)
      .query('SELECT * from myhub_users where email = @input_email');
    if (user.recordsets[0].length === 0) {
      throw new UnauthenticatedError('Invalid credentials');
    }
    //get single user object
    const userObj = user.recordsets[0][0];

    const isPasswordCorrect = await bcrypt.compare(password, userObj.password);
    if (!isPasswordCorrect) {
      throw new UnauthenticatedError('Invalid credentials');
    }

    //create jwt token
    const token = jwt.sign(
      { userId: userObj.user_id, role: userObj.role },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_LIFETIME,
      }
    );

    res.status(StatusCodes.OK).json({
      user: {
        user_id: userObj.user_id,
        name: userObj.name,
        email: userObj.email,
        role: userObj.role,
      },
      token,
      location: userObj.location,
    });
  }
};

const updateUser = async (req, res) => {
  if (process.env.DATABASE_MODE === 'MONGODB') {
    const { email, name, lastName, location } = req.body;
    if (!email || !name || !lastName || !location) {
      throw new BadRequestError('Please provide all values');
    }
    const user = await User.findOne({ _id: req.user.userId });
    user.email = email;
    user.name = name;
    user.lastName = lastName;
    user.location = location;

    await user.save();

    const token = user.createJWT();

    console.log(req.user);
    // res.send('updateUser user');
    res.status(StatusCodes.OK).json({ user, token, location: user.location });
  } else {
    const { email, name, lastName, location } = req.body;
    if (!email || !name || !lastName || !location) {
      throw new BadRequestError('Please provide all values');
    }

    let pool = await sql.connect(config);
    let userUpdate = await pool
      .request()
      .input('input_userId', sql.Int, req.user.userId)
      .input('input_email', sql.VarChar, email)
      .input('input_name', sql.VarChar, name)
      .input('input_lastName', sql.VarChar, lastName)
      .input('input_location', sql.VarChar, location)
      .query(
        'UPDATE myhub_users SET name = @input_name, email = @input_email, lastName = @input_lastName, location = @input_location  where user_id = @input_userId'
      );

    let user = await pool
      .request()
      .input('input_userId', sql.Int, req.user.userId)
      .query(
        'SELECT user_id, name, email, lastName, location, role from myhub_users where user_id = @input_userId'
      );

    //get single user object
    const userObj = user.recordsets[0][0];

    //create jwt token
    const token = jwt.sign(
      { userId: req.user_id, role: userObj.role },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_LIFETIME,
      }
    );

    res
      .status(StatusCodes.OK)
      .json({ user: userObj, token, location: userObj.location });
  }
};

const userListing = async (req, res) => {
  if (process.env.DATABASE_MODE === 'MONGODB') {
    // res.send('userListing');
    const users = await User.find({});
    res.status(StatusCodes.OK).json({ users });
  } else {
    let pool = await sql.connect(config);
    let userlist = await pool
      .request()
      .query(
        'SELECT user_id AS _id , name, email, lastName, location, role FROM myhub_users'
      );

    res.status(StatusCodes.OK).json({ users: userlist.recordsets[0] });
  }
};

const getSingleUser = async (req, res) => {
  // res.send('getSingleUser');
  const { id: userId } = req.params;

  if (process.env.DATABASE_MODE === 'MONGODB') {
    const user = await User.findOne({ _id: userId });
    res.status(StatusCodes.OK).json({ user });
  } else {
    let pool = await sql.connect(config);
    let user = await pool
      .request()
      .input('input_userId', sql.Int, parseInt(userId))
      .query(
        'SELECT user_id AS _id , name, email, lastName, location, role FROM myhub_users WHERE user_id = @input_userId'
      );
    if (user.recordsets[0].length === 0) {
      throw new NotFoundError(`No user with id : ${userId} found`);
    }

    res.status(StatusCodes.OK).json({ user: user.recordsets[0][0] });
  }
};

const updateSingleUser = async (req, res) => {
  // res.send('updateSingleUser');
  const { id: userId } = req.params;
  const { name, role } = req.body;
  if (!name || !role) {
    throw new BadRequestError('Please provide name, role');
  }

  if (process.env.DATABASE_MODE === 'MONGODB') {
    const user = await User.findOne({ _id: userId });
    user.name = name;
    user.role = role;
    await user.save();

    res.status(StatusCodes.OK).json({ user });
  } else {
    let pool = await sql.connect(config);
    let user = await pool
      .request()
      .input('input_userId', sql.Int, parseInt(userId))
      .query(
        'SELECT user_id AS _id , name, email, lastName, location, role FROM myhub_users WHERE user_id = @input_userId'
      );
    if (user.recordsets[0].length === 0) {
      throw new NotFoundError(`No user with id : ${userId} found`);
    }

    let userUpdate = await pool
      .request()
      .input('input_userId', sql.Int, parseInt(userId))
      .input('input_name', sql.VarChar, name)
      .input('input_role', sql.VarChar, role)
      .query(
        'UPDATE myhub_users SET name = @input_name, role = @input_role WHERE user_id = @input_userId'
      );

    let latestInfo = await pool
      .request()
      .input('input_userId', sql.Int, parseInt(userId))
      .query(
        'SELECT user_id AS _id , name, email, lastName, location, role FROM myhub_users WHERE user_id = @input_userId'
      );

    res.status(StatusCodes.OK).json({
      user: latestInfo.recordsets[0][0],
    });
  }
};

const deleteSingleUser = async (req, res) => {
  // res.send('deleteSingleUser');
  const { id: userId } = req.params;

  if (process.env.DATABASE_MODE === 'MONGODB') {
    const selectedUser = await User.findOne({ _id: userId });
    if (!selectedUser) {
      throw new NotFoundError(`No user with id : ${userId} found`);
    }
    await selectedUser.remove();

    res
      .status(StatusCodes.OK)
      .json({ msg: 'Specific user successfully deleted' });
  } else {
    let pool = await sql.connect(config);
    let user = await pool
      .request()
      .input('input_userId', sql.Int, parseInt(userId))
      .query(
        'SELECT user_id AS _id , name, email, lastName, location, role FROM myhub_users WHERE user_id = @input_userId'
      );
    if (user.recordsets[0].length === 0) {
      throw new NotFoundError(`No user with id : ${userId} found`);
    }

    //proceed delete the item
    let userDelete = await pool
      .request()
      .input('input_userId', sql.Int, parseInt(userId))
      .query('DELETE myhub_users WHERE user_id = @input_userId');

    res
      .status(StatusCodes.OK)
      .json({ msg: 'Specific user successfully deleted' });
  }
};

const resetPassword = async (req, res) => {
  // res.send('resetPassword');
  const { id: userId } = req.params;
  const { newPassword } = req.body;

  if (!newPassword) {
    throw new BadRequestError('Please provide the new password');
  }

  if (process.env.DATABASE_MODE === 'MONGODB') {
    const selectedUser = await User.findOne({ _id: userId });
    if (!selectedUser) {
      throw new NotFoundError(`No user with id : ${userId} found`);
    }
    selectedUser.password = newPassword;
    await selectedUser.save();

    res.status(StatusCodes.OK).json({ msg: 'Password successfully reset' });
  } else {
    let pool = await sql.connect(config);
    let user = await pool
      .request()
      .input('input_userId', sql.Int, parseInt(userId))
      .query(
        'SELECT user_id AS _id , name, email, lastName, location, role FROM myhub_users WHERE user_id = @input_userId'
      );
    if (user.recordsets[0].length === 0) {
      throw new NotFoundError(`No user with id : ${userId} found`);
    }

    //create hashing password
    const salt = await bcrypt.genSalt(10);
    let newPwd = await bcrypt.hash(newPassword, salt);

    let userUpdate = await pool
      .request()
      .input('input_userId', sql.Int, parseInt(userId))
      .input('input_password', sql.VarChar, newPwd)
      .query(
        'UPDATE myhub_users SET password = @input_password WHERE user_id = @input_userId'
      );

    res.status(StatusCodes.OK).json({ msg: 'Password successfully reset' });
  }
};

export {
  register,
  login,
  updateUser,
  userListing,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
  resetPassword,
};
