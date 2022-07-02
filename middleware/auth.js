import { UnauthenticatedError, UnauthorizedError } from '../errors/index.js';
import jwt from 'jsonwebtoken';

const authenticateUser = async (req, res, next) => {
  // console.log('authenticate user middleware');
  const authHeader = req.headers.authorization;
  // console.log(authHeader);
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnauthenticatedError('Authentication invalid');
  }
  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // console.log('nizar payload');
    // console.log(payload);
    req.user = payload;
    next();
  } catch (error) {
    throw new UnauthenticatedError('Authentication invalid');
  }
};

const authorizePermissions = (...rest) => {
  //callback function
  return (req, res, next) => {
    // console.log(req.user);
    if (!rest.includes(req.user.role)) {
      //if user.role is not sebahagian dari user role yg di pass as params
      throw new UnauthorizedError(
        'Unauthorized access to this route. Please login using authorized role credential.'
      );
    }
    next();
  };
};

export { authenticateUser, authorizePermissions };
