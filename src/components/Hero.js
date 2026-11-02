import React from "react";
import { Box, Divider, Typography, Button } from "@mui/material";
import Link from "next/link";
import ROneImg from "@/../public/assets/images/hero-graphic.webp";
import RTwoImg from "@/../public/assets/images/hero-graphic-two.webp";
import Image from "next/image";
function Hero() {
  return (
    <>
      <Box className="hero-bg">
        <Box className="container lg:px-0 px-10">
          <Box className="relative xxl:h-[700px] xl:h-[600px] lg:h-[560px] md:h-[500px] sm:h-[600px] xsm:h-[600px] xxs:h-[600px] xxxs:h-[600px]">
            <Box className="home-content-box max-w-[55%] xl:max-w-[58%] lg:max-w-[55%]">
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
                <span className="block xxl:!text-2xl xl:!text-xl lg:!text-lg md:!text-lg sm:!text-lg xsm:!text-lg xxs:!text-base xxxs:!text-base !font-medium !leading-[150%] !tracking-[-0.16px] text-white !mb-2 font-poppins">
                  Transform Your Ideas Into
                </span>
                <span className="block !text-white xxl:!text-[4.2rem] xl:!text-[2.85rem] lg:!text-[2.35rem] md:!text-4xl sm:!text-3xl xsm:!text-3xl xxs:!text-2xl xxxs:!text-2xl !font-[600] !leading-[120%] !tracking-[-0.16px] uppercase font-poppins">
                  Intelligent Solutions
                </span>
              </Typography>
              <Typography
                variant="overline"
                className="font-poppins text-white xxl:!text-xl xl:!text-base lg:!text-sm !font-[400] leading-[140%] tracking-[-0.16px]"
              >
                YOUR VISION, OUR CODE.
              </Typography>
            </Box>
            <Button
              component={Link}
              href="/portfolio"
              className="font-poppins shadow-xl !normal-case !w-[160px] !rounded-[50px] !bg-white !text-base !py-2 !px-4 font-medium !leading-[140%] !text-[#3CB7EE] !absolute xxl:top-[70%] xl:top-[74%] lg:top-[76%] top-[78%] left-[1%] hover:!bg-[#29bcf1] hover:!text-[#fff]"
            >
              View Our Work
            </Button>
            <Box className="right-side-visual xl:block lg:block md:block sm:hidden xsm:hidden xxs:hidden xxxs:hidden">
              <Box className="xxl:h-[350px] xxl:w-[350px] xl:h-[265px] xl:w-[265px] lg:h-[240px] lg:w-[240px] md:h-[200px] md:w-[200px] bg-white border-[3px] border-[rgba(41,188,241,0.6)] rounded-[10px] right-one-visual flex justify-center items-center z-[1]">
                <Image
                  src={ROneImg}
                  className="w-[80%] object-cover"
                  priority
                  unoptimized
                  placeholder="blur"
                  alt="Software development showcase graphic"
                />
              </Box>
              <Box className="xxl:h-[210px] xxl:w-[300px] xl:h-[160px] xl:w-[225px] lg:h-[145px] lg:w-[205px] md:h-[125px] md:w-[170px] bg-white border-[3px] border-[rgba(41,188,241,0.6)] rounded-[10px] right-two-visual flex justify-center items-center z-[1]">
                <Image
                  src={RTwoImg}
                  className="w-[70%] object-cover"
                  priority
                  unoptimized
                  placeholder="blur"
                  alt="Fintech dashboard illustration"
                />
              </Box>
              <Box className="backward-border xxl:h-[460px] xxl:w-[340px] xl:h-[350px] xl:w-[255px] lg:h-[320px] lg:w-[230px] md:h-[260px] md:w-[190px]"></Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Hero;
