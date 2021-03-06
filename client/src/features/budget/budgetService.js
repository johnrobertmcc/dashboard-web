import axios from 'axios';
const API_URL = 'http://localhost:5000/api/v1/budget/';

/**
 * Function used to register a new user to the database and set token to local storage.
 *
 * @author John Robert McCann
 * @since 6/27/2022
 * @param {object} userData  The data of the user.
 * @param {string} token     The user's token.
 */
export async function sendItemToDB(budgetData, token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, budgetData, config);

  return response?.data;
}

/**
 * Function used to register a new user to the database and set token to local storage.
 *
 * @author John Robert McCann
 * @since 6/27/2022
 * @param {string} token     The user's token.
 */
export async function getBudgetItems(token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response?.data;
}
