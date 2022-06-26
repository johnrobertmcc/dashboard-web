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
export function registerUser(req, res) {
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
export function loginUser(req, res) {
  res.json({ message: 'Login User.' });
}

/**
 * Function used to get currently logged in user information.
 *
 * @author John Robert McCann
 * @since  6/25/2022
 * @route  GET /api/v1/user/me
 * @access Public
 * @param  {object} req  The request object.
 * @param  {object} res  The response object.
 */
export function getUser(req, res) {
  res.json({ message: 'User Information.' });
}

/**
 * Function used to update a user in the database by id.
 *
 * @author John Robert McCann
 * @since 6/25/2022
 * @route POST /api/v1/user/:id
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
