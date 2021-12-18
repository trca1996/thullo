const express = require("express");

const authController = require("./../controllers/authController");
const cardController = require("./../controllers/cardController");
const boardController = require("./../controllers/boardController");

const router = express.Router();

router.use(authController.protect, cardController.isMember);

router.post("/", cardController.addCard);
router
  .route("/:id")
  .delete(cardController.removeCard)
  .patch(cardController.updateCard)
  .get(cardController.getCard);

router.post("/:id/attachment", cardController.addAttachment);
router.delete("/:id/attachment/:atcSlug", cardController.removeAttachment);

router.route("/:id/comment").post(cardController.addComment);
router
  .route("/:id/comment/:commentId")
  .patch(cardController.editComment)
  .delete(cardController.removeComment);

router.patch("/:id/changeList", cardController.changeList);

router.post("/:id/label", cardController.addLabel);
router.delete("/:id/label/:labelId", cardController.removeLabel);

router.post(
  "/:id/member",
  boardController.restrictToBoardAdmin,
  cardController.addMember
);
router.delete(
  "/:id/member/:userId",
  boardController.restrictToBoardAdmin,
  cardController.removeMember
);

module.exports = router;
