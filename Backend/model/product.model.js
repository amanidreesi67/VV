import mongoose from "mongoose";

// Product Schema
const productSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
  },
  category: {
    type: String,
  },
  topLevelCategory: {
    type: String,
  },
  secondLevelCategory: {
    type: String,
  },
  thirdLevelCategory: {
    type: String,
  },
  images: [String],
  rating: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "reviews",
    },
  ],
  numReviews: {
    type: Number,
    default: 0,
  },
  discountedPercent: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
  },
  variants: [
    {
      color: String,
      hex: String,
      price: Number,
      images: [String],
      stock: {
        type: mongoose.Schema.Types.Mixed, // Change to Mixed to allow Map or Object initially
      },
    },
  ],
  details: {
    fabric: String,
    fit: String,
    neck: String,
    sleeve: String,
    length: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("products", productSchema);

export default Product;
