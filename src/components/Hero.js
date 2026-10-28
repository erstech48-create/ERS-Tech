import React from "react";
import { Box, Divider, Typography, Button } from "@mui/material";
import ROneImg from "@/../public/assets/images/hero-graphic.png";
import RTwoImg from "@/../public/assets/images/hero-graphic-two.png";
import Image from "next/image";
function Hero() {
  return (
    <>
      <Box className="hero-bg">
        <Box className="container lg:px-0 px-10">
          <Box className="relative xl:h-[700px] lg:h-[700px] md:h-[600px] sm:h-[600px] xsm:h-[600px] xxs:h-[600px] xxxs:h-[600px]">
            <Box className="home-content-box">
              <Box className="flex items-center justify-content-start gap-[0.5rem] mb-3">
                <Divider className="bg-white w-[20px] !border-[1px]opacity-80 " />
                <Typography
                  className="text-white !text-lg !font-[400] !leading-[140%] !tracking-[-0.16px] !mb-0 opacity-80 font-poppins"
                  variant="subtitle"
                  component="p"
                  gutterBottom
                >
                  ERS TECH
                </Typography>
              </Box>
              <Typography
                component="h1"
                gutterBottom
                className="!mb-3"
              >
                <span className="block xl:!text-2xl lg:!text-2xl md:!text-2xl sm:!text-2xl xsm:!text-2xl xxs:!text-2xl xxxs:!text-xl !font-medium !leading-[150%] !tracking-[-0.16px] text-white !mb-3 font-poppins">
                  Transform Your Ideas Into
                </span>
                <span className="block !text-white xl:!text-[4.2rem] lg:!text-[2.7rem] md:!text-6xl sm:!text-5xl xsm:!text-5xl xxs:!text-5xl xxxs:!text-4xl !font-[600] !leading-[150%] !tracking-[-0.16px] uppercase font-poppins">
                  Intelligent solutions
                </span>
              </Typography>
              <Typography
                variant="overline"
                className="font-poppins text-white !text-xl !font-[400] leading-[140%] tracking-[-0.16px]"
              >
                YOUR VISION , OUR CODE!!!!
              </Typography>
            </Box>
            <Button className="font-poppins shadow-xl !normal-case !w-[160px] !rounded-[50px] !bg-white !text-base !py-2 !px-4 font-medium	 !leading-[140%] !text-[#3CB7EE] !absolute top-[70%] left-[1%] hover:!bg-[#29bcf1] hover:!text-[#fff]">
              View our work
            </Button>
            <Box className="right-side-visual xl:block lg:block md:block sm:hidden xsm:hidden xxs:hidden xxxs:hidden">
              <Box className="xl:h-[350px] lg:h-[320px] md:h-[250px] sm:h-[320px] xsm:h-[320px] xxs:h-[320px] xxxs:h-[320px] xl:w-[350px] lg:w-[320px] md:w-[250px] sm:w-[320px] xsm:w-[320px] xxs:w-[320px] xxxs:w-[320px] bg-white border-[3px] border-[rgba(41,188,241,0.6)] rounded-[10px] right-one-visual flex justify-center items-center z-[1]">
                <Image
                  src={ROneImg}
                  className="w-[80%] object-cover"
                  priority
                  alt="Software development showcase graphic"
                />
              </Box>
              <Box className="xl:h-[210px] lg:h-[210px] md:h-[165px] sm:h-[210px] xsm:h-[210px] xxs:h-[210px] xxxs:h-[210px] xl:w-[300px] lg:w-[300px] md:w-[230px] sm:w-[300px] xsm:w-[300px] xxs:w-[300px] xxxs:w-[300px] bg-white border-[3px] border-[rgba(41,188,241,0.6)] rounded-[10px] right-two-visual flex justify-center items-center z-[1]">
                <Image
                  src={RTwoImg}
                  className="w-[70%] object-cover"
                  priority
                  alt="Fintech dashboard illustration"
                />
              </Box>
              <Box className="backward-border xl:h-[460px] lg:h-[460px] md:h-[320px] sm:h-[410px] xsm:h-[410px] xxs:h-[410px] xxxs:h-[410px] xl:w-[340px] lg:w-[300px] md:w-[242px] sm:w-[320px] xsm:w-[320px] xxs:w-[320px] xxxs:w-[320px]"></Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Hero;
