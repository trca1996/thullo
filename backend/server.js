const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({ path: "./config.env" });

const app = require("./app");

const DB =
  process.env.NODE_ENV === "development"
    ? process.env.DATABASE_LOCAL
    : process.env.DATABASE;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((connection) => console.log("DB connection successful!"))
  .catch((err) => console.log("DB connection ERROR!!!"));

// SERVER
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port} in ${process.env.NODE_ENV} mode...`);
});
