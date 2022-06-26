import jwt from 'jsonwebtoken';
import { User } from '../models/userModel.js';
import bcrypt from 'bcryptjs';
const { genSalt, hash, compare } = bcrypt;
const { sign } = jwt;

/**
 * Function used to add a user to the database.
 *
 * @author John Robert McCann
 * @since  6/25/2022
 * @route  POST /api/v1/user
 * @access Public
 * @param  {object} req  The request object.
 * @param  {object} res  The response object.
 */
export async function registerUser(req, res) {
  const { name = null, email = null, password = null } = req?.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User Already Exists.');
  }
  const salt = await genSalt(10);
  const hashedPassword = await hash(password, salt);

  // Create User
  const user = await User.create({ name, email, password: hashedPassword });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: _generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data.');
  }

  res.json({ message: 'Register User.' });
}

/**
 * Function used to login a user to the app.
 *
 * @author John Robert McCann
 * @since  6/25/2022
 * @route  POST /api/v1/user/login
 * @access Public
 * @param  {object} req  The request object.
 * @param  {object} res  The response object.
 */
export async function loginUser(req, res) {
  const { email = null, password = null } = req?.body;

  if (!email || !password) {
    throw new Error('Try Again.');
  }

  const user = await User.findOne({ email });

  if (user && (await compare(password, user?.password))) {
    console.log(`${email} logged in!`);
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: _generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid login data.');
  }
}

/**
 * Function used to get currently logged in user information.
 *
 * @author John Robert McCann
 * @since  6/25/2022
 * @route  GET /api/v1/user/me
 * @access Private
 * @param  {object} req  The request object.
 * @param  {object} res  The response object.
 */
export async function getUser(req, res) {
  const { _id, name, email } = await User.findById(req?.user?.id);

  res.status(200).json({ message: 'User Information.', name, email, id: _id });
}

/**
 * Function used to generate a token and validate on POST or GET request for /user.
 *
 * @author  John Robert McCann
 * @since   6/25/2022
 * @access  Private
 * @param   {string}  id The id of the user to validate.
 * @returns {boolean}    Returns true or false.
 */
function _generateToken(id) {
  return sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
}
/**
 * Function used to update a user in the database by id.
 *
 * @author John Robert McCann
 * @since  6/25/2022
 * @route  POST /api/v1/user/:id
 * @access Private
 * @param {object} req  The request object.
 * @param {object} res  The response object.
 */
export function updateUser(req, res) {
  res.json({ message: 'Updated User.' });
}

/**
 * Function used to delete a user in the database by id.
 *
 * @author John Robert McCann
 * @since 6/25/2022
 * @route POST /api/v1/user/:id
 * @access Private
 * @param {object} req  The request object.
 * @param {object} res  The response object.
 */
export function deleteUser(req, res) {
  res.json({ message: 'Deleted User.' });
}
