import axios from 'axios';
const API_URL = 'http://localhost:5000/api/v1/user/';

/**
 * Function used to register a new user to the database and set token to local storage.
 *
 * @author John Robert McCann
 * @since 6/26/2022
 * @param {object} userData  The data of the user.
 */
export async function registerUser(userData) {
  const response = await axios.post(API_URL, userData);

  if (response?.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response?.data;
}

/**
 * Function used to register a new user to the database and set token to local storage.
 *
 * @author John Robert McCann
 * @since 6/27/2022
 * @param {object} userData  The data of the user.
 */
export async function logIn(userData) {
  const response = await axios.post(API_URL + 'login', userData);

  if (response?.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response?.data;
}

/**
 * Function used to register a new user to the database and set token to local storage.
 *
 * @author John Robert McCann
 * @since 6/27/2022
 */
export async function logOut() {
  localStorage.removeItem('user');
  localStorage.removeItem('budget');
}

/**
 * Function used to edit a user's information.
 *
 * @author John Robert McCann
 * @since  11/02/2022
 * @route  PATCH /api/v1/user/id.
 * @access Private
 * @param  {string} user    The information of the user to edit.
 * @param  {string} token   The user's token from local storage.
 */
export async function editUser(user, token) {
  const { _id: id = null } = user?.arg;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    if (id) {
      const response = await axios.put(API_URL + id, user, config);
      if (response?.data) {
        return true;
      }
    }
  } catch (e) {
    console.error('Error processing editUser', e);
  }
}

/**
 * Function used to return a user's information.
 *
 * @author John Robert McCann
 * @since  11/02/2022
 * @route  GET /api/v1/user/id.
 * @access Private
 * @param  {string} user    The information of the user to edit.
 * @param  {string} token   The user's token from local storage.
 */
export async function fetchUser(user, token) {
  const { _id: id = null, email = null } = user;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      email,
    },
  };

  const url = API_URL + 'me';
  const response = await axios.get(url, config);

  return response?.user || null;
}
