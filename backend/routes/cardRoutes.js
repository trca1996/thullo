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

router.post("/:id/addAttachment", cardController.addAttachment);
router.delete(
  "/:id/removeAttachment/:atcSlug",
  cardController.removeAttachment
);

router.route("/:id/comment").post(cardController.addComment);
router
  .route("/:id/comment/:commentId")
  .patch(cardController.editComment)
  .delete(cardController.removeComment);

router.patch("/:id/changeList/:listId", cardController.changeList);

module.exports = router;
