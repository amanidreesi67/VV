import React, { useState, useEffect } from "react";
import {
  MdClose,
  MdDeleteOutline,
  MdKeyboardArrowDown,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from "react-icons/md";
import { FaTag } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getCart,
  removeCartItem,
  updateCartItem,
} from "../Redux/Customers/Cart/Action";
import { findProducts } from "../Redux/Customers/Product/action";
import { useCart } from "../Context/CartContext";
import confetti from "canvas-confetti";

function CartDrawer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, loading } = useSelector((store) => store.cart);
  const { cart } = useSelector((store) => store.cart); // total details?

  // Local state for UI
  const { setIsCartOpen, isCartOpen } = useCart(); // Still use context for UI state 'isCartOpen' only? Or move to Redux UI state?
  // Previous file used useCart for isCartOpen. Let's assume we keep useCart ONLY for UI state or move it.
  // Ideally move 'isCartOpen' to Redux or keep local if it's just a drawer trigger.
  // The Context provided: cartItems, isCartOpen, setIsCartOpen, etc.
  // I will only use 'isCartOpen', 'setIsCartOpen' from context for now to minimize refactor impact on other components that might toggle it.

  // Note: 'cartItems' from Redux might be populated objects differently than local storage.
  // Backend returns: cartItems usually with 'product' populated.
  // My backend 'cartItem' model has 'product' ref. And Service populates it.
  // So 'item.product' will be the product object. 'item.size' is size.
  // Previous local code accessed 'item.variant.basePrice'.
  // My backend model has 'price' and 'discountedPrice' on cartItem itself.
  // Also 'item.product' has 'variants'.
  // I need to adapt the rendering logic below to match backend data structure.

  // Backend CartItem Structure:
  // { _id, product: {...}, size, quantity, price, discountedPrice, userId }

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  const handleRemoveItem = (cartItemId) => {
    dispatch(removeCartItem(cartItemId));
  };

  const handleUpdateQty = (cartItemId, quantity) => {
    dispatch(updateCartItem({ cartItemId, data: { quantity } }));
  };

  // Calculate totals from Redux text (or rely on backend totals in 'cart')
  // Backend 'cart' object has totalPrice, totalDiscountedPrice, etc.

  const subtotal = cart?.totalPrice || 0;
  // ... rest of logic ...

  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [prevDiscount, setPrevDiscount] = useState(0);

  // ... (discount logic based on subtotal) ...
  const discountThreshold1 = 3999;
  const discountThreshold2 = 8999;

  let progressPercent = 0;
  let activeDiscountPercent = 0;
  let activeCouponCode = "";

  if (subtotal < discountThreshold1) {
    progressPercent = (subtotal / discountThreshold1) * 50;
    activeDiscountPercent = 0;
  } else if (subtotal < discountThreshold2) {
    progressPercent =
      50 +
      ((subtotal - discountThreshold1) /
        (discountThreshold2 - discountThreshold1)) *
        50;
    activeDiscountPercent = 12;
    activeCouponCode = "HOLIDAY12";
  } else {
    progressPercent = 100;
    activeDiscountPercent = 15;
    activeCouponCode = "HOLIDAY15";
  }

  // Backend total might already apply product discounts.
  // This frontend logic applies EXTRA cart-level discounts.
  // Backend 'totalPrice' is sum of item prices.
  // Calculated:
  const discountAmount = (subtotal * activeDiscountPercent) / 100;
  const finalTotal = subtotal - discountAmount;
  const shippingCharges = finalTotal > 3999 ? 0 : 50;
  const totalPayable = finalTotal + shippingCharges;

  const remainingFor12 = Math.max(0, discountThreshold1 - subtotal);
  const remainingFor15 = Math.max(0, discountThreshold2 - subtotal);

  // ... existing updateItem logic adapted to Backend ...
  // Backend updateCartItem only updates quantity currently in my implementation.
  // I need to support size/variant update or just remove and re-add.
  // For now, I'll comment out size/color update on backend-based cart or implementing it properly requires "updateCartItem" to accept body.
  // My backend updateCartItem takes req.body. So I can pass size/variant.

  const { products } = useSelector((store) => store.product);

  useEffect(() => {
    if (!products?.content || products.content.length === 0) {
      dispatch(findProducts({}));
    }
  }, [dispatch, products]);

  const recommendedProducts = products?.content?.slice(0, 5) || [];
  const confettiRef = React.useRef(null);

  useEffect(() => {
    if (activeDiscountPercent > prevDiscount && confettiRef.current) {
      // ... confetti ...
      const myConfetti = confetti.create(confettiRef.current, {
        resize: true,
        useWorker: true,
      });
      myConfetti({
        particleCount: 40,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#000000", "#FFD700", "#C0C0C0"],
        scalar: 0.8,
        disableForReducedMotion: true,
      });
    }
    setPrevDiscount(activeDiscountPercent);
  }, [activeDiscountPercent]);

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 overflow-hidden">
      {/* Drawer Content */}
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col animate-slide-in-right overflow-hidden relative">
        <canvas
          ref={confettiRef}
          className="absolute inset-0 pointer-events-none z-50 w-full h-full"
        />
        {/* Header */}
        <div className="p-4 flex items-center justify-between border-b border-gray-100 shrink-0">
          <h2 className="text-xl font-bold">
            Your Cart ({cartItems.length} items)
          </h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="text-gray-500 hover:text-black transition-colors"
          >
            <MdClose size={24} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar bg-gray-50 pb-[300px]">
          {/* Free Shipping Progress - Always Visible */}
          <div className="bg-white p-4 mb-2">
            <p className="text-sm font-semibold text-center mb-10">
              {remainingFor12 > 0
                ? `Add products worth ₹${remainingFor12.toLocaleString()} to unlock 12% off!`
                : remainingFor15 > 0
                ? `Add products worth ₹${remainingFor15.toLocaleString()} to unlock 15% off!`
                : "You've unlocked maximum discount!"}
            </p>
            <div className="relative w-full h-2 bg-gray-200 rounded-full mb-6">
              {/* Progress Fill */}
              <div
                className="absolute top-0 left-0 h-full bg-black rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              ></div>

              {/* Milestones */}
              <div className="absolute top-1/2 left-[50%] -translate-y-1/2 -translate-x-1/2 flex flex-col items-center">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center border-2 border-white text-[10px] font-bold z-10 transition-colors duration-300 ${
                    progressPercent >= 50
                      ? "bg-black text-white"
                      : "bg-gray-300 text-gray-500"
                  }`}
                >
                  %
                </div>
                <span className="text-[10px] text-center mt-3 text-gray-500 leading-tight">
                  12% off
                  <br />
                  unlocked
                </span>
                <span className="absolute -top-4 text-xs font-medium text-gray-400">
                  ₹3,999
                </span>
              </div>
              <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-0 flex flex-col items-center">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center border-2 border-white text-[10px] font-bold z-10 transition-colors duration-300 ${
                    progressPercent >= 100
                      ? "bg-black text-white"
                      : "bg-gray-300 text-gray-500"
                  }`}
                >
                  %
                </div>
                <span className="text-[10px] text-center mt-3 text-gray-500 leading-tight">
                  15% off
                  <br />
                  unlocked
                </span>
                <span className="absolute -top-4 right-0 text-xs font-medium text-gray-400">
                  ₹8,999
                </span>
              </div>
            </div>
          </div>

          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-gray-50">
              <p className="text-gray-500 mb-6 text-lg">
                New Drops every Wednesday.
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  navigate("/");
                }}
                className="bg-black text-white px-8 py-3 font-bold rounded-lg hover:bg-gray-800 transition-colors"
              >
                Shop while you still can!
              </button>
            </div>
          ) : (
            <>
              <div className="bg-white p-4 space-y-4 mb-2">
                {cartItems.map((item) => {
                  if (!item?.product) return null;
                  const fullProduct = item.product;
                  // Handle variants: My backend cartItem doesn't strictly store full variant object unless I pass it.
                  // But 'item.product' has 'variants'.
                  // Backend 'cartItem' model has 'size'.
                  // I need to display the correct image.
                  // I should probably have stored 'variant' in cartItem or infer it?
                  // My CartItem model has 'variant' field type Object!
                  // And my cart.service.js saves 'variant' if passed in req.body.

                  const activeVariant =
                    item.variant || fullProduct.variants?.[0];

                  // Fallback if no variant found
                  if (!activeVariant) return null;

                  const availableColors = fullProduct.variants || [
                    activeVariant,
                  ];
                  const availableSizes =
                    activeVariant.stock instanceof Map
                      ? Array.from(activeVariant.stock.keys())
                      : activeVariant.stock
                      ? Object.keys(activeVariant.stock)
                      : [];

                  const itemBasePrice = item.price / item.quantity; // Unit price
                  // Or use activeVariant.basePrice?

                  return (
                    <div
                      key={item._id}
                      className="bg-white border boundary-gray-200 rounded-2xl p-3 flex gap-3 relative shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
                    >
                      {/* Image */}
                      <div className="w-20 h-28 shrink-0 bg-gray-100 rounded-xl overflow-hidden">
                        <img
                          src={activeVariant.images?.[0] || ""}
                          alt={fullProduct.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Details Column */}
                      <div className="flex-1 flex flex-col relative min-w-0">
                        {/* Title & Price Row */}
                        <div className="flex justify-between items-start gap-2 mb-1">
                          <h3 className="font-medium text-sm leading-snug text-gray-900 line-clamp-2 pt-0.5">
                            {fullProduct.title}
                          </h3>
                          <div className="text-right shrink-0">
                            <p className="font-bold text-sm text-gray-900">
                              ₹
                              {(activeDiscountPercent > 0
                                ? item.discountedPrice / item.quantity
                                : item.price / item.quantity
                              ).toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
                            </p>
                          </div>
                        </div>

                        {/* Selectors - Stacked Left */}
                        <div className="flex flex-col gap-2 mt-1 items-start">
                          {/* Size Selector */}
                          <div className="relative">
                            <span className="text-xs border border-gray-300 rounded px-2 py-1">
                              Size: {item.size}
                            </span>
                            {/* Update Size not implemented in backend yet fully, so just display */}
                          </div>

                          {/* Color Selector */}
                          <div className="relative">
                            <div
                              className="w-4 h-4 rounded-full border border-gray-300"
                              style={{
                                backgroundColor:
                                  activeVariant.hex || activeVariant.color,
                              }}
                            ></div>
                          </div>
                        </div>

                        {/* Actions - Bottom Right Absolute or Flex */}
                        <div className="mt-auto flex justify-end items-center gap-3 pt-2">
                          {/* Quantity Control Pill */}
                          <div className="flex items-center bg-gray-50 rounded-lg border border-gray-200">
                            <button
                              onClick={() =>
                                handleUpdateQty(item._id, item.quantity - 1)
                              }
                              className="w-7 h-7 flex items-center justify-center text-gray-600 hover:text-black hover:bg-gray-100 rounded-l-lg transition-colors disabled:opacity-30"
                              disabled={item.quantity <= 1}
                            >
                              -
                            </button>
                            <span className="text-xs font-bold w-6 text-center text-gray-900">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                handleUpdateQty(item._id, item.quantity + 1)
                              }
                              className="w-7 h-7 flex items-center justify-center text-gray-600 hover:text-black hover:bg-gray-100 rounded-r-lg transition-colors"
                            >
                              +
                            </button>
                          </div>

                          {/* Delete Button */}
                          <button
                            onClick={() => handleRemoveItem(item._id)}
                            className="text-gray-400 hover:text-red-500 transition-colors p-1"
                          >
                            <MdDeleteOutline size={20} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Success Coupon Alert */}
              {activeDiscountPercent > 0 && cartItems.length > 0 && (
                <div className="bg-white px-4 mb-2">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FaTag className="text-green-600" size={14} />
                      <span className="font-bold text-sm text-gray-800">
                        {activeCouponCode} applied
                      </span>
                    </div>
                    <span className="text-sm font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded">
                      Saved ₹
                      {discountAmount.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                </div>
              )}

              {/* Coupon Input */}
              <div className="bg-white p-4 mb-2">
                <div className="border border-green-200 rounded-lg p-3 bg-green-50/10 flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
                    <span className="font-bold cursor-pointer hover:opacity-75 bg-green-200 rounded-full w-5 h-5 flex items-center justify-center text-[10px]">
                      %
                    </span>
                    <input
                      type="text"
                      placeholder="Enter Coupon Code"
                      className="bg-transparent w-full focus:outline-none placeholder:text-gray-400 text-black text-sm"
                    />
                  </div>
                </div>
                <p className="text-center text-blue-600 text-xs font-bold mt-2 cursor-pointer hover:underline flex items-center justify-center gap-1">
                  View All Offers <MdKeyboardArrowRight />
                </p>
              </div>

              {/* FBT */}
              <div className="bg-white p-4 mb-4">
                <h3 className="font-bold text-sm mb-3">
                  Frequently Bought Together
                </h3>
                <div className="flex overflow-x-auto no-scrollbar gap-3 pb-2">
                  {recommendedProducts.map((rec) => (
                    <div
                      key={rec.id}
                      className="min-w-[140px] border border-gray-100 rounded-lg p-2 flex flex-col gap-2 relative bg-white"
                    >
                      <img
                        src={
                          rec.variants && rec.variants.length > 0
                            ? rec.variants[0].images[0]
                            : ""
                        }
                        className="w-full h-32 object-cover rounded-md"
                        alt={rec.title}
                      />
                      <div>
                        <p className="text-xs font-medium truncate">
                          {rec.title}
                        </p>
                        <div className="flex gap-2 items-center mt-1">
                          <span className="text-xs font-bold">
                            ₹
                            {rec.variants?.[0]?.price?.toLocaleString() ||
                              "N/A"}
                          </span>
                          <span className="text-[10px] text-gray-400 line-through">
                            ₹
                            {((rec.variants?.[0]?.price || 0) * 1.5).toFixed(0)}
                          </span>
                        </div>
                        <button
                          onClick={() => {
                            const v = rec.variants?.[0];
                            if (v) {
                              const s =
                                v.stock instanceof Map
                                  ? Array.from(v.stock.keys())[0]
                                  : v.stock
                                  ? Object.keys(v.stock)[0]
                                  : "OneSize";
                              addToCart(rec, v, s, 1);
                            }
                          }}
                          className="w-full mt-2 border border-black text-black text-xs font-bold py-1 rounded hover:bg-black hover:text-white transition-colors"
                        >
                          + Add
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer - Fixed */}
        {cartItems.length > 0 && (
          <div className="p-4 bg-white border-t border-gray-100 absolute bottom-0 w-full rounded-t-xl shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
            {/* Summary Toggle Header */}
            <div
              className={`flex justify-between items-center mb-4 cursor-pointer p-3 rounded-lg ${
                isDetailsOpen ? "bg-gray-50" : ""
              }`}
              onClick={() => setIsDetailsOpen(!isDetailsOpen)}
            >
              <div className="flex items-center gap-3">
                <div className="bg-black text-white w-8 h-8 flex items-center justify-center rounded-md">
                  {/* Simulating the Receipt Icon with Rupee sym in standard text or an icon if preferred */}
                  <span className="font-bold text-lg">₹</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-lg text-gray-900">
                    Estimated Total
                  </span>
                  <MdKeyboardArrowDown
                    className={`transition-transform duration-300 text-gray-500 ${
                      isDetailsOpen ? "rotate-180" : ""
                    }`}
                    size={24}
                  />
                </div>
              </div>
              <span className="font-bold text-xl text-gray-900">
                ₹
                {totalPayable.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>

            {/* Expandable Order Summary */}
            <div
              className={`transition-all duration-300 overflow-hidden ${
                isDetailsOpen
                  ? "max-h-64 opacity-100 mb-6"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="text-sm space-y-3 text-gray-600 bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div className="flex justify-between">
                  <span>MRP total</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-green-600 font-medium">
                  <span>
                    Discount {activeCouponCode ? `(${activeCouponCode})` : ""}
                  </span>
                  <span>
                    -₹
                    {discountAmount.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
                <div className="flex justify-between font-medium text-black pt-2 border-t border-gray-200">
                  <span>Cart Subtotal</span>
                  <span>
                    ₹
                    {finalTotal.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping Charges</span>
                  <span>
                    {shippingCharges === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      `₹${shippingCharges}`
                    )}
                  </span>
                </div>
              </div>
            </div>

            {/* Place Order Button */}
            <button className="w-full bg-black text-white py-3 px-4 rounded-xl flex items-center justify-between shadow-lg hover:bg-gray-900 transition-colors group">
              <div className="text-left">
                <span className="block font-bold text-lg leading-none">
                  Place Order
                </span>
                <span className="block text-[10px] text-gray-300 mt-1 font-medium">
                  Extra ₹50 off on Prepaid Orders
                </span>
              </div>

              {/* Payment Icons */}
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border-2 border-black z-30">
                  <span className="text-[8px] font-bold text-blue-800 tracking-tighter">
                    Paytm
                  </span>
                </div>
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border-2 border-black z-20">
                  <span className="text-[8px] font-bold text-purple-600 tracking-tighter">
                    Pe
                  </span>
                </div>
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border-2 border-black z-10">
                  <span className="text-[8px] font-bold text-blue-500 tracking-tighter">
                    GPay
                  </span>
                </div>
              </div>
            </button>

            {/* International Order Button */}
            <button className="w-full mt-3 bg-black text-white py-4 font-bold text-lg rounded-xl shadow-lg hover:bg-gray-900 transition-colors">
              International Order
            </button>

            {/* Powered By */}
            <div className="flex justify-center items-center gap-1.5 mt-6 opacity-80">
              <span className="text-xs text-gray-500 font-medium">
                Powered by
              </span>
              <div className="flex items-center gap-0.5 font-bold text-sm">
                <span className="text-[#2c3e50]">Go</span>
                <span className="text-[#e67e22]">Kwik</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartDrawer;
