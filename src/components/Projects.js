import React, { useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Aconomy from "@/../public/assets/projects/aconomy.webp";
import BCCOIN from "@/../public/assets/projects/bccoin.webp";
import Focusmonk from "@/../public/assets/projects/focusmonk.webp";
import Salharo from "@/../public/assets/projects/salharo.webp";
import Wise1HRM from "@/../public/assets/projects/wise1hrm.webp";
import ABot from "@/../public/assets/projects/a-bot.webp";
import Link from "next/link";
import Image from "next/image";
import { ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import Reveal from "@/components/motion/Reveal";

function Projects({ title }) {
  const rootRef = useRef(null);
  const swiperRef = useRef(null);
  const nextButtonRef = useRef(null);
  const prevButtonRef = useRef(null);

  useEffect(() => {
    const handleMediaQuery = (mq) => {
      if (!nextButtonRef.current || !prevButtonRef.current) return;
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
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleMediaQuery);
    } else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleMediaQuery);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleMediaQuery);
      } else if (mediaQuery.removeListener) {
        mediaQuery.removeListener(handleMediaQuery);
      }
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion() || !rootRef.current) return;

    // Autoplay only while in viewport to save CPU / frame rate
    const st = ScrollTrigger.create({
      trigger: rootRef.current,
      start: "top bottom",
      end: "bottom top",
      onEnter: () => swiperRef.current?.swiper?.autoplay?.start(),
      onLeave: () => swiperRef.current?.swiper?.autoplay?.stop(),
      onEnterBack: () => swiperRef.current?.swiper?.autoplay?.start(),
      onLeaveBack: () => swiperRef.current?.swiper?.autoplay?.stop(),
    });

    return () => st.kill();
  }, []);

  return (
    <>
      <Box ref={rootRef} className="relative mb-[2rem]">
        <Box className="block text-center pb-6 lg:w-[70%] md:w-[70%] sm:w-[85%] xsm:w-[85%] xxs:w-[85%] xxxs:w-[85%] m-auto mb-8">
          <Reveal direction="up" distance={25}>
            <Typography
              className="capitalize !text-3xl !font-[600] font-poppins !leading-[140%] text-center"
              variant="h2"
              component={"h2"}
              gutterBottom
            >
              {title?.titleOne || "Our Latest"}{" "}
              <span className="text-ersPrimary">{title?.titleTwo || "Projects"}</span>
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
          </Reveal>
        </Box>
        <Box className="projects-bg-img relative overflow-hidden">
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
              ref={swiperRef}
              className="!pt-10 !pb-10 !px-[2rem]"
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              loop={true}
              modules={[Navigation, Autoplay]}
              speed={2000}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              spaceBetween={60}
              slidesPerView={3}
              onInit={() => {
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
                  spaceBetween: 40,
                },
                1440: {
                  slidesPerView: 3,
                  spaceBetween: 60,
                },
              }}
            >
              <SwiperSlide>
                <Box className="rounded-[10px] xxl:h-[350px] xl:h-[290px] lg:h-[260px] h-[240px] one-background">
                  <Box className="rounded-[10px] xxl:h-[350px] xl:h-[290px] lg:h-[260px] h-[240px] second-bg">
                    <Image
                      src={Aconomy}
                      className="object-cover img-style"
                      alt="Aconomy project preview"
                    />
                  </Box>
                </Box>
                <Box className="project-slider-content text-start pb-2">
                  <Typography
                    variant="h6"
                    component={"h3"}
                    gutterBottom
                    className="!text-lg !font-[600] font-poppins !leading-[140%] text-white !mb-1.5"
                  >
                    Aconomy
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    component={"p"}
                    gutterBottom
                    className="!text-[14px] !font-[400] font-poppins !leading-[140%] text-white/90 !mb-3 min-h-[58px]"
                  >
                    A blockchain and fintech platform offering crypto trading,
                    exchange, debit cards, and a marketplace for crypto
                    payments.
                  </Typography>
                  <Box className="flex flex-col items-start gap-1">
                    <Link
                      className="capitalize !text-base text-white !font-[600] font-poppins !leading-[140%] flex items-center hover:text-ersPrimary transition-colors"
                      href="https://aconomy.com/"
                      target="_blank"
                    >
                      View Project
                    </Link>
                    <Link
                      className="capitalize !text-xs text-ersPrimary !font-[600] font-poppins !leading-[140%] flex items-center hover:underline"
                      href="/portfolio/aconomy"
                      onPointerDown={(e) => e.stopPropagation()}
                    >
                      View Details &rarr;
                    </Link>
                  </Box>
                </Box>
              </SwiperSlide>

              <SwiperSlide>
                <Box className="rounded-[10px] xxl:h-[350px] xl:h-[290px] lg:h-[260px] h-[240px] one-background">
                  <Box className="rounded-[10px] xxl:h-[350px] xl:h-[290px] lg:h-[260px] h-[240px] second-bg">
                    <Image
                      src={BCCOIN}
                      className="object-cover img-style"
                      alt="BlackCardCoin project preview"
                    />
                  </Box>
                </Box>
                <Box className="project-slider-content text-start pb-2">
                  <Typography
                    variant="h6"
                    component={"h3"}
                    gutterBottom
                    className="!text-lg !font-[600] font-poppins !leading-[140%] text-white !mb-1.5"
                  >
                    BlackCardCoin
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    component={"p"}
                    gutterBottom
                    className="!text-[14px] !font-[400] font-poppins !leading-[140%] text-white/90 !mb-3 min-h-[58px]"
                  >
                    A crypto-based platform enabling users to buy BCCOIN for staking
                    and participate in global crypto initiatives.
                  </Typography>
                  <Box className="flex flex-col items-start gap-1">
                    <Link
                      className="capitalize !text-base text-white !font-[600] font-poppins !leading-[140%] flex items-center hover:text-ersPrimary transition-colors"
                      href="https://blackcardcoin.com/"
                      target="_blank"
                    >
                      View Project
                    </Link>
                    <Link
                      className="capitalize !text-xs text-ersPrimary !font-[600] font-poppins !leading-[140%] flex items-center hover:underline"
                      href="/portfolio/bccoin"
                      onPointerDown={(e) => e.stopPropagation()}
                    >
                      View Details &rarr;
                    </Link>
                  </Box>
                </Box>
              </SwiperSlide>

              <SwiperSlide>
                <Box className="rounded-[10px] xxl:h-[350px] xl:h-[290px] lg:h-[260px] h-[240px] one-background">
                  <Box className="rounded-[10px] xxl:h-[350px] xl:h-[290px] lg:h-[260px] h-[240px] second-bg">
                    <Image
                      src={Focusmonk}
                      className="object-cover img-style"
                      alt="FocusMonk project preview"
                    />
                  </Box>
                </Box>
                <Box className="project-slider-content text-start pb-2">
                  <Typography
                    variant="h6"
                    component={"h3"}
                    gutterBottom
                    className="!text-lg !font-[600] font-poppins !leading-[140%] text-white !mb-1.5"
                  >
                    FocusMonk
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    component={"p"}
                    gutterBottom
                    className="!text-[14px] !font-[400] font-poppins !leading-[140%] text-white/90 !mb-3 min-h-[58px]"
                  >
                    An intuitive productivity app designed to help users block
                    distractions and stay focused on tasks.
                  </Typography>
                  <Box className="flex flex-col items-start gap-1">
                    <Link
                      className="capitalize !text-base text-white !font-[600] font-poppins !leading-[140%] flex items-center hover:text-ersPrimary transition-colors"
                      href="https://focusmonk.io"
                      target="_blank"
                    >
                      View Project
                    </Link>
                    <Link
                      className="capitalize !text-xs text-ersPrimary !font-[600] font-poppins !leading-[140%] flex items-center hover:underline"
                      href="/portfolio/focusmonk"
                      onPointerDown={(e) => e.stopPropagation()}
                    >
                      View Details &rarr;
                    </Link>
                  </Box>
                </Box>
              </SwiperSlide>

              <SwiperSlide>
                <Box className="rounded-[10px] xxl:h-[350px] xl:h-[290px] lg:h-[260px] h-[240px] one-background">
                  <Box className="rounded-[10px] xxl:h-[350px] xl:h-[290px] lg:h-[260px] h-[240px] second-bg">
                    <Image
                      src={Salharo}
                      className="object-cover img-style"
                      alt="Salharo project preview"
                    />
                  </Box>
                </Box>
                <Box className="project-slider-content text-start pb-2">
                  <Typography
                    variant="h6"
                    component={"h3"}
                    gutterBottom
                    className="!text-lg !font-[600] font-poppins !leading-[140%] text-white !mb-1.5"
                  >
                    Salharo
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    component={"p"}
                    gutterBottom
                    className="!text-[14px] !font-[400] font-poppins !leading-[140%] text-white/90 !mb-3 min-h-[58px]"
                  >
                    An eCommerce platform offering sustainable fashion, focusing
                    on ethical production and zero-waste designs.
                  </Typography>
                  <Box className="flex flex-col items-start gap-1">
                    <Link
                      className="capitalize !text-base text-white !font-[600] font-poppins !leading-[140%] flex items-center hover:text-ersPrimary transition-colors"
                      href="https://salharo.com/"
                      target="_blank"
                    >
                      View Project
                    </Link>
                    <Link
                      className="capitalize !text-xs text-ersPrimary !font-[600] font-poppins !leading-[140%] flex items-center hover:underline"
                      href="/portfolio/salharo"
                      onPointerDown={(e) => e.stopPropagation()}
                    >
                      View Details &rarr;
                    </Link>
                  </Box>
                </Box>
              </SwiperSlide>

              <SwiperSlide>
                <Box className="rounded-[10px] xxl:h-[350px] xl:h-[290px] lg:h-[260px] h-[240px] one-background">
                  <Box className="rounded-[10px] xxl:h-[350px] xl:h-[290px] lg:h-[260px] h-[240px] second-bg">
                    <Image
                      src={Wise1HRM}
                      className="object-cover img-style"
                      alt="Wise1HRM project preview"
                    />
                  </Box>
                </Box>
                <Box className="project-slider-content text-start pb-2">
                  <Typography
                    variant="h6"
                    component={"h3"}
                    gutterBottom
                    className="!text-lg !font-[600] font-poppins !leading-[140%] text-white !mb-1.5"
                  >
                    Wise1HRM
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    component={"p"}
                    gutterBottom
                    className="!text-[14px] !font-[400] font-poppins !leading-[140%] text-white/90 !mb-3 min-h-[58px]"
                  >
                    A comprehensive HRM system with all essential features for
                    efficient workforce management.
                  </Typography>
                  <Box className="flex flex-col items-start gap-1">
                    <Link
                      className="capitalize !text-base text-white !font-[600] font-poppins !leading-[140%] flex items-center hover:text-ersPrimary transition-colors"
                      href="https://app.wise1ne.com"
                      target="_blank"
                    >
                      View Project
                    </Link>
                    <Link
                      className="capitalize !text-xs text-ersPrimary !font-[600] font-poppins !leading-[140%] flex items-center hover:underline"
                      href="/portfolio/wise1ne"
                      onPointerDown={(e) => e.stopPropagation()}
                    >
                      View Details &rarr;
                    </Link>
                  </Box>
                </Box>
              </SwiperSlide>

              <SwiperSlide>
                <Box className="rounded-[10px] xxl:h-[350px] xl:h-[290px] lg:h-[260px] h-[240px] one-background">
                  <Box className="rounded-[10px] xxl:h-[350px] xl:h-[290px] lg:h-[260px] h-[240px] second-bg">
                    <Image
                      src={ABot}
                      className="object-cover img-style"
                      alt="A-Bot AI Telegram Crypto Bot"
                    />
                  </Box>
                </Box>
                <Box className="project-slider-content text-start pb-2">
                  <Typography
                    variant="h6"
                    component={"h3"}
                    gutterBottom
                    className="!text-lg !font-[600] font-poppins !leading-[140%] text-white !mb-1.5"
                  >
                    A-Bot
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    component={"p"}
                    gutterBottom
                    className="!text-[14px] !font-[400] font-poppins !leading-[140%] text-white/90 !mb-3 min-h-[58px]"
                  >
                    An AI-powered Crypto Agent for Telegram bringing multi-asset
                    wallet management, trading, and AML verification into one interface.
                  </Typography>
                  <Box className="flex flex-col items-start gap-1">
                    <Link
                      className="capitalize !text-base text-white !font-[600] font-poppins !leading-[140%] flex items-center hover:text-ersPrimary transition-colors"
                      href="https://t.me/vymopay_bot"
                      target="_blank"
                    >
                      View Project
                    </Link>
                    <Link
                      className="capitalize !text-xs text-ersPrimary !font-[600] font-poppins !leading-[140%] flex items-center hover:underline"
                      href="/portfolio/a-bot"
                      onPointerDown={(e) => e.stopPropagation()}
                    >
                      View Details &rarr;
                    </Link>
                  </Box>
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
