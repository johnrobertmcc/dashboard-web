import { Budget } from '../models/budgetModel.js';
import { User } from '../models/userModel.js';

/**
 * Function used to get a single user's budget from MongoDb.
 *
 * @author John Robert McCann
 * @since 6/19/2022
 * @route GET /api/v1/budget.
 * @access Private
 * @version 1.0.0
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
    date = null,
    tag = null,
  } = req?.query;

  let searchParams = { user: req?.user?.id };

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
  if (date) {
    searchParams.date = date;
  }
  if (date) {
    searchParams.tag = tag;
  }

  const budget = await Budget.find(searchParams);
  return res.status(200).json({
    version: process.env.VERSION,
    items: budget?.length,
    budget: budget,
  });
}

/**
 * Function used to set a single budget item to MongoDb.
 *
 * @author John Robert McCann
 * @since 6/19/2022
 * @route POST /api/v1/budget.
 * @access Private
 * @version 1.0.0
 * @param {object} req  The request object.
 * @param {object} res  The response object.
 */
export async function setBudget(req, res) {
  const {
    item = 'nonessential.',
    event = null,
    amount = '0',
    date = new Date().toDateString(),
    tag = null,
    user = req?.user?.id || null,
  } = req?.body;

  if (!item) {
    res.status(400);
    throw new Error('Please add an item field');
  }

  const budget = {
    item,
    amount,
    event,
    date,
    tag,
    user,
  };

  await Budget.create(budget);

  return res.status(200).json({ version: process.env.VERSION, budget });
}

/**
 * Function used to update a singular budget item from MongoDb.
 *
 * @author John Robert McCann
 * @since 6/19/2022
 * @route PATCH /api/v1/budget/:itemId
 * @access Private
 * @param {object} req  The request object.
 * @param {object} res  The response object.
 */
export async function updateBudget(req, res) {
  const {
    item = null,
    event = null,
    amount = 0,
    date = null,
    tag = null,
  } = req?.body;
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
  if (date) {
    updateParams.date = date;
  }
  if (tag) {
    updateParams.tag = tag;
  }
  const user = await User.findById(req?.user?._id);

  if (!user?._id) {
    res.status(401);
    throw new Error('User not authorized.');
  }

  const budget = await Budget.updateOne({ _id: id }, updateParams);
  const updated = await Budget.findOne({ _id: id });

  return res.status(200).json({
    version: process.env.VERSION,
    goal: `Update Budget: ${id}`,
    budget,
    id,
    updated,
  });
}

/**
 * Function used to delete a singular budget item from MongoDb.
 *
 * @author John Robert McCann
 * @since 6/19/2022
 * @route DELETE /api/v1/budget/:itemId
 * @version 1.0.0
 * @param {object} req  The request object.
 * @param {object} res  The response object.
 */
export async function deleteBudget(req, res) {
  const { id } = req?.params;

  const user = await User.findById(req?.user?._id);

  if (!user?._id) {
    res.status(401);
    throw new Error('User not authorized.');
  }
  Budget.deleteOne({ _id: id }).then(() =>
    console.log(`Successfully deleted: ${id}.`.bgBlack.red.bold)
  );
  res.status(200).json({
    version: process.env.VERSION,
    goal: `Delete Budget: ${req?.params?.id}`,
    id: req?.params?.id,
  });
}

/**
 * Function used to delete every budget item of a user from MongoDb.
 *
 * @author John Robert McCann
 * @since 9/18/2022
 * @route DELETE /api/v1/budget
 * @version 1.0.0
 * @param {object} req  The request object.
 * @param {object} res  The response object.
 */
export async function deleteAll(req, res) {
  const user = await User.findById(req?.user?._id);

  if (!user?._id) {
    res.status(401);
    throw new Error('User not authorized.');
  }
  Budget.deleteMany({ user: user?._id }).then((response) =>
    console.log(`Successfully deleted all items.`, response)
  );
  res.status(200).json({
    version: process.env.VERSION,
    goal: `Delete All Items`,
  });
}

/**
 * Function used to add items from an uploaded file.
 *
 * @author John Robert McCann
 * @since 9/18/2022
 * @route POST /api/v1/budget
 * @version 1.0.0
 * @param {object} req  The request object.
 * @param {object} res  The response object.
 */
export async function addManyItems(req, res) {
  const items = req?.body?.data;

  const insertion = items?.map((budgetItem) => {
    const {
      item = 'nonessential.',
      event = null,
      amount = '0',
      date = new Date().toDateString(),
      tag = null,
      user = req?.body?.id || null,
    } = budgetItem;

    return {
      item,
      amount,
      event,
      date,
      tag,
      user,
    };
  });

  await Budget.insertMany(insertion);

  return res.status(200).json({ version: process.env.VERSION, insertion });
}
