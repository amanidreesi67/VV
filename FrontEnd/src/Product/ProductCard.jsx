import React from "react";
import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const navigate = useNavigate();

  const firstVariant = product.variants?.[0];
  const basePrice = firstVariant?.basePrice || 0;
  const discount = product.discountedPercent || 0;
  const discountedPrice = Math.round(basePrice - (basePrice * discount) / 100);

  return (
    <div
      className="group cursor-pointer"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      {/* Image Container */}
      <div className="relative mb-3 overflow-hidden aspect-3/4">
        <img
          src={firstVariant?.images[0]}
          alt={product.title}
          className={`w-full h-full object-cover transition-all duration-700 ${
            firstVariant?.images[1]
              ? "group-hover:opacity-0 absolute inset-0"
              : "group-hover:scale-105"
          }`}
        />
        {firstVariant?.images[1] && (
          <img
            src={firstVariant.images[1]}
            alt={product.title}
            className="absolute inset-0 w-full h-full object-cover transition-all duration-700 opacity-0 group-hover:opacity-100"
          />
        )}
        {product.badge && (
          <span className="absolute top-2 left-2 bg-black text-white text-[10px] px-2 py-1 font-bold rounded-sm z-10">
            {product.badge}
          </span>
        )}
        {/* Select Options Button */}
        <button className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-[2px] hover:bg-black hover:text-white text-black py-2.5 text-sm font-medium rounded shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-20">
          Select options
        </button>
      </div>

      {/* Product Info */}
      <div>
        <h3 className="text-sm font-medium text-gray-800 mb-1 truncate">
          {product.title}
        </h3>
        <div className="flex items-center gap-2 text-sm mb-2">
          <span className="text-red-500 font-semibold">
            ₹ {discountedPrice.toLocaleString()}
          </span>
          <span className="text-gray-400 line-through text-xs">
            ₹ {basePrice.toLocaleString()}
          </span>
        </div>

        {/* Color Swatches */}
        <div className="flex items-center gap-2">
          {product.variants?.map((variant, index) => (
            <div key={index} className="relative group/swatch">
              <div
                className="w-6 h-6 rounded-full border border-gray-300 transition-all group-hover/swatch:ring-1 group-hover/swatch:ring-offset-2 group-hover/swatch:ring-black cursor-pointer"
                style={{ backgroundColor: variant.hex }}
              ></div>
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-[10px] rounded opacity-0 group-hover/swatch:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 w-auto">
                {variant.color}
                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-black"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
