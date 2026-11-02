import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Box, Typography, Grid } from "@mui/material";
import { FaLocationDot } from "react-icons/fa6";

// Dynamic import for modal dialog (interaction-only)
const FormModal = dynamic(() => import("./Modal/FormModal"));

function CurrentOpening() {
  const [openForm, setOpenForm] = useState(false);
  const [sendData, setSendData] = useState(null);

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

  return (
    <>
      <Box className="4xl:!container xxxl:!container xxl:!container xl:!container lg:!container md:!container sm:max-w-full xsm:max-w-full xxs:max-w-full xxxs:max-w-full bg-[rgba(222,233,251,0.2)] py-10">
        <Box className="block text-center pb-10">
          <Typography
            className="capitalize !text-3xl !font-[600] font-poppins !leading-[140%] !tracking-[-0.16px] text-center"
            variant="h2"
            component={"h2"}
            gutterBottom
          >
            Current&nbsp;<span className="text-ersPrimary">Openings</span>
          </Typography>
        </Box>
        <Box className="w-[90%] max-w-full mx-auto relative mt-6">
          <Grid container spacing={4} pb={8}>
            {jobs.map((data, i) => {
              return (
                <Grid key={data.id || i} item xs={12} sm={6} md={6} lg={4}>
                  <Box className="job-card-box">
                    <Box className="job-card p-6">
                      <Box className="pl-8 mb-4">
                        <Typography
                          variant="h5"
                          component="h3"
                          gutterBottom
                          className="!text-[18px] !font-[500] font-poppins !leading-[140%] !tracking-[-0.16px] !capitalize !mb-3"
                        >
                          {data.title}
                        </Typography>
                        <Typography
                          variant="h6"
                          component="p"
                          gutterBottom
                          className="!text-base !font-[400] font-poppins !leading-[140%] !tracking-[-0.16px]  !capitalize !mb-6"
                        >
                          Experience&nbsp;{data.experience}&nbsp;Years
                        </Typography>
                        <Typography
                          variant="h6"
                          component="p"
                          gutterBottom
                          className="!text-sm !text-gray-500 !font-[400] font-poppins !leading-[140%] !tracking-[-0.16px] !capitalize flex items-center"
                        >
                          <FaLocationDot color="#000" size={18} />
                          &nbsp; {data.location}
                        </Typography>
                      </Box>
                      <Box className="flex justify-end items-center">
                        <button
                          type="button"
                          onClick={() => handleOpenForm(data)}
                          className="capitalize !text-base !text-ersPrimary !font-[500] font-poppins !leading-[140%] !tracking-[-0.16px] hover:!text-[#0F53CE] hover:!border-[#0F53CE]"
                          style={{
                            borderBottom: "2px solid #26AFED",
                            transition:
                              "color 0.3s ease, border-color 0.3s ease",
                          }}
                        >
                          Apply Now
                        </button>
                      </Box>
                    </Box>
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
                onClick={() => handleOpenForm('other')}
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
