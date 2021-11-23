const express = require("express");

const utilController = require("./../controllers/utilController");

const router = express.Router();

router.get("/getPhotos", utilController.getPhotos);

module.exports = router;
