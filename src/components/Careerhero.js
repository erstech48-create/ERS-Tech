import React from "react";
import { Box, Typography, Button } from "@mui/material";
import Image from "next/image";

function Careerhero({
  btnText,
  Mainheading,
  subHeading,
  img,
  top,
  subHeading2,
  width,
}) {
  return (
    <>
      <Box className={`hero-bg ${btnText === "Services" ?  "!mb-12" : "!mb-[0rem]"} `}>
        <Box className="container lg:px-0 px-10">
          <Box className="relative xl:h-[700px] lg:h-[700px] md:h-[700px] sm:h-[650px] xsm:h-[650px] xxs:h-[600px] xxxs:h-[600px]">
            <Box className="hero-component-multi z-[2]">
              <Button className="shadow-xl !w-[160px] !rounded-[50px] !bg-white !text-small !text-[#3CB7EE] !capitalize !mb-8 lg:!mb-9 hover:!bg-ersPrimary hover:!text-white !text-base !font-[500] font-poppins leading-[140%] !py-2">
                {btnText}
              </Button>
              <Typography
                className="career-hero-heading !text-white 2xl:!text-[3.5rem] xl:!text-[2.85rem] lg:!text-[2.35rem] md:!text-5xl sm:!text-4xl xsm:!text-3xl xxs:!text-3xl xxxs:!text-2xl !font-[600] uppercase font-poppins !mb-6 xl:!leading-[125%]"
                variant="h1"
                component="h1"
                gutterBottom
              >
                <div dangerouslySetInnerHTML={{ __html: Mainheading }} />
              </Typography>
              <Typography
                variant="subtitle1"
                component={"p"}
                className="text-white xl:!text-base lg:!text-sm md:!text-[14px] sm:!text-[14px] xsm:!text-[14px] xxs:!text-[13px] xxxs:!text-[12px] !font-[400] font-poppins xl:!leading-[160%] !mb-4 max-w-[95%] sm:max-w-full"
              >
                {subHeading}
              </Typography>
              {subHeading2 ? (
                <Typography
                  variant="subtitle1"
                  component={"p"}
                  className="text-white xl:!text-base lg:!text-sm md:!text-[14px] sm:!text-[14px] xsm:!text-[13px] xxs:!text-[12px] xxxs:!text-[12px] !font-[400] font-poppins !leading-[150%] !tracking-[-0.16px] max-w-[95%] sm:max-w-full"
                >
                  {subHeading2}
                </Typography>
              ) : (
                ""
              )}
            </Box>
            <Box className="xl:block lg:block md:block sm:hidden xsm:hidden xxs:hidden xxxs:hidden">
              <Box className="career-visual-border xl:h-[400px] lg:h-[350px] md:h-[150px] xl:w-[380px] lg:w-[330px] md:w-[220px] border-2 border-white"></Box>
              <Box className="career-visual-card shadow-xl xl:h-[400px] lg:h-[340px] md:h-[260px] xl:w-[420px] lg:w-[360px] md:w-[280px] bg-white border-[3px] border-[rgba(41,188,241,0.6)] rounded-[10px] right-one-visual flex justify-center items-center z-[1] xl:!top-[51%] lg:!top-[51%] md:!top-[45%] xl:!right-[1.5%] lg:!right-[1.5%] md:!-right-[3%]">
                <Image
                  src={img}
                  className={
                    width ? `w-${width} object-cover` : "w-[80%] object-cover"
                  }
                  priority
                  unoptimized
                  placeholder={typeof img === "object" && img?.blurDataURL ? "blur" : "empty"}
                  alt={btnText ? `${btnText} banner illustration` : "ERS TECH banner illustration"}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Careerhero;
