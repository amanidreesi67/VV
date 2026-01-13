import * as userService from "../services/user.service.js";
import CartItem from "../model/cartItem.model.js";

const createCartItem = async (cartItemData) => {
  try {
    const cartItem = new CartItem(cartItemData);

    // Quantity, price, and discountedPrice are already in cartItemData from cart.service.js
    // No need to recalculate here, especially since 'product' is not populated yet.

    const createdCartItem = await cartItem.save();
    return createdCartItem;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateCartItem = async (userId, cartItemId, cartItemData) => {
  try {
    const item = await findCartItemById(cartItemId);
    const user = await userService.findUserById(item.userId);

    if (!user) {
      throw new Error("user not found : " + userId);
    }

    if (user._id.toString() === userId.toString()) {
      // Calculate unit prices from existing state
      const unitPrice = item.price / item.quantity;
      const unitDiscountedPrice = item.discountedPrice / item.quantity;

      item.quantity = cartItemData.quantity;
      item.price = unitPrice * item.quantity;
      item.discountedPrice = unitDiscountedPrice * item.quantity;

      const updatedCartItem = await item.save();
      return updatedCartItem;
    } else {
      throw new Error("you can't update this cart item");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const isCartItemExist = async (cart, product, size, userId) => {
  try {
    const cartItem = await CartItem.findOne({
      cart: cart,
      product: product,
      size: size,
      userId: userId,
    });
    return cartItem;
  } catch (error) {
    throw new Error(error.message);
  }
};

const removeCartItem = async (userId, cartItemId) => {
  try {
    const cartItem = await findCartItemById(cartItemId);
    const user = await userService.findUserById(userId);

    if (user._id.toString() === cartItem.userId.toString()) {
      await CartItem.findByIdAndDelete(cartItemId);
    } else {
      throw new Error("You can't remove another user's item");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const findCartItemById = async (cartItemId) => {
  try {
    const cartItem = await CartItem.findById(cartItemId).populate("product");
    if (cartItem) {
      return cartItem;
    }
    throw new Error("CartItem not found with id : " + cartItemId);
  } catch (error) {
    throw new Error(error.message);
  }
};

export default {
  createCartItem,
  updateCartItem,
  isCartItemExist,
  removeCartItem,
  findCartItemById,
};
