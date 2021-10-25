const Board = require("../models/boardModel");
const Card = require("./../models/cardModel");
const List = require("./../models/listModel");
const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");
const factory = require("./handlerFactory");

exports.isMember = catchAsync(async (req, res, next) => {
  const { boardId } = req.query;
  const userId = req.user.id;

  const board = await Board.findById(boardId);

  if (!board) {
    return next(new AppError("There is no board with that ID", 404));
  }

  const member = board.members.find((member) => member.id === userId);
  const admin = board.admin.toString() === userId;

  if (!member && !admin) {
    return next(new AppError("You are not admin or member of this board", 401));
  }

  next();
});

exports.addCard = catchAsync(async (req, res, next) => {
  const { title, listId } = req.body;

  const list = await List.findById(listId);

  console.log(req.query);

  if (!list) {
    return next(new AppError("There is no list with this ID", 404));
  }

  const newCard = await Card.create({ title, list: listId });

  res.status(201).json({
    status: "success",
    data: newCard,
  });
});

exports.removeCard = factory.deleteOne(Card);
exports.updateCard = factory.updateOne(Card, ["title", "description", "cover"]); // Update only this three
