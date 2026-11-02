import React, { useEffect, useRef } from "react";
import { Box, Typography, Grid } from "@mui/material";
import Innovation from "@/../public/assets/images/innovation.png";
import quality from "@/../public/assets/images/quality.png";
import teamwork from "@/../public/assets/images/teamwork.png";
import support from "@/../public/assets/images/support.png";
import TeamMember from "@/../public/assets/icons/boss.png";
import TopLeft from "@/../public/assets/images/top-left.png";
import BottomRight from "@/../public/assets/images/bottom-right.png";
import Image from "next/image";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import Reveal from "@/components/motion/Reveal";

function WhyChooseUs() {
  const rootRef = useRef(null);
  const ceoCardRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion() || !rootRef.current) return;

    const ctx = gsap.context(() => {
      // 4 cards stagger fade-up
      const cards = rootRef.current.querySelectorAll(".choose-card-item");
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
              stagger: 0.1,
              ease: "power3.out",
            });

            // One-time icon ring pulse
            const icons = batch.map((c) => c.querySelector(".choose-icon-badge")).filter(Boolean);
            if (icons.length) {
              gsap.fromTo(
                icons,
                { scale: 0.8 },
                { scale: 1, duration: 0.6, stagger: 0.1, ease: "back.out(2)" }
              );
            }
          },
        });
      }

      // CEO Leadership popup card scrub
      if (ceoCardRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ceoCardRef.current,
            start: "top 85%",
            end: "bottom 20%",
            scrub: 0.6,
          },
        });

        tl.fromTo(
          ceoCardRef.current,
          { scale: 0.85, opacity: 0.3 },
          { scale: 1, opacity: 1, duration: 0.4, ease: "power2.out" }
        ).to(ceoCardRef.current, {
          scale: 0.97,
          duration: 0.3,
          ease: "power2.in",
        });

        // Photo clip-path reveal
        const ceoPhoto = ceoCardRef.current.querySelector(".ceo-avatar-img");
        if (ceoPhoto) {
          gsap.fromTo(
            ceoPhoto,
            { clipPath: "inset(100% 0 0 0)" },
            {
              clipPath: "inset(0% 0 0 0)",
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: ceoCardRef.current,
                start: "top 75%",
                once: true,
              },
            }
          );
        }
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Box
        ref={rootRef}
        className="4xl:!container xxxl:!container xxl:!container xl:!container lg:!container md:!container sm:max-w-full xsm:max-w-full xxs:max-w-full xxxs:max-w-full relative mb-[4rem] overflow-hidden"
      >
        <Box className="block text-center py-6">
          <Reveal direction="up" distance={25}>
            <Typography
              className="capitalize !text-3xl !font-[600] font-poppins !leading-[140%] !tracking-[-0.16px] text-center"
              variant="h2"
              component={"h2"}
              gutterBottom
            >
              Why Choose <span className="text-ersPrimary">Us?</span>
            </Typography>
          </Reveal>
        </Box>

        <Box className="w-[90%] max-w-full mx-auto mt-[6rem] choose-us pb-[5rem]">
          <Grid container spacing={4} mb={10} rowGap={6}>
            <Grid item xs={12} sm={6} md={6} lg={3}>
              <Box className="choose-card-item card-hover-lift bg-white border-[3px] border-[#C1ECFB] rounded-[15px] h-[350px] min-h-full relative p-4">
                <Box className="h-[50px]">
                  <Box className="choose-icon-badge w-[110px] h-[110px] bg-gradient-to-r from-[#27B4EE] to-[#115DCE] rounded-[50%] flex justify-center items-center absolute -top-[18%] left-[50%] -translate-x-[50%] shadow-lg">
                    <Image
                      src={Innovation}
                      className="w-[40%] object-cover"
                      alt=""
                    />
                  </Box>
                </Box>
                <Typography
                  variant="h6"
                  component="h3"
                  gutterBottom
                  className="!text-[18px] !font-[500] font-poppins !leading-[140%] !tracking-[-0.16px] text-center !mb-4"
                >
                  Innovators <br /> & Doers
                </Typography>
                <Typography
                  variant="body2"
                  component={"p"}
                  className="!text-sm !font-[400] font-poppins !leading-[170%] !tracking-[-0.16px] text-center text-gray-600"
                >
                  We are more than just thinkers, we are doers who take
                  actionable steps to turn big ideas into reality. By leveraging
                  our expertise, strategic planning, and attention to detail, we
                  ensure every project is unique, impactful, and successful.
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={3}>
              <Box className="choose-card-item card-hover-lift bg-white border-[3px] border-[#C1ECFB] rounded-[15px] h-[350px] min-h-full relative p-4">
                <Box className="h-[50px]">
                  <Box className="choose-icon-badge w-[110px] h-[110px] bg-gradient-to-r from-[#27B4EE] to-[#115DCE] rounded-[50%] flex justify-center items-center absolute -top-[18%] left-[50%] -translate-x-[50%] shadow-lg">
                    <Image
                      src={quality}
                      className="w-[40%] object-cover"
                      alt=""
                    />
                  </Box>
                </Box>
                <Typography
                  variant="h6"
                  component="h3"
                  gutterBottom
                  className="!text-[18px] !font-[500] font-poppins !leading-[140%] !tracking-[-0.16px] text-center !mb-4"
                >
                  Quality & <br /> Growth Focused
                </Typography>
                <Typography
                  variant="body2"
                  component={"p"}
                  className="!text-sm !font-[400] font-poppins !leading-[170%] !tracking-[-0.16px] text-center text-gray-600"
                >
                  Our dedication to quality ensures that every solution we
                  deliver is not only exceptional but also contributes to growth
                  and long-term success. With a focus on detail and excellence,
                  we aim to make every project a stepping stone to greater
                  achievements.
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={3}>
              <Box className="choose-card-item card-hover-lift bg-white border-[3px] border-[#C1ECFB] rounded-[15px] h-[350px] min-h-full relative p-4">
                <Box className="h-[50px]">
                  <Box className="choose-icon-badge w-[110px] h-[110px] bg-gradient-to-r from-[#27B4EE] to-[#115DCE] rounded-[50%] flex justify-center items-center absolute -top-[18%] left-[50%] -translate-x-[50%] shadow-lg">
                    <Image
                      src={teamwork}
                      className="w-[40%] object-cover"
                      alt=""
                    />
                  </Box>
                </Box>
                <Typography
                  variant="h6"
                  component="h3"
                  gutterBottom
                  className="!text-[18px] !font-[500] font-poppins !leading-[140%] !tracking-[-0.16px] text-center !mb-4"
                >
                  Teamwork & <br /> Organized Approach
                </Typography>
                <Typography
                  variant="body2"
                  component={"p"}
                  className="!text-sm !font-[400] font-poppins !leading-[170%] !tracking-[-0.16px] text-center text-gray-600"
                >
                  Collaboration and organization are at the heart of everything
                  we do. By working together with a structured approach, we
                  maximize efficiency and creativity, ensuring that every task
                  is handled with precision and professionalism.
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={3}>
              <Box className="choose-card-item card-hover-lift bg-white border-[3px] border-[#C1ECFB] rounded-[15px] h-[350px] min-h-full relative p-4">
                <Box className="h-[50px]">
                  <Box className="choose-icon-badge w-[110px] h-[110px] bg-gradient-to-r from-[#27B4EE] to-[#115DCE] rounded-[50%] flex justify-center items-center absolute -top-[18%] left-[50%] -translate-x-[50%] shadow-lg">
                    <Image
                      src={support}
                      className="w-[40%] object-cover"
                      alt=""
                    />
                  </Box>
                </Box>
                <Typography
                  variant="h6"
                  component="h3"
                  gutterBottom
                  className="!text-[18px] !font-[500] font-poppins !leading-[140%] !tracking-[-0.16px] text-center !mb-4"
                >
                  24/7 <br /> Support
                </Typography>
                <Typography
                  variant="body2"
                  component={"p"}
                  className="!text-sm !font-[400] font-poppins !leading-[170%] !tracking-[-0.16px] text-center text-gray-600"
                >
                  We are always here for you. Our round-the-clock support
                  ensures that you never face challenges alone. Whether it’s
                  troubleshooting or guidance, our team is ready to assist you
                  anytime, anywhere.
                </Typography>
              </Box>
            </Grid>
          </Grid>

          {/* CEO / Leadership Popup Card */}
          <Box
            ref={ceoCardRef}
            className="w-full py-8 px-6 bg-white border-2 border-[#C1ECFB] rounded-2xl shadow-xl will-change-transform"
          >
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
                className="!text-[15px] !font-[600] font-poppins leading-[160%] tracking-[-0.16px] !pb-2 !mb-0 text-ersPrimary"
              >
                Welcome to ERS TECH.
              </Typography>
              <Typography
                variant="subtitle1"
                component={"p"}
                gutterBottom
                className="!text-[14px] !font-[400] font-poppins !leading-[200%] !mb-3 text-gray-700"
              >
                Our mission is simple: to deliver innovative solutions that
                drive success. We focus on providing cutting-edge technology and
                personalized services that meet the unique needs of each client.
                With a team of dedicated professionals, we’re committed to
                staying ahead of the curve and helping our clients achieve their
                goals. Thank you for being part of our journey.
              </Typography>
              <Typography
                variant="subtitle1"
                component={"p"}
                gutterBottom
                className="!text-[14px] !font-[500] font-poppins leading-[160%] tracking-[-0.16px] !pb-0 !mb-0 text-gray-800"
              >
                Warm regards,
              </Typography>
              <Box className="flex justify-end items-start">
                <Image
                  src={BottomRight}
                  className="w-[30px] object-cover"
                  alt=""
                />
              </Box>
              <Box className="flex items-center gap-4 mt-2">
                <Box className="h-[56px] w-[56px] bg-gradient-to-r from-[#29BCF1] to-[#1057CF] rounded-full flex justify-center items-center overflow-hidden shadow-md">
                  <Image
                    src={TeamMember}
                    className="ceo-avatar-img w-[50px] object-cover translate-y-[4px]"
                    alt="Haider Ali Mughal, Chief Executive Officer at ERS TECH"
                  />
                </Box>
                <Box className="text-start">
                  <Typography
                    variant="h6"
                    component="h3"
                    className="!text-lg !font-[600] font-poppins !leading-[140%] !tracking-[-0.16px]"
                  >
                    Haider Ali Mughal
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    component={"p"}
                    className="!text-[13px] !font-[500] font-poppins !text-ersPrimary !leading-[140%] !tracking-[-0.16px]"
                  >
                    Chief Executive Officer
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default WhyChooseUs;
