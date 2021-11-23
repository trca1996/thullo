const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const path = require("path");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

const userRouter = require("./routes/userRoutes");
const boardRouter = require("./routes/boardRoutes");
const cardRouter = require("./routes/cardRoutes");
const utilRouter = require("./routes/utilRouter");

const app = express();

// Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Cors
app.use(cors());
app.options("*", cors());

// Enable files upload
app.use(
  fileUpload({
    createParentPath: true,
    abortOnLimit: true,
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);

// Serving static files
app.use(express.static(path.join(__dirname, "public")));

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// ROUTES
app.use("/api/v1/users", userRouter);
app.use("/api/v1/boards", boardRouter);
app.use("/api/v1/cards", cardRouter);
app.use("/api/v1/utils", utilRouter);

// ERROR
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`), 404);
});

app.use(globalErrorHandler);

// exp
module.exports = app;
