import dayjs from 'dayjs';
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
 * @param {string} token   The user's token.
 */
export async function getBudgetItems(token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return {
    raw: response?.data,
    data: handleBudgetItems(response?.data),
  };
}

/**
 * Funciton used to structure the budget data as an object and by date.
 *
 * @param {object} obj The budget returned from MongoDB.
 */
function handleBudgetItems(obj) {
  const { budget } = obj;
  let fin = {};

  budget.map((item) => {
    const formattedDate = dayjs(item?.date).format('YYYY-MM-DD');

    if (fin[formattedDate]) {
      fin[formattedDate].push(item);
    } else {
      fin[formattedDate] = [item];
    }
  });

  return fin;
}

/**
 * Function used to delete a singular budget item from MongoDb.
 *
 * @author John Robert McCann
 * @since  8/29/2022
 * @route  DELETE /api/v1/budget.
 * @access Private
 * @param  {string} goalId  The id of the goal to delete.
 * @param  {string} token   The user's token from local storage.
 */
async function deleteBudgetItem(goalId, token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + goalId, config);

  return response.data;
}

const budgetService = {
  sendItemToDB,
  getBudgetItems,
  handleBudgetItems,
  deleteBudgetItem,
};

export default budgetService;
