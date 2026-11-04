import React, { useEffect, useRef } from "react";
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
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import SplitHeading from "@/components/motion/SplitHeading";

const perksData = [
  { img: PaidLeave, title: "Paid Leave" },
  { img: LeaveEnchashment, title: "Leave Encashment" },
  { img: Fule, title: "Fuel Allowance" },
  { img: BIannualincrement, title: "Bi-Annual Increments" },
  { img: MonthlyBonnus, title: "Monthly Bonus" },
  { img: workHome, title: "Work from Home" },
  { img: AdvanceSalary, title: "Advance Salary" },
  { img: PersonalLoan, title: "Personal Loans" },
  { img: InternationlTour, title: "International Tours" },
  { img: NationalTour, title: "Bi-Annual National Tours" },
  { img: Birthday, title: "Birthday Celebrations" },
  { img: Monthlydinner, title: "Monthly Dinner" },
  { img: WeeklyRefreshment, title: "Weekly Refreshments" },
  { img: workAnniversary, title: "Work Anniversary Celebrations" },
  { img: flexibletiming, title: "Flexible Timings" },
  { img: Vehiclepolicy, title: "Vehicle Ownership Program" },
];

function PerksAndBenefits() {
  const rootRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion() || !rootRef.current) return;

    const ctx = gsap.context(() => {
      const items = rootRef.current.querySelectorAll(".perk-grid-item");
      if (items.length) {
        gsap.set(items, { opacity: 0, y: 30 });

        ScrollTrigger.batch(items, {
          start: "top 85%",
          once: true,
          onEnter: (batch) => {
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: {
                grid: "auto",
                from: "start",
                each: 0.04,
              },
              ease: "power3.out",
            });

            // Pop icons
            const icons = batch.map((b) => b.querySelector(".perks-hover")).filter(Boolean);
            if (icons.length) {
              gsap.fromTo(
                icons,
                { scale: 0.7 },
                {
                  scale: 1,
                  duration: 0.5,
                  stagger: { grid: "auto", from: "start", each: 0.04 },
                  ease: "back.out(1.8)",
                }
              );
            }
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
        className="4xl:!container xxxl:!container xxl:!container xl:!container lg:!container md:!container sm:max-w-full xsm:max-w-full xxs:max-w-full xxxs:max-w-full py-10 overflow-hidden"
      >
        <Box className="block text-center pb-10">
          <Typography
            className="capitalize !text-3xl !font-[600] font-poppins !leading-[140%] !tracking-[-0.16px] text-center"
            variant="h2"
            component={"h2"}
            gutterBottom
          >
            <SplitHeading as="span">Our </SplitHeading>
            <span className="text-ersPrimary">
              <SplitHeading as="span">Perks & Benefits</SplitHeading>
            </span>
          </Typography>
        </Box>
        <Box className="w-[80%] max-w-full mx-auto mt-8">
          <Grid container spacing={4}>
            {perksData.map((perk, idx) => (
              <Grid
                key={idx}
                item
                xs={6}
                sm={4}
                md={4}
                lg={3}
                className="perk-grid-item"
              >
                <Box className="perks-hover h-[100px] w-[100px] bg-gradient-to-b from-[#27B4EE] to-[#115DCE] flex items-center justify-center rounded-[50px] shadow-xl mx-auto mb-4 cursor-pointer">
                  <Image
                    src={perk.img}
                    className="object-cover w-[40%]"
                    alt={perk.title}
                  />
                </Box>
                <Typography
                  variant="h6"
                  component="h3"
                  display={"block"}
                  gutterBottom
                  className="text-center !text-base !font-[500] font-poppins !leading-[140%] !tracking-[-0.16px] capitalize text-gray-800"
                >
                  {perk.title}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default PerksAndBenefits;
