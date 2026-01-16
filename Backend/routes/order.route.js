import express from "express";
const router = express.Router();
import orderController from "../controller/order.controller.js";
import authenticate from "../middleware/authenticate.js";

router.get("/user", authenticate, orderController.findUserOrders);
router.get("/:id", authenticate, orderController.findOrderById);
router.put("/:id/cancel", authenticate, orderController.cancelOrder);
router.put("/:id/return", authenticate, orderController.requestReturn);

export default router;
