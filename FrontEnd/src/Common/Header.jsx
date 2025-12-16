import React from 'react'
import { HeaderNavigation } from '../Navigation/HeaderNavigations'
import { RiArrowDropDownLine } from "react-icons/ri";

function Header() {
  return (
    <>
      <div className="w-full bg-black text-white text-center py-2">
        <span className="hover:text-gray-400 cursor-pointer">
          up to 80 % off
        </span>
      </div>

      <div className="flex justify-between w-[1000px] mx-auto py-3">
        <div>VV</div>
        <div>Icons</div>
      </div>

      <div className="w-full bg-[#252525]">
        <div className="text-white  flex gap-7 max-w-[1150px] mx-auto">
          {HeaderNavigation.map((data) => (
            <div key={data.id} className="relative group">
              {/* Title */}
              <h1 className="cursor-pointer py-2 group">
                {/* Row */}
                <div className="flex justify-between items-center">
                  <span>{data.title}</span>

                  <span className="text-[22px] transition-transform duration-300 group-hover:rotate-180">
                    <RiArrowDropDownLine />
                  </span>
                </div>

                {/* Underline */}
                <div className="h-[2px] w-0 bg-[#F4F4F4] mt-[1px]  ml-3 mr-3 transition-all duration-300 group-hover:w-[70%]"></div>
              </h1>

              {/* Subheading */}
              {data.subHeading && (
                <div className="absolute left-0 top-[36px]  mt-2 hidden group-hover:block bg-white text-black w-56 shadow-lg z-50">
                  {data.subHeading.map((sub) => (
                    <p
                      key={sub.id}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {sub.title}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Header
