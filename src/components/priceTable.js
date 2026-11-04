import React, { useEffect, useRef } from "react";
import {
  Box,
  Divider,
  Grid,
  ListItem,
  List,
  Typography,
  Button,
} from "@mui/material";
import Support from "@/../public/assets/images/support.png";
import Team from "@/../public/assets/images/teamwork.png";
import Customdevelop from "@/../public/assets/images/graphic-design.png";
import Image from "next/image";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { useLenis } from "@/components/motion/SmoothScroll";
import SplitHeading from "@/components/motion/SplitHeading";
import Reveal from "@/components/motion/Reveal";

function PriceTable() {
  const rootRef = useRef(null);
  const { scrollTo } = useLenis();

  const scrollToContact = () => {
    const contactElem = document.getElementById("contact");
    if (contactElem) {
      scrollTo("#contact", { offset: -90 });
    } else {
      window.location.hash = "#contact";
    }
  };

  useEffect(() => {
    if (prefersReducedMotion() || !rootRef.current) return;

    const ctx = gsap.context(() => {
      const cards = rootRef.current.querySelectorAll(".pricing-plan-card");
      if (cards.length) {
        gsap.set(cards, { opacity: 0, y: 50 });

        ScrollTrigger.batch(cards, {
          start: "top 80%",
          once: true,
          onEnter: (batch) => {
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.12,
              ease: "power3.out",
            });

            // Middle card extra scale pop
            const middleCard = batch[1];
            if (middleCard) {
              gsap.fromTo(
                middleCard,
                { scale: 0.96 },
                { scale: 1, duration: 0.8, ease: "back.out(1.5)" }
              );
            }

            // Icon circles pop
            const icons = batch.map((c) => c.querySelector(".ptable-circle")).filter(Boolean);
            if (icons.length) {
              gsap.fromTo(
                icons,
                { scale: 0.7 },
                { scale: 1, duration: 0.6, stagger: 0.1, ease: "back.out(2)" }
              );
            }

            // Dividers draw from left
            const dividers = batch.map((c) => c.querySelector(".pricing-divider")).filter(Boolean);
            if (dividers.length) {
              gsap.fromTo(
                dividers,
                { scaleX: 0, transformOrigin: "left center" },
                { scaleX: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" }
              );
            }

            // List items stagger x -10 -> 0
            batch.forEach((c) => {
              const items = c.querySelectorAll(".price-item");
              if (items.length) {
                gsap.fromTo(
                  items,
                  { opacity: 0, x: -10 },
                  { opacity: 1, x: 0, duration: 0.4, stagger: 0.06, ease: "power2.out" }
                );
              }
            });
          },
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, [scrollTo]);

  return (
    <>
      <Box
        ref={rootRef}
        className="4xl:!container xxxl:!container xxl:!container xl:!container lg:!container md:!container sm:max-w-full xsm:max-w-full xxs:max-w-full xxxs:max-w-full bg-[rgba(222,233,251,0.3)] pb-16 mb-16 overflow-hidden"
      >
        <Box className="mx-auto w-[1305px] max-w-full">
          <Box className="block text-center pt-8 pb-12 w-[70%] m-auto mb-8">
            <Typography
              className="capitalize !text-3xl !font-[600] font-poppins !leading-[140%] !tracking-[-0.16px] text-center"
              variant="h2"
              component={"h2"}
              gutterBottom
            >
              <SplitHeading as="span">Choose Your </SplitHeading>
              <span className="text-ersPrimary">
                <SplitHeading as="span">Plan</SplitHeading>
              </span>
            </Typography>
            <Reveal direction="up" distance={20} delay={0.2}>
              <Typography
                className="!text-sm !font-[400] font-poppins !leading-[140%] !tracking-[-0.16px] text-center"
                variant="subtitle1"
                component={"p"}
                gutterBottom
              >
                Choose the right plan and get access to high-quality services and
                expert support that will help your business succeed. Explore our
                pricing options and find the perfect fit for your goals!
              </Typography>
            </Reveal>
          </Box>
          <Box className="w-[80%] max-w-full mx-auto">
            <Grid container spacing={2} rowGap={8}>
              {/* Plan 1: Technical Support */}
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <Box className="pricing-plan-card pricing-card-hover bg-white shadow-xl rounded-[25px] mx-auto relative h-[600px] min-h-[95%] ba z-[1] border border-transparent">
                  <Box className="h-[70px]">
                    <Box className="w-[100px] h-[100px] rounded-[50px] flex justify-center items-center bg-gradient-to-b from-[#27B4EE] to-[#115DCE] ptable-circle shadow-md">
                      <Image
                        src={Support}
                        className="w-[50%] object-cover"
                        alt="Technical Support plan icon"
                      />
                    </Box>
                  </Box>
                  <Typography
                    variant="h5"
                    className="text-center capitalize !text-xl !font-[500] font-poppins !leading-[140%] !tracking-[-0.16px] !mb-0"
                  >
                    Technical Support
                  </Typography>
                  <Box className="mx-4 py-4">
                    <Divider className="pricing-divider !border-[rgba(112,112,112,0.3)]" />
                  </Box>
                  <Box className="py-4 px-6">
                    <List className="price-list">
                      <ListItem className="price-item">
                        <Typography
                          variant="subtitle2"
                          className="font-poppins !font-[500] !text-[14px] !leading-[180%] !tracking-[-0.16px]"
                        >
                          24/7 support for any technical issues
                        </Typography>
                      </ListItem>
                      <ListItem className="price-item">
                        <Typography
                          variant="subtitle2"
                          className="font-poppins !font-[500] !text-[14px] !leading-[180%] !tracking-[-0.16px]"
                        >
                          Troubleshooting and issue resolution
                        </Typography>
                      </ListItem>
                      <ListItem className="price-item">
                        <Typography
                          variant="subtitle2"
                          className="font-poppins !font-[500] !text-[14px] !leading-[180%] !tracking-[-0.16px]"
                        >
                          Regular system monitoring and maintenance
                        </Typography>
                      </ListItem>
                      <ListItem className="price-item">
                        <Typography
                          variant="subtitle2"
                          className="font-poppins !font-[500] !text-[14px] !leading-[180%] !tracking-[-0.16px]"
                        >
                          Fast response times to ensure minimal downtime
                        </Typography>
                      </ListItem>
                    </List>
                  </Box>
                  <Box className="text-center absolute bottom-0 left-[50%] transform -translate-x-[50%] -translate-y-[100%]">
                    <Button
                      type="button"
                      size="medium"
                      onClick={scrollToContact}
                      className="bg-gradient-to-r from-[#29BCF1] to-[#0F53CE] !text-white !px-6 !rounded-[50px] !capitalize !w-[150px] !text-base !font-[500] font-poppins !leading-[140%] !tracking-[-0.16px] send-msg-btn cursor-pointer shadow-lg hover:scale-105 transition-transform"
                    >
                      Get a Quote
                    </Button>
                  </Box>
                </Box>
              </Grid>

              {/* Plan 2: Custom Development (Middle Card) */}
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <Box className="pricing-plan-card pricing-card-hover bg-white shadow-xl rounded-[25px] mx-auto relative h-[600px] min-h-[95%] ba z-[1] border border-transparent">
                  <Box className="h-[70px]">
                    <Box className="w-[100px] h-[100px] rounded-[50px] flex justify-center items-center bg-gradient-to-b from-[#27B4EE] to-[#115DCE] ptable-circle shadow-md">
                      <Image
                        src={Customdevelop}
                        className="w-[50%] object-cover"
                        alt="Custom Development plan icon"
                      />
                    </Box>
                  </Box>
                  <Typography
                    variant="h5"
                    className="text-center capitalize !text-xl !font-[500] font-poppins !leading-[140%] !tracking-[-0.16px] !mb-0"
                  >
                    Custom Development
                  </Typography>
                  <Box className="mx-4 py-4">
                    <Divider className="pricing-divider !border-[rgba(112,112,112,0.3)]" />
                  </Box>
                  <Box className="py-4 px-6">
                    <List className="price-list">
                      <ListItem className="price-item">
                        <Typography
                          variant="subtitle2"
                          className="font-poppins !font-[500] !text-[14px] !leading-[180%] !tracking-[-0.16px]"
                        >
                          Tailored solutions based on your project requirements
                        </Typography>
                      </ListItem>
                      <ListItem className="price-item">
                        <Typography
                          variant="subtitle2"
                          className="font-poppins !font-[500] !text-[14px] !leading-[180%] !tracking-[-0.16px]"
                        >
                          End-to-end development, from planning to execution
                        </Typography>
                      </ListItem>
                      <ListItem className="price-item">
                        <Typography
                          variant="subtitle2"
                          className="font-poppins !font-[500] !text-[14px] !leading-[180%] !tracking-[-0.16px]"
                        >
                          Flexible pricing depending on the project scope
                        </Typography>
                      </ListItem>
                      <ListItem className="price-item">
                        <Typography
                          variant="subtitle2"
                          className="font-poppins !font-[500] !text-[14px] !leading-[180%] !tracking-[-0.16px]"
                        >
                          Regular progress reviews and collaboration with your team
                        </Typography>
                      </ListItem>
                    </List>
                  </Box>
                  <Box className="text-center absolute bottom-0 left-[50%] transform -translate-x-[50%] -translate-y-[100%]">
                    <Button
                      type="button"
                      size="medium"
                      onClick={scrollToContact}
                      className="bg-gradient-to-r from-[#29BCF1] to-[#0F53CE] !text-white !px-6 !rounded-[50px] !capitalize !w-[150px] !text-base !font-[500] font-poppins !leading-[140%] !tracking-[-0.16px] send-msg-btn cursor-pointer shadow-lg hover:scale-105 transition-transform"
                    >
                      Get a Quote
                    </Button>
                  </Box>
                </Box>
              </Grid>

              {/* Plan 3: Dedicated Team */}
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <Box className="pricing-plan-card pricing-card-hover bg-white shadow-xl rounded-[25px] mx-auto relative h-[600px] min-h-[95%] ba z-[1] border border-transparent">
                  <Box className="h-[70px]">
                    <Box className="w-[100px] h-[100px] rounded-[50px] flex justify-center items-center bg-gradient-to-b from-[#27B4EE] to-[#115DCE] ptable-circle shadow-md">
                      <Image
                        src={Team}
                        className="w-[50%] object-cover"
                        alt="Dedicated Team plan icon"
                      />
                    </Box>
                  </Box>
                  <Typography
                    variant="h5"
                    className="text-center capitalize !text-xl !font-[500] font-poppins !leading-[140%] !tracking-[-0.16px] !mb-0"
                  >
                    Hire a Dedicated Team
                  </Typography>
                  <Box className="mx-4 py-4">
                    <Divider className="pricing-divider !border-[rgba(112,112,112,0.3)]" />
                  </Box>
                  <Box className="py-4 px-6">
                    <List className="price-list">
                      <ListItem className="price-item">
                        <Typography
                          variant="subtitle2"
                          className="font-poppins !font-[500] !text-[14px] !leading-[180%] !tracking-[-0.16px]"
                        >
                          Access to a team of skilled professionals
                        </Typography>
                      </ListItem>
                      <ListItem className="price-item">
                        <Typography
                          variant="subtitle2"
                          className="font-poppins !font-[500] !text-[14px] !leading-[180%] !tracking-[-0.16px]"
                        >
                          Custom resource allocation based on your needs
                        </Typography>
                      </ListItem>
                      <ListItem className="price-item">
                        <Typography
                          variant="subtitle2"
                          className="font-poppins !font-[500] !text-[14px] !leading-[180%] !tracking-[-0.16px]"
                        >
                          Full transparency with daily and weekly updates
                        </Typography>
                      </ListItem>
                      <ListItem className="price-item">
                        <Typography
                          variant="subtitle2"
                          className="font-poppins !font-[500] !text-[14px] !leading-[180%] !tracking-[-0.16px]"
                        >
                          Flexible engagement model, from short-term to long-term
                        </Typography>
                      </ListItem>
                    </List>
                  </Box>
                  <Box className="text-center absolute bottom-0 left-[50%] transform -translate-x-[50%] -translate-y-[100%]">
                    <Button
                      type="button"
                      size="medium"
                      onClick={scrollToContact}
                      className="bg-gradient-to-r from-[#29BCF1] to-[#0F53CE] !text-white !px-6 !rounded-[50px] !capitalize !w-[150px] !text-base !font-[500] font-poppins !leading-[140%] !tracking-[-0.16px] send-msg-btn cursor-pointer shadow-lg hover:scale-105 transition-transform"
                    >
                      Get a Quote
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default PriceTable;
