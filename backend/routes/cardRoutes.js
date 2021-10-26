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
  .patch(cardController.updateCard);

router.post("/:id/addAttachment", cardController.addAttachment);
router.delete(
  "/:id/removeAttachment/:atcSlug",
  cardController.removeAttachment
);

module.exports = router;
