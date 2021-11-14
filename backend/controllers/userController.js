const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("./../utils/catchAsync");
const factory = require("./handlerFactory");
const path = require("path");
const fs = require("fs/promises");

// filter object
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });

  return newObj;
};

const userPhotoPath = path.join(__dirname, "../public/img/users/");

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.updateMe = catchAsync(async (req, res, next) => {
  const filteredBody = filterObj(req.body, "name", "email");
  const photoName = `user-${req.user.id}-${Date.now()}.jpeg`;

  let file;
  if (req.files) {
    file = req.files.photo;
    filteredBody.photo = photoName;
    if (file.mimetype.split("/")[0] !== "image") {
      return next(new AppError("You can only upload one image file", 400));
    }
  }

  // console.log(req.body);

  const user = await User.findById(req.user.id);
  const prevPhoto = user.photo;

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  if (file) {
    if (prevPhoto !== "default.jpg") {
      await fs.unlink(userPhotoPath + prevPhoto);
    }
    file.mv(userPhotoPath + photoName);
  }

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndDelete(req.user.id);

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.getUser = factory.getOne(User);
exports.getAllUsers = factory.getAll(User);
