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
      trim: true,
    },
    private: {
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
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

boardSchema.pre(/^find/, function (next) {
  this.populate({
    path: "members",
    select: "-__v -email",
  });

  next();
});

const Board = mongoose.model("Board", boardSchema);

module.exports = Board;
