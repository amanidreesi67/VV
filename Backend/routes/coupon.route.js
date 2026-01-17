import express from "express";
const router = express.Router();
import couponController from "../controller/coupon.controller.js";
import authenticate from "../middleware/authenticate.js";

// Admin routes for coupon management
router.post("/create", couponController.createCoupon);
router.get("/all_coupon", couponController.getAllCoupons);
router.delete("/delete/:id", couponController.deleteCoupon);
router.put("/update/:id", couponController.updateCoupon);

export default router;
