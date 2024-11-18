require("dotenv").config();
const cors = require("cors");
const express = require("express");
const userRouter = require("./routes/userRouter");
const dbConnect = require("./config/dbConfig");
const errorHandler = require("./middleware/errorHandler");
const categoryRouter = require("./routes/categoryRoutes");
const transactionRouter = require("./routes/transactionRoute");
const PORT = process.env.PORT || 7750;
const app = express();

//! Middlewares
app.use(express.json());
// ? cors config
const corsOptions = {
  origin: "http://localhost:5173",
};
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
//! Routes
//  User
app.use("/api/v1/users", userRouter);
// category
app.use("/api/v1/category", categoryRouter);
// transaction
app.use("/api/v1/transactions", transactionRouter);

//!Error handler Middlewares

app.use(errorHandler);

// ! Server
app.listen(PORT, () => {
  // Db connection
  dbConnect();
  console.log(`Server is running on port ${PORT}`);
});
