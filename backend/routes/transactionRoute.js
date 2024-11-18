const express = require("express");

const transactionRouter = express.Router();

const {
  create,
  update,
  remove,
  getFilteredTransaction,
} = require("../controllers/transactionController");
const isAuthenticated = require("../middleware/isAuth");

// ! Add
transactionRouter.post("/create", isAuthenticated, create);

// ! List
transactionRouter.get("/lists", isAuthenticated, getFilteredTransaction);
// ! Update
transactionRouter.put("/update/:id", isAuthenticated, update);
// ! Delete
transactionRouter.delete("/delete/:id", isAuthenticated, remove);

module.exports = transactionRouter;
