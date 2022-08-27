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
async function sendItemToDB(budgetData, token) {
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
 * @param {string} token   The user's token.
 */
async function getBudgetItems(token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response?.data;
}

/**
 * Function used to delete a singular budget item from MongoDb.
 *
 * @author John Robert McCann
 * @since  8/29/2022
 * @route  DELETE /api/v1/budget.
 * @access Private
 * @param  {string} itemId  The id of the budget item to delete.
 * @param  {string} token   The user's token from local storage.
 */
async function deleteBudgetItem(itemId, token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + itemId, config);

  return response?.data;
}

/**
 * Function used to delete a singular budget item from MongoDb.
 *
 * @author John Robert McCann
 * @since  8/29/2022
 * @route  PATCH /api/v1/budget.
 * @access Private
 * @param  {string} item    The item of the budget to edit.
 * @param  {string} token   The user's token from local storage.
 */
async function editBudgetItem(item, token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + item?._id, item, config);

  return response?.data;
}

const budgetService = {
  sendItemToDB,
  getBudgetItems,
  deleteBudgetItem,
  editBudgetItem,
};

export default budgetService;
