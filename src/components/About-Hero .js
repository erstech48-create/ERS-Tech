import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Tab } from "@mui/material";
import aboutOneImg from "@/../public/assets/images/about-h-img.png";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { makeStyles } from "@mui/styles";
import Image from "next/image";
const useStyles = makeStyles({
  indicator: {
    backgroundColor: "#fff !important",
    height: "3px !important",
  },
});

function Hero() {
  const classes = useStyles();
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const targetCount = 50;
  const ExpCount = 10;
  // Initialize with target values so server-rendered HTML contains the full numbers for bots/crawlers
  // Kept stable on mount to avoid visual flash (jumping from target to 0 and back) and hydration mismatches
  const [count] = useState(targetCount);
  const [years] = useState(ExpCount);

  return (
    <>
      <Box className="hero-bg !mb-0">
        <Box className="container xl:px-0 lg:px-10 md:px-10 sm:px-4 xsm:px-2 xxs:px-2 xxxs:px-2">
          <Box className="relative xl:h-[700px] lg:h-[700px] md:h-[700px] sm:h-[650px] xsm:h-[640px] xxs:h-[630px] xxxs:h-[630px]">
            <Box>
              <Box className="about-hero-content-box">
                <Button className="!py-2 shadow-xl !w-[160px] !rounded-[50px] !bg-white hover:!bg-ersPrimary hover:!text-white !text-base !font-[500] font-poppins leading-[140%] !text-[#3CB7EE] !capitalize xl:!mb-8 lg:!mb-12 md:!mb-12 sm:!mb-6 xsm:!mb-4 xxs:!mb-4 xxxs:!mb-4">
                  about us
                </Button>

                <Typography
                  className="!text-white xl:!text-[4rem] lg:!text-[2.7rem] md:!text-6xl sm:!text-5xl xsm:!text-[2rem] xxs:!text-3xl xxxs:!text-2xl !font-[600] uppercase !mb-6 font-poppins xl:!leading-[110%]"
                  variant="h1"
                  component="h1"
                  gutterBottom
                >
                  Your Partner for <br />
                  Software Innovation
                </Typography>
                <Typography
                  variant="subtitle1"
                  component={"p"}
                  className="!leading-[180%] xl:!text-lg lg:!text-base md:!text-base sm:!text-sm xsm:!text-[13px] xxs:!text-[12px] xxxs:!text-[12px] !font-[400] font-poppins !capitalize text-white xl:w-[65%] lg:w-[55%] md:w-[55%] sm:w-full xsm:w-full xxs:w-full xxxs:w-full !mb-6"
                >
                  We offer an IT guide to a vast variety of organizations
                  throughout the world. We continue to provide strategic value
                  in the days, weeks & years after the launch of the product.
                </Typography>
                <Box sx={{ width: "100%", height: "200px" }}>
                  <TabContext value={value}>
                    <Box>
                      <TabList
                        onChange={handleChange}
                        aria-label="lab API tabs example"
                        classes={{ indicator: classes.indicator }}
                      >
                        <Tab
                          label={
                            <Typography
                              variant="h6"
                              component="span"
                              className={
                                value === "1"
                                  ? "!font-[700] !text-[16px] font-poppins !leading-[140%] text-white capitalize"
                                  : "!text-[16px] !font-[500] font-poppins !leading-[140%] !text-white capitalize"
                              }
                            >
                              Our Mission
                            </Typography>
                          }
                          value="1"
                        />
                        <Tab
                          label={
                            <Typography
                              variant="h6"
                              component="span"
                              className={
                                value === "2"
                                  ? "!font-[700] !text-[16px] font-poppins !leading-[140%] text-white capitalize"
                                  : "!text-[16px] !font-[500] font-poppins !leading-[140%] !text-white capitalize"
                              }
                            >
                              Our Vission
                            </Typography>
                          }
                          value="2"
                        />
                        <Tab
                          label={
                            <Typography
                              variant="h6"
                              component="span"
                              className={
                                value === "3"
                                  ? "!font-[700] !text-[16px] font-poppins !leading-[140%] text-white capitalize"
                                  : "!text-[16px] !font-[500] font-poppins !leading-[140%] !text-white capitalize"
                              }
                            >
                              Our Value
                            </Typography>
                          }
                          value="3"
                        />
                      </TabList>
                    </Box>
                    <div
                      role="tabpanel"
                      hidden={value !== "1"}
                      className={`!px-0 !pt-[11px] ${value === "1" ? "block" : "hidden"}`}
                    >
                      <Typography
                        variant="subtitle1"
                        component={"p"}
                        className="xl:!text-[15px] lg:!text-sm md:!text-sm sm:!text-sm xsm:!text-[12px] xxs:!text-[12px] xxxs:!text-[12px] !font-[400] font-poppins !leading-[160%] !text-white xl:w-[50%] lg:w-[50%] md:w-[50%] sm:w-full xsm:w-full xxs:w-full xxxs:w-full"
                      >
                        We aim to deliver innovative, tailored tech solutions in
                        app development, blockchain, and software. By partnering
                        with businesses, we help them achieve growth,
                        efficiency, and a competitive edge in the digital world.
                      </Typography>
                    </div>
                    <div
                      role="tabpanel"
                      hidden={value !== "2"}
                      className={`!px-0 !pt-[11px] ${value === "2" ? "block" : "hidden"}`}
                    >
                      <Typography
                        variant="subtitle1"
                        component={"p"}
                        className="xl:!text-[15px] lg:!text-sm md:!text-sm sm:!text-sm xsm:!text-[12px] xxs:!text-[12px] xxxs:!text-[12px] !font-[400] font-poppins !leading-[160%] !text-white xl:w-[50%] lg:w-[50%] md:w-[50%] sm:w-full xsm:w-full xxs:w-full xxxs:w-full"
                      >
                        Our vision is to become a global leader in technology
                        innovation, empowering businesses of all sizes with
                        scalable, sustainable, and future-ready digital
                        solutions that transform ideas into reality.
                      </Typography>
                    </div>
                    <div
                      role="tabpanel"
                      hidden={value !== "3"}
                      className={`!px-0 !pt-[11px] ${value === "3" ? "block" : "hidden"}`}
                    >
                      <Typography
                        variant="subtitle1"
                        component={"p"}
                        className="xl:!text-[15px] lg:!text-sm md:!text-sm sm:!text-sm xsm:!text-[12px] xxs:!text-[12px] xxxs:!text-[12px] !font-[400] font-poppins !leading-[160%] !text-white xl:w-[50%] lg:w-[50%] md:w-[50%] sm:w-full xsm:w-full xxs:w-full xxxs:w-full"
                      >
                        We uphold innovation, integrity, and excellence in
                        everything we do. Our commitment to delivering
                        high-quality solutions drives us to embrace creativity
                        and cutting-edge technologies. We build strong
                        relationships through honesty and transparency, ensuring
                        client success remains at the core of our approach.
                      </Typography>
                    </div>
                  </TabContext>
                </Box>
              </Box>
              <Box className="xl:block lg:block md:block sm:hidden xsm:hidden xxs:hidden xxxs:hidden">
                <Box className="xl:h-[400px] lg:h-[330px] md:h-[250px] xl:w-[420px] lg:w-[350px] md:w-[250px] bg-white border-[3px] border-[rgba(41,188,241,0.6)] rounded-[10px] right-one-visual flex justify-center items-center z-[1] xl:!top-[46%] lg:!top-[45%] md:!top-[40%] xl:!right-0 lg:!right-[1%] md:!-right-[1%]">
                  <Image
                    src={aboutOneImg}
                    className="w-[95%] object-cover"
                    priority
                    alt="About ERS TECH software engineering team"
                  />
                  <Box className="h-[100px] w-[90%] mx-auto bg-white border-[3px] border-[rgba(41,188,241,0.6)] rounded-[14px] absolute xl:-bottom-[12%] lg:-bottom-[18%] md:-bottom-[25%] right-[5%] z-[1]">
                    <Box className="p-4 flex items-center justify-around gap-4">
                      <Box className="grid place-items-center place-content-center text-center">
                        <Typography
                          variant="h6"
                          component="span"
                          className="!text-2xl !font-[600] font-poppins !leading-[140%]"
                        >
                          {years}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          component={"p"}
                          className="!text-[12px] !font-[400] font-poppins !leading-tight"
                        >
                          Years of <br /> Experience
                        </Typography>
                      </Box>
                      <Box className="h-full">
                        <Box
                          style={{
                            borderRight: "1px solid #B7B7B7",
                            height: "65px",
                          }}
                        ></Box>
                      </Box>
                      <Box className="grid place-items-center place-content-center text-center">
                        <Typography
                          variant="h6"
                          component="span"
                          className="!text-2xl !font-[600] font-poppins !leading-[140%]"
                        >
                          {count}+
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          component={"p"}
                          className="!text-[12px] !font-[400] font-poppins !leading-tight"
                        >
                          Team of <br /> Experts
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Hero;
