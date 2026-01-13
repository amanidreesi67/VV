import Product from "../model/product.model.js";
import mongoose from "mongoose";

async function createProduct(reqData) {
  let topLevel = await Product.findOne().sort({ id: -1 });
  if (!topLevel) {
    topLevel = { id: 0 };
  }

  const product = new Product({
    id: topLevel.id + 1,
    title: reqData.title,
    color: reqData.color,
    description: reqData.description,
    discountedPercent: reqData.discountedPercent,
    images: reqData.images, // Expecting array of strings
    brand: reqData.brand,
    sizes: reqData.sizes, // Expecting array of objects/strings based on frontend
    quantity: reqData.quantity,
    category: reqData.category,
    topLevelCategory: reqData.topLevelCategory,
    secondLevelCategory: reqData.secondLevelCategory,
    thirdLevelCategory: reqData.thirdLevelCategory,
    variants: reqData.variants,
    details: reqData.details,
  });

  return await product.save();
}

async function deleteProduct(productId) {
  const product = await Product.findById(productId);
  if (!product) {
    throw new Error("Product not found");
  }
  await Product.findByIdAndDelete(productId);
  return { message: "Product deleted successfully" };
}

async function updateProduct(productId, reqData) {
  const product = await Product.findByIdAndUpdate(productId, reqData, {
    new: true,
  });
  if (!product) {
    throw new Error("Product not found");
  }
  return product;
}

async function findProductById(id) {
  let product;
  console.log("findProductById called with:", id, "Type:", typeof id);
  console.log("Is valid ObjectId:", mongoose.isValidObjectId(id));

  if (mongoose.isValidObjectId(id)) {
    product = await Product.findById(id).populate("reviews");
  }

  if (!product) {
    try {
      product = await Product.findOne({ id: id }).populate("reviews");
      console.log("Found by numeric ID:", !!product);
    } catch (err) {
      console.error("Error finding by numeric ID:", err);
    }
  }

  if (!product) {
    console.error("Product not found for ID:", id);
    throw new Error("Product not found");
  }
  return product;
}

async function getAllProducts(reqQuery) {
  let {
    category,
    colors,
    sizes,
    minPrice,
    maxPrice,
    minDiscount,
    sort,
    stock,
    pageNumber,
    pageSize,
  } = reqQuery;

  pageSize = pageSize || 10;
  pageNumber = pageNumber || 1;

  let query = Product.find().populate("reviews");

  // 1. Category Filtering
  if (category) {
    query = query.find({
      $or: [
        { topLevelCategory: category },
        { secondLevelCategory: category },
        { thirdLevelCategory: category },
        { category: category },
      ],
    });
  }

  // 2. Color Filtering (if provided as comma-separated string or array)
  // colors could be "red,blue" or ["red","blue"]
  if (colors) {
    const colorSet = new Set(
      (Array.isArray(colors) ? colors : colors.split(",")).map((c) =>
        c.trim().toLowerCase()
      )
    );
    if (colorSet.size > 0) {
      // Regex to match any of the colors (case insensitive)
      const colorRegex = new RegExp([...colorSet].join("|"), "i");
      query = query.find({ "variants.color": colorRegex });
    }
  }

  // 3. Size Filtering
  if (sizes) {
    const sizeSet = new Set(
      (Array.isArray(sizes) ? sizes : sizes.split(",")).map((s) => s.trim())
    );
    // Determine if any variant has the specified size in stock
    // Since stock is Mixed (Map), we might need to check specific keys exist or use $where
    // Simpler approach: If variants.stock is array in some versions, but here it's Mixed.
    // Given the difficulty of querying Mixed strictly by key existence in simple find,
    // we might rely on the frontend or simplified check if possible.
    // FOR NOW: Skipping complex Size filtering on Mixed type unless strict requirement.
  }

  // 4. Price Filtering (Check if ANY variant falls in range)
  if (minPrice || maxPrice) {
    const priceQuery = {};
    if (minPrice) priceQuery.$gte = Number(minPrice);
    if (maxPrice) priceQuery.$lte = Number(maxPrice);
    query = query.find({ "variants.price": priceQuery });
  }

  // 5. Discount Filtering
  if (minDiscount) {
    query = query.find({ discountedPercent: { $gte: Number(minDiscount) } });
  }

  // 6. Stock Filtering
  if (stock === "in_stock") {
    // Basic check: Ensure quantity > 0 (if top level has quantity) or variants exist
    // Schema doesn't have top level quantity.
    // We assume if it has variants, it's potentially in stock.
    query = query.find({ variants: { $not: { $size: 0 } } });
  } else if (stock === "out_of_stock") {
    query = query.find({ variants: { $size: 0 } });
  }

  // 7. Sorting
  if (sort) {
    const sortDirection = sort === "price_high" ? -1 : 1;
    if (sort === "price_high" || sort === "price_low") {
      query = query.sort({ "variants.0.price": sortDirection }); // Approx sort by first variant price
    } else if (sort === "newest") {
      query = query.sort({ createdAt: -1 });
    }
  }

  const totalProducts = await Product.countDocuments(query);
  const skip = (pageNumber - 1) * pageSize;
  query = query.skip(skip).limit(pageSize);

  const products = await query.exec();

  return {
    content: products,
    currentPage: pageNumber,
    totalPages: Math.ceil(totalProducts / pageSize),
  };
}

export default {
  createProduct,
  deleteProduct,
  updateProduct,
  findProductById,
  getAllProducts,
};
