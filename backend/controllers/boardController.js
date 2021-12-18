const Card = require("../models/cardModel");
const List = require("../models/listModel");
const User = require("../models/userModel");
const APIFeatures = require("../utils/apiFeatures");
const Board = require("./../models/boardModel");
const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");
const factory = require("./handlerFactory");
const path = require("path");
const fs = require("fs/promises");

exports.setUser = (req, res, next) => {
  req.body.admin = req.user.id;
  next();
};

exports.restrictToBoardAdmin = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const boardId = req.query.boardId ? req.query.boardId : req.params.id;

  const board = await Board.findById(boardId);

  if (userId !== board.admin.toString()) {
    return next(new AppError("You are not authorized!"));
  }

  next();
});

const boardCoverPath = path.join(__dirname, "../public/img/cover/");

exports.createOne = catchAsync(async (req, res, next) => {
  let cover = "defaultCover.jpg";
  if (req.files) {
    if (req.files.cover.mimetype.split("/")[0] !== "image") {
      return next(new AppError("You can only upload one image file", 400));
    }

    cover = `board-${req.user.id}-${Date.now()}.jpeg`;
    req.files.cover.mv(boardCoverPath + cover);
  }

  const board = await Board.create({ ...req.body, cover });

  res.status(201).json({
    status: "success",
    data: board,
  });
});

exports.getAll = catchAsync(async (req, res, next) => {
  const userId = req.user.id;

  // EXECUTE QUERY
  const features = new APIFeatures(
    Board.find({
      $or: [{ admin: userId }, { members: userId }, { private: { $ne: true } }],
    }),
    req.query
  )
    .search()
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const doc = await features.query;

  res.status(200).json({
    status: "success",
    results: doc.length,
    data: doc,
  });
});

exports.getOne = catchAsync(async (req, res, next) => {
  const userId = req.user.id;

  let query = Board.findOne({
    _id: req.params.id,
    $or: [{ admin: userId }, { members: userId }, { private: { $ne: true } }],
  }).populate({
    path: "lists",
    select: "-__v -id",
    populate: [{ path: "cards", model: "Card" }],
  });

  const doc = await query;

  if (!doc) {
    return next(new AppError("No document found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: doc,
  });
});

exports.updateOne = factory.updateOne(Board);

exports.deleteOne = catchAsync(async (req, res, next) => {
  const board = await Board.findById(req.params.id);
  if (!board) {
    return next(new AppError("No document found with that ID", 404));
  }

  if (board.cover.startsWith("board")) {
    await fs.unlink(boardCoverPath + board.cover);
  }

  board.lists.forEach(async (list) => {
    await Card.deleteMany({ list: list });
    await List.findByIdAndDelete(list);
  });

  board.remove();

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.addMember = catchAsync(async (req, res, next) => {
  const { memberEmail } = req.body;

  const board = await Board.findById(req.params.id);
  const user = await User.findOne({ email: memberEmail });

  if (!user) {
    return next(new AppError("There is no user with that Id"));
  }

  if (user.id === board.admin.toString()) {
    return next(new AppError("You can't add yourself as member", 400));
  }

  const isThere = board.members.some((mem) => {
    return mem.id === user.id;
  });

  if (isThere) {
    return next(new AppError("This member is already in this board", 400));
  }

  board.members.push(user.id);

  await board.save({ validateBeforeSave: false });

  res.status(200).json({
    status: "success",
    data: board,
  });
});

exports.removeMember = catchAsync(async (req, res, next) => {
  const { memberId } = req.body;
  const board = await Board.findById(req.params.id);

  board.members = board.members.filter((member) => member.id !== memberId);

  board.save({ validateBeforeSave: false });

  res.status(204).json({
    status: "success",
    data: board,
  });
});

exports.createList = catchAsync(async (req, res, next) => {
  const { title } = req.body;
  const boardId = req.params.id;

  const board = await Board.findById(boardId);
  if (!board) {
    return next(new AppError("There is no board with that id", 404));
  }

  const newList = await List.create({ title });

  board.lists = board.lists.push(newList.id);

  await board.save({ validateBeforeSave: false });

  res.status(201).json({
    status: "success",
    data: newList,
  });
});

exports.removeList = catchAsync(async (req, res, next) => {
  const { listId } = req.body;

  const cards = await Card.find({ list: listId });

  if (cards) {
    return next(new AppError(`Can't remove list while there is cards in it`));
  }

  const board = await Board.findById(req.params.id);

  board.lists = board.members.filter((list) => list.id !== listId);

  board.save({ validateBeforeSave: false });

  res.status(204).json({
    status: "success",
  });
});
