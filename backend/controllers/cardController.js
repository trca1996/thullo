const path = require("path");
const Board = require("../models/boardModel");
const Card = require("./../models/cardModel");
const List = require("./../models/listModel");
const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");
const factory = require("./handlerFactory");
const slugify = require("slugify");
const fs = require("fs/promises");

const attachmentsPath = path.join(__dirname, "../public/attachments/");

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

  req.board = board;

  next();
});

exports.addCard = catchAsync(async (req, res, next) => {
  const { title, listId } = req.body;

  const list = await List.findById(listId);

  if (!list) {
    return next(new AppError("There is no list with this ID", 404));
  }

  const newCard = await Card.create({ title, list: listId });
  list.cards.push(newCard.id);
  list.save({ validateBeforeSave: false });

  res.status(201).json({
    status: "success",
    data: newCard,
  });
});

exports.removeCard = catchAsync(async (req, res, next) => {
  const card = await Card.findByIdAndDelete(req.params.id);

  if (!card) {
    return next(new AppError("No document found with that ID", 404));
  }

  const list = await List.findById(card.list);
  list.cards = list.cards.filter(
    (cardId) => cardId.toString() !== req.params.id
  );
  await list.save({ validateBeforeSave: false });

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.updateCard = factory.updateOne(Card, ["title", "description", "cover"]); // Update only this three
exports.getCard = factory.getOne(Card);

exports.addAttachment = catchAsync(async (req, res, next) => {
  const file = req.files.attachment;

  if (!req.files) {
    return next(new AppError("There is no file to upload", 404));
  }

  const fileObj = {
    title: file.name,
    slug: slugify(file.name),
    mimetype: file.mimetype,
  };

  const cardId = req.params.id;

  const card = await Card.findById(cardId);
  if (!card) {
    return next(new AppError("There is no card with this ID", 404));
  }

  const isSameName = card.attachments.find((att) => att.slug === fileObj.slug);

  if (isSameName) {
    return next(new AppError("Already have attachment with that name", 400));
  }

  card.attachments.push(fileObj);

  await card.save();

  file.mv(attachmentsPath + fileObj.slug);

  res.status(201).json({
    status: "success",
    data: fileObj,
  });
});

exports.removeAttachment = catchAsync(async (req, res, next) => {
  const { atcSlug } = req.params;
  const cardId = req.params.id;

  const card = await Card.findById(cardId);
  if (!card) {
    return next(new AppError("There is no card with this ID", 404));
  }
  console.log(atcSlug);

  card.attachments = card.attachments.filter((att) => att.slug !== atcSlug);
  await card.save();

  await fs.unlink(attachmentsPath + atcSlug);

  res.status(200).json({
    status: "success",
    data: card,
  });
});

exports.addComment = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const cardId = req.params.id;
  const { comment } = req.body;

  const card = await Card.findById(cardId);
  if (!card) {
    return next(new AppError("There is no card with that ID", 404));
  }

  card.comments.push({ user: userId, comment });

  await card.save();

  res.status(201).json({
    status: "success",
    data: {
      user: userId,
      comment,
    },
  });
});

exports.removeComment = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const cardId = req.params.id;
  const { commentId } = req.params;

  const card = await Card.findById(cardId);
  if (!card) {
    return next(new AppError("There is no card with that ID", 404));
  }

  const indexOfComment = card.comments.findIndex(
    (comment) => comment.id === commentId
  );

  if (indexOfComment === -1) {
    return next(new AppError("There is no comment with this ID", 404));
  }

  if (card.comments[indexOfComment].user.toString() === userId) {
    card.comments.splice(indexOfComment, 1);
  } else {
    return next(new AppError(`You can't delete this comment`, 400));
  }

  card.save();

  res.status(200).json({
    status: "success",
    data: card,
  });
});

exports.editComment = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const cardId = req.params.id;
  const { commentId } = req.params;
  const { newComment } = req.body;

  const card = await Card.findById(cardId);
  if (!card) {
    return next(new AppError("There is no card with that ID", 404));
  }

  const commentObj = card.comments.find(
    (comment) => comment.user.toString() === userId && comment.id === commentId
  );

  if (!commentObj) {
    return next(new AppError(`You can't edit this comment`, 400));
  }

  commentObj.comment = newComment;

  card.save();

  res.status(200).json({
    status: "success",
    data: commentObj,
  });
});

exports.changeList = catchAsync(async (req, res, next) => {
  const cardId = req.params.id;
  const { newListId, prevListId, newIndex } = req.body;

  const card = await Card.findById(cardId);

  if (!card) {
    return next(new AppError("There is no card with that ID", 404));
  }

  const prevList = await List.findById(prevListId);
  const isCardExistInList = prevList.cards.some(
    (card) => card.toString() === cardId
  );

  if (!isCardExistInList) {
    return next(new AppError("This card is not in correct list", 400));
  }

  if (newListId === prevListId) {
    const list = await List.findById(newListId);

    list.cards = list.cards.filter(
      (listCardId) => listCardId.toString() !== cardId
    );

    if (newIndex > list.cards.length) {
      list.cards.push(cardId);
    } else {
      list.cards.splice(newIndex, 0, cardId);
    }

    await list.save({ validateBeforeSave: false });
  } else {
    const newList = await List.findById(newListId);

    prevList.cards = prevList.cards.filter(
      (listCardId) => listCardId.toString() !== cardId
    );

    if (newIndex > newList.cards.length) {
      newList.cards.push(cardId);
    } else {
      newList.cards.splice(newIndex, 0, cardId);
    }

    await prevList.save({ validateBeforeSave: false });
    await newList.save({ validateBeforeSave: false });
    card.list = newListId;
    await card.save({ validateBeforeSave: false });
  }

  res.status(200).json({
    status: "success",
  });
});

exports.addLabel = catchAsync(async (req, res, next) => {
  const cardId = req.params.id;
  const label = req.body;

  const card = await Card.findById(cardId);

  if (!card) {
    return next(new AppError("There is no card with that ID", 404));
  }

  card.labels.push(label);

  await card.save();

  res.status(201).json({
    status: "success",
    data: card,
  });
});

exports.removeLabel = catchAsync(async (req, res, next) => {
  const { id: cardId, labelId } = req.params;

  const card = await Card.findById(cardId);

  if (!card) {
    return next(new AppError("There is no card with that ID", 404));
  }

  card.labels = card.labels.filter((label) => label.id !== labelId);

  await card.save();

  res.status(200).json({
    status: "success",
    data: card,
  });
});

exports.addMember = catchAsync(async (req, res, next) => {
  const { userId } = req.body;
  const board = req.board;
  const cardId = req.params.id;

  const card = await Card.findById(cardId);

  if (!card) {
    return next(new AppError("There is no card with that ID", 404));
  }

  const isBoardMember = board.members.some((member) => member.id === userId);
  if (!isBoardMember) {
    return next(new AppError("This user is not board member.", 400));
  }

  const isCardMember = card.members.some((member) => member.id === userId);
  if (isCardMember) {
    return next(new AppError("This user is already member of this card", 400));
  }

  card.members.push(userId);

  await card.save();

  res.status(201).json({
    status: "success",
    data: card,
  });
});

exports.removeMember = catchAsync(async (req, res, next) => {
  const { id: cardId, userId } = req.params;

  const card = await Card.findById(cardId);

  if (!card) {
    return next(new AppError("There is no card with that ID", 404));
  }

  card.members = card.members.filter((member) => member.id !== userId);

  await card.save();

  res.status(200).json({
    status: "success",
    data: card,
  });
});
