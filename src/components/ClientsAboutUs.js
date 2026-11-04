import React, { useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import TopLeft from "@/../public/assets/images/top-left.png";
import BottomRight from "@/../public/assets/images/bottom-right.png";
import TeamMember from "@/../public/assets/images/abrar.png";
import Image from "next/image";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import Reveal from "@/components/motion/Reveal";

function ClientsAboutUs({ Heading, Testimonials }) {
  const rootRef = useRef(null);
  const cardRef = useRef(null);
  const swiperRef = useRef(null);
  const nextButtonRef = useRef();
  const prevButtonRef = useRef();

  useEffect(() => {
    const handleMediaQuery = (mq) => {
      if (!nextButtonRef.current || !prevButtonRef.current) return;
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
    if (prefersReducedMotion() || !rootRef.current || !cardRef.current) return;

    const ctx = gsap.context(() => {
      // Swiper container 'popup': scale .92->1 + opacity on enter, scale 1->.97 on exit (scrub .6)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
          end: "bottom 15%",
          scrub: 0.6,
        },
      });

      tl.fromTo(
        cardRef.current,
        { scale: 0.92, opacity: 0.4 },
        { scale: 1, opacity: 1, duration: 0.4, ease: "power2.out" }
      ).to(cardRef.current, {
        scale: 0.97,
        duration: 0.3,
        ease: "power2.in",
      });

      // Quote marks slide from corners once in view
      const topQuotes = rootRef.current.querySelectorAll(".quote-top-left");
      const botQuotes = rootRef.current.querySelectorAll(".quote-bottom-right");

      if (topQuotes.length) {
        gsap.fromTo(
          topQuotes,
          { opacity: 0, x: -20, y: -20 },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }

      if (botQuotes.length) {
        gsap.fromTo(
          botQuotes,
          { opacity: 0, x: 20, y: 20 },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }

      // Autoplay paused when offscreen
      ScrollTrigger.create({
        trigger: rootRef.current,
        start: "top bottom",
        end: "bottom top",
        onEnter: () => swiperRef.current?.swiper?.autoplay?.start(),
        onLeave: () => swiperRef.current?.swiper?.autoplay?.stop(),
        onEnterBack: () => swiperRef.current?.swiper?.autoplay?.start(),
        onLeaveBack: () => swiperRef.current?.swiper?.autoplay?.stop(),
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Box
        ref={rootRef}
        className="bg-[rgba(222,233,251,0.3)] py-20 xl:px-6 lg:px-6 md:px-6 sm:px-4 xsm:px-2 xxs:px-2 xxxs:px-2 overflow-hidden"
      >
        <Box className="block text-center pb-6">
          <Reveal direction="up" distance={25}>
            <Typography
              className="capitalize lg:!text-3xl md:!text-3xl sm:!text-3xl xsm:!text-2xl xxs:!text-xl xxxs:!text-xl !font-[600] font-poppins !leading-[140%] text-center"
              variant="h2"
              component={"h2"}
              gutterBottom
            >
              {Heading}&nbsp;
              <span className="text-ersPrimary">About Us</span>
            </Typography>
          </Reveal>
        </Box>
        <Box
          ref={cardRef}
          className="xl:w-[90%] lg:w-[90%] md:w-[90%] sm:w-full xsm:w-full xxs:w-full xxxs:w-full max-w-[100%] m-auto relative will-change-transform"
        >
          <div ref={nextButtonRef} className="swiper-button-next"></div>
          <div ref={prevButtonRef} className="swiper-button-prev"></div>
          <Swiper
            ref={swiperRef}
            className="bg-white border-2 border-[#C1ECFB] w-full !rounded-[20px] shadow-lg !py-8 !px-6"
            effect="Cards"
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            loop={true}
            modules={[Navigation, Autoplay, EffectFade, Pagination]}
            speed={2000}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              dynamicBullets: true,
              clickable: true,
            }}
            scrollbar={{ draggable: true }}
            spaceBetween={40}
            slidesPerView={1}
            breakpoints={{
              440: { slidesPerView: 1, spaceBetween: 30 },
              680: { slidesPerView: 1, spaceBetween: 30 },
              1024: { slidesPerView: 1, spaceBetween: 30 },
            }}
          >
            {Testimonials?.map((data, index) => {
              return (
                <SwiperSlide key={data.id || index}>
                  <Box className="client-quotes-box">
                    <Image
                      src={TopLeft}
                      className="quote-top-left w-[30px] object-cover pb-6"
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
                        className="quote-bottom-right w-[30px] object-cover"
                        alt=""
                      />
                    </Box>
                    <Box className="flex items-center gap-4 xl:flex-nowrap lg:flex-nowrap md:flex-nowrap sm:flex-wrap xsm:flex-wrap xxs:flex-wrap xxxs:flex-wrap">
                      <Box className="h-[50px] w-[50px] bg-gradient-to-r from-[#29BCF1] to-[#1057CF] rounded-[50%] flex justify-center items-center overflow-hidden">
                        <Image
                          src={data.image ? data.image : TeamMember}
                          className={
                            data.image
                              ? "w-[50px] object-cover"
                              : "w-[30px] object-cover translate-y-[4px]"
                          }
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
