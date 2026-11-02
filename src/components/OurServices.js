import React from "react";
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
function OurServices({ title, page }) {
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

  return (
    <>
      <Box className="mb-[5rem]">
        <Box className="block text-center pb-6 lg:w-[70%] md:w-[70%] sm:w-[85%] xsm:w-[85%] xxs:w-[85%] xxxs:w-[85%] m-auto mb-8">
          <Typography
            className="capitalize !text-3xl !font-[600] text-center font-poppins"
            variant="h2"
            component={"h2"}
            gutterBottom
          >
            {title.titleOne}{" "}
            <span className="text-ersPrimary">{title.titleTwo}</span>
          </Typography>
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
        </Box>
        <Box className="w-[80%] max-w-[100%] m-auto">
          <Grid container direction={"row"} justify="center" spacing={2}>
            {Services.map((data, i) => {
              return (
                <Grid key={data.id || data.title || i} item xs={12} sm={6} md={6} lg={4}>
                  <Box className="card relative shadow p-4 rounded-[10px] services-shadow">
                    <Box className="card-body h-[300px] min-h-full">
                      <Box className="bg-[rgba(41,188,241,0.1)] rounded-[50%] w-[100px] h-[100px] flex justify-center items-center mb-6">
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
                          className="absolute bottom-0 text-[14px] text-ersPrimary !font-[400] font-poppins flex items-center pb-4 read-more-btn"
                          href="#contact"
                        >
                          Get Started &nbsp;
                          <MdArrowRightAlt
                            size={20}
                            className="arrow-read-more"
                          />
                        </Link>
                      ) : (
                        <Link
                          className="absolute bottom-0 text-[14px] text-ersPrimary !font-[400] font-poppins flex items-center pb-4 read-more-btn"
                          href="/services"
                        >
                          Learn More &nbsp;
                          <MdArrowRightAlt
                            size={20}
                            className="arrow-read-more"
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
                  <Box className="card relative shadow p-4 rounded-[10px] services-shadow">
                    <Box className="card-body h-[300px] min-h-full">
                      <Box className="bg-[rgba(41,188,241,0.1)] rounded-[50%] w-[100px] h-[100px] flex justify-center items-center mb-6">
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
                        className="absolute bottom-0 text-[14px] text-ersPrimary !font-[400] font-poppins flex items-center pb-4 read-more-btn"
                        href="#contact"
                      >
                        Get Started &nbsp;
                        <MdArrowRightAlt
                          size={20}
                          className="arrow-read-more"
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
