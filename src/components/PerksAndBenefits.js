import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import PaidLeave from "@/../public/assets/images/paid-leave.png";
import LeaveEnchashment from "@/../public/assets/images/leave-encashment.png";
import Fule from "@/../public/assets/images/fuel.png";
import BIannualincrement from "@/../public/assets/images/bi-annual.png";
import MonthlyBonnus from "@/../public/assets/images/monthly-bonus.png";
import workHome from "@/../public/assets/images/work-home.png";
import AdvanceSalary from "@/../public/assets/images/advance-salary.png";
import PersonalLoan from "@/../public/assets/images/personal-loan.png";
import InternationlTour from "@/../public/assets/images/international-tour.png";
import NationalTour from "@/../public/assets/images/national-tour.png";
import Birthday from "@/../public/assets/images/birthday-celeb.png";
import Monthlydinner from "@/../public/assets/images/monthly-dinner.png";
import WeeklyRefreshment from "@/../public/assets/images/weekly-refreshment.png";
import workAnniversary from "@/../public/assets/images/work-anniversery.png";
import flexibletiming from "@/../public/assets/images/flexible-time.png";
import Vehiclepolicy from "@/../public/assets/images/vehicle-policy.png";
import Image from "next/image";
function PerksAndBenefits() {
  return (
    <>
      <Box className="4xl:!container xxxl:!container xxl:!container xl:!container lg:!container md:!container sm:max-w-full xsm:max-w-full xxs:max-w-full xxxs:max-w-full py-10">
        <Box className="block text-center pb-10">
          <Typography
            className="capitalize !text-3xl !font-[600] font-poppins !leading-[140%] !tracking-[-0.16px] text-center"
            variant="h2"
            component={"h2"}
            gutterBottom
          >
            Our&nbsp;<span className="text-ersPrimary">Perks & Benefits</span>
          </Typography>
        </Box>
        <Box className="w-[80%] max-w-full mx-auto mt-8">
          <Grid container spacing={4}>
            <Grid item xs={6} sm={4} md={4} lg={3}>
              <Box className="perks-hover h-[100px] w-[100px] bg-gradient-to-b from-[#27B4EE] to-[#115DCE] flex items-center justify-center rounded-[50px] shadow-xl mx-auto mb-4">
                <Image
                  src={PaidLeave}
                  className="object-cover w-[40%]"
                  alt=""
                />
              </Box>
              <Typography
                variant="h6"
                component="h3"
                display={"block"}
                gutterBottom
                className="text-center !text-base !font-[500] font-poppins !leading-[140%] !tracking-[-0.16px] capitalize"
              >
                paid leave
              </Typography>
            </Grid>
            <Grid item xs={6} sm={4} md={4} lg={3}>
              <Box className="h-[100px] w-[100px] bg-gradient-to-b from-[#27B4EE] to-[#115DCE] flex items-center justify-center rounded-[50px] shadow-xl mx-auto mb-4 perks-hover">
                <Image
                  src={LeaveEnchashment}
                  className="object-cover w-[40%]"
                  alt=""
                />
              </Box>
              <Typography
                variant="h6"
                component="h3"
                display={"block"}
                gutterBottom
                className="text-center !text-base !font-[500] font-poppins !leading-[140%] !tracking-[-0.16px] capitalize"
              >
                Leave Encashment
              </Typography>
            </Grid>
            <Grid item xs={6} sm={4} md={4} lg={3}>
              <Box className="perks-hover h-[100px] w-[100px] bg-gradient-to-b from-[#27B4EE] to-[#115DCE] flex items-center justify-center rounded-[50px] shadow-xl mx-auto mb-4">
                <Image src={Fule} className="object-cover w-[40%]" alt="" />
              </Box>
              <Typography
                variant="h6"
                component="h3"
                display={"block"}
                gutterBottom
                className="text-center !text-base !font-[500] font-poppins !leading-[140%] !tracking-[-0.16px] capitalize"
              >
                Fuel Allowance
              </Typography>
            </Grid>
            <Grid item xs={6} sm={4} md={4} lg={3}>
              <Box className="perks-hover h-[100px] w-[100px] bg-gradient-to-b from-[#27B4EE] to-[#115DCE] flex items-center justify-center rounded-[50px] shadow-xl mx-auto mb-4">
                <Image
                  src={BIannualincrement}
                  className="object-cover w-[40%]"
                  alt=""
                />
              </Box>
              <Typography
                variant="h6"
                component="h3"
                display={"block"}
                gutterBottom
                className="text-center !text-base !font-[500] font-poppins !leading-[140%] !tracking-[-0.16px] capitalize"
              >
                Bi-Annual Increments
              </Typography>
            </Grid>
            {/* ====================== */}
            <Grid item xs={6} sm={4} md={4} lg={3}>
              <Box className="perks-hover h-[100px] w-[100px] bg-gradient-to-b from-[#27B4EE] to-[#115DCE] flex items-center justify-center rounded-[50px] shadow-xl mx-auto mb-4">
                <Image
                  src={MonthlyBonnus}
                  className="object-cover w-[40%]"
                  alt=""
                />
              </Box>
              <Typography
                variant="h6"
                component="h3"
                display={"block"}
                gutterBottom
                className="text-center !text-base !font-[500] font-poppins !leading-[140%] !tracking-[-0.16px] capitalize"
              >
                Monthly Bonus
              </Typography>
            </Grid>
            <Grid item xs={6} sm={4} md={4} lg={3}>
              <Box className="perks-hover h-[100px] w-[100px] bg-gradient-to-b from-[#27B4EE] to-[#115DCE] flex items-center justify-center rounded-[50px] shadow-xl mx-auto mb-4">
                <Image
                  src={workHome}
                  className="object-cover w-[40%]"
                  alt=""
                />
              </Box>
              <Typography
                variant="h6"
                component="h3"
                display={"block"}
                gutterBottom
                className="text-center !text-base !font-[500] font-poppins !leading-[140%] !tracking-[-0.16px] capitalize"
              >
                Work from Home
              </Typography>
            </Grid>
            <Grid item xs={6} sm={4} md={4} lg={3}>
              <Box className="perks-hover h-[100px] w-[100px] bg-gradient-to-b from-[#27B4EE] to-[#115DCE] flex items-center justify-center rounded-[50px] shadow-xl mx-auto mb-4">
                <Image
                  src={AdvanceSalary}
                  className="object-cover w-[40%]"
                  alt=""
                />
              </Box>
              <Typography
                variant="h6"
                component="h3"
                display={"block"}
                gutterBottom
                className="text-center !text-base !font-[500] font-poppins !leading-[140%] !tracking-[-0.16px] capitalize"
              >
                Advance Salary
              </Typography>
            </Grid>
            <Grid item xs={6} sm={4} md={4} lg={3}>
              <Box className="perks-hover h-[100px] w-[100px] bg-gradient-to-b from-[#27B4EE] to-[#115DCE] flex items-center justify-center rounded-[50px] shadow-xl mx-auto mb-4">
                <Image
                  src={PersonalLoan}
                  className="object-cover w-[40%]"
                  alt=""
                />
              </Box>
              <Typography
                variant="h6"
                component="h3"
                display={"block"}
                gutterBottom
                className="text-center !text-base !font-[500] font-poppins !leading-[140%] !tracking-[-0.16px] capitalize"
              >
                Personal Loans
              </Typography>
            </Grid>

            {/* ====================== */}
            <Grid item xs={6} sm={4} md={4} lg={3}>
              <Box className="perks-hover h-[100px] w-[100px] bg-gradient-to-b from-[#27B4EE] to-[#115DCE] flex items-center justify-center rounded-[50px] shadow-xl mx-auto mb-4">
                <Image
                  src={InternationlTour}
                  className="object-cover w-[40%]"
                  alt=""
                />
              </Box>
              <Typography
                variant="h6"
                component="h3"
                display={"block"}
                gutterBottom
                className="text-center !text-base !font-[500] font-poppins !leading-[140%] !tracking-[-0.16px] capitalize"
              >
                International Tours
              </Typography>
            </Grid>
            <Grid item xs={6} sm={4} md={4} lg={3}>
              <Box className="perks-hover h-[100px] w-[100px] bg-gradient-to-b from-[#27B4EE] to-[#115DCE] flex items-center justify-center rounded-[50px] shadow-xl mx-auto mb-4">
                <Image
                  src={NationalTour}
                  className="object-cover w-[40%]"
                  alt=""
                />
              </Box>
              <Typography
                variant="h6"
                component="h3"
                display={"block"}
                gutterBottom
                className="text-center !text-base !font-[500] font-poppins !leading-[140%] !tracking-[-0.16px] capitalize"
              >
                Bi-Annual National Tours
              </Typography>
            </Grid>
            <Grid item xs={6} sm={4} md={4} lg={3}>
              <Box className="perks-hover h-[100px] w-[100px] bg-gradient-to-b from-[#27B4EE] to-[#115DCE] flex items-center justify-center rounded-[50px] shadow-xl mx-auto mb-4">
                <Image
                  src={Birthday}
                  className="object-cover w-[40%]"
                  alt=""
                />
              </Box>
              <Typography
                variant="h6"
                component="h3"
                display={"block"}
                gutterBottom
                className="text-center !text-base !font-[500] font-poppins !leading-[140%] !tracking-[-0.16px] capitalize"
              >
                Birthday Celebrations
              </Typography>
            </Grid>
            <Grid item xs={6} sm={4} md={4} lg={3}>
              <Box className="perks-hover h-[100px] w-[100px] bg-gradient-to-b from-[#27B4EE] to-[#115DCE] flex items-center justify-center rounded-[50px] shadow-xl mx-auto mb-4">
                <Image
                  src={Monthlydinner}
                  className="object-cover w-[40%]"
                  alt=""
                />
              </Box>
              <Typography
                variant="h6"
                component="h3"
                display={"block"}
                gutterBottom
                className="text-center !text-base !font-[500] font-poppins !leading-[140%] !tracking-[-0.16px] capitalize"
              >
                Monthly Dinner
              </Typography>
            </Grid>
            {/* ============================== */}
            <Grid item xs={6} sm={4} md={4} lg={3}>
              <Box className="perks-hover h-[100px] w-[100px] bg-gradient-to-b from-[#27B4EE] to-[#115DCE] flex items-center justify-center rounded-[50px] shadow-xl mx-auto mb-4">
                <Image
                  src={WeeklyRefreshment}
                  className="object-cover w-[40%]"
                  alt=""
                />
              </Box>
              <Typography
                variant="h6"
                component="h3"
                display={"block"}
                gutterBottom
                className="text-center !text-base !font-[500] font-poppins !leading-[140%] !tracking-[-0.16px] capitalize"
              >
                Weekly Refreshments
              </Typography>
            </Grid>
            <Grid item xs={6} sm={4} md={4} lg={3}>
              <Box className="perks-hover h-[100px] w-[100px] bg-gradient-to-b from-[#27B4EE] to-[#115DCE] flex items-center justify-center rounded-[50px] shadow-xl mx-auto mb-4">
                <Image
                  src={workAnniversary}
                  className="object-cover w-[40%]"
                  alt=""
                />
              </Box>
              <Typography
                variant="h6"
                component="h3"
                display={"block"}
                gutterBottom
                className="text-center !text-base !font-[500] font-poppins !leading-[140%] !tracking-[-0.16px] capitalize"
              >
                Work Anniversary Celebrations
              </Typography>
            </Grid>
            <Grid item xs={6} sm={4} md={4} lg={3}>
              <Box className="perks-hover h-[100px] w-[100px] bg-gradient-to-b from-[#27B4EE] to-[#115DCE] flex items-center justify-center rounded-[50px] shadow-xl mx-auto mb-4">
                <Image
                  src={flexibletiming}
                  className="object-cover w-[40%]"
                  alt=""
                />
              </Box>
              <Typography
                variant="h6"
                component="h3"
                display={"block"}
                gutterBottom
                className="text-center !text-base !font-[500] font-poppins !leading-[140%] !tracking-[-0.16px] capitalize"
              >
                Flexible Timings
              </Typography>
            </Grid>
            <Grid item xs={6} sm={4} md={4} lg={3}>
              <Box className="perks-hover h-[100px] w-[100px] bg-gradient-to-b from-[#27B4EE] to-[#115DCE] flex items-center justify-center rounded-[50px] shadow-xl mx-auto mb-4">
                <Image
                  src={Vehiclepolicy}
                  className="object-cover w-[40%]"
                  alt=""
                />
              </Box>
              <Typography
                variant="h6"
                component="h3"
                display={"block"}
                gutterBottom
                className="text-center !text-base !font-[500] font-poppins !leading-[140%] !tracking-[-0.16px] capitalize"
              >
                Vehicle Ownership Program
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default PerksAndBenefits;
