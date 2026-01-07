import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  FaFacebookF,
  FaPinterestP,
  FaTwitter,
  FaWhatsapp,
  FaArrowLeft,
} from "react-icons/fa";

const BlogDetails = () => {
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Mock data for the specific blog post (ID 1)
  const blogPost = {
    id: 1,
    title: "5 Outfit Tricks That Make You Look Taller (No Heels Needed)",
    author: "SHIVANI AGARWAL",
    date: "Nov 06, 2025",
    content: [
      {
        type: "intro",
        text: "Looking taller isn’t just about heels - it’s about smart styling. Whether you’re 5’0 or 5’7, these simple outfit tweaks can elongate your frame, balance proportions, and make you look effortlessly put-together (without ever reaching for stilettos).",
      },
      {
        type: "section",
        title: "1. Go Monochrome - One Shade, Endless Length",
        text: "Wearing a single colour head-to-toe creates an uninterrupted visual line that instantly adds height. Try Uptownie’s co-ord sets in pastel shades or earthy tones - they’re already perfectly matched, so you don’t have to overthink pairing. Bonus: they photograph beautifully.",
        shopLink: "Shop: Co-ord Sets",
        shopUrl: "/pdt/co-ord-sets",
      },
      {
        type: "section",
        title: "2. High-Waist Everything",
        text: "High-waist skirts or pants visually stretch your legs by starting higher up. Pair a high-waist skirt with a cropped or tucked-in top - Uptownie’s cotton and crepe skirts are light, structured and just right for work or brunch.",
        shopLink: "Shop: Skirts",
        shopUrl: "/pdt/women-skirts",
      },
      {
        type: "section",
        title: "3. Keep It Cropped (Tops, Not Jeans!)",
        text: "Cropped tops or shirts that hit right at your waistline make your legs look longer. Our cropped shirts and peplum tops are tailored to highlight your natural waist without showing too much skin - perfect for that taller, sleeker silhouette.",
        shopLink: "Shop: Tops & Shirts",
        shopUrl: "/pdt/women-tops",
      },
      {
        type: "section",
        title: "4. Vertical Prints & Streamlined Silhouettes",
        text: "Avoid wide horizontal prints - they cut your height visually. Instead, choose vertical stripes, button-downs, or sleek A-line dresses. Uptownie’s printed shirt dresses and flowy midis are designed to elongate your frame while keeping things comfy.",
        shopLink: "Shop: Dresses",
        shopUrl: "/pdt/women-dresses",
      },
      {
        type: "section",
        title: "5. Smart Layering with Shrugs & Jackets",
        text: "Long shrugs or structured jackets create clean lines that lengthen your look. Our cotton shrugs and overlay jackets are lightweight, breezy, and ideal for layering during transitional weather - they add polish without bulk.",
        shopLink: "Shop: Shrugs & Jackets",
        shopUrl: "/pdt/shrugs",
      },
    ],
    tips: "When in doubt, tuck it in, belt it up, and keep proportions balanced. You’ll be surprised how these tiny styling tweaks can make you look taller and more confident - heels or no heels.",
    products: [
      { name: "Cotton Shorts and Shirt Set", url: "#" },
      { name: "Collar Buttoned Down Printed Shirt Maxi Dress", url: "#" },
      { name: "Cotton Sequinned Midi Dress", url: "#" },
      { name: "Printed Cotton Stretchable Draped Crop Top", url: "#" },
    ],
    tags: [
      "everyday fashion",
      "flattering outfits",
      "genz fashion",
      "global trend",
      "Outfit Ideas",
      "outfittricks",
      "Style Guide",
      "uptowniefashion",
    ],
  };

  const relatedArticles = [
    {
      id: 2,
      category: "GENZ FASHION",
      date: "NOVEMBER 06, 2025",
      title:
        "How to Buy Dresses That Don't Require a Visit to Your Darji - Look for These 5 Things",
      image:
        "https://uptownie.com/cdn/shop/articles/11_0aef25e4-f303-4621-b78b-bddf21617510_540x.png?v=1762424044",
    },
    {
      id: 3,
      category: "ANIMAL PRINT OUTFIT",
      date: "NOVEMBER 06, 2025",
      title:
        "Animal Print Is the Neutral You Didn't Know You Need — But You Do",
      image:
        "https://uptownie.com/cdn/shop/articles/default7_2_c2465c5e-f2b3-433c-bf76-1edf46dd089c_540x.jpg?v=1762423551",
    },
    {
      id: 4,
      category: "INDIANFASHIONTREND",
      date: "NOVEMBER 06, 2025",
      title: "Monsoon Outfit Guide: What to Wear (and What to Avoid)",
      image:
        "https://uptownie.com/cdn/shop/articles/website_2_for_1900_shirt_revamp_249bda04-14c0-46e2-bb13-bc9c252de6b2_540x.png?v=1762421447",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:py-16 animate-fade-in font-sans">
      {/* Breadcrumbs */}
      <div className="text-gray-500 text-sm breadcrumbs text-center mb-4 uppercase tracking-wider">
        <Link to="/" className="hover:text-gray-900">
          Home
        </Link>
        <span className="mx-2">{` > `}</span>
        <Link to="/blog" className="hover:text-gray-900">
          Blog
        </Link>
      </div>

      {/* Header */}
      <div className="text-center mb-12">
        <p className="text-xs font-bold tracking-widest uppercase text-gray-800 mb-4">
          BLOG
        </p>
        <h1 className="text-3xl md:text-5xl font-normal mb-4 font-serif text-gray-900 leading-tight">
          {blogPost.title}
        </h1>
        <p className="text-gray-500 text-sm uppercase tracking-wide">
          by{" "}
          <span className="text-gray-800 font-medium">{blogPost.author}</span>{" "}
          on {blogPost.date}
        </p>
      </div>

      {/* Content */}
      <div className="space-y-12 max-w-7xl mx-auto mb-16">
        {blogPost.content.map((block, index) => (
          <div key={index}>
            {block.type === "intro" && (
              <p className="text-gray-800 leading-relaxed text-base md:text-lg mb-8">
                {block.text}
              </p>
            )}
            {block.type === "section" && (
              <div className="space-y-4">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                  {block.title}
                </h2>
                <p className="text-gray-700 leading-relaxed">{block.text}</p>
                {block.shopLink && (
                  <p className="text-gray-900 font-medium">
                    <Link to={block.shopUrl} className="hover:underline">
                      {block.shopLink}
                    </Link>
                  </p>
                )}
              </div>
            )}
          </div>
        ))}

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Style Tip:</h3>
          <p className="text-gray-700 leading-relaxed">{blogPost.tips}</p>
        </div>

        <div className="space-y-2 pt-4">
          <p className="text-sm font-medium text-gray-900">Products:</p>
          <ul className="text-sm space-y-1">
            {blogPost.products.map((product, idx) => (
              <li key={idx}>
                <a
                  href={product.url}
                  className="text-gray-600 hover:text-gray-900 underline"
                >
                  {product.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-8 flex flex-wrap gap-2 items-center">
          <span className="text-sm font-bold text-gray-900 mr-2">Tags:</span>
          {blogPost.tags.map((tag, idx) => (
            <span
              key={idx}
              className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Social Share */}
        <div className="flex items-center justify-end space-x-6 py-8 border-b border-gray-200">
          <span className="text-sm font-bold text-gray-900">Share:</span>
          <FaFacebookF className="text-gray-500 hover:text-blue-600 cursor-pointer text-lg" />
          <FaPinterestP className="text-gray-500 hover:text-red-600 cursor-pointer text-lg" />
          <FaTwitter className="text-gray-500 hover:text-blue-400 cursor-pointer text-lg" />
          <FaWhatsapp className="text-gray-500 hover:text-green-500 cursor-pointer text-lg" />
        </div>
      </div>

      {/* Navigation */}
      <div className="max-w-7xl mx-auto mb-16 ">
        <Link
          to="/blog"
          className="flex items-center text-gray-600 hover:text-black group"
        >
          <FaArrowLeft className="mr-2 text-sm transition-transform group-hover:-translate-x-1" />
          <div className="text-left">
            <span className="block text-xs uppercase tracking-widest text-gray-400 mb-1">
              PREVIOUS
            </span>
            <span className="font-medium text-sm">
              How to Buy Dresses That Don't Require a Visit to Your Darji - Look
              for These 5 Things
            </span>
          </div>
        </Link>
      </div>

      {/* Related Articles */}
      <div className="text-center mb-12 border-t border-gray-100 pt-12">
        <h2 className="text-2xl font-normal font-serif text-gray-900 mb-12">
          Related Articles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {relatedArticles.map((article) => (
            <div
              key={article.id}
              className="flex flex-col group cursor-pointer"
            >
              <Link to={`/blog/${article.id}`}>
                <div className="overflow-hidden mb-4 rounded-sm">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-48 object-cover transform transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex flex-col space-y-1">
                    <span className="text-[10px] font-bold tracking-widest uppercase text-gray-800">
                      {article.category}
                    </span>
                    <span className="text-[10px] tracking-widest uppercase text-gray-500">
                      {article.date}
                    </span>
                  </div>
                  <h3 className="text-sm font-medium leading-snug text-gray-900 group-hover:text-purple-600 transition-colors">
                    {article.title}
                  </h3>
                  <div className="pt-2">
                    <span className="text-xs text-gray-800 border-b border-gray-800 pb-px hover:text-purple-600 hover:border-purple-600 transition-all">
                      Read more
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
