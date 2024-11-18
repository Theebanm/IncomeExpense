const express = require("express"); // import express
const isAuthenticated = require("../middleware/isAuth");
const {
  create,
  lists,
  update,
  o,
  remove,
} = require("../controllers/categoryController");
const categoryRouter = express.Router(); // create router

// ! Add
categoryRouter.post("/create", isAuthenticated, create);

// ! List
categoryRouter.get("/lists", isAuthenticated, lists);
// ! Update
categoryRouter.put("/update/:id", isAuthenticated, update);
// ! Delete
categoryRouter.delete("/delete/:id", isAuthenticated, remove);
module.exports = categoryRouter;
