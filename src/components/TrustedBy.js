import React from "react";
import { Box, Typography } from "@mui/material";
import CLD10 from "@/../public/assets/images/CLD-10.png";
import CLD9 from "@/../public/assets/images/CLD-09.png";
import CLD8 from "@/../public/assets/images/CLD-08.png";
import CLD7 from "@/../public/assets/images/CLD-07.png";
import CLD6 from "@/../public/assets/images/CLD-06.png";
import CLD5 from "@/../public/assets/images/CLD-05.png";
import CLD4 from "@/../public/assets/images/CLD-04.png";
import CLD3 from "@/../public/assets/images/CLD-03.png";
import CLD2 from "@/../public/assets/images/CLD-02.png";
import CLD1 from "@/../public/assets/images/CLD-01.png";
import Image from "next/image";

const clientLogos = [
  { src: CLD5, alt: "Bakri International Energy logo" },
  { src: CLD4, alt: "Euro Oil logo" },
  { src: CLD3, alt: "Alkaram Studio logo" },
  { src: CLD2, alt: "GSK Pakistan logo" },
  { src: CLD1, alt: "JS Bank logo" },
  { src: CLD6, alt: "QuikiPay logo" },
  { src: CLD7, alt: "Fintech Cashier logo" },
  { src: CLD8, alt: "FocusMonk logo" },
  { src: CLD9, alt: "Salharo logo" },
  { src: CLD10, alt: "LiftSplit logo" },
  { src: CLD5, alt: "Bakri International Energy logo" },
  { src: CLD4, alt: "Euro Oil logo" },
  { src: CLD3, alt: "Alkaram Studio logo" },
  { src: CLD2, alt: "GSK Pakistan logo" },
];

function TrustedBy() {
  return (
    <>
      <Box className="mb-[5rem] relative">
        <Box className="logo-slider">
          <Box className="block text-center pb-6">
            <Typography
              className="capitalize !text-3xl !font-[600] text-center font-poppins"
              variant="h2"
              component={"h2"}
              gutterBottom
            >
              Trusted <span className="text-ersPrimary">By</span>
            </Typography>
          </Box>
          <div className="slider">
            <div className="slide-track">
              {clientLogos.map((client, idx) => (
                <div key={`track1-${idx}`} className="slide">
                  <Image src={client.src} height="100" width="250" alt={client.alt} />
                </div>
              ))}
            </div>
          </div>
          <div className="slider-left">
            <div className="slide-track-left">
              {clientLogos.map((client, idx) => (
                <div key={`track2-${idx}`} className="slide-left">
                  <Image src={client.src} height="100" width="250" alt={client.alt} />
                </div>
              ))}
            </div>
          </div>
        </Box>
      </Box>
    </>
  );
}

export default TrustedBy;
// 4xl:!container xxxl:!container xxl:!container xl:!container lg:!container md:!container sm:max-w-full xsm:max-w-full xxs:max-w-full xxxs:max-w-full
