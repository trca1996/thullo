const express = require("express");
const morgan = require("morgan");

const app = express();

// Development logging
if (process.env.NODE.ENV === "development") {
  app.use(morgan("dev"));
}

// ROUTES
//
//
//
//

module.exports = app;
