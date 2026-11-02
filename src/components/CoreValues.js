import React from "react";
import {
  Box,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import cv1 from "@/../public/assets/images/cv1.png";
import cv2 from "@/../public/assets/images/cv2.png";
import cv3 from "@/../public/assets/images/cv3.png";
import cv4 from "@/../public/assets/images/cv4.png";
import cv5 from "@/../public/assets/images/cv5.png";
import cv6 from "@/../public/assets/images/cv6.png";
import Qmark from "@/../public/assets/images/qmark.png";
import dynamic from "next/dynamic";
const RequestQueryForm = dynamic(() => import("./RequestQueryForm"));

import Image from "next/image";
function CoreValues() {
  return (
    <>
      <Box className="!mb-[5rem]">
        <Box className="relative h-[100px]">
          <Box className="dots-bg-img"></Box>
        </Box>
        <Box className="block text-center pb-14 w-[70%] m-auto">
          <Typography
            className="capitalize !text-3xl !font-[600] font-poppins !leading-[140%] text-center"
            variant="h2"
            component={"h2"}
            gutterBottom
          >
            Our <span className="text-ersPrimary">Core Values</span>
          </Typography>
          <Typography
            className="!text-base !font-[400] font-poppins !leading-[130%] !tracking-[-0.16px]"
            variant="subtitle1"
            component={"p"}
            gutterBottom
          >
            At the heart of our company lies a set of core values that define
            who we are and guide how we work.
          </Typography>
        </Box>
        <Grid container className="!w-10/12 !mx-auto mb-16">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={8} lg={8}>
              <List>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <ListItem>
                      <Box className="flex items-start justify-start gap-4">
                        <ListItemIcon className="justify-center">
                          <Image
                            src={cv1}
                            className="w-[35px] block object-cover" alt=""
                          />
                        </ListItemIcon>
                        <ListItemText
                          className="!mt-0"
                          sx={{
                            ".MuiListItemText-primary": {
                              fontSize: "16px",
                              marginBottom: "0.3rem",
                              fontWeight: 600,
                              fontFamily: "Poppins, sans-serif",
                              lineHeight: "140%",
                              letterSpacing: "-0.16px",
                            },
                            ".MuiListItemText-secondary": {
                              fontSize: "14px",
                              fontWeight: 400,
                              fontFamily: "Poppins, sans-serif",
                              lineHeight: "140%",
                              letterSpacing: "-0.16px",
                            },
                          }}
                          primary="Innovation"
                          secondary="Creative solutions for modern challenges."
                        />
                      </Box>
                    </ListItem>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <ListItem>
                      <Box className="flex items-start justify-start gap-4">
                        <ListItemIcon className="justify-center">
                          <Image
                            src={cv2}
                            className="w-[35px] block object-cover" alt=""
                          />
                        </ListItemIcon>
                        <ListItemText
                          className="!mt-0"
                          sx={{
                            ".MuiListItemText-primary": {
                              fontSize: "16px",
                              marginBottom: "0.3rem",
                              fontWeight: 600,
                              fontFamily: "Poppins, sans-serif",
                              lineHeight: "140%",
                              letterSpacing: "-0.16px",
                            },
                            ".MuiListItemText-secondary": {
                              fontSize: "14px",
                              fontWeight: 400,
                              fontFamily: "Poppins, sans-serif",
                              lineHeight: "140%",
                              letterSpacing: "-0.16px",
                            },
                          }}
                          primary="Sincerity"
                          secondary="Transparency you can trust."
                        />
                      </Box>
                    </ListItem>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <ListItem>
                      <Box className="flex items-start justify-start gap-4">
                        <ListItemIcon className="justify-center">
                          <Image
                            src={cv3}
                            className="w-[35px] block object-cover" alt=""
                          />
                        </ListItemIcon>
                        <ListItemText
                          className="!mt-0"
                          sx={{
                            ".MuiListItemText-primary": {
                              fontSize: "16px",
                              marginBottom: "0.3rem",
                              fontWeight: 600,
                              fontFamily: "Poppins, sans-serif",
                              lineHeight: "140%",
                              letterSpacing: "-0.16px",
                            },
                            ".MuiListItemText-secondary": {
                              fontSize: "14px",
                              fontWeight: 400,
                              fontFamily: "Poppins, sans-serif",
                              lineHeight: "140%",
                              letterSpacing: "-0.16px",
                            },
                          }}
                          primary="Teamwork"
                          secondary="Collaboration drives our success."
                        />
                      </Box>
                    </ListItem>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <ListItem>
                      <Box className="flex items-start justify-start gap-4">
                        <ListItemIcon className="justify-center">
                          <Image
                            src={cv4}
                            className="w-[35px] block object-cover" alt=""
                          />
                        </ListItemIcon>
                        <ListItemText
                          className="!mt-0"
                          sx={{
                            ".MuiListItemText-primary": {
                              fontSize: "16px",
                              marginBottom: "0.3rem",
                              fontWeight: 600,
                              fontFamily: "Poppins, sans-serif",
                              lineHeight: "140%",
                              letterSpacing: "-0.16px",
                            },
                            ".MuiListItemText-secondary": {
                              fontSize: "14px",
                              fontWeight: 400,
                              fontFamily: "Poppins, sans-serif",
                              lineHeight: "140%",
                              letterSpacing: "-0.16px",
                            },
                          }}
                          primary="Excellence"
                          secondary="Delivering beyond expectations."
                        />
                      </Box>
                    </ListItem>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <ListItem>
                      <Box className="flex items-start justify-start gap-4">
                        <ListItemIcon className="justify-center">
                          <Image
                            src={cv5}
                            className="w-[35px] block object-cover" alt=""
                          />
                        </ListItemIcon>
                        <ListItemText
                          className="!mt-0"
                          sx={{
                            ".MuiListItemText-primary": {
                              fontSize: "16px",
                              marginBottom: "0.3rem",
                              fontWeight: 600,
                              fontFamily: "Poppins, sans-serif",
                              lineHeight: "140%",
                              letterSpacing: "-0.16px",
                            },
                            ".MuiListItemText-secondary": {
                              fontSize: "14px",
                              fontWeight: 400,
                              fontFamily: "Poppins, sans-serif",
                              lineHeight: "140%",
                              letterSpacing: "-0.16px",
                            },
                          }}
                          primary="Fast Delivery"
                          secondary="Timely solutions, every time."
                        />
                      </Box>
                    </ListItem>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <ListItem>
                      <Box className="flex items-start justify-start gap-4">
                        <ListItemIcon className="justify-center">
                          <Image
                            src={cv6}
                            className="w-[35px] block object-cover" alt=""
                          />
                        </ListItemIcon>
                        <ListItemText
                          className="!mt-0"
                          sx={{
                            ".MuiListItemText-primary": {
                              fontSize: "16px",
                              marginBottom: "0.3rem",
                              fontWeight: 600,
                              fontFamily: "Poppins, sans-serif",
                              lineHeight: "140%",
                              letterSpacing: "-0.16px",
                            },
                            ".MuiListItemText-secondary": {
                              fontSize: "14px",
                              fontWeight: 400,
                              fontFamily: "Poppins, sans-serif",
                              lineHeight: "140%",
                              letterSpacing: "-0.16px",
                            },
                          }}
                          primary="Dedicated Support"
                          secondary="Reliable assistance, always."
                        />
                      </Box>
                    </ListItem>
                  </Grid>
                </Grid>
              </List>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} >
              <Image
                src={Qmark} className="lg:w-full lg:h-full md:w-1/2 object-cover lg:mx-0 md:mx-auto" alt="ERS TECH core values illustration"
              />
            </Grid>
          </Grid>
        </Grid>
        <RequestQueryForm />
      </Box>
    </>
  );
}

export default CoreValues;
