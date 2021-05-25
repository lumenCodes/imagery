const express = require("express");
const router = express.Router();
const {
	authorization,
	isAdminAuthorization,
} = require("../middlewares/authMiddleware");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const imageController = require("../controllers/image.controller");

// image routes
router.post("/", [authorization, upload.single('image')], imageController.create);

router.get("/", imageController.getAll);

router.get("/:id", imageController.getOne);

router.delete(
	"/:id",
	[authorization, isAdminAuthorization],
	imageController.delete
);

router.patch("/:id", authorization, imageController.update);

module.exports = router;
