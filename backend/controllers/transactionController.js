const asyncHandler = require("express-async-handler");
const Transaction = require("../model/Transaction");

const transactionController = {
  // ! Add
  create: asyncHandler(async (req, res) => {
    const { type, category, date, amount, description } = req.body;
    if (!type || !category || !date) {
      throw new Error("Type,Category and Date fields are required");
    }
    const transaction = await Transaction.create({
      user: req.user,
      type,
      category,
      date,
      amount,
      description,
    });
    res.status(201).json(transaction);
  }),
  //   ! List
  getFilteredTransaction: asyncHandler(async (req, res) => {
    const { startDate, endDate, type, category } = req.query;
    let filters = { user: req.user };

    if (startDate) {
      filters.date = { ...filters.date, $gte: new Date(startDate) };
    }
    if (endDate) {
      filters.date = { ...filters.date, $lte: new Date(endDate) };
    }
    if (type) {
      filters.type = type;
    }
    if (category) {
      if (category === "All") {
        //!  No category filter needed when filtering for 'All'
      } else if (category === "Uncategorized") {
        //! Filter for transactions that are specifically categorized as 'Uncategorized'
        filters.category = "Uncategorized";
      } else {
        filters.category = category;
      }
    }
    const transactions = await Transaction.find(filters).sort({ date: -1 });
    res.json(transactions);
  }),
  // !  Update
  update: asyncHandler(async (req, res) => {
    const transaction = await Transaction.findById(req.params.id);
    if (transaction && transaction.user.toString() === req.user.toString()) {
      transaction.type = req.body.type || transaction.type;
      transaction.category = req.body.category || transaction.category;
      transaction.date = req.body.date || transaction.date;
      transaction.amount = req.body.amount || transaction.amount;
      transaction.description = req.body.description || transaction.description;
      const updatedTransaction = await transaction.save();
      res.json(updatedTransaction);
    } else {
      res.status(404);
      throw new Error("Transaction not found");
    }
  }),
  // ! Delete
  remove: asyncHandler(async (req, res) => {
    const transaction = await Transaction.findById(req.params.id);
    if (transaction && transaction.user.toString() === req.user.toString()) {
      await Transaction.findByIdAndDelete(req.params.id);
      res.json({ message: "Transaction removed" });
    } else {
      res.status(404);
      throw new Error("Transaction not found");
    }
  }),
};

module.exports = transactionController;
