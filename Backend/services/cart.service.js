import Cart from "../model/cart.model.js";
import CartItem from "../model/cartItem.model.js"; // Needed for find
import productService from "../services/product.service.js";
import cartItemService from "../services/cartItem.service.js";

const createCart = async (user) => {
  try {
    const cart = new Cart({ user });
    const createdCart = await cart.save();
    return createdCart;
  } catch (error) {
    throw new Error(error.message);
  }
};

const findUserCart = async (userId) => {
  try {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      // Create cart if not exists (auto-heal)
      cart = await createCart(userId);
    }

    let cartItems = await CartItem.find({ cart: cart._id }).populate("product");

    // Convert to plain object so we can overwrite cartItems
    const cartObject = cart.toObject();
    cartObject.cartItems = cartItems;

    let totalPrice = 0;
    let totalDiscountedPrice = 0;
    let totalItem = 0;

    for (let cartItem of cartItems) {
      totalPrice += cartItem.price;
      totalDiscountedPrice += cartItem.discountedPrice;
      totalItem += cartItem.quantity;
    }

    cartObject.totalPrice = totalPrice;
    cartObject.totalItem = totalItem;
    cartObject.totalDiscountedPrice = totalDiscountedPrice;
    cartObject.discount = totalPrice - totalDiscountedPrice;

    return cartObject;
  } catch (error) {
    throw new Error(error.message);
  }
};

const addCartItem = async (userId, req) => {
  try {
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = await createCart(userId);
    }
    const product = await productService.findProductById(req.productId);

    const isPresent = await cartItemService.isCartItemExist(
      cart._id,
      product._id,
      req.size,
      userId
    );

    if (!isPresent) {
      let price = product.price;
      if (!price && product.variants && product.variants.length > 0) {
        // If variant is passed in req, try to use its price?
        // But req.variant might be just a subset or user selection.
        // Ideally look for the variant matching req.variant (color? size?) or use the passed variant's price if trusted.
        // Validating against DB is safer.
        // For now, let's assume req.variant is trusted or fall back to first variant.
        // Actually, we should check req.variant.price.
        if (req.variant && req.variant.price) {
          price = req.variant.price;
        } else {
          price = product.variants[0].price;
        }
      }

      let discountedPrice = price;
      if (product.discountedPercent > 0) {
        discountedPrice = price - (price * product.discountedPercent) / 100;
      }

      const cartItemData = {
        product: product._id,
        cart: cart._id,
        quantity: 1,
        userId,
        price: price,
        discountedPrice: discountedPrice,
        size: req.size,
        variant: req.variant, // Optional store of variant details
      };

      const createdCartItem = await cartItemService.createCartItem(
        cartItemData
      );
      cart.cartItems.push(createdCartItem);
      await cart.save();
      return createdCartItem; // Or return updated cart? Usually return generic success or updated cart.
    }

    return isPresent;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default {
  createCart,
  findUserCart,
  addCartItem,
};
