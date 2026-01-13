import express from "express";
import cartController from "../controller/cart.controller.js";
import authenticate from "../middleware/authenticate.js";

const router = express.Router();

router.get("/", authenticate, cartController.findUserCart);
router.put("/add", authenticate, cartController.addItemToCart);

// For update/remove, we could use a separate route file 'cartItem.route.js' or just put here.
// Conventionally: /api/cart for cart-level, /api/cart_items for item-level?
// Or /api/cart/item/:id?
// Let's stick to /item/:cartItemId within this router to keep it simple.
router.put("/item/:cartItemId", authenticate, cartController.updateCartItem);
router.delete("/item/:cartItemId", authenticate, cartController.removeCartItem);

export default router;
