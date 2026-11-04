import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { Box, Typography, Grid } from "@mui/material";
import { FaLocationDot } from "react-icons/fa6";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import SplitHeading from "@/components/motion/SplitHeading";

const FormModal = dynamic(() => import("./Modal/FormModal"));

function CurrentOpening() {
  const [openForm, setOpenForm] = useState(false);
  const [sendData, setSendData] = useState(null);
  const rootRef = useRef(null);

  let jobs = [
    {
      id: 1,
      title: "React.js Developer",
      experience: "2-3",
      location: "Lahore, Pakistan",
    },
    {
      id: 2,
      title: "SQA Engineer",
      experience: "2-3",
      location: "Lahore, Pakistan",
    },
    {
      id: 3,
      title: "Node.js Developer",
      experience: "2-3",
      location: "Lahore, Pakistan",
    },
    {
      id: 4,
      title: "MERN Stack Developer",
      experience: "3-4",
      location: "Lahore, Pakistan",
    },
    {
      id: 5,
      title: "Project Manager",
      experience: "10",
      location: "Lahore, Pakistan",
    },
    {
      id: 6,
      title: "Tech Lead",
      experience: "8",
      location: "Lahore, Pakistan",
    },
  ];

  const handleOpenForm = (data) => {
    if (data) {
      setOpenForm(true);
      setSendData(data);
    }
  };

  useEffect(() => {
    if (prefersReducedMotion() || !rootRef.current) return;

    const ctx = gsap.context(() => {
      const cards = rootRef.current.querySelectorAll(".job-card-box");
      if (cards.length) {
        gsap.set(cards, { opacity: 0, y: 40 });
        ScrollTrigger.batch(cards, {
          start: "top 85%",
          once: true,
          onEnter: (batch) => {
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.1,
              ease: "power3.out",
            });
          },
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Box
        ref={rootRef}
        className="4xl:!container xxxl:!container xxl:!container xl:!container lg:!container md:!container sm:max-w-full xsm:max-w-full xxs:max-w-full xxxs:max-w-full bg-[rgba(222,233,251,0.2)] py-10 overflow-hidden"
      >
        <Box className="block text-center pb-10">
          <Typography
            className="capitalize !text-3xl !font-[600] font-poppins !leading-[140%] !tracking-[-0.16px] text-center"
            variant="h2"
            component={"h2"}
            gutterBottom
          >
            <SplitHeading as="span">Current </SplitHeading>
            <span className="text-ersPrimary">
              <SplitHeading as="span">Openings</SplitHeading>
            </span>
          </Typography>
        </Box>
        <Box className="w-[90%] max-w-full mx-auto relative mt-6">
          <Grid container spacing={4} pb={8}>
            {jobs.map((data, i) => {
              return (
                <Grid key={data.id || i} item xs={12} sm={6} md={6} lg={4}>
                  <Box className="job-card-box bg-white rounded-[10px] shadow-sm overflow-hidden">
                    <Box className="job-card p-6 relative">
                      <Box className="pl-4 mb-4">
                        <Typography
                          variant="h5"
                          component="h3"
                          gutterBottom
                          className="!text-[18px] !font-[600] font-poppins !leading-[140%] !tracking-[-0.16px] !capitalize !mb-2 text-gray-900"
                        >
                          {data.title}
                        </Typography>
                        <Typography
                          variant="h6"
                          component="p"
                          gutterBottom
                          className="!text-sm !font-[500] font-poppins !leading-[140%] !tracking-[-0.16px] !capitalize !mb-4 text-ersPrimary"
                        >
                          Experience: {data.experience} Years
                        </Typography>
                        <Typography
                          variant="h6"
                          component="p"
                          gutterBottom
                          className="!text-sm !text-gray-500 !font-[400] font-poppins !leading-[140%] !tracking-[-0.16px] !capitalize flex items-center"
                        >
                          <span className="location-dot-icon inline-block mr-1 text-ersPrimary">
                            <FaLocationDot size={16} />
                          </span>
                          {data.location}
                        </Typography>
                      </Box>
                      <Box className="flex justify-end items-center mt-4">
                        <button
                          type="button"
                          onClick={() => handleOpenForm(data)}
                          className="capitalize !text-sm !text-ersPrimary !font-[600] font-poppins !leading-[140%] !tracking-[-0.16px] hover:!text-[#0F53CE] group flex items-center gap-1"
                        >
                          Apply Now <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                        </button>
                      </Box>
                    </Box>
                    {/* Animated bottom accent line on hover */}
                    <div className="job-accent-line" />
                  </Box>
                </Grid>
              );
            })}
          </Grid>
          <Box className="flex justify-center items-center">
            <Typography
              variant="h5"
              component={"h5"}
              display={"block"}
              className="flex items-center !text-[16px] !font-[400] font-poppins capitalize !flex items-center !leading-[140%] !tracking-[-0.16px]"
            >
              Other Field? &nbsp;
              <button
                type="button"
                onClick={() => handleOpenForm("other")}
                className="!text-base !font-[600] font-poppins text-ersPrimary capitalize !leading-[140%] !tracking-[-0.16px] hover:!text-[#0F53CE]"
              >
                Apply Now
              </button>
            </Typography>
          </Box>
        </Box>
      </Box>
      <FormModal open={openForm} onClose={setOpenForm} data={sendData} />
    </>
  );
}

export default CurrentOpening;
