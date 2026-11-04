import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import CountUp from "@/components/motion/CountUp";
import Reveal from "@/components/motion/Reveal";

const stats = [
  { val: "600+", label: "Projects Delivered" },
  { val: "100+", label: "Global Clients" },
  { val: "97%", label: "Satisfaction Rate" },
  { val: "10+", label: "Years Experience" },
];

export default function StatsStrip() {
  return (
    <section className="py-12 bg-white border-y border-gray-100">
      <div className="container mx-auto px-6 max-w-[1200px]">
        <Reveal direction="up" distance={25}>
          <Grid container spacing={4} justifyContent="center" alignItems="center">
            {stats.map((s, idx) => (
              <Grid
                key={idx}
                item
                xs={6}
                md={3}
                className="text-center border-r last:border-r-0 border-gray-100"
              >
                <Typography
                  variant="h3"
                  className="!text-3xl lg:!text-4xl !font-[700] font-poppins bg-gradient-to-r from-[#26AFED] to-[#115BD0] bg-clip-text text-transparent !mb-1"
                >
                  <CountUp value={s.val} />
                </Typography>
                <Typography
                  variant="body2"
                  className="!text-xs lg:!text-sm !font-[500] font-poppins text-gray-500 uppercase tracking-wider"
                >
                  {s.label}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Reveal>
      </div>
    </section>
  );
}

