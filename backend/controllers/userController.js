const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../model/User");
// ! User Registration Controller

const userController = {
  //? Regiser
  register: asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    // ? Validation
    if (!username || !email || !password) {
      throw new Error("All fields are required");
    }

    // ? Check if user exists

    const userExists = await User.findOne({ email });

    if (userExists) {
      throw new Error("User already exists");
    } else {
      // ? Hash password
      const hashPassword = await bcrypt.hash(password, 10);
      // ? Create user
      const user = await User.create({
        username,
        email,
        password: hashPassword,
      });

      // ? Check user
      if (user) {
        res
          .status(201)
          .json({ _id: user._id, username: user.username, email: user.email });
      }
    }
  }),
  //? login
  login: asyncHandler(async (req, res) => {
    // ? get User Data
    const { email, password } = req.body;

    // ? check user exists
    const userExists = await User.findOne({ email });
    if (!userExists) {
      throw new Error("User not found");
    }
    // ? check password match
    const isPasswordCorrect = await bcrypt.compare(
      password,
      userExists.password
    );
    if (!isPasswordCorrect) {
      throw new Error("Invalid Login credentials");
    }

    // generate a token
    const token = jwt.sign({ id: userExists._id }, process.env.JWT_SECRET, {
      expiresIn: "10d",
    });

    res.json({
      message: "Login Successful ",
      token,
      id: userExists._id,
      username: userExists.username,
      email: userExists.email,
    });
  }), //? Profile
  profile: asyncHandler(async (req, res) => {
    const user = await User.findById(req.user);
    if (user) {
      res.json({
        id: user._id,
        username: user.username,
        email: user.email,
      });
    } else {
      throw new Error("User not found");
    }
  }),

  //   !update password
  changeUserPassword: asyncHandler(async (req, res) => {
    // ?access new password
    const { newPassword } = req.body;
    const user = await User.findById(req.user);
    if (!user) {
      throw new Error("User not found");
    }
    //   ? hash new password
    const updatedPassword = await bcrypt.hash(newPassword, 10);

    user.password = updatedPassword;
    //    ? resave user
    await user.save({
      validateBeforeSave: false,
    });
    res.json({
      message: "Password updated successfully",
    });
  }),

  //   ! update userProfile
  updateUserProfile: asyncHandler(async (req, res) => {
    const { username, email } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user,
      {
        username,
        email,
      },
      { new: true }
    );
    res.json({
      message: "Profile updated successfully",
      id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
    });
  }),
};

module.exports = userController;
