import React, { useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade } from "swiper/modules";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import Aconomy from "@/../public/assets/projects/aconomy.webp";
import BCCOIN from "@/../public/assets/projects/bccoin.webp";
import Focusmonk from "@/../public/assets/projects/focusmonk.webp";
import Salharo from "@/../public/assets/projects/salharo.webp";
import Wise1HRM from "@/../public/assets/projects/wise1hrm.webp";
import Link from "next/link";
import Image from "next/image";
function Projects({ title }) {
  const nextButtonRef = useRef();
  const prevButtonRef = useRef();
  useEffect(() => {
    const handleMediaQuery = (mq) => {
      if (mq.matches) {
        nextButtonRef.current.style.setProperty("display", "none", "important");
        prevButtonRef.current.style.setProperty("display", "none", "important");
      } else {
        nextButtonRef.current.style.setProperty("right", "-80px", "important");
        prevButtonRef.current.style.setProperty("left", "-80px", "important");
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
      <Box className="relative mb-[2rem]">
        <Box className="block text-center pb-6 lg:w-[70%] md:w-[70%] sm:w-[85%] xsm:w-[85%] xxs:w-[85%] xxxs:w-[85%] m-auto mb-8">
          <Typography
            className="capitalize !text-3xl !font-[600] font-poppins !leading-[140%] text-center"
            variant="h2"
            component={"h2"}
            gutterBottom
          >
            {title.titleOne}{" "}
            <span className="text-ersPrimary">{title.titleTwo}</span>
          </Typography>
          <Typography
            className="!text-base !font-[400] font-poppins !leading-[130%] !tracking-[-0.16px]"
            variant="subtitle1"
            component={"p"}
            gutterBottom
          >
            Our latest projects showcase innovative solutions in fintech and
            blockchain development, driving digital transformation and
            delivering cutting-edge technology for businesses worldwide.
          </Typography>
        </Box>
        <Box className="projects-bg-img relative">
          <Box className="xl:w-[80%] lg:w-[80%] md:w-[80%] sm:w-[80%] xsm:w-full xxs:w-full xxxs:w-full max-w-[100%] m-auto position-setting">
            <div
              ref={nextButtonRef}
              className="swiper-button-next !text-white"
            ></div>
            <div
              ref={prevButtonRef}
              className="swiper-button-prev !text-white"
            ></div>
            <Swiper
              className="!pt-10 !pb-10 !px-[2rem]"
              effect="Cards"
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              loop={true}
              modules={[Navigation, Autoplay, EffectFade]}
              speed={2000}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              spaceBetween={60}
              slidesPerView={3}
              onInit={(swiper) => {
                const nextButton = document.querySelector(
                  ".swiper-button-next"
                );
                const prevButton = document.querySelector(
                  ".swiper-button-prev"
                );
                if (nextButton && prevButton) {
                  nextButton.style.setProperty("right", "-80px", "important");
                  prevButton.style.setProperty("left", "-80px", "important");
                }
              }}
              breakpoints={{
                320: {
                  slidesPerView: 1,
                  spaceBetween: 40,
                },
                375: {
                  slidesPerView: 1,
                  spaceBetween: 40,
                },
                425: {
                  slidesPerView: 1,
                  spaceBetween: 40,
                },
                768: {
                  slidesPerView: 1.5,
                  spaceBetween: 40,
                },
                1024: {
                  slidesPerView: 2,
                  spaceBetween: 30,
                },
                1200: {
                  slidesPerView: 3,
                  spaceBetween: 60,
                },
              }}
            >
              <SwiperSlide>
                <Box className="rounded-[10px] h-[400px] one-background">
                  <Box className="rounded-[10px] h-[400px] second-bg">
                    <Image
                      src={Aconomy} className="object-cover img-style" alt="Aconomy project preview"
                    />
                  </Box>
                </Box>
                <Box className="project-slider-content text-start pb-4 relative">
                  <Typography
                    variant="h6"
                    component="h3"
                    gutterBottom
                    className="!text-lg !font-[600] font-poppins !leading-[140%] text-white !mb-2"
                  >
                    Aconomy
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    component={"p"}
                    gutterBottom
                    className="!text-[14px] !font-[400] font-poppins !leading-[140%] text-white !mb-6"
                  >
                    A blockchain and fintech platform offering crypto trading,
                    exchange, debit cards, and a marketplace for crypto
                    payments.
                  </Typography>
                  <Link
                    className="capitalize absolute -bottom-[10px] !text-base text-white !font-[600] font-poppins !leading-[140%] flex items-center pb-4 hover:text-ersPrimary"
                    href="https://aconomy.com/"
                    target="_blank"
                  >
                    view project
                    {/* <MdArrowRightAlt size={20} /> */}
                  </Link>
                </Box>
              </SwiperSlide>
              <SwiperSlide>
                <Box className="rounded-[10px] h-[400px] one-background">
                  <Box className="rounded-[10px] h-[400px] second-bg">
                    <Image
                      src={BCCOIN}
                      className="object-cover img-style"
                      alt="..."
                    />
                  </Box>
                </Box>
                <Box className="project-slider-content text-start pb-4 relative">
                  <Typography
                    variant="h6"
                    component="h3"
                    gutterBottom
                    className="!text-lg !font-[600] font-poppins !leading-[140%] text-white !mb-2"
                  >
                    BlackCardCoin
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    component={"p"}
                    gutterBottom
                    className="!text-[14px] !font-[400] font-poppins !leading-[140%] text-white !mb-6"
                  >
                    A crypto based system offering to buy BCCOIN for staking
                    rewards and exclusive access to a personal crypto card.
                  </Typography>
                  <Link
                    className="capitalize absolute -bottom-[10px] !text-base text-white !font-[600] font-poppins !leading-[140%] flex items-center pb-4 hover:text-ersPrimary"
                    href="https://blackcardcoin.com"
                    target="_blank"
                  >
                    view project
                    {/* <MdArrowRightAlt size={20} /> */}
                  </Link>
                </Box>
              </SwiperSlide>
              <SwiperSlide>
                <Box className="rounded-[10px] h-[400px] one-background">
                  <Box className="rounded-[10px] h-[400px] second-bg">
                    <Image
                      src={Focusmonk}
                      className="object-cover img-style"
                      alt="..."
                    />
                  </Box>
                </Box>
                <Box className="project-slider-content text-start pb-4 relative">
                  <Typography
                    variant="h6"
                    component="h3"
                    gutterBottom
                    className="!text-lg !font-[600] font-poppins !leading-[140%] text-white !mb-2"
                  >
                    FocusMonk
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    component={"p"}
                    gutterBottom
                    className="!text-[14px] !font-[400] font-poppins !leading-[140%] text-white !mb-6"
                  >
                    An AI-driven solution to enhance focus and productivity with
                    performance-based rewards.
                  </Typography>
                  <Link
                    className="capitalize absolute -bottom-[10px] !text-base text-white !font-[600] font-poppins !leading-[140%] flex items-center pb-4 hover:text-ersPrimary"
                    href="https://www.focusmonk.co"
                    target="_blank"
                  >
                    view project
                    {/* <MdArrowRightAlt size={20} /> */}
                  </Link>
                </Box>
              </SwiperSlide>
              <SwiperSlide>
                <Box className="rounded-[10px] h-[400px] one-background">
                  <Box className="rounded-[10px] h-[400px] second-bg">
                    <Image
                      src={Salharo} className="object-cover img-style" alt="Salharo project preview"
                    />
                  </Box>
                </Box>
                <Box className="project-slider-content text-start pb-4 relative">
                  <Typography
                    variant="h6"
                    component="h3"
                    gutterBottom
                    className="!text-lg !font-[600] font-poppins !leading-[140%] text-white !mb-2"
                  >
                    Salharo
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    component={"p"}
                    gutterBottom
                    className="!text-[14px] !font-[400] font-poppins !leading-[140%] text-white !mb-6"
                  >
                    A USA-based e-commerce platform supporting payments via
                    Stripe and PayPal.
                  </Typography>
                  <Link
                    className="capitalize absolute -bottom-[10px] !text-base text-white !font-[600] font-poppins !leading-[140%] flex items-center pb-4 hover:text-ersPrimary"
                    href="https://salharo.us"
                    target="_blank"
                  >
                    view project
                    {/* <MdArrowRightAlt size={20} /> */}
                  </Link>
                </Box>
              </SwiperSlide>
              <SwiperSlide>
                <Box className="rounded-[10px] h-[400px] one-background">
                  <Box className="rounded-[10px] h-[400px] second-bg">
                    <Image
                      src={Wise1HRM}
                      className="object-cover img-style"
                      alt="..."
                    />
                  </Box>
                </Box>
                <Box className="project-slider-content text-start pb-4 relative">
                  <Typography
                    variant="h6"
                    component={"h6"}
                    gutterBottom
                    className="!text-lg !font-[600] font-poppins !leading-[140%] text-white !mb-2"
                  >
                    Wise1HRM
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    component={"p"}
                    gutterBottom
                    className="!text-[14px] !font-[400] font-poppins !leading-[140%] text-white !mb-6"
                  >
                    A comprehensive HRM system with all essential features for
                    efficient workforce management.
                  </Typography>
                  <Link
                    className="capitalize absolute -bottom-[10px] !text-base text-white !font-[600] font-poppins !leading-[140%] flex items-center pb-4 hover:text-ersPrimary"
                    href="https://app.wise1ne.com"
                    target="_blank"
                  >
                    view project
                    {/* <MdArrowRightAlt size={20} /> */}
                  </Link>
                </Box>
              </SwiperSlide>
            </Swiper>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Projects;
