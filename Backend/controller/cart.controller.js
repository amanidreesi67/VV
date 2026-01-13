import cartService from "../services/cart.service.js";
import cartItemService from "../services/cartItem.service.js";

const findUserCart = async (req, res) => {
  const user = req.user;
  try {
    const cart = await cartService.findUserCart(user._id);
    return res.status(200).send(cart);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const addItemToCart = async (req, res) => {
  const user = req.user;
  try {
    // req.body should contain productId, size, (variant is optional/inferred)
    const cartItem = await cartService.addCartItem(user._id, req.body);
    return res.status(200).send(cartItem);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

// Route: PUT /api/cart_items/:cartItemId
const updateCartItem = async (req, res) => {
  const user = req.user;
  const { cartItemId } = req.params;
  try {
    const updatedCartItem = await cartItemService.updateCartItem(
      user._id,
      cartItemId,
      req.body
    );
    return res.status(200).send(updatedCartItem);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

// Route: DELETE /api/cart_items/:cartItemId
const removeCartItem = async (req, res) => {
  const user = req.user;
  const { cartItemId } = req.params;
  try {
    await cartItemService.removeCartItem(user._id, cartItemId);
    return res.status(200).send({ message: "Cart item removed successfully" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export default {
  findUserCart,
  addItemToCart,
  updateCartItem,
  removeCartItem,
};
