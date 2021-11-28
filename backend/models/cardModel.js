const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "A card must have a title"],
      trim: true,
      maxlength: [
        40,
        "A card title must have less or equal then 40 characters",
      ],
      minlength: [5, "A card title must have more or equal then 5 characters"],
    },
    description: {
      type: String,
      trim: true,
    },
    cover: String,
    list: {
      type: mongoose.Schema.ObjectId,
      required: [true, "A card must belongs to list"],
    },
    members: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
    attachments: [
      {
        title: { type: String },
        slug: { type: String },
        mimetype: { type: String },
        createdAt: {
          type: Date,
          default: Date.now(),
        },
      },
    ],
    comments: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: "User",
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now(),
        },
      },
    ],
    labels: [
      {
        name: {
          type: String,
          required: true,
        },
        color: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    // timestamps: true,
    versionKey: false,
  }
);

cardSchema.pre(/^find/, function (next) {
  this.populate({
    path: "members",
    select: "-__v",
  });

  next();
});

const Card = mongoose.model("Card", cardSchema);

module.exports = Card;
