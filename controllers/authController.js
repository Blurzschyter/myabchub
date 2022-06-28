import User from '../models/User.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, UnauthenticatedError } from '../errors/index.js';
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
      .query('SELECT * from users where email = @input_email');
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
        `INSERT INTO users (name, email, password, lastName, location, role) VALUES (@input_name,@input_email,@input_password, 'lastname', 'location', 'user')`
      );

    //get the new registered user
    let registeredUser = await pool
      .request()
      .input('input_email', sql.VarChar, email)
      .query('SELECT * from users where email = @input_email');
    console.log(registeredUser.recordsets[0]);
    //get single user object
    const userObj = registeredUser.recordsets[0][0];

    //create jwt token
    const token = jwt.sign(
      { userId: userObj.user_id },
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
      .query('SELECT * from users where email = @input_email');
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
      { userId: userObj.user_id },
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
        'UPDATE users SET name = @input_name, email = @input_email, lastName = @input_lastName, location = @input_location  where user_id = @input_userId'
      );

    //create jwt token
    const token = jwt.sign({ userId: req.user_id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_LIFETIME,
    });

    let user = await pool
      .request()
      .input('input_userId', sql.Int, req.user.userId)
      .query(
        'SELECT user_id, name, email, lastName, location from users where user_id = @input_userId'
      );

    //get single user object
    const userObj = user.recordsets[0][0];

    res
      .status(StatusCodes.OK)
      .json({ user: userObj, token, location: userObj.location });
  }
};

export { register, login, updateUser };
