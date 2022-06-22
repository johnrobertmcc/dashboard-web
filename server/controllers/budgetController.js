import { Budget } from '../models/budgetModel.js';

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
  const {
    item = null,
    amount = null,
    event = null,
    id = null,
    lte = null,
    gte = null,
  } = req?.query;

  let searchParams = {};

  if (id) {
    searchParams._id = id;
  }
  if (item) {
    searchParams.item = item;
  }
  if (event) {
    searchParams.event = event;
  }
  if (amount) {
    searchParams.amount = amount;
  }
  if (lte) {
    searchParams.amount = { $lte: lte };
  }
  if (gte) {
    searchParams.amount = { $gte: gte };
  }

  const budget = await Budget.find(searchParams);
  return res.status(200).json({
    version: process.env.VERSION,
    items: budget?.length,
    budget,
  });
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
  const { item = null, event = null, amount = 0 } = req?.body;

  if (!item) {
    res.status(400);
    throw new Error('Please add an item field');
  }

  const budget = await Budget.create({
    item,
    amount,
    event,
  });

  return res.status(200).json({ version: process.env.VERSION, budget });
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
  const { item = null, event = null, amount = 0 } = req?.body;
  const { id } = req?.params;

  let updateParams = {};

  if (item) {
    updateParams.item = item;
  }
  if (event) {
    updateParams.event = event;
  }
  if (amount) {
    updateParams.amount = amount;
  }
  const budget = await Budget.updateOne({ _id: id }, updateParams);

  return res.status(200).json({
    version: process.env.VERSION,
    goal: `Update Budget: ${id}`,
    budget,
  });
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
  const { id } = req?.params;

  Budget.deleteOne({ _id: id }).then(() =>
    console.log(`Successfully deleted: ${id}.`.bgBlack.red.bold)
  );
  res.status(200).json({
    version: process.env.VERSION,
    goal: `Delete Budget: ${req?.params?.id}`,
  });
}
