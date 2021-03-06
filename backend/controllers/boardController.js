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

  if (userId !== board.admin._id.toString()) {
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
      $or: [
        { admin: userId },
        { members: userId },
        { isPrivate: { $ne: true } },
      ],
    }),
    req.query
  )
    .search("title")
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
    $or: [{ admin: userId }, { members: userId }, { isPrivate: { $ne: true } }],
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
    return next(new AppError("There is no user with that email"));
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
    data: user,
  });
});

exports.removeMember = catchAsync(async (req, res, next) => {
  const { memberId } = req.body;
  const board = await Board.findById(req.params.id);

  board.members = board.members.filter((member) => member.id !== memberId);

  await board.save({ validateBeforeSave: false });

  res.status(204).json({
    status: "success",
    data: board.members,
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

exports.editList = catchAsync(async (req, res, next) => {
  const { listId, newListTitle } = req.body;

  const list = await List.findByIdAndUpdate(
    listId,
    { title: newListTitle },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!list) {
    return next(new AppError(`There is no list with that id`, 404));
  }

  res.status(200).json({
    status: "success",
    data: list,
  });
});

exports.removeList = catchAsync(async (req, res, next) => {
  const { listId } = req.body;

  const list = await List.findById(listId);

  if (!list) {
    return next(AppError(`There is no list with that id`, 404));
  }

  const cards = await Card.find({ list: listId });

  if (cards.length > 0) {
    return next(new AppError(`Can't remove list while there is cards in it`));
  }

  const board = await Board.findById(req.params.id);

  board.lists = board.lists.filter((list) => list.toString() !== listId);

  await board.save({ validateBeforeSave: false });

  res.status(204).json({
    status: "success",
  });
});
