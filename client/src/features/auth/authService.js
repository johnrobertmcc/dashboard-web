import axios from 'axios';
const API_URL = '/api/users/';

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
}
