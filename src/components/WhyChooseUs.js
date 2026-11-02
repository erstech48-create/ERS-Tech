import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import Innovation from "@/../public/assets/images/innovation.png";
import quality from "@/../public/assets/images/quality.png";
import teamwork from "@/../public/assets/images/teamwork.png";
import support from "@/../public/assets/images/support.png";
import TeamMember from "@/../public/assets/icons/boss.png";
import TopLeft from "@/../public/assets/images/top-left.png";
import BottomRight from "@/../public/assets/images/bottom-right.png";
import Image from "next/image";
function WhyChooseUs() {
  return (
    <>
      <Box className="4xl:!container xxxl:!container xxl:!container xl:!container lg:!container md:!container sm:max-w-full xsm:max-w-full xxs:max-w-full xxxs:max-w-full relative mb-[4rem]">
        <Box className="block text-center py-6">
          <Typography
            className="capitalize !text-3xl !font-[600] font-poppins !leading-[140%] !tracking-[-0.16px] text-center"
            variant="h2"
            component={"h2"}
            gutterBottom
          >
            Why Choose <span className="text-ersPrimary">Us?</span>
          </Typography>
        </Box>
        <Box className="w-[90%] max-w-full mx-auto mt-[6rem] choose-us pb-[5rem]">
          <Grid container spacing={4} mb={20} rowGap={6}>
            <Grid item xx={12} sm={6} md={6} lg={3}>
              <Box className="bg-white border-[3px] border-[#C1ECFB] rounded-[15px] h-[350px] min-h-full relative p-4">
                <Box className="h-[50px]">
                  <Box className="w-[110px] h-[110px] bg-gradient-to-r from-[#27B4EE] to-[#115DCE] rounded-[50%] flex justify-center items-center absolute -top-[18%] left-[50%] -translate-x-[50%]">
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
                  className="!text-sm !font-[400] font-poppins !leading-[170%] !tracking-[-0.16px] text-center"
                >
                  We are more than just thinkers, we are doers who take
                  actionable steps to turn big ideas into reality. By leveraging
                  our expertise, strategic planning, and attention to detail, we
                  ensure every project is unique, impactful, and successful.
                </Typography>
              </Box>
            </Grid>
            <Grid item xx={12} sm={6} md={6} lg={3}>
              <Box className="bg-white border-[3px] border-[#C1ECFB] rounded-[15px] h-[350px] min-h-full relative p-4">
                <Box className="h-[50px]">
                  <Box className="w-[110px] h-[110px] bg-gradient-to-r from-[#27B4EE] to-[#115DCE] rounded-[50%] flex justify-center items-center absolute -top-[18%] left-[50%] -translate-x-[50%]">
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
                  className="!text-sm !font-[400] font-poppins !leading-[170%] !tracking-[-0.16px] text-center"
                >
                  Our dedication to quality ensures that every solution we
                  deliver is not only exceptional but also contributes to growth
                  and long-term success. With a focus on detail and excellence,
                  we aim to make every project a stepping stone to greater
                  achievements.
                </Typography>
              </Box>
            </Grid>
            <Grid item xx={12} sm={6} md={6} lg={3}>
              <Box className="bg-white border-[3px] border-[#C1ECFB] rounded-[15px] h-[350px] min-h-full relative p-4">
                <Box className="h-[50px]">
                  <Box className="w-[110px] h-[110px] bg-gradient-to-r from-[#27B4EE] to-[#115DCE] rounded-[50%] flex justify-center items-center absolute -top-[18%] left-[50%] -translate-x-[50%]">
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
                  className="!text-sm !font-[400] font-poppins !leading-[170%] !tracking-[-0.16px] text-center"
                >
                  Collaboration and organization are at the heart of everything
                  we do. By working together with a structured approach, we
                  maximize efficiency and creativity, ensuring that every task
                  is handled with precision and professionalism.
                </Typography>
              </Box>
            </Grid>
            <Grid item xx={12} sm={6} md={6} lg={3}>
              <Box className="bg-white border-[3px] border-[#C1ECFB] rounded-[15px] h-[350px] min-h-full relative p-4">
                <Box className="h-[50px]">
                  <Box className="w-[110px] h-[110px] bg-gradient-to-r from-[#27B4EE] to-[#115DCE] rounded-[50%] flex justify-center items-center absolute -top-[18%] left-[50%] -translate-x-[50%]">
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
                  className="!text-sm !font-[400] font-poppins !leading-[170%] !tracking-[-0.16px] text-center"
                >
                  We are always here for you. Our round-the-clock support
                  ensures that you never face challenges alone. Whether it’s
                  troubleshooting or guidance, our team is ready to assist you
                  anytime, anywhere.
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Box className="w-full py-8 px-4">
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
                className="!text-[14px] !font-[500] font-poppins leading-[160%] tracking-[-0.16px] !pb-2 !mb-0"
              >
                Welcome to ERS TECH.
              </Typography>
              <Typography
                variant="subtitle1"
                component={"p"}
                gutterBottom
                className="!text-[14px] !font-[400] font-poppins !leading-[200%] !mb-3"
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
                className="!text-[14px] !font-[500] font-poppins leading-[160%] tracking-[-0.16px] !pb-0 !mb-0"
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
              <Box className="flex items-center gap-4">
                <Box className="h-[50px] w-[50px] bg-gradient-to-r from-[#29BCF1] to-[#1057CF] rounded-[50px] flex justify-center items-center overflow-hidden">
                  <Image
                    src={TeamMember}
                    className="w-[50px] object-cover translate-y-[4px]"
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
                    className="!text-[13px] !font-[400] font-poppins !text-ersPrimary !leading-[140%] !tracking-[-0.16px]"
                  >
                    Chief Executive Officer{" "}
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
