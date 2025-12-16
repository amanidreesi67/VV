import React from "react";
import Header from "./Common/Header";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Autoplay, Pagination } from "swiper/modules";
import { HeroSectionSwiper } from "./Navigation/HeroSectionImg";

function Home() {
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 3500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
        renderBullet: function (index, className) {
          return `<span class="${className}">
            <svg class="autoplay-progress" viewBox="0 0 48 48">
              <circle cx="24" cy="24" r="20"></circle>
            </svg>
          </span>`;
        },
      }}
      navigation={true}
      modules={[Autoplay, Pagination]}
      className="w-full h-[1200px]"
    >
      {HeroSectionSwiper.map((data) => (
        <SwiperSlide key={data.id} className="relative">
          <img
            src={data.img}
            alt={data.title}
            className="w-full h-[1200px] object-cover "
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Home;
