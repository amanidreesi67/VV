// src/components/AddProductForm.jsx
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  createProduct,
  updateProduct,
} from "../Redux/Customers/Product/Action";
import categoryHierarchy from "../data/categoryHierarchi";

const AddProductForm = ({ readOnly = false }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productToUpdate = location?.state?.product || null;

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // ... (maintain existing state: formData, variants)

  const [formData, setFormData] = useState({
    _id: null,
    title: "",
    brand: "",
    description: "",
    price: "",
    discountedPrice: "",
    discountPercentage: "",
    topLevelCategory: "",
    secondLevelCategory: "",
    thirdLevelCategory: "",
  });

  const [variants, setVariants] = useState([
    {
      color: "",
      hex: "#000000",
      basePrice: "",
      files: [],
      previews: [],
      stock: [
        { size: "S", quantity: 0 },
        { size: "M", quantity: 0 },
        { size: "L", quantity: 0 },
      ],
    },
  ]);

  const isEditing = !!formData._id;

  // Initialize form if editing
  useEffect(() => {
    if (productToUpdate) {
      // Map existing data to state
      setFormData({
        _id: productToUpdate._id,
        title: productToUpdate.title || "",
        brand: productToUpdate.brand || "",
        description: productToUpdate.description || "",
        price: productToUpdate.variants?.[0]?.price || "",
        discountedPrice: "", // Optional or derived
        discountPercentage: productToUpdate.discountedPercent || "",
        topLevelCategory: productToUpdate.topLevelCategory || "",
        secondLevelCategory: productToUpdate.secondLevelCategory || "",
        thirdLevelCategory:
          productToUpdate.category?.name || productToUpdate.category || "",
      });

      if (productToUpdate.variants && productToUpdate.variants.length > 0) {
        const mappedVariants = productToUpdate.variants.map((v) => {
          let stockArray = [];
          if (v.stock && typeof v.stock === "object") {
            stockArray = Object.entries(v.stock).map(([size, quantity]) => ({
              size,
              quantity,
            }));
          }
          if (stockArray.length === 0) {
            stockArray = [
              { size: "S", quantity: 0 },
              { size: "M", quantity: 0 },
              { size: "L", quantity: 0 },
            ];
          }

          return {
            color: v.color || "",
            hex: v.hex || "#000000",
            basePrice: v.price || "",
            files: [],
            previews: v.images || [],
            stock: stockArray,
          };
        });
        setVariants(mappedVariants);
      }
    }
  }, [productToUpdate]);

  // Handle Input Change for Top Level
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Main Images (kept for consistency though may be unused in this specific file version)
  const handleMainFileChange = (e) => {
    const files = Array.from(e.target.files);
    // setMainFiles(files); // setMainFiles is missing in state given context, omitting call.
    // logic seems to use variants[0].files for main images now.
  };

  // --- Variant Handlers ---
  const addVariant = () => {
    setVariants([
      ...variants,
      {
        color: "",
        hex: "#000000",
        basePrice: formData.discountedPrice || "", // Default to main price
        files: [],
        previews: [],
        stock: [
          { size: "S", quantity: 0 },
          { size: "M", quantity: 0 },
          { size: "L", quantity: 0 },
        ],
      },
    ]);
  };

  const removeVariant = (index) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  const handleVariantChange = (index, field, value) => {
    const updated = [...variants];
    updated[index][field] = value;
    setVariants(updated);
  };

  const handleVariantFileChange = (index, e) => {
    const files = Array.from(e.target.files);
    const updated = [...variants];
    updated[index].files = files;
    updated[index].previews = files.map((f) => URL.createObjectURL(f));
    setVariants(updated);
  };

  // Stock Management for Variant
  const addStockRow = (vIndex) => {
    const updated = [...variants];
    updated[vIndex].stock.push({ size: "", quantity: 0 });
    setVariants(updated);
  };

  const removeStockRow = (vIndex, sIndex) => {
    const updated = [...variants];
    updated[vIndex].stock = updated[vIndex].stock.filter(
      (_, i) => i !== sIndex
    );
    setVariants(updated);
  };

  const handleStockChange = (vIndex, sIndex, field, value) => {
    const updated = [...variants];
    updated[vIndex].stock[sIndex][field] = value;
    setVariants(updated);
  };

  // Category Logic
  const secondLevelOptions = formData.topLevelCategory
    ? categoryHierarchy?.[formData.topLevelCategory] || []
    : [];

  const thirdLevelOptions = [];

  // Calculate Discount
  useEffect(() => {
    const p = Number(formData.price);
    const dp = Number(formData.discountedPrice);
    if (p > 0 && dp > 0) {
      const percent = Math.round(((p - dp) / p) * 100);
      setFormData((prev) => ({ ...prev, discountPercentage: percent }));
    }
  }, [formData.price, formData.discountedPrice]);

  // Submit Logic
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      const payload = new FormData();

      // 1. Basic Fields
      payload.append("title", formData.title);
      payload.append("brand", formData.brand);
      payload.append("description", formData.description);
      // payload.append("price", formData.price); // Removed
      // payload.append("discountedPrice", formData.discountedPrice); // Removed
      payload.append("discountedPercent", formData.discountPercentage);
      payload.append("quantity", 0); // Aggregate quantity later if needed
      payload.append(
        "category",
        formData.thirdLevelCategory || formData.secondLevelCategory || ""
      );
      payload.append("topLevelCategory", formData.topLevelCategory || "");
      payload.append("secondLevelCategory", formData.secondLevelCategory || "");
      payload.append("thirdLevelCategory", formData.thirdLevelCategory || "");

      // 2. Main Images (Use First Variant's images as Main Images)
      if (variants[0]?.files?.length > 0) {
        variants[0].files.forEach((f) => payload.append("images", f));
      }

      // 3. Variants
      const variantsData = variants.map((v) => {
        // Convert stock array to Map-like object for backend
        const stockMap = {};
        v.stock.forEach((item) => {
          if (item.size) stockMap[item.size] = Number(item.quantity) || 0;
        });

        return {
          color: v.color,
          hex: v.hex,
          price: Number(v.basePrice) || Number(formData.discountedPrice), // Renamed basePrice to price
          stock: stockMap,
        };
      });

      payload.append("variants", JSON.stringify(variantsData));

      // 4. Variant Images
      variants.forEach((v, index) => {
        if (v.files && v.files.length > 0) {
          v.files.forEach((f) => {
            payload.append(`variantImages_${index}`, f);
          });
        }
      });

      if (isEditing) {
        payload.append("productId", formData._id);
        await dispatch(updateProduct(payload));
        setSuccessMessage("Product Updated!");
      } else {
        await dispatch(createProduct(payload));
        setSuccessMessage("Product Created Successfully!");

        // Reset
        setFormData({
          _id: null,
          title: "",
          brand: "",
          description: "",
          price: "",
          discountedPrice: "",
          discountPercentage: "",
          topLevelCategory: "",
          secondLevelCategory: "",
          thirdLevelCategory: "",
        });

        setVariants([
          {
            color: "",
            hex: "#000000",
            basePrice: "",
            files: [],
            previews: [],
            stock: [{ size: "S", quantity: 0 }],
          },
        ]);
      }
      setSuccess(true);
    } catch (err) {
      console.error(err);
      setSuccessMessage(err.message || "Failed to save product.");
    } finally {
      setLoading(false);
    }
  };

  // Edit Handler
  const handleEdit = () => {
    // Navigate to update page with the current product data
    // We can reconstruction the product object or pass what we have
    // If productToUpdate is available from location, pass it.
    // Or pass the formData + variants which we have in state.
    // Ideally update page expects the full product object structure.
    // Let's rely on productToUpdate if available, or construct basic one.
    if (productToUpdate) {
      navigate("/admin/update-product", {
        state: { product: productToUpdate },
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-zinc-950 min-h-screen text-gray-200">
      <h1 className="text-3xl font-bold mb-8 text-white">
        {readOnly
          ? "Product Details"
          : isEditing
          ? "Update Product"
          : "Add New Product"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* --- Global Details Section --- */}
        <section className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
          <h2 className="text-xl font-semibold mb-6 text-indigo-400">
            Basic Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm mb-2 text-gray-400">
                Product Title
              </label>
              <input
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full bg-black/50 border border-zinc-700 rounded-lg px-4 py-3 focus:border-indigo-500 outline-none transition disabled:opacity-50"
                placeholder="e.g. Mens Cotton Jacket"
                required
                disabled={readOnly}
              />
            </div>
            <div>
              <label className="block text-sm mb-2 text-gray-400">Brand</label>
              <input
                name="brand"
                value={formData.brand}
                onChange={handleInputChange}
                className="w-full bg-black/50 border border-zinc-700 rounded-lg px-4 py-3 focus:border-indigo-500 outline-none transition disabled:opacity-50"
                placeholder="e.g. Nike"
                disabled={readOnly}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm mb-2 text-gray-400">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full bg-black/50 border border-zinc-700 rounded-lg px-4 py-3 focus:border-indigo-500 outline-none transition disabled:opacity-50"
                disabled={readOnly}
              />
            </div>
          </div>

          {/* Categories */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <select
              name="topLevelCategory"
              value={formData.topLevelCategory}
              onChange={handleInputChange}
              className="w-full bg-black/50 border border-zinc-700 rounded-lg px-4 py-3 disabled:opacity-50"
              disabled={readOnly}
            >
              <option value="">-- Top Category --</option>
              {Object.keys(categoryHierarchy || {}).map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>

            <select
              name="secondLevelCategory"
              value={formData.secondLevelCategory}
              onChange={handleInputChange}
              disabled={readOnly || !secondLevelOptions.length}
              className="w-full bg-black/50 border border-zinc-700 rounded-lg px-4 py-3 disabled:opacity-50"
            >
              <option value="">-- Sub Category --</option>
              {secondLevelOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Global Pricing */}
          <div className="grid grid-cols-3 gap-6 mt-6">
            <div>
              <label className="block text-sm mb-2 text-gray-400">
                Original Price
              </label>
              <input
                name="price"
                type="number"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full bg-black/50 border border-zinc-700 rounded-lg px-4 py-3 disabled:opacity-50"
                disabled={readOnly}
              />
            </div>
            <div>
              <label className="block text-sm mb-2 text-gray-400">
                Discounted Price
              </label>
              <input
                name="discountedPrice"
                type="number"
                value={formData.discountedPrice}
                onChange={handleInputChange}
                className="w-full bg-black/50 border border-zinc-700 rounded-lg px-4 py-3 disabled:opacity-50"
                disabled={readOnly}
              />
            </div>
            <div>
              <label className="block text-sm mb-2 text-gray-400">
                Discount %
              </label>
              <input
                value={formData.discountPercentage}
                readOnly
                className="w-full bg-zinc-800 border-zinc-700 border rounded-lg px-4 py-3 text-zinc-400 cursor-not-allowed"
              />
            </div>
          </div>
        </section>

        {/* --- Variants Section --- */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-white flex justify-between items-center">
            Variants
            {!readOnly && (
              <button
                type="button"
                onClick={addVariant}
                className="text-sm bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200 transition font-bold"
              >
                + Add Variant
              </button>
            )}
          </h2>

          {variants.map((variant, vIndex) => (
            <div
              key={vIndex}
              className="bg-zinc-900 p-6 rounded-xl border border-zinc-700 relative"
            >
              {!readOnly && (
                <button
                  type="button"
                  onClick={() => removeVariant(vIndex)}
                  className="absolute top-4 right-4 text-red-500 hover:text-red-400 font-bold"
                >
                  Remove
                </button>
              )}

              <h3 className="text-lg font-semibold mb-4 text-gray-300">
                Variant #{vIndex + 1}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="block text-sm mb-1 text-gray-400">
                    Color Name
                  </label>
                  <input
                    value={variant.color}
                    onChange={(e) =>
                      handleVariantChange(vIndex, "color", e.target.value)
                    }
                    placeholder="Red, Blue..."
                    className="w-full bg-black/50 border border-zinc-700 rounded px-3 py-2 disabled:opacity-50"
                    disabled={readOnly}
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1 text-gray-400">
                    Hex Code
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={variant.hex}
                      onChange={(e) =>
                        handleVariantChange(vIndex, "hex", e.target.value)
                      }
                      className="h-10 w-14 bg-transparent cursor-pointer rounded overflow-hidden disabled:opacity-50"
                      disabled={readOnly}
                    />
                    <input
                      value={variant.hex}
                      onChange={(e) =>
                        handleVariantChange(vIndex, "hex", e.target.value)
                      }
                      className="w-full bg-black/50 border border-zinc-700 rounded px-3 py-2 uppercase disabled:opacity-50"
                      disabled={readOnly}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm mb-1 text-gray-400">
                    Variant Price (Optional)
                  </label>
                  <input
                    type="number"
                    value={variant.basePrice}
                    onChange={(e) =>
                      handleVariantChange(vIndex, "basePrice", e.target.value)
                    }
                    placeholder="Override base price"
                    className="w-full bg-black/50 border border-zinc-700 rounded px-3 py-2 disabled:opacity-50"
                    disabled={readOnly}
                  />
                </div>
              </div>

              {/* Variant Images */}
              <div className="mb-6">
                <label className="block text-sm mb-2 text-gray-400">
                  Variant Images
                </label>
                {!readOnly && (
                  <input
                    type="file"
                    multiple
                    onChange={(e) => handleVariantFileChange(vIndex, e)}
                    className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-500 cursor-pointer"
                  />
                )}
                <div className="flex gap-3 mt-3">
                  {variant.previews.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      className="w-16 h-16 object-cover rounded border border-zinc-600"
                      alt="var"
                    />
                  ))}
                </div>
              </div>

              {/* Stock Grid */}
              <div className="bg-black/20 p-4 rounded-lg">
                <h4 className="text-sm font-semibold mb-3 text-gray-400">
                  Size & Stock
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {variant.stock.map((stk, sIndex) => (
                    <div key={sIndex} className="flex gap-2 items-center">
                      <input
                        placeholder="Size (S, M...)"
                        value={stk.size}
                        onChange={(e) =>
                          handleStockChange(
                            vIndex,
                            sIndex,
                            "size",
                            e.target.value
                          )
                        }
                        className="w-20 bg-zinc-800 border border-zinc-600 rounded px-2 py-1 text-center disabled:opacity-50"
                        disabled={readOnly}
                      />
                      <input
                        type="number"
                        placeholder="Qty"
                        value={stk.quantity}
                        onChange={(e) =>
                          handleStockChange(
                            vIndex,
                            sIndex,
                            "quantity",
                            e.target.value
                          )
                        }
                        className="w-20 bg-zinc-800 border border-zinc-600 rounded px-2 py-1 text-center disabled:opacity-50"
                        disabled={readOnly}
                      />
                      {!readOnly && (
                        <button
                          type="button"
                          onClick={() => removeStockRow(vIndex, sIndex)}
                          className="text-zinc-500 hover:text-red-500"
                        >
                          x
                        </button>
                      )}
                    </div>
                  ))}
                  {!readOnly && (
                    <button
                      type="button"
                      onClick={() => addStockRow(vIndex)}
                      className="text-xs border border-zinc-600 text-zinc-400 px-3 py-1 rounded hover:bg-zinc-800"
                    >
                      + Add Size
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </section>

        <div className="fixed bottom-6 right-6 flex gap-4">
          {success && (
            <div className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-xl animate-bounce">
              {successMessage}
            </div>
          )}

          {readOnly ? (
            <button
              type="button"
              onClick={handleEdit}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 px-10 rounded-full shadow-2xl transition transform hover:scale-105"
            >
              Edit Product
            </button>
          ) : (
            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 px-10 rounded-full shadow-2xl transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading
                ? "Processing..."
                : isEditing
                ? "Update Product"
                : "Create Product"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;
