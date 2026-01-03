import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaPinterest,
  FaFacebook,
  FaInstagram,
  FaSnapchat,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";

function ContactUs() {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-normal mb-4">Contact Us</h1>
        <div className="text-sm text-gray-500 flex justify-center items-center gap-2">
          <span
            className="cursor-pointer hover:text-black transition-colors"
            onClick={() => navigate("/")}
          >
            Home
          </span>
          <span>&gt;</span>
          <span>Contact Us</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        {/* Left Side - Form */}
        <div>
          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Name"
                className="w-full border border-gray-200 p-3 rounded-sm focus:outline-none focus:border-black transition-colors"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full border border-gray-200 p-3 rounded-sm focus:outline-none focus:border-black transition-colors"
              />
            </div>
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full border border-gray-200 p-3 rounded-sm focus:outline-none focus:border-black transition-colors"
            />
            <textarea
              placeholder="Message"
              rows={6}
              className="w-full border border-gray-200 p-3 rounded-sm focus:outline-none focus:border-black transition-colors resize-none"
            ></textarea>

            <div className="flex items-start gap-2">
              <input type="checkbox" id="save-info" className="mt-1" />
              <label htmlFor="save-info" className="text-sm text-gray-600">
                Save my name, email, and website in this browser for the next
                time I comment.
              </label>
            </div>

            <button
              type="submit"
              className="bg-black text-white px-8 py-3 font-medium hover:bg-gray-800 transition-colors uppercase text-sm tracking-wide"
            >
              Submit Now
            </button>
          </form>
        </div>

        {/* Right Side - Info */}
        <div className="space-y-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Office Address</h3>
            <p className="text-gray-600 leading-relaxed max-w-xs">
              6, Alipore Avenue, Kala Bagan, Alipore, Kolkata, West Bengal
              700027
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Information</h3>
            <p className="text-gray-600">+91 97118 87220</p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Social Media</h3>
            <div className="flex gap-4 text-gray-800 text-lg">
              <FaPinterest className="cursor-pointer hover:text-gray-600 transition-colors" />
              <FaFacebook className="cursor-pointer hover:text-gray-600 transition-colors" />
              <FaInstagram className="cursor-pointer hover:text-gray-600 transition-colors" />
              <FaSnapchat className="cursor-pointer hover:text-gray-600 transition-colors" />
              <FaYoutube className="cursor-pointer hover:text-gray-600 transition-colors" />
            </div>
          </div>
        </div>
      </div>

      {/* Floating Whatsapp Button (consistent with design) */}
      <a
        href="https://wa.me/919711887220"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-3 rounded-full shadow-lg hover:bg-[#128C7E] transition-colors"
      >
        <FaWhatsapp size={24} />
      </a>
    </div>
  );
}

export default ContactUs;
