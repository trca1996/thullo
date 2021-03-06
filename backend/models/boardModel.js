const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "A board must have a title"],
      trim: true,
      maxlength: [
        25,
        "A board title must have less or equal then 25 characters",
      ],
      minlength: [5, "A board title must have more or equal then 5 characters"],
    },
    cover: {
      type: String,
      required: [true, "A board must have a cover image"],
    },
    description: {
      type: String,
    },
    isPrivate: {
      type: Boolean,
      default: false,
    },
    admin: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "A board must have admin"],
    },
    lists: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "List",
      },
    ],
    members: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
    versionKey: false,
  }
);

boardSchema.pre(/^find/, function (next) {
  this.populate({
    path: "members",
    select: "-__v -email",
  });

  this.populate({
    path: "admin",
    select: "-__v",
  });

  next();
});

const Board = mongoose.model("Board", boardSchema);

module.exports = Board;
