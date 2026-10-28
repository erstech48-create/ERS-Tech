import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import Pen from "@/../public/assets/images/pen.png";
import Search from "@/../public/assets/images/search.png";
import Avatar from "@/../public/assets/images/avatar.png";
import Graph from "@/../public/assets/images/graph.png";
import Menu from "@/../public/assets/images/menu.png";
import {isIphone} from "../utils/DetectDevice"
import Image from "next/image";
function OurStats() {
  const totalProject = 600;
  const totalReviews = 100;
  const totalMembers = 50;
  const totalclients = 100;
  const totalCustomer = 97;

  // Initialize with target numbers so raw HTML / bots see the full stats
  // Kept stable on mount to avoid visual flash (jumping from target to 0 and back) and hydration mismatches
  const [projects] = useState(totalProject);
  const [reviews] = useState(totalReviews);
  const [members] = useState(totalMembers);
  const [clients] = useState(totalclients);
  const [customer] = useState(totalCustomer);

  return (
    <>
      <Box className="bg-[rgba(222,233,251,0.3)] Main_stats_row !mb-[5rem]">
        <Box className="block text-center py-6">
          <Typography
            className="capitalize !text-3xl !font-[600] font-poppins !leading-[140%] !tracking-[-0.16px] text-center"
            variant="h2"
            component={"h2"}
            gutterBottom
          >
            Our <span className="text-ersPrimary">Stats</span>
          </Typography>
        </Box>
        <Box className="custom-statistics">
          <Box className="stats_box_inner">
            <Box className="custom-stats-section container-stat-box flex justify-center mt-5 pt-5">
              <Box className="ap_search_img">
                <div className="custom-circle">
                  <strong className={isIphone() ? "md:!text-base !text-sm" : ""}>10</strong>
                  <p className={isIphone() ? "md:!text-sm !text-[8px]" : ""}>
                    Glorious <br /> Years
                  </p>
                </div>
                <div className="custom-boxes">
                  <div className="custom-box box-1">
                    <Image className="stat-img-lazyloaded" src={Pen} alt="" />
                    <div className="custom-values">
                      <div className="row-align">
                        <p className={isIphone() ? "md:!text-lg !text-lg" : ""}>{projects}</p> <span className={isIphone() ? "md:!text-lg !text-lg" : ""}>+</span>
                      </div>
                      <strong className={isIphone() ? "md:!text-base !text-[12px]" : ""}> Projects Completed</strong>
                    </div>
                  </div>
                  <div className="custom-box box-2">
                    <Image className="stat-img-lazyloaded" src={Search} alt="" />
                    <div className="custom-values">
                      <div className="row-align">
                        <p className={isIphone() ? "md:!text-lg !text-lg" : ""}>{reviews}</p> <span className={isIphone() ? "md:!text-lg !text-lg" : ""}>+</span>
                      </div>
                      <strong className={isIphone() ? "md:!text-base !text-[12px]" : ""}>Positive Reviews</strong>
                    </div>
                  </div>
                  <div className="custom-box box-5">
                    <Image className="stat-img-lazyloaded" src={Menu} alt="" />
                    <div className="custom-values">
                      <div className="row-align">
                        <p className={isIphone() ? "md:!text-lg !text-lg" : ""}>{customer}</p> <span className={isIphone() ? "md:!text-lg !text-lg" : ""}>%</span>
                      </div>
                      <strong className={isIphone() ? "md:!text-base !text-[12px]" : ""}>Customer Satisfaction </strong>
                    </div>
                  </div>
                  <div className="custom-box box-4">
                    <Image className="stat-img-lazyloaded" src={Graph} alt=""/>
                    <div className="custom-values">
                      <div className="row-align">
                        <p className={isIphone() ? "md:!text-lg !text-lg" : ""}>{clients}</p> <span className={isIphone() ? "md:!text-lg !text-lg" : ""}>+</span>
                      </div>
                      <strong className={isIphone() ? "md:!text-base !text-[12px]" : ""}> Happy Clients </strong>
                    </div>
                  </div>
                  <div className="custom-box box-3">
                    <Image className="stat-img-lazyloaded" src={Avatar} alt=""/>
                    <div className="custom-values">
                      <div className="row-align">
                        <p className={isIphone() ? "md:!text-lg !text-lg" : ""}>{members}</p> <span className={isIphone() ? "md:!text-lg !text-lg" : ""}>+</span>
                      </div>
                      <strong className={isIphone() ? "md:!text-base !text-[12px]" : ""}>Team Members</strong>
                    </div>
                  </div>
                </div>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default OurStats;
