import React from "react";
import { Box, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade } from "swiper/modules";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import basket from "@/../public/assets/images/grocery.png";
import fintech from "@/../public/assets/images/fintech.png";
import Travel from "@/../public/assets/images/travel.png";
import Education from "@/../public/assets/images/education.png";
import Image from "next/image";
function IndustriesWeServe() {
  let Industries = [
    {
      image: basket,
      title: `E-Commerce <br/> Solutions`,
      description:
        "We empower e-commerce businesses with innovative blockchain and Fintech solutions, driving growth and enhancing security, scalability, and customer experience.",
    },
    {
      image: fintech,
      title: `Fintech <br /> Solutions`,
      description:
        "We provide innovative Fintech solutions that empower businesses with secure, efficient, and scalable financial technologies, driving growth and success in the digital economy.",
    },
    {
      image: Travel,
      title: `Travel & <br /> Tourism`,
      description:
        "We bring innovation to the travel and tours sector by integrating advanced technology and customized solutions, ensuring seamless experiences, efficiency, and growth for businesses in this dynamic industry.",
    },
    {
      image: Education,
      title: "Education",
      description:
        "We bring innovation to the education sector by creating customized software solutions that enhance learning experiences, streamline administration, and support educational growth.",
    }
  ];

  return (
    <>
      <Box className="relative mb-[5rem]">
        <Box className="block text-center">
          <Typography
            className="capitalize xl:!text-3xl lg:!text-3xl md:!text-3xl sm:!text-3xl xsm:!text-3xl xxs:!text-3xl xxxs:!text-2xl !font-[600] text-center font-poppins]"
            variant="h2"
            component={"h2"}
            gutterBottom
          >
            Industries <span className="text-ersPrimary">We Serve</span>
          </Typography>
        </Box>
        <Box className="w-[85%] max-w-[100%] m-auto pt-[5rem] pb-[2rem] overflow-hidden slider-main-box">
          <Swiper
            effect="Cards"
            style={{ overflow: "unset" }}
            navigation={false}
            loop={true}
            modules={[Navigation, Autoplay, EffectFade]}
            speed={2000}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            spaceBetween={30}
            slidesPerView={4}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 30,
              },
              375: {
                slidesPerView: 1,
                spaceBetween: 30,
              },
              425: {
                slidesPerView: 1,
                spaceBetween: 30,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              1200: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
            }}
          >
            {Industries.map((data, i) => {
              return (
                <SwiperSlide key={i}>
                  <Box className="relative border-[3px] border-[#C1ECFB] rounded-[10px] shadow-lg h-[310px] min-h-full">
                    <Box className="z-10 bg-gradient-to-r from-[#27B4EE] to-[#115DCE] h-[100px] w-[100px] rounded-[50%] flex justify-center items-center slider-box-adjustment">
                      <Image
                        src={data.image}
                        className="w-[40%] object-cover"
                        alt={data.title}
                      />
                    </Box>
                    <Box className="block my-[4rem] px-2">
                      <Typography
                        variant="h6"
                        component="h3"
                        gutterBottom
                        className="!text-base !font-[500] font-poppins text-center !leading-snug !leading-[140%] !mb-6"
                        dangerouslySetInnerHTML={{ __html: data.title }}
                      ></Typography>
                      <Typography
                        className="!text-[13px] !font-[400] font-poppins text-center leading-[170%] px-3"
                        variant="subtitle1"
                        component={"p"}
                        gutterBottom
                      >
                        {data.description}
                      </Typography>
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

export default IndustriesWeServe;
