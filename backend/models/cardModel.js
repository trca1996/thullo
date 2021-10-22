const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "A list must have a title"],
    trim: true,
    maxlength: [40, "A list title must have less or equal then 40 characters"],
    minlength: [5, "A list title must have more or equal then 5 characters"],
    unique: true,
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
      title: { type: String, required: true },
      slug: { type: String, required: true },
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
});
