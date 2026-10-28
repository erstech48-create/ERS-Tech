import React, { useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade } from "swiper/modules";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import TopLeft from "@/../public/assets/images/top-left.png";
import BottomRight from "@/../public/assets/images/bottom-right.png";
import TeamMember from "@/../public/assets/images/abrar.png";
import Image from "next/image";
function ClientsAboutUs({ Heading ,Testimonials}) {
  const nextButtonRef = useRef();
  const prevButtonRef = useRef();

  useEffect(() => {
    const handleMediaQuery = (mq) => {
      if (mq.matches) {
        nextButtonRef.current.style.setProperty("display", "none", "important");
        prevButtonRef.current.style.setProperty("display", "none", "important");
      } else {
        nextButtonRef.current.style.setProperty("right", "-50px", "important");
        prevButtonRef.current.style.setProperty("left", "-50px", "important");
      }
    };

    const mediaQuery = window.matchMedia("(max-width: 600px)");
    handleMediaQuery(mediaQuery);
    mediaQuery.addListener(handleMediaQuery);

    return () => {
      mediaQuery.removeListener(handleMediaQuery);
    };
  }, []);

  return (
    <>
      <Box className="bg-[rgba(222,233,251,0.3)] py-20 xl:px-6 lg:px-6 md:px-6 sm:px-4 xsm:px-2 xxs:px-2 xxxs:px-2">
        <Box className="block text-center pb-6">
          <Typography
            className="capitalize lg:!text-3xl md:!text-3xl sm:!text-3xl xsm:!text-2xl xxs:!text-xl xxxs:!text-xl !font-[600] font-poppins !leading-[140%] text-center"
            variant="h2"
            component={"h2"}
            gutterBottom
          >
            {Heading}&nbsp;
            <span className="text-ersPrimary">About Us</span>
          </Typography>
        </Box>
        <Box className="xl:w-[90%] lg:w-[90%] md:w-[90%] sm:w-full xsm:w-full xxs:w-full xxxs:w-full max-w-[100%] m-auto relative">
          <div ref={nextButtonRef} className="swiper-button-next"></div>
          <div ref={prevButtonRef} className="swiper-button-prev"></div>
          <Swiper
            className="bg-white border-2 border-[#C1ECFB] w-full !rounded-[20px] shadow-lg !py-8 !px-6"
            effect="Cards"
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            loop={true}
            modules={[Navigation, Autoplay, EffectFade, Pagination]}
            speed={3000}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              dynamicBullets: true,
              clickable: true,
            }}
            scrollbar={{ draggable: true }}
            spaceBetween={40}
            slidesPerView={1}
            onInit={(swiper) => {
              const nextButton = document.querySelector(".swiper-button-next");
              const prevButton = document.querySelector(".swiper-button-prev");
              if (nextButton && prevButton) {
                nextButton.style.setProperty("right", "-50px", "important");
                prevButton.style.setProperty("left", "-50px", "important");
              }
            }}
            breakpoints={{
              440: {
                slidesPerView: 1,
                spaceBetween: 30,
              },
              680: {
                slidesPerView: 1,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 1,
                spaceBetween: 30,
              },
            }}
          >
            {/* <Box className="bg-white border-2 border-[#C1ECFB] w-full rounded-[14px] shadow-lg py-8 px-4"></Box> */}
            {Testimonials.map((data, index) => {
              return (
                <SwiperSlide key={index}>
                  <Box className="client-quotes-box">
                    <Image
                      src={TopLeft}
                      className="w-[30px] object-cover pb-6"
                      alt=""
                    />
                    <Typography
                      variant="subtitle1"
                      component={"p"}
                      gutterBottom
                      className="!text-[14px] !font-[400] font-poppins leading-[160%] tracking-[-0.16px] !pb-6"
                    >
                      {data.description}
                    </Typography>
                    <Box className="flex justify-end items-start">
                      <Image
                        src={BottomRight}
                        className="w-[30px] object-cover"
                        alt=""
                      />
                    </Box>
                    <Box className="flex items-center gap-4 xl:flex-nowrap lg:flex-nowrap md:flex-nowrap sm:flex-wrap xsm:flex-wrap xxs:flex-wrap xxxs:flex-wrap">
                      <Box className="h-[50px] w-[50px] bg-gradient-to-r from-[#29BCF1] to-[#1057CF] rounded-[50%] flex justify-center items-center overflow-hidden">
                        <Image
                          src={data.image ? data.image : TeamMember}
                          className={data.image ? "w-[50px] object-cover" : "w-[30px] object-cover translate-y-[4px]"}
                          alt={data.name || "Client testimonial"}
                        />
                      </Box>
                      <Box className="text-start">
                        <Typography
                          variant="h6"
                          component="h3"
                          className="!text-[15px] !font-[600] font-poppins leading-[140%] tracking-[-0.16px] !mb-0"
                        >
                          {data.name}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          component={"p"}
                          className="!text-[13px] !font-[400] font-poppins leading-[140%] tracking-[-0.16px] !text-ersPrimary"
                        >
                          {data.designation}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Box>
      </Box>
    </>
  );
}

export default ClientsAboutUs;
