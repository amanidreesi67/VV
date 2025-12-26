import React from "react";
import footerNavigations from "../Navigation/footerNavigations.js";
import {
  FaPinterest,
  FaFacebook,
  FaInstagram,
  FaSnapchat,
  FaYoutube,
} from "react-icons/fa";

function Footer() {
  return (
    <div className="w-full bg-[#E8E8E8] p-15">
      <div className="grid grid-cols-4 gap-4">
        {footerNavigations.map((data) => (
          <div key={data.id} className="flex flex-col ">
            <p className="font-bold">{data.title}</p>
            <br />
            <ul>
              {data.subHeading.map((subData) => (
                <li
                  key={subData.id}
                  className="text-gray-400 hover:text-black cursor-pointer group w-fit"
                >
                  <a href={subData.link}>{subData.title}</a>
                  {/* Underline */}
                  <div className="h-[2px] w-0 bg-black mt-px transition-all duration-300 group-hover:w-full"></div>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="flex flex-col ">
          <p className="font-bold">Get in touch</p>
          <br />
          <ul>
            <li className="text-gray-400 hover:text-black cursor-pointer group w-fit">
              <a href="#">080 6863 5857</a>
            </li>
            <li className="text-gray-400 hover:text-black cursor-pointer group w-fit">
              <a href="#">customerservice@uptownie101.com</a>
            </li>
          </ul>
          <div className="flex gap-4 mt-4 text-gray-500 text-xl">
            <FaPinterest className="hover:text-black cursor-pointer" />
            <FaFacebook className="hover:text-black cursor-pointer" />
            <FaInstagram className="hover:text-black cursor-pointer" />
            <FaSnapchat className="hover:text-black cursor-pointer" />
            <FaYoutube className="hover:text-black cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
