import React, { useEffect, useRef, useState } from "react";
import { Box, Typography, Grid } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import basket from "@/../public/assets/images/grocery.png";
import fintech from "@/../public/assets/images/fintech.png";
import Travel from "@/../public/assets/images/travel.png";
import Education from "@/../public/assets/images/education.png";
import Image from "next/image";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import Reveal from "@/components/motion/Reveal";

function IndustriesWeServe() {
  const rootRef = useRef(null);
  const swiperRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(false);

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
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1200);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion() || !rootRef.current) return;

    const ctx = gsap.context(() => {
      // Desktop static grid reveal
      const cards = rootRef.current.querySelectorAll(".industry-grid-card");
      if (cards.length) {
        gsap.set(cards, { opacity: 0, y: 35 });
        ScrollTrigger.batch(cards, {
          start: "top 85%",
          once: true,
          onEnter: (batch) => {
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.1,
              ease: "power3.out",
            });
            const circles = batch.map((c) => c.querySelector(".slider-box-adjustment")).filter(Boolean);
            if (circles.length) {
              gsap.fromTo(
                circles,
                { scale: 0.7 },
                { scale: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.8)" }
              );
            }
          },
        });
      }

      // Autoplay pause when out of viewport for mobile Swiper
      ScrollTrigger.create({
        trigger: rootRef.current,
        start: "top bottom",
        end: "bottom top",
        onEnter: () => {
          if (swiperRef.current && swiperRef.current.swiper?.autoplay) {
            swiperRef.current.swiper.autoplay.start();
          }
        },
        onLeave: () => {
          if (swiperRef.current && swiperRef.current.swiper?.autoplay) {
            swiperRef.current.swiper.autoplay.stop();
          }
        },
        onEnterBack: () => {
          if (swiperRef.current && swiperRef.current.swiper?.autoplay) {
            swiperRef.current.swiper.autoplay.start();
          }
        },
        onLeaveBack: () => {
          if (swiperRef.current && swiperRef.current.swiper?.autoplay) {
            swiperRef.current.swiper.autoplay.stop();
          }
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, [isDesktop]);

  const renderCard = (data, isGrid = false) => (
    <Box
      className={`relative border-[3px] border-[#C1ECFB] rounded-[10px] shadow-lg h-[310px] min-h-full bg-white card-hover-lift ${
        isGrid ? "industry-grid-card" : ""
      }`}
    >
      <Box className="z-10 bg-gradient-to-r from-[#27B4EE] to-[#115DCE] h-[100px] w-[100px] rounded-[50%] flex justify-center items-center slider-box-adjustment">
        <Image
          src={data.image}
          className="w-[45%] object-cover"
          alt={data.title.replace(/<[^>]+>/g, " ") || "Industry icon"}
        />
      </Box>
      <Box className="pt-[4rem] px-[20px] text-center">
        <Typography
          className="!text-lg !font-[500] font-poppins !mb-2 min-h-[54px] flex items-center justify-center"
          variant="h6"
          component="h3"
          gutterBottom
        >
          <span dangerouslySetInnerHTML={{ __html: data.title }} />
        </Typography>
        <Typography
          className="!text-[13px] !font-[400] font-poppins !leading-relaxed text-gray-600 line-clamp-4"
          variant="subtitle1"
          component={"p"}
          gutterBottom
        >
          {data.description}
        </Typography>
      </Box>
    </Box>
  );

  return (
    <>
      <Box ref={rootRef} className="relative mb-[5rem]">
        <Box className="block text-center">
          <Reveal direction="up" distance={25}>
            <Typography
              className="capitalize xl:!text-3xl lg:!text-3xl md:!text-3xl sm:!text-3xl xsm:!text-3xl xxs:!text-3xl xxxs:!text-2xl !font-[600] text-center font-poppins"
              variant="h2"
              component={"h2"}
              gutterBottom
            >
              Industries <span className="text-ersPrimary">We Serve</span>
            </Typography>
          </Reveal>
        </Box>

        <Box className="w-[85%] max-w-[1400px] m-auto pt-[4rem] pb-[2rem]">
          {/* Desktop >= 1200px: Clean Static 4-Column Grid */}
          <div className="hidden xl:grid grid-cols-4 gap-6 pt-4">
            {Industries.map((data, i) => (
              <div key={i} className="h-full">
                {renderCard(data, true)}
              </div>
            ))}
          </div>

          {/* Mobile / Tablet < 1200px: Swiper Carousel */}
          <div className="block xl:hidden overflow-hidden slider-main-box pt-4">
            <Swiper
              ref={swiperRef}
              effect="Cards"
              style={{ overflow: "unset" }}
              navigation={false}
              loop={true}
              modules={[Navigation, Autoplay, EffectFade]}
              speed={1200}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              spaceBetween={30}
              slidesPerView={1}
              breakpoints={{
                320: { slidesPerView: 1, spaceBetween: 20 },
                640: { slidesPerView: 1.5, spaceBetween: 25 },
                768: { slidesPerView: 2, spaceBetween: 25 },
                1024: { slidesPerView: 3, spaceBetween: 30 },
              }}
            >
              {Industries.map((data, i) => (
                <SwiperSlide key={i} className="pb-4">
                  {renderCard(data, false)}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </Box>
      </Box>
    </>
  );
}

export default IndustriesWeServe;
