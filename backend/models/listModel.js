const mongoose = require("mongoose");

const listSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "A list must have a title"],
      trim: true,
      maxlength: [
        40,
        "A list title must have less or equal then 40 characters",
      ],
      minlength: [5, "A list title must have more or equal then 5 characters"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    versionKey: false,
  }
);

listSchema.virtual("cards", {
  ref: "Card",
  foreignField: "list",
  localField: "_id",
});

const List = mongoose.model("List", listSchema);

module.exports = List;
