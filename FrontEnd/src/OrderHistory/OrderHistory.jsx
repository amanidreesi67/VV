import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaPlus, FaCheck } from "react-icons/fa";

const OrderHistory = () => {
  const navigate = useNavigate();
  const [showCreditsInfo, setShowCreditsInfo] = useState(false);
  const [user, setUser] = useState({ firstName: "", lastName: "", email: "" });

  useEffect(() => {
    // Fetch user details from localStorage or Redux if available
    // For now, mocking or reading from a stored user object if you have one
    // Ideally this comes from Redux store: state.auth.user
    // Fallback to dummy data matching screenshot if not found
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    } else {
      // Placeholder if no user data found (though user should be logged in)
      setUser({ firstName: "User", lastName: "", email: "user@example.com" });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload(); // Simple way to reset state/header
  };

  return (
    <div className="max-w-[1390px] mx-auto px-4 py-8 animate-fade-in">
      <h1 className="text-3xl font-serif text-center mb-2">My Account</h1>
      <div className="flex justify-center text-sm text-gray-500 mb-12 gap-2">
        <Link to="/" className="hover:text-black">
          Home
        </Link>
        <span>&gt;</span>
        <span>Account</span>
      </div>

      <div className="flex flex-col md:flex-row gap-12">
        {/* Sidebar */}
        <div className="w-full md:w-64 shrink-0">
          <div className="flex flex-col border-l-2 border-transparent">
            <Link
              to="/orders"
              className="pl-4 py-2 font-bold text-black border-l-2 border-black -ml-[2px]"
            >
              Dashboard
            </Link>
            <Link
              to="/account/addresses"
              className="pl-4 py-2 text-gray-500 hover:text-black transition-colors"
            >
              Addresses
            </Link>
            <button
              onClick={handleLogout}
              className="pl-4 py-2 text-gray-500 hover:text-black transition-colors text-left"
            >
              Log Out
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <p className="mb-6 text-gray-600">
            Hello (not ?{" "}
            <button
              onClick={handleLogout}
              className="underline text-gray-800 hover:text-black"
            >
              Log Out
            </button>
            )
          </p>

          <button className="bg-[#9c27b0] text-white px-6 py-2 rounded font-semibold hover:bg-[#7b1fa2] transition-colors mb-4">
            Show my Credits
          </button>

          <div className="mb-8">
            <button
              onClick={() => setShowCreditsInfo(!showCreditsInfo)}
              className="w-full flex justify-between items-center bg-[#f3e5f5] p-4 rounded text-[#9c27b0] font-medium"
            >
              <span>How to use the credits??</span>
              <span>{showCreditsInfo ? "-" : "+"}</span>
            </button>
            {showCreditsInfo && (
              <div className="bg-[#f3e5f5] px-4 pb-4 text-sm text-gray-700">
                <p>Credits can be used on checkout...</p>
              </div>
            )}
          </div>

          <h2 className="text-2xl font-serif mb-4">Order History</h2>
          <div className="bg-[#e8f5e9] border border-[#c8e6c9] text-[#2e7d32] px-4 py-3 rounded flex items-center gap-2 mb-12">
            <FaCheck size={12} />
            <span className="text-sm border-b border-[#2e7d32]">
              Make your first order.
            </span>
            <span className="text-sm">You haven't placed any orders yet.</span>
          </div>

          <h2 className="text-2xl font-serif mb-4">Account Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 max-w-2xl border-b border-gray-200 pb-8 mb-8">
            <div>
              <h3 className="text-sm font-bold mb-1">Name</h3>
              <p className="text-gray-600">
                {user.firstName} {user.lastName}
              </p>
            </div>
            <div>
              {/* Empty for layout balance if needed, or remove grid */}
            </div>
            <div>
              <h3 className="text-sm font-bold mb-1">Email</h3>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>

          <Link to="/account/addresses">
            <button className="bg-black text-white px-8 py-3 font-bold text-sm tracking-wide hover:opacity-90 transition-opacity">
              View Addresses (0)
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
