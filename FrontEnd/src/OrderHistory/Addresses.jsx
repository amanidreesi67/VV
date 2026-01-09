import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Addresses = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    address1: "",
    address2: "",
    city: "",
    country: "India",
    zip: "",
    phone: "",
    isDefault: false,
  });

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Address Submitted:", formData);
    alert("Address added successfully (Logic pending backend integration)");
    setShowForm(false);
  };

  return (
    <div className="max-w-[1390px] mx-auto px-4 py-8 animate-fade-in">
      <h1 className="text-3xl font-serif text-center mb-2">Your Addresses</h1>
      <div className="flex justify-center text-sm text-gray-500 mb-12 gap-2">
        <Link to="/" className="hover:text-black">
          Home
        </Link>
        <span>&gt;</span>
        <Link to="/orders" className="hover:text-black">
          Account
        </Link>
        <span>&gt;</span>
        <span>Addresses</span>
      </div>

      <div className="flex flex-col md:flex-row gap-12">
        {/* Sidebar */}
        <div className="w-full md:w-64 shrink-0">
          <div className="flex flex-col border-l-2 border-transparent">
            <Link
              to="/orders"
              className="pl-4 py-2 text-gray-500 hover:text-black transition-colors"
            >
              Dashboard
            </Link>
            <Link
              to="/account/addresses"
              className="pl-4 py-2 font-bold text-black border-l-2 border-black -ml-[2px]"
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
          <h2 className="text-2xl font-serif mb-6">Your Addresses (0)</h2>

          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
              className="bg-black text-white px-8 py-3 font-bold text-sm tracking-wide hover:opacity-90 transition-opacity"
            >
              Add a New Address
            </button>
          ) : (
            <div className="bg-gray-50 p-6 rounded-lg max-w-3xl">
              <h3 className="text-xl font-medium mb-6">Add a New Address</h3>
              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-black"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-600 mb-1">
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-black"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-600 mb-1">
                    Address 1
                  </label>
                  <input
                    type="text"
                    name="address1"
                    value={formData.address1}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-black"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-600 mb-1">
                    Address 2
                  </label>
                  <input
                    type="text"
                    name="address2"
                    value={formData.address2}
                    onChange={handleChange}
                    className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Country
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-black bg-white"
                  >
                    <option value="India">India</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Zip/Postal Code
                  </label>
                  <input
                    type="text"
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-black"
                  />
                </div>

                <div className="md:col-span-2 flex items-center gap-2 mt-2">
                  <input
                    type="checkbox"
                    id="isDefault"
                    name="isDefault"
                    checked={formData.isDefault}
                    onChange={handleChange}
                    className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
                  />
                  <label
                    htmlFor="isDefault"
                    className="text-sm text-gray-700 cursor-pointer"
                  >
                    Set as default address
                  </label>
                </div>

                <div className="md:col-span-2 flex gap-4 mt-6">
                  <button
                    type="submit"
                    className="bg-black text-white px-6 py-2 rounded font-bold hover:opacity-90"
                  >
                    Add Address
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="text-gray-600 hover:text-black font-medium px-4 py-2"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Addresses;
