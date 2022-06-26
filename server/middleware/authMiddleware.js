import jwt from 'jsonwebtoken';
import { User } from '../models/userModel.js';
const { verify } = jwt;

/**
 * Function used to protect against malicious attacks and confirmt he use of a bearer token.
 *
 * @param {object}   req  The request object.
 * @param {object}   res  The response object.
 * @param {Function} next Triggers the next procedural function.
 */
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
