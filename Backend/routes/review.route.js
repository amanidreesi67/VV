import express from "express";
import reviewController from "../controller/review.controller.js";
import authenticate from "../middleware/authenticate.js";

import upload from "../middleware/upload.js";

const router = express.Router();

router.post(
  "/create",
  authenticate,
  upload.array("images"),
  reviewController.createReview,
);
router.get("/product/:productId", reviewController.getAllReview);

export default router;
