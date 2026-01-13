import Review from "../model/review.model.js";
import Product from "../model/product.model.js";

async function createReview(reqData, user) {
  const product = await Product.findById(reqData.productId);
  if (!product) {
    throw new Error("Product not found");
  }

  const review = new Review({
    user: user._id,
    product: product._id,
    name: reqData.name, // Or use user.firstName + user.lastName
    rating: reqData.rating,
    comment: reqData.comment,
    createdAt: new Date(),
  });

  await review.save();

  // Add review reference to product
  product.reviews.push(review._id);
  product.numReviews = product.reviews.length;

  // Optional: Recalculate average rating
  // This is a naive implementation; optimize for scale if needed
  // ...

  await product.save();

  return review;
}

async function getAllReview(productId) {
  const product = await Product.findById(productId).populate("reviews");
  if (!product) {
    throw new Error("Product not found");
  }
  return product.reviews;
}

export default {
  createReview,
  getAllReview,
};
