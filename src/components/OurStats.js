import React, { useState, useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";
import Pen from "@/../public/assets/images/pen.png";
import Search from "@/../public/assets/images/search.png";
import Avatar from "@/../public/assets/images/avatar.png";
import Graph from "@/../public/assets/images/graph.png";
import Menu from "@/../public/assets/images/menu.png";
import { isIphone } from "../utils/DetectDevice";
import Image from "next/image";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import CountUp from "@/components/motion/CountUp";
import Reveal from "@/components/motion/Reveal";

function OurStats() {
  const rootRef = useRef(null);
  const totalProject = 600;
  const totalReviews = 100;
  const totalMembers = 50;
  const totalclients = 100;
  const totalCustomer = 97;

  const [projects] = useState(totalProject);
  const [reviews] = useState(totalReviews);
  const [members] = useState(totalMembers);
  const [clients] = useState(totalclients);
  const [customer] = useState(totalCustomer);

  useEffect(() => {
    if (prefersReducedMotion() || !rootRef.current) return;

    const ctx = gsap.context(() => {
      const circle = rootRef.current.querySelector(".custom-circle");
      const ring = rootRef.current.querySelector(".stats-svg-ring");
      const boxes = rootRef.current.querySelectorAll(".custom-box");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 70%",
          once: true,
        },
      });

      // 1) Center circle scale .6->1 + SVG ring draw
      if (circle) {
        tl.fromTo(
          circle,
          { scale: 0.6, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.7, ease: "back.out(1.7)" }
        );
      }

      if (ring) {
        tl.fromTo(
          ring,
          { strokeDashoffset: 400 },
          { strokeDashoffset: 0, duration: 0.8, ease: "power2.out" },
          "<0.1"
        );
      }

      // 2) 5 boxes animate outward from center (scale .7->1, stagger .1)
      if (boxes.length) {
        tl.fromTo(
          boxes,
          { scale: 0.7, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: "back.out(1.5)",
          },
          "-=0.4"
        );
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Box ref={rootRef} className="bg-[rgba(222,233,251,0.3)] Main_stats_row !mb-[5rem] overflow-hidden">
        <Box className="block text-center py-6">
          <Reveal direction="up" distance={25}>
            <Typography
              className="capitalize !text-3xl !font-[600] font-poppins !leading-[140%] !tracking-[-0.16px] text-center"
              variant="h2"
              component={"h2"}
              gutterBottom
            >
              Our <span className="text-ersPrimary">Stats</span>
            </Typography>
          </Reveal>
        </Box>
        <Box className="custom-statistics">
          <Box className="stats_box_inner">
            <Box className="custom-stats-section container-stat-box flex justify-center mt-5 pt-5">
              <Box className="ap_search_img relative">
                <div className="custom-circle relative overflow-visible">
                  <svg
                    className="absolute -inset-2 w-[calc(100%+16px)] h-[calc(100%+16px)] pointer-events-none"
                    viewBox="0 0 100 100"
                  >
                    <circle
                      className="stats-svg-ring"
                      cx="50"
                      cy="50"
                      r="46"
                      fill="none"
                      stroke="#26AFED"
                      strokeWidth="2.5"
                      strokeDasharray="400"
                      strokeDashoffset="0"
                    />
                  </svg>
                  <strong className={isIphone() ? "md:!text-base !text-sm" : ""}>
                    <CountUp value={10} />
                  </strong>
                  <p className={isIphone() ? "md:!text-sm !text-[8px]" : ""}>
                    Glorious <br /> Years
                  </p>
                </div>
                <div className="custom-boxes">
                  <div className="custom-box box-1">
                    <Image className="stat-img-lazyloaded" src={Pen} alt="" />
                    <div className="custom-values">
                      <div className="row-align">
                        <p className={isIphone() ? "md:!text-lg !text-lg" : ""}>
                          <CountUp value={projects} />
                        </p>{" "}
                        <span className={isIphone() ? "md:!text-lg !text-lg" : ""}>+</span>
                      </div>
                      <strong className={isIphone() ? "md:!text-base !text-[12px]" : ""}> Projects Completed</strong>
                    </div>
                  </div>
                  <div className="custom-box box-2">
                    <Image className="stat-img-lazyloaded" src={Search} alt="" />
                    <div className="custom-values">
                      <div className="row-align">
                        <p className={isIphone() ? "md:!text-lg !text-lg" : ""}>
                          <CountUp value={reviews} />
                        </p>{" "}
                        <span className={isIphone() ? "md:!text-lg !text-lg" : ""}>+</span>
                      </div>
                      <strong className={isIphone() ? "md:!text-base !text-[12px]" : ""}>Positive Reviews</strong>
                    </div>
                  </div>
                  <div className="custom-box box-5">
                    <Image className="stat-img-lazyloaded" src={Menu} alt="" />
                    <div className="custom-values">
                      <div className="row-align">
                        <p className={isIphone() ? "md:!text-lg !text-lg" : ""}>
                          <CountUp value={customer} />
                        </p>{" "}
                        <span className={isIphone() ? "md:!text-lg !text-lg" : ""}>%</span>
                      </div>
                      <strong className={isIphone() ? "md:!text-base !text-[12px]" : ""}>Customer Satisfaction </strong>
                    </div>
                  </div>
                  <div className="custom-box box-4">
                    <Image className="stat-img-lazyloaded" src={Graph} alt=""/>
                    <div className="custom-values">
                      <div className="row-align">
                        <p className={isIphone() ? "md:!text-lg !text-lg" : ""}>
                          <CountUp value={clients} />
                        </p>{" "}
                        <span className={isIphone() ? "md:!text-lg !text-lg" : ""}>+</span>
                      </div>
                      <strong className={isIphone() ? "md:!text-base !text-[12px]" : ""}> Happy Clients </strong>
                    </div>
                  </div>
                  <div className="custom-box box-3">
                    <Image className="stat-img-lazyloaded" src={Avatar} alt=""/>
                    <div className="custom-values">
                      <div className="row-align">
                        <p className={isIphone() ? "md:!text-lg !text-lg" : ""}>
                          <CountUp value={members} />
                        </p>{" "}
                        <span className={isIphone() ? "md:!text-lg !text-lg" : ""}>+</span>
                      </div>
                      <strong className={isIphone() ? "md:!text-base !text-[12px]" : ""}>Team Members</strong>
                    </div>
                  </div>
                </div>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default OurStats;
