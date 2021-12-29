const { createServer } = require("http");
const { Server } = require("socket.io");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({ path: __dirname + "/config.env" });

const app = require("./app");
const httpServer = createServer(app);

const DB = process.env.DATABASE_LOCAL;

// const DB =
//   process.env.NODE_ENV === "development"
//     ? process.env.DATABASE_LOCAL
//     : process.env.DATABASE;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((connection) => console.log("DB connection successful!"))
  .catch((err) => console.log(`DB connection ERROR!!! ${err}`));

// set Front domain
const io = new Server(httpServer, {
  cors: { origin: "http://localhost:3000" },
});

io.on("connection", (socket) => {
  socket.on("join-board", (boardId) => {
    socket.join(boardId);
  });

  socket.on("leave-board", (boardId) => {
    socket.leave(boardId);
  });

  socket.on("change-card-position", (result, boardId) => {
    socket.to(boardId).emit("change-position", result);
  });
});

// SERVER
const port = process.env.PORT || 5000;
httpServer.listen(port, () => {
  console.log(`App running on port ${port} in ${process.env.NODE_ENV} mode...`);
});
