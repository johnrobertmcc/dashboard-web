/**
 * Function used to get a budget from MongoDb.
 *
 * @author John Robert McCann
 * @since 6/19/2022
 * @route GET /api/v1/budget.
 * @param {object} req  The request object.
 * @param {object} res  The response object.
 */
export async function getBudget(req, res) {
  return res
    .status(200)
    .json({ version: 1, message: 'From Controllers', ...req?.query });
}

/**
 * Function used to set a budget to MongoDb.
 *
 * @author John Robert McCann
 * @since 6/19/2022
 * @route POST /api/v1/budget.
 * @param {object} req  The request object.
 * @param {object} res  The response object.
 */
export async function setBudget(req, res) {
  const { text = null } = req?.body;

  if (!text) {
    res.status(400);
    throw new Error('Please add a text field');
  }
  return res.status(200).json({ version: 1, goal: 'Set Budget' });
}

/**
 * Function used to update a singular budget item from MongoDb.
 *
 * @author John Robert McCann
 * @since 6/19/2022
 * @route PATCH /api/v1/budget.
 * @param {object} req  The request object.
 * @param {object} res  The response object.
 */
export async function updateBudget(req, res) {
  return res
    .status(200)
    .json({ version: 1, goal: `Update Budget: ${req?.params?.id}` });
}

/**
 * Function used to delete a singular budget item from MongoDb.
 *
 * @author John Robert McCann
 * @since 6/19/2022
 * @route DELETE /api/v1/budget.
 * @param {object} req  The request object.
 * @param {object} res  The response object.
 */
export async function deleteBudget(req, res) {
  res
    .status(200)
    .json({ version: 1, goal: `Delete Budget: ${req?.params?.id}` });
}
