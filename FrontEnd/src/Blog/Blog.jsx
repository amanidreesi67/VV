import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Blog = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const blogPosts = [
    {
      id: 1,
      category: "EVERYDAY FASHION",
      date: "NOVEMBER 06, 2025",
      title: "5 Outfit Tricks That Make You Look Taller (No Heels Needed)",
      excerpt:
        "Who says you need heels to add a few extra inches? With the right cuts, spacing, and styling, you can elongate your frame effortlessl...",
      image:
        "https://uptownie.com/cdn/shop/articles/website_new_in_revamp_a8503093-8c76-4aa3-927e-a154754d44ae_540x.png?v=1762424498",
    },
    {
      id: 2,
      category: "GENZ FASHION",
      date: "NOVEMBER 06, 2025",
      title:
        "How to Buy Dresses That Don’t Require a Visit to Your Darji - Look for These 5 Things",
      excerpt:
        "Perfect fit, no tailor needed! Finding a dress that flatters straight off the rack is easier than you think if you know what details to...",
      image:
        "https://uptownie.com/cdn/shop/articles/11_0aef25e4-f303-4621-b78b-bddf21617510_540x.png?v=1762424044",
    },
    {
      id: 3,
      category: "ANIMAL PRINT OUTFIT",
      date: "NOVEMBER 06, 2025",
      title:
        "Animal Print Is the Neutral You Didn’t Know You Need — But You Do",
      excerpt:
        "Forget everything you thought you knew about animal print — it’s no longer bold, it’s a staple. Here is how to style it for every day...",
      image:
        "https://uptownie.com/cdn/shop/articles/default7_2_c2465c5e-f2b3-433c-bf76-1edf46dd089c_540x.jpg?v=1762423551",
    },
    {
      id: 4,
      category: "INDIANFASHIONTREND",
      date: "NOVEMBER 06, 2025",
      title: "Monsoon Outfit Guide: What to Wear (and What to Avoid)",
      excerpt:
        "Don’t let the rain wash away your style! From flowy fits to splash-proof chic, monsoon fashion is all about comfort and color...",
      image:
        "https://uptownie.com/cdn/shop/articles/website_2_for_1900_shirt_revamp_249bda04-14c0-46e2-bb13-bc9c252de6b2_540x.png?v=1762421447",
    },
    {
      id: 5,
      category: "EVERYDAY FASHION",
      date: "NOVEMBER 06, 2025",
      title:
        "Workwear Doesn’t Have to Be Black Pants and a White Shirt — Break the Mould with Colour and Shape",
      excerpt:
        "Who said office wear has to be boring? It's time to swap the monochrome routine for vibrant cuts and patterns that scream confidence...",
      image:
        "https://uptownie.com/cdn/shop/articles/11_817d5697-2dea-497b-af42-b1179d70d5a2_540x.png?v=1762420294",
    },
    {
      id: 6,
      category: "BODYPOSITIVITY",
      date: "NOVEMBER 06, 2025",
      title: "Gen Z Loves Their Bodies - And You Should Too",
      excerpt:
        "Body confidence isn’t a trend — it’s a revolution, and Gen Z is owning it. Learn how to embrace your shape with Uptownie...",
      image:
        "https://uptownie.com/cdn/shop/articles/Generated_Image_September_29_2025_-_6_36PM_540x.png?v=1762419600",
    },
    {
      id: 7,
      category: "BLOCK PRINTS",
      date: "NOVEMBER 06, 2025",
      title:
        "India’s Having a Moment in Global Fashion — Here’s How to Play Your Part (with Uptownie)",
      excerpt:
        "From runways to street style, India is setting the global fashion mood — vibrant, confident, and rooted in tradition yet modern...",
      image:
        "https://uptownie.com/cdn/shop/articles/7_c566146c-eb6e-4a79-8176-ffd17db61915_540x.png?v=1762417993",
    },
    {
      id: 8,
      category: "FALL FASHION",
      date: "NOVEMBER 06, 2025",
      title:
        "Polka Dots Are the Hottest Fall Trend - Here’s Why You’ll Love Them",
      excerpt:
        "Polka dots are stealing the spotlight this fall! From classic blouses to chic dresses, discover why this print is a must-have...",
      image:
        "https://uptownie.com/cdn/shop/articles/polka_dotted_dress_540x.webp?v=1762418026",
    },
    {
      id: 9,
      category: "FEBRUARY 15, 2019",
      date: "FEBRUARY 15, 2019",
      title: "What to pack for a Weekend Getaway",
      excerpt:
        "To calm the soul and make peace with the unresting life, weekend getaways are the perfect escape...",
      image:
        "https://uptownie.com/cdn/shop/articles/Navy_Georgette_Cape_Top_1_1440x1440_7a32ac32-2ebb-46f4-ad97-fc5421ddb53c_540x.jpeg?v=1550230357",
    },
    {
      id: 10,
      category: "FEBRUARY 15, 2019",
      date: "FEBRUARY 15, 2019",
      title: "New Year Gift Guide",
      excerpt:
        "2019 is already here and there is so much to remember about the 2018 and even more to look forward to...",
      image:
        "https://uptownie.com/cdn/shop/articles/WB_Quotes_1440x1440_7a20bb65-b1be-4445-aa83-e71668b283c1_345x.jpg?v=1550228696",
    },
    {
      id: 11,
      category: "JANUARY 29, 2019",
      date: "JANUARY 29, 2019",
      title: "Looking back at the Best Trends of 2018",
      excerpt:
        "2018 ended but it was a year with a window of hope and fashion for everyone. We saw some amazing trends...",
      image:
        "https://uptownie.com/cdn/shop/articles/1st-FB_540x.jpg?v=1548756607",
    },
    {
      id: 12,
      category: "JANUARY 24, 2019",
      date: "JANUARY 24, 2019",
      title: "5 pieces to invest in this season !",
      excerpt:
        "There are certain clothing items that see no end and it is quintessential to have them in your wardrobe...",
      image:
        "https://uptownie.com/cdn/shop/articles/Black_White_Floral_Print_Boxy_Top_1_1440x1440_ec108e1e-6478-445a-86b9-78163d9dd5ca_540x.jpg?v=1546928918",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 animate-fade-in font-sans">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-normal mb-4 font-serif text-gray-900">
          Blog
        </h1>
        <div className="text-gray-500 text-sm breadcrumbs">
          <Link to="/" className="hover:text-gray-800">
            Home
          </Link>
          <span className="mx-2">›</span>
          <span>Blog</span>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {blogPosts.map((post) => (
          <Link
            key={post.id}
            to={`/blog/${post.id}`}
            className="flex flex-col group cursor-pointer"
          >
            <div className="overflow-hidden mb-4 rounded-sm">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-64 object-cover transform transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/540x600?text=Uptownie+Blog";
                }}
              />
            </div>
            <div className="space-y-2">
              <div className="flex flex-col space-y-1">
                <span className="text-[10px] font-bold tracking-widest uppercase text-gray-800">
                  {post.category}
                </span>
                <span className="text-[10px] tracking-widest uppercase text-gray-500">
                  {post.date}
                </span>
              </div>
              <h3 className="text-base font-medium leading-snug text-gray-900 group-hover:text-purple-600 transition-colors">
                {post.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                {post.excerpt}
              </p>
              <div className="pt-2">
                <span className="text-sm text-gray-800 border-b border-gray-800 pb-px hover:text-purple-600 hover:border-purple-600 transition-all">
                  Read more
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center space-x-2 text-sm font-medium text-gray-600">
        <span className="w-8 h-8 flex items-center justify-center bg-gray-900 text-white rounded-full">
          1
        </span>
        <span className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full cursor-pointer">
          2
        </span>
        <span className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full cursor-pointer">
          3
        </span>
        <span className="px-2">...</span>
        <span className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full cursor-pointer">
          5
        </span>
        <span className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full cursor-pointer text-lg">
          »
        </span>
      </div>
    </div>
  );
};

export default Blog;
