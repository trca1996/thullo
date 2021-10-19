const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

const userRouter = require("./routes/userRoutes");

const app = express();

// Parsers
app.use(express.json());
app.use(cookieParser());

// Cors
app.use(cors());
app.options("*", cors());

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// ROUTES
app.use("/api/v1/users", userRouter);

// ERROR
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`), 404);
});

app.use(globalErrorHandler);

// exp
module.exports = app;
