import express from "express";
import productController from "../controller/product.controller.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// Admin routes (No Authentication as per request)
router.post("/", upload.any(), productController.createProduct);
router.post("/creates", productController.createMultipleProducts);
router.delete("/:id", productController.deleteProduct);
router.put("/:id", upload.any(), productController.updateProduct);

export default router;
