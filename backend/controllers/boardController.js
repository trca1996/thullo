const User = require("../models/userModel");
const Board = require("./../models/boardModel");
const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");
const factory = require("./handlerFactory");

exports.setUser = (req, res, next) => {
  req.body.admin = req.user._id;
  next();
};

exports.restrictToBoardAdmin = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const board = await Board.findById(req.params.id);

  if (userId !== board.admin.toString()) {
    return next(new AppError("You are not authorized!"));
  }

  next();
});

exports.createOne = factory.createOne(Board);
exports.getAll = factory.getAll(Board);
exports.getOne = factory.getOne(Board);
exports.updateOne = factory.updateOne(Board);
// must be modified
exports.deleteOne = factory.deleteOne(Board);

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

  board.members.push(user._id);

  await board.save();

  res.status(200).json({
    status: "success",
    data: {
      data: board,
    },
  });
});

exports.removeMember = catchAsync(async (req, res, next) => {
  const { memberId } = req.body;
  const board = await Board.findById(req.params.id);

  board.members = board.members.filter((member) => member.id !== memberId);

  board.save();

  res.status(200).json({
    status: "success",
    data: {
      data: board,
    },
  });
});
