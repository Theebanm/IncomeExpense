const express = require("express"); // import express
const {
  register,
  login,
  profile,
  changeUserPassword,
  updateUserProfile,
} = require("../controllers/userController");
const isAuthenticated = require("../middleware/isAuth");
const userRouter = express.Router(); // create router

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/profile", isAuthenticated, profile);
userRouter.put("/change-password", isAuthenticated, changeUserPassword);
userRouter.put("/update-profile", isAuthenticated, updateUserProfile);

module.exports = userRouter;
