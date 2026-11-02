import React, { useEffect, useRef } from "react";
import { Box, Typography, Grid } from "@mui/material";
import Weblogo from "@/../public/assets/icons/web-dev.png";
import UIlogo from "@/../public/assets/icons/ui-ux.png";
import Blockchain from "@/../public/assets/icons/blockChain.png";
import AIRobots from "../../public/assets/icons/Ai-Robots.png";
import softwareDev from "@/../public/assets/icons/software.png";
import MobApp from "@/../public/assets/icons/mob-app.png";
import TechnicalSupport from "@/../public/assets/icons/technical-support.png";

import { MdArrowRightAlt } from "react-icons/md";
import Link from "next/link";
import Image from "next/image";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { useLenis } from "@/components/motion/SmoothScroll";
import SplitHeading from "@/components/motion/SplitHeading";
import Reveal from "@/components/motion/Reveal";

function OurServices({ title, page }) {
  const { scrollTo } = useLenis();
  const rootRef = useRef(null);

  let Services = [
    {
      image: Weblogo,
      title: "Web Development",
      description:
        "Empowering your business with dynamic, user-friendly websites tailored to deliver seamless experiences and drive growth effectively.",
    },
    {
      image: UIlogo,
      title: "UI/UX Design",
      description:
        "We craft seamless, user-friendly interfaces that enhance digital experiences, focusing on aesthetics and functionality for your business growth.",
    },
    {
      image: MobApp,
      title: "Mobile App Development",
      description:
        "We create intuitive, high-performance mobile apps tailored to your business needs, ensuring seamless user experiences and innovation.",
    },
    {
      image: softwareDev,
      title: "Software Development",
      description:
        "We deliver robust and tailored software solutions, simplifying complex challenges to empower businesses with innovation and efficiency.",
    },
    {
      image: AIRobots,
      title: "AI / Robotics",
      description:
        "We deliver AI-driven and robotic solutions, revolutionizing industries with intelligent automation and smart technologies for enhanced productivity.",
    },
    {
      image: Blockchain,
      title: "Blockchain Development",
      description:
        "We deliver secure, scalable blockchain solutions tailored to your business, ensuring seamless integration and transformative results.",
    },
  ];

  useEffect(() => {
    if (prefersReducedMotion() || !rootRef.current) return;

    const ctx = gsap.context(() => {
      const cards = rootRef.current.querySelectorAll(".service-batch-card");
      if (cards.length) {
        gsap.set(cards, { opacity: 0, y: 40 });

        ScrollTrigger.batch(cards, {
          start: "top 85%",
          once: true,
          onEnter: (batch) => {
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.08,
              ease: "power3.out",
            });

            // Pop icon circle scale 0.8 -> 1
            const icons = batch.map((c) => c.querySelector(".service-icon-circle")).filter(Boolean);
            if (icons.length) {
              gsap.fromTo(
                icons,
                { scale: 0.8 },
                { scale: 1, duration: 0.6, stagger: 0.08, ease: "back.out(1.7)" }
              );
            }
          },
        });
      }

      // 7th Technical support card for services page
      const techCard = rootRef.current.querySelector(".service-7th-card");
      if (techCard) {
        gsap.fromTo(
          techCard,
          { opacity: 0, scale: 0.96, y: 30 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.8,
            delay: 0.25,
            ease: "power3.out",
            scrollTrigger: {
              trigger: techCard,
              start: "top 85%",
              once: true,
            },
          }
        );
      }
    }, rootRef);

    return () => ctx.revert();
  }, [page]);

  const handleContactClick = (e) => {
    e.preventDefault();
    scrollTo("#contact", { offset: -90 });
  };

  return (
    <>
      <Box ref={rootRef} className="mb-[5rem]">
        <Box className="block text-center pb-6 lg:w-[70%] md:w-[70%] sm:w-[85%] xsm:w-[85%] xxs:w-[85%] xxxs:w-[85%] m-auto mb-8">
          <Typography
            className="capitalize !text-3xl !font-[600] text-center font-poppins"
            variant="h2"
            component={"h2"}
            gutterBottom
          >
            <SplitHeading as="span">
              {`${title?.titleOne || "Our"} `}
            </SplitHeading>
            <span className="text-ersPrimary">
              <SplitHeading as="span">
                {title?.titleTwo || "Services"}
              </SplitHeading>
            </span>
          </Typography>
          <Reveal direction="up" distance={20} delay={0.2}>
            <Typography
              className="!text-base !font-[400] font-poppins"
              variant="subtitle1"
              component={"p"}
              gutterBottom
            >
              We provide innovative software solutions, including web and mobile
              app development, cloud computing, and custom software design, to
              empower businesses with cutting-edge technology.
            </Typography>
          </Reveal>
        </Box>
        <Box className="w-[80%] max-w-[100%] m-auto">
          <Grid container direction={"row"} justify="center" spacing={2}>
            {Services.map((data, i) => {
              return (
                <Grid key={data.id || data.title || i} item xs={12} sm={6} md={6} lg={4}>
                  <Box className="card service-batch-card card-hover-lift relative shadow p-4 rounded-[10px] services-shadow bg-white">
                    <Box className="card-body h-[300px] min-h-full">
                      <Box className="service-icon-circle bg-[rgba(41,188,241,0.1)] rounded-[50%] w-[100px] h-[100px] flex justify-center items-center mb-6">
                        <Image
                          src={data.image}
                          className="w-[40%] object-cover"
                          alt={data.title || "Service icon"}
                        />
                      </Box>
                      <Box className="block text-start">
                        <Typography
                          className="!text-lg !font-[500] text-start font-poppins"
                          variant="h6"
                          component="h3"
                          gutterBottom
                        >
                          {data.title}
                        </Typography>
                        <Typography
                          className="!text-[14px] !font-[400] !leading-normal font-poppins"
                          variant="subtitle1"
                          component={"p"}
                          gutterBottom
                        >
                          {data.description}
                        </Typography>
                      </Box>
                      {page === "services" ? (
                        <Link
                          className="absolute bottom-0 text-[14px] text-ersPrimary !font-[400] font-poppins flex items-center pb-4 read-more-btn group"
                          href="#contact"
                          onClick={handleContactClick}
                        >
                          Get Started &nbsp;
                          <MdArrowRightAlt
                            size={20}
                            className="arrow-read-more arrow-nudge group-hover:translate-x-1"
                          />
                        </Link>
                      ) : (
                        <Link
                          className="absolute bottom-0 text-[14px] text-ersPrimary !font-[400] font-poppins flex items-center pb-4 read-more-btn group"
                          href="/services"
                        >
                          Learn More &nbsp;
                          <MdArrowRightAlt
                            size={20}
                            className="arrow-read-more arrow-nudge group-hover:translate-x-1"
                          />
                        </Link>
                      )}
                    </Box>
                  </Box>
                </Grid>
              );
            })}
            {page === "services" && (
              <>
                <Grid item xs={12} sm={6} md={6} lg={4}></Grid>
                <Grid item xs={12} sm={6} md={6} lg={4}>
                  <Box className="card service-7th-card card-hover-lift relative shadow p-4 rounded-[10px] services-shadow bg-white">
                    <Box className="card-body h-[300px] min-h-full">
                      <Box className="service-icon-circle bg-[rgba(41,188,241,0.1)] rounded-[50%] w-[100px] h-[100px] flex justify-center items-center mb-6">
                        <Image
                          src={TechnicalSupport}
                          className="w-[40%] object-cover"
                          alt="Technical support service icon"
                        />
                      </Box>
                      <Box className="block text-start">
                        <Typography
                          className="!text-lg !font-[500] text-start font-poppins"
                          variant="h6"
                          component="h3"
                          gutterBottom
                        >
                          {"Technical Support"}
                        </Typography>
                        <Typography
                          className="!text-[14px] !font-[400] !leading-normal font-poppins"
                          variant="subtitle1"
                          component={"p"}
                          gutterBottom
                        >
                          We provide reliable technical support to ensure your
                          systems run smoothly, addressing issues promptly and
                          enhancing overall efficiency.
                        </Typography>
                      </Box>
                      <Link
                        className="absolute bottom-0 text-[14px] text-ersPrimary !font-[400] font-poppins flex items-center pb-4 read-more-btn group"
                        href="#contact"
                        onClick={handleContactClick}
                      >
                        Get Started &nbsp;
                        <MdArrowRightAlt
                          size={20}
                          className="arrow-read-more arrow-nudge group-hover:translate-x-1"
                        />
                      </Link>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={4}></Grid>
              </>
            )}
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default OurServices;
