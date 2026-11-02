import React, { useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import cv1 from "@/../public/assets/images/cv1.png";
import cv2 from "@/../public/assets/images/cv2.png";
import cv3 from "@/../public/assets/images/cv3.png";
import cv4 from "@/../public/assets/images/cv4.png";
import cv5 from "@/../public/assets/images/cv5.png";
import cv6 from "@/../public/assets/images/cv6.png";
import Qmark from "@/../public/assets/images/qmark.png";
import dynamic from "next/dynamic";
const RequestQueryForm = dynamic(() => import("./RequestQueryForm"));

import Image from "next/image";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import Reveal from "@/components/motion/Reveal";

const valuesData = [
  { img: cv1, title: "Innovation", desc: "Creative solutions for modern challenges." },
  { img: cv2, title: "Sincerity", desc: "Transparency you can trust." },
  { img: cv3, title: "Teamwork", desc: "Collaboration drives our success." },
  { img: cv4, title: "Excellence", desc: "Delivering beyond expectations." },
  { img: cv5, title: "Fast Delivery", desc: "Timely solutions, every time." },
  { img: cv6, title: "Dedicated Support", desc: "Reliable assistance, always." },
];

function CoreValues() {
  const rootRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion() || !rootRef.current) return;

    const ctx = gsap.context(() => {
      // Dots background parallax y +-30
      const dots = rootRef.current.querySelector(".dots-bg-img");
      if (dots) {
        gsap.fromTo(
          dots,
          { y: -30 },
          {
            y: 30,
            ease: "none",
            scrollTrigger: {
              trigger: dots,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
            },
          }
        );
      }

      // 6 values stagger in 2 columns with icon pop
      const items = rootRef.current.querySelectorAll(".value-item-box");
      if (items.length) {
        gsap.set(items, { opacity: 0, y: 30 });
        ScrollTrigger.batch(items, {
          start: "top 85%",
          once: true,
          onEnter: (batch) => {
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.08,
              ease: "power3.out",
            });
            const icons = batch.map((b) => b.querySelector(".value-icon-img")).filter(Boolean);
            if (icons.length) {
              gsap.fromTo(
                icons,
                { scale: 0.7 },
                { scale: 1, duration: 0.5, stagger: 0.08, ease: "back.out(2)" }
              );
            }
          },
        });
      }

      // Qmark scale .9->1 and rotate -4->0
      const qmark = rootRef.current.querySelector(".qmark-img-visual");
      if (qmark) {
        gsap.fromTo(
          qmark,
          { opacity: 0, scale: 0.9, rotate: -4 },
          {
            opacity: 1,
            scale: 1,
            rotate: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: qmark,
              start: "top 80%",
              once: true,
            },
          }
        );
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Box ref={rootRef} className="!mb-[5rem] overflow-hidden">
        <Box className="relative h-[100px]">
          <Box className="dots-bg-img"></Box>
        </Box>
        <Box className="block text-center pb-14 w-[70%] m-auto">
          <Reveal direction="up" distance={25}>
            <Typography
              className="capitalize !text-3xl !font-[600] font-poppins !leading-[140%] text-center"
              variant="h2"
              component={"h2"}
              gutterBottom
            >
              Our <span className="text-ersPrimary">Core Values</span>
            </Typography>
            <Typography
              className="!text-base !font-[400] font-poppins !leading-[130%] !tracking-[-0.16px]"
              variant="subtitle1"
              component={"p"}
              gutterBottom
            >
              At the heart of our company lies a set of core values that define
              who we are and guide how we work.
            </Typography>
          </Reveal>
        </Box>
        <Grid container className="!w-10/12 !mx-auto mb-16">
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={12} md={8} lg={8}>
              <List>
                <Grid container spacing={2}>
                  {valuesData.map((val, idx) => (
                    <Grid key={idx} item xs={12} sm={6} md={6} lg={6}>
                      <ListItem className="value-item-box">
                        <Box className="flex items-start justify-start gap-4">
                          <ListItemIcon className="justify-center">
                            <Image
                              src={val.img}
                              className="value-icon-img w-[35px] block object-cover"
                              alt=""
                            />
                          </ListItemIcon>
                          <ListItemText
                            className="!mt-0"
                            sx={{
                              ".MuiListItemText-primary": {
                                fontSize: "16px",
                                marginBottom: "0.3rem",
                                fontWeight: 600,
                                fontFamily: "Poppins, sans-serif",
                                lineHeight: "140%",
                                letterSpacing: "-0.16px",
                              },
                              ".MuiListItemText-secondary": {
                                fontSize: "14px",
                                fontWeight: 400,
                                fontFamily: "Poppins, sans-serif",
                                lineHeight: "140%",
                                letterSpacing: "-0.16px",
                              },
                            }}
                            primary={val.title}
                            secondary={val.desc}
                          />
                        </Box>
                      </ListItem>
                    </Grid>
                  ))}
                </Grid>
              </List>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <Image
                src={Qmark}
                className="qmark-img-visual lg:w-full lg:h-full md:w-1/2 object-cover lg:mx-0 md:mx-auto"
                alt="ERS TECH core values illustration"
              />
            </Grid>
          </Grid>
        </Grid>
        <RequestQueryForm />
      </Box>
    </>
  );
}

export default CoreValues;
