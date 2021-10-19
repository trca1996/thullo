const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({ path: __dirname + "/config.env" });

const app = require("./app");

const DB =
  process.env.NODE_ENV === "development"
    ? process.env.DATABASE_LOCAL
    : process.env.DATABASE;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((connection) => console.log("DB connection successful!"))
  .catch((err) => console.log(`DB connection ERROR!!! ${err}`));

// SERVER
const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port} in ${process.env.NODE_ENV} mode...`);
});
