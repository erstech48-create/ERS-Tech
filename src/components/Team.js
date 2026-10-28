import React from "react";
import { Box, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import TeamMember from "@/../public/assets/images/abrar.png";
import Image from "next/image";
function Team() {
  return (
    <>
      <Box className="container relative">
        <Box className="block text-center py-6">
          <Typography
            className="capitalize !text-3xl !font-[600] font-poppins !leading-[140%] !tracking-[-0.16px] text-center"
            variant="h2"
            component={"h2"}
            gutterBottom
          >
            meet our <span className="text-ersPrimary">team</span>
          </Typography>
        </Box>
        <Box className="w-[90%] max-w-[100%] m-auto pt-[3rem] pb-[5rem] relative">
          <div className="swiper-button-next"></div>
          <div className="swiper-button-prev"></div>
          <Swiper
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            loop={true}
            modules={[Navigation, Autoplay]}
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
                slidesPerView: 4,
                spaceBetween: 30,
              },
              1200: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
            }}
          >
            <SwiperSlide>
              <Box className="container-img-box">
                <div className="container-inner !h-[220px] xl:!left-[0%] lg:!-left-[15%] md:!-left-[15%] sm:!left-[35%] xsm:!left-[38%] xxs:!left-[50%] xxxs:!left-[50%]">
                  <div className="circle"></div>
                  <Image
                    className="mask-img mask-img-one xl:!left-[27%] lg:!left-[33%] md:!left-[20%] sm:!left-[20%] xsm:!left-[20%] xxs:!left-[22%] xxxs:!left-[25%]"
                    src={TeamMember}
                    alt="..."
                  />
                </div>
              </Box>
              <Box className="block text-center">
                <Typography
                  variant="h5"
                  component={"h5"}
                  className="!text-[18px] !font-[600] font-poppins !leading-[140%] !tracking-[-0.16px]"
                >
                  John Doe
                </Typography>
                <Typography
                  variant="h6"
                  component="h3"
                  gutterBottom
                  className="!text-[14px] !font-[400] font-poppins !text-ersPrimary !leading-[140%] !tracking-[-0.16px]"
                >
                  Chief Executive Officer
                </Typography>
              </Box>
            </SwiperSlide>
            <SwiperSlide>
              <Box className="container-img-box">
                <div className="container-inner !h-[220px] xl:!left-[0%] lg:!-left-[15%] md:!-left-[15%] sm:!left-[35%] xsm:!left-[38%] xxs:!left-[50%] xxxs:!left-[50%]">
                  <div className="circle"></div>
                  <Image
                    className="mask-img mask-img-one xl:!left-[27%] lg:!left-[33%] md:!left-[20%] sm:!left-[20%] xsm:!left-[20%] xxs:!left-[22%] xxxs:!left-[25%]"
                    src={TeamMember}
                    alt="..."
                  />
                </div>
              </Box>
              <Box className="block text-center">
                <Typography
                  variant="h5"
                  component={"h5"}
                  className="!text-[18px] !font-[600] font-poppins !leading-[140%] !tracking-[-0.16px]"
                >
                  John Doe
                </Typography>
                <Typography
                  variant="h6"
                  component="h3"
                  gutterBottom
                  className="!text-[14px] !font-[400] font-poppins !text-ersPrimary !leading-[140%] !tracking-[-0.16px]"
                >
                  Chief Executive Officer
                </Typography>
              </Box>
            </SwiperSlide>
            <SwiperSlide>
              <Box className="container-img-box">
                <div className="container-inner !h-[220px] xl:!left-[0%] lg:!-left-[15%] md:!-left-[15%] sm:!left-[35%] xsm:!left-[38%] xxs:!left-[50%] xxxs:!left-[50%]">
                  <div className="circle"></div>
                  <Image
                    className="mask-img mask-img-one xl:!left-[27%] lg:!left-[33%] md:!left-[20%] sm:!left-[20%] xsm:!left-[20%] xxs:!left-[22%] xxxs:!left-[25%]"
                    src={TeamMember}
                    alt="..."
                  />
                </div>
              </Box>
              <Box className="block text-center">
                <Typography
                  variant="h5"
                  component={"h5"}
                  className="!text-[18px] !font-[600] font-poppins !leading-[140%] !tracking-[-0.16px]"
                >
                  John Doe
                </Typography>
                <Typography
                  variant="h6"
                  component="h3"
                  gutterBottom
                  className="!text-[14px] !font-[400] font-poppins !text-ersPrimary !leading-[140%] !tracking-[-0.16px]"
                >
                  Chief Executive Officer
                </Typography>
              </Box>
            </SwiperSlide>
            <SwiperSlide>
              <Box className="container-img-box">
                <div className="container-inner !h-[220px] xl:!left-[0%] lg:!-left-[15%] md:!-left-[15%] sm:!left-[35%] xsm:!left-[38%] xxs:!left-[50%] xxxs:!left-[50%]">
                  <div className="circle"></div>
                  <Image
                    className="mask-img mask-img-one xl:!left-[27%] lg:!left-[33%] md:!left-[20%] sm:!left-[20%] xsm:!left-[20%] xxs:!left-[22%] xxxs:!left-[25%]"
                    src={TeamMember}
                    alt="..."
                  />
                </div>
              </Box>
              <Box className="block text-center">
                <Typography
                  variant="h5"
                  component={"h5"}
                  className="!text-[18px] !font-[600] font-poppins !leading-[140%] !tracking-[-0.16px]"
                >
                  John Doe
                </Typography>
                <Typography
                  variant="h6"
                  component="h3"
                  gutterBottom
                  className="!text-[14px] !font-[400] font-poppins !text-ersPrimary !leading-[140%] !tracking-[-0.16px]"
                >
                  Chief Executive Officer
                </Typography>
              </Box>
            </SwiperSlide>
            <SwiperSlide>
              <Box className="container-img-box">
                <div className="container-inner !h-[220px] xl:!left-[0%] lg:!-left-[15%] md:!-left-[15%] sm:!left-[35%] xsm:!left-[38%] xxs:!left-[50%] xxxs:!left-[50%]">
                  <div className="circle"></div>
                  <Image
                    className="mask-img mask-img-one xl:!left-[27%] lg:!left-[33%] md:!left-[20%] sm:!left-[20%] xsm:!left-[20%] xxs:!left-[22%] xxxs:!left-[25%]"
                    src={TeamMember}
                    alt="..."
                  />
                </div>
              </Box>
              <Box className="block text-center">
                <Typography
                  variant="h5"
                  component={"h5"}
                  className="!text-[18px] !font-[600] font-poppins !leading-[140%] !tracking-[-0.16px]"
                >
                  John Doe
                </Typography>
                <Typography
                  variant="h6"
                  component="h3"
                  gutterBottom
                  className="!text-[14px] !font-[400] font-poppins !text-ersPrimary !leading-[140%] !tracking-[-0.16px]"
                >
                  Chief Executive Officer
                </Typography>
              </Box>
            </SwiperSlide>
          </Swiper>
        </Box>
      </Box>
    </>
  );
}

export default Team;
