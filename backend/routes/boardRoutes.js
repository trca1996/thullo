const express = require("express");
const boardController = require("../controllers/boardController");
const authController = require("../controllers/authController");

const router = express.Router();

// Routes
router.use(authController.protect);

router
  .route("/")
  .post(boardController.setUser, boardController.createOne)
  .get(boardController.getAll);

router
  .route("/:id")
  .get(boardController.getOne)
  .patch(boardController.restrictToBoardAdmin, boardController.updateOne)
  .delete(boardController.restrictToBoardAdmin, boardController.deleteOne);

router.patch(
  "/:id/addMember",
  boardController.restrictToBoardAdmin,
  boardController.addMember
);

router.patch(
  "/:id/removeMember",
  boardController.restrictToBoardAdmin,
  boardController.removeMember
);

router.post(
  "/:id/createList",
  boardController.restrictToBoardAdmin,
  boardController.createList
);

router.patch(
  "/:id/removeList",
  boardController.restrictToBoardAdmin,
  boardController.removeList
);

router.patch(
  "/:id/editList",
  boardController.restrictToBoardAdmin,
  boardController.editList
);

module.exports = router;
