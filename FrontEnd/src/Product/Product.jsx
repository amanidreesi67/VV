import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FiFilter, FiX } from "react-icons/fi";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { findProducts } from "../Redux/Customers/Product/action";
import ProductCard from "./ProductCard";
import QuickViewModal from "./QuickViewModal";

function Product() {
  const navigate = useNavigate();
  const location = useLocation();
  const { levelOne, levelTwo, LevelThree } = useParams();
  const dispatch = useDispatch();
  const { products } = useSelector((store) => store.product);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const decodedQueryString = decodeURIComponent(location.search);
  const searchParams = new URLSearchParams(decodedQueryString);
  const colorValue = searchParams.get("colors");
  const priceValue = searchParams.get("price");
  const discount = searchParams.get("minDiscount");
  const sortValue = searchParams.get("sort");
  const pageNumber = searchParams.get("pageNumber") || 1;
  const stock = searchParams.get("stock");

  // Get Sort Option Label
  const getSortLabel = () => {
    if (sortValue === "price_low") return "Price, low to high";
    if (sortValue === "price_high") return "Price, high to low";
    if (sortValue === "newest") return "Date, new to old";
    return "Featured";
  };

  const [sortBy, setSortBy] = useState(getSortLabel());

  const sortOptions = [
    { label: "Featured", value: "" },
    { label: "Price, low to high", value: "price_low" },
    { label: "Price, high to low", value: "price_high" },
    { label: "Date, new to old", value: "newest" },
  ];

  const handleFilter = (value, sectionId) => {
    const searchParams = new URLSearchParams(location.search);
    let filterValue = searchParams.getAll(sectionId);

    if (filterValue.length > 0 && filterValue[0].split(",").includes(value)) {
      filterValue = filterValue[0].split(",").filter((item) => item !== value);
      if (filterValue.length === 0) {
        searchParams.delete(sectionId);
      } else {
        searchParams.set(sectionId, filterValue.join(","));
      }
    } else {
      filterValue.push(value);
      searchParams.set(sectionId, filterValue.join(","));
    }
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };

  // Handle Price and Radio Filters (Single Select logic for some, but here we treat as checklist or ranges)
  const handleRadioFilterChange = (e, sectionId) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set(sectionId, e.target.value);
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };

  useEffect(() => {
    const [minPrice, maxPrice] =
      priceValue === null ? [0, 100000] : priceValue.split("-").map(Number);

    // Parse category from URL
    const queryCategory = searchParams.get("category");
    const paramCategory = LevelThree || levelTwo || levelOne || "";
    // Priority: Query Param > Path Param
    const categoryToUse = queryCategory || paramCategory;

    const data = {
      category: categoryToUse,
      colors: colorValue || [],
      sizes: searchParams.get("size") || [],
      minPrice,
      maxPrice,
      minDiscount: discount || 0,
      sort: sortValue || "price_low",
      pageNumber: pageNumber - 1,
      pageSize: 12,
      stock: stock,
    };
    dispatch(findProducts(data));
  }, [
    levelOne,
    levelTwo,
    LevelThree,
    colorValue,
    priceValue,
    discount,
    sortValue,
    pageNumber,
    stock,
    location.search, // Re-run on any URL change
  ]);

  return (
    <div className=" min-h-screen bg-white relative p-5">
      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}

      {/* Top Bar */}
      <div className="bg-[#E5E5E5] rounded-2xl sticky top-0 z-30 px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => setIsFilterOpen(true)}
          className="flex items-center cursor-pointer gap-2 font-medium text-gray-700 hover:text-black transition-colors"
        >
          <FiFilter size={20} />
          <span>Filter</span>
        </button>

        <div className="relative">
          <button
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="flex items-center cursor-pointer gap-2 text-sm text-gray-700 hover:text-black"
          >
            <span>Sort by : </span>
            <span className="font-medium flex items-center gap-1">
              {sortBy} {isSortOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </span>
          </button>

          {/* Sort Dropdown */}
          {isSortOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-[#E5E5E5]/90 backdrop-blur-sm shadow-lg rounded-md overflow-hidden z-30 py-2">
              {sortOptions.map((option) => (
                <button
                  key={option.label}
                  onClick={() => {
                    setSortBy(option.label);
                    setIsSortOpen(false);
                    // Update URL params
                    const searchParams = new URLSearchParams(location.search);
                    searchParams.set("sort", option.value);
                    navigate({ search: `?${searchParams.toString()}` });
                  }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-white/50 transition-colors ${
                    sortBy === option.label
                      ? "text-black font-medium"
                      : "text-gray-500"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Backdrop */}
      {isFilterOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-90 transition-opacity duration-300 backdrop-blur-sm"
          onClick={() => setIsFilterOpen(false)}
        />
      )}

      {/* Slide-out Filter Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white/80 backdrop-blur-md z-9999 transform transition-transform duration-300 ease-in-out shadow-2xl ${
          isFilterOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col bg-[#E5E5E5]">
          {/* Sidebar Header */}
          <div className="p-5 flex justify-between items-center">
            <h2 className="text-xl font-bold">Filters</h2>
            <button
              onClick={() => setIsFilterOpen(false)}
              className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500"
            >
              <FiX size={24} />
            </button>
          </div>

          {/* Sidebar Content (Scrollable) */}
          <div className="flex-1 overflow-y-auto px-6 py-2 space-y-8 custom-scrollbar">
            {/* Color Section */}
            <div>
              <div className="flex items-center justify-between mb-4 cursor-pointer">
                <h3 className="font-bold text-sm uppercase">Color</h3>
                <IoIosArrowUp />
              </div>
              <div className="space-y-3 max-h-[280px] overflow-y-auto p-2 pr-2 custom-scrollbar">
                {[
                  { name: "Beige", color: "#F5F5DC" },
                  { name: "Black", color: "#000000" },
                  { name: "Blue", color: "#3B82F6" },
                  { name: "Brown", color: "#A52A2A" },
                  { name: "Green", color: "#22C55E" },
                  { name: "Grey", color: "#808080" },
                  { name: "Maroon", color: "#800000" },
                  { name: "Multi", type: "multi" },
                  { name: "Mustard", color: "#FFDB58" },
                  { name: "Orange", color: "#FFA500" },
                  { name: "Pink", color: "#FFC0CB" },
                  { name: "Purple", color: "#800080" },
                  { name: "Red", color: "#FF0000" },
                  { name: "White", color: "#FFFFFF" },
                  { name: "Yellow", color: "#FFFF00" },
                ].map((item) => (
                  <div
                    key={item.name}
                    onClick={() => handleFilter(item.name, "colors")}
                    className="flex items-center gap-3 group cursor-pointer"
                  >
                    <div className="relative group/swatch">
                      {item.type === "multi" ? (
                        <div
                          className={`w-6 h-6 rounded-full bg-linear-to-r from-yellow-400 via-red-500 to-blue-500 shadow-sm border border-gray-300 transition-all ${
                            colorValue?.includes(item.name)
                              ? "ring-2 ring-black"
                              : ""
                          }`}
                        ></div>
                      ) : (
                        <div
                          className={`w-6 h-6 rounded-full shadow-sm border border-gray-300 transition-all ${
                            colorValue?.includes(item.name)
                              ? "ring-2 ring-black"
                              : ""
                          }`}
                          style={{ backgroundColor: item.color }}
                        ></div>
                      )}
                    </div>
                    <span
                      className={`text-[15px] group-hover:text-black ${
                        colorValue?.includes(item.name)
                          ? "font-bold"
                          : "text-gray-600"
                      }`}
                    >
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Section */}
            <div>
              <div className="flex items-center justify-between mb-4 cursor-pointer">
                <h3 className="font-bold text-sm uppercase">Price</h3>
                <IoIosArrowUp />
              </div>
              <div className="space-y-3">
                {[
                  { label: "₹500 - ₹1000", value: "500-1000" },
                  { label: "₹1000 - ₹1500", value: "1000-1500" },
                  { label: "₹1500 - ₹2000", value: "1500-2000" },
                  { label: "More than ₹2000", value: "2000-100000" },
                ].map((item) => (
                  <label
                    key={item.value}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <input
                      type="radio"
                      name="price"
                      value={item.value}
                      onChange={(e) => handleRadioFilterChange(e, "price")}
                      checked={priceValue === item.value}
                      className="w-5 h-5 border-gray-400 rounded bg-transparent checked:bg-black checked:border-black"
                    />
                    <span
                      className={`text-[15px] group-hover:text-black ${
                        priceValue === item.value
                          ? "text-black font-medium"
                          : "text-gray-600"
                      }`}
                    >
                      {item.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Category Section */}
            <div>
              <div className="flex items-center justify-between mb-4 cursor-pointer">
                <h3 className="font-bold text-sm uppercase">Category</h3>
                <IoIosArrowUp />
              </div>
              <div className="space-y-3">
                {[
                  { label: "Bottoms", value: "Bottoms" }, // Ensure values match DB strings (case sensitive often)
                  { label: "Dresses", value: "Dresses" },
                  { label: "Jumpsuits", value: "Jumpsuits" },
                  { label: "Maxi Dress", value: "maxi-dress" }, // Guessing value
                  { label: "Skirts", value: "Skirts" },
                  { label: "Tops", value: "Tops" },
                  { label: "Men", value: "Men" },
                  { label: "Women", value: "Women" },
                ].map((item) => (
                  <label
                    key={item.label}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      value={item.value}
                      onChange={() => handleFilter(item.value, "category")}
                      checked={searchParams
                        .getAll("category")
                        .join(",")
                        .includes(item.value)}
                      className="w-5 h-5 border-gray-400 rounded bg-transparent checked:bg-black checked:border-black"
                    />
                    <span
                      className={`text-[15px] group-hover:text-black ${
                        searchParams
                          .getAll("category")
                          .join(",")
                          .includes(item.value)
                          ? "text-black font-medium"
                          : "text-gray-600"
                      }`}
                    >
                      {item.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Discount Section */}
            <div>
              <div className="flex items-center justify-between mb-4 cursor-pointer">
                <h3 className="font-bold text-sm uppercase">Discount</h3>
                <IoIosArrowUp />
              </div>
              <div className="space-y-3 pb-8">
                {[
                  { label: "Up to 10%", value: "10" },
                  { label: "20% and above", value: "20" }, // Adjusted label
                  { label: "40% and above", value: "40" },
                ].map((item) => (
                  <label
                    key={item.label}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <input
                      type="radio"
                      name="minDiscount"
                      value={item.value}
                      onChange={(e) =>
                        handleRadioFilterChange(e, "minDiscount")
                      }
                      checked={discount === item.value}
                      className="w-5 h-5 border-gray-400 rounded bg-transparent checked:bg-black checked:border-black"
                    />
                    <span
                      className={`text-[15px] group-hover:text-black ${
                        discount === item.value
                          ? "text-black font-medium"
                          : "text-gray-600"
                      }`}
                    >
                      {item.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="px-6 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products?.content?.map((product) => (
            <ProductCard
              key={product._id || product.id}
              product={product}
              onQuickView={setQuickViewProduct}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Product;
