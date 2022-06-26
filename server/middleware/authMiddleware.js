import jwt from 'jsonwebtoken';
import { User } from '../models/userModel.js';
import bcrypt from 'bcryptjs';
const { genSalt, hash, compare } = bcrypt;
const { verify } = jwt;

export async function protect(req, res, next) {
  let token = null;

  if (
    req?.headers?.authorization &&
    req?.headers?.authorization.startsWith('Bearer')
  ) {
    try {
      // Get Token from Header.
      token = req.headers.authorization.split(' ')[1];

      // Verify Token.
      const decoded = verify(token, process.env.JWT_SECRET);

      // Get user from token and remove password from return.
      req.user = await User.findById(decoded?.id).select('-password');

      next();
    } catch (err) {
      console.log(err.red.bold);
      res.status(401);
      throw new Error('Not Authorized');
    }

    if (!token) {
      res.status(401);
      throw new Error('No Token Available.');
    }
  }
}
