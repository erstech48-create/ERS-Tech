import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import logo from "@/../public/assets/images/white-logo.png";
import Link from "next/link";
import Image from "next/image";
import {
  FaLinkedinIn,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaPinterestP,
  FaFacebookF,
  FaWhatsapp,
  FaArrowUp,
} from "react-icons/fa";
import { useLenis } from "@/components/motion/SmoothScroll";
import Stagger from "@/components/motion/Stagger";
import Reveal from "@/components/motion/Reveal";

function Footer() {
  const router = useRouter();
  const { scrollTo } = useLenis();
  const [workEmail, setWorkEmail] = useState("");
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleWorkWithUsSubmit = (e) => {
    e.preventDefault();
    if (!workEmail.trim()) return;
    router.push(`/services?email=${encodeURIComponent(workEmail.trim())}#contact`);
  };

  const openWhatsApp = () => {
    const phoneNumber = "923001420033";
    const message = `ERS TECH: Delivering innovative, scalable, and secure software solutions tailored to your needs. Let's transform your ideas into reality!`;
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappURL, "_blank");
  };
  return (
    <>
      <Box component="footer" className="w-full max-w-[1920px] mx-auto bg-gradient-to-r to-[#0E51CD] from-[#29BCF1] pt-20 pb-10">
        <Box className="w-[90%] max-w-full mx-auto">
          <Box className="text-white">
            <Stagger selector=".MuiGrid-item" stagger={0.08}>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={6} md={6} lg={4}>
                <Box className="block text-start">
                  <Image
                    src={logo}
                    className="w-[50%] object-cover pb-6 !rounded-[0px] !mb-0"
                    alt="ERS TECH Logo"
                  />
                  <Typography
                    variant="subtitle1"
                    component="p"
                    gutterBottom
                    className="!text-[14px] !font-[400] font-poppins leading-[150%] tracking-[-0.16px] !mb-0 !pb-6"
                  >
                    Delivering innovative, scalable, and secure software solutions
                    tailored to accelerate your business growth.
                  </Typography>
                  <Typography
                    variant="h6"
                    component="p"
                    gutterBottom
                    className="!text-base !font-[600] font-poppins leading-[140%] tracking-[-0.16px] !pb-1"
                  >
                    Interested in Working With Us?
                  </Typography>
                  <Box>
                    <form className="subscription-form" onSubmit={handleWorkWithUsSubmit}>
                      <input
                        id="footer-subscribe-email"
                        type="email"
                        aria-label="Email address for subscription"
                        placeholder="Enter your email address"
                        className="subscription-input !font-poppins"
                        value={workEmail}
                        onChange={(e) => setWorkEmail(e.target.value)}
                        required
                      />
                      <button
                        type="submit"
                        className="subscription-button shadow-xl hover:bg-[#29bcf1] hover:text-white !font-poppins"
                      >
                        Send
                      </button>
                    </form>
                  </Box>
                  {false && (
                    <Box className="mt-6">
                      <a
                        href="https://www.codehype.ai/product/ers-tech?utm_source=codehype_badge"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block transition-transform duration-200 hover:scale-105"
                      >
                        <img
                          src="https://www.codehype.ai/badges/ers-tech.svg?variant=find-us&v=20"
                          alt="Featured on CodeHype"
                          width="180"
                          height="65"
                          loading="lazy"
                          decoding="async"
                          style={{
                            display: "inline-block",
                            border: 0,
                            width: "100%",
                            maxWidth: "180px",
                            height: "auto",
                            maxHeight: "65px",
                          }}
                        />
                      </a>
                    </Box>
                  )}
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={2}>
                <Box className="text-start">
                  <Typography
                    variant="h4"
                    component="p"
                    gutterBottom
                    className="!text-xl !font-[600] font-poppins leading-[140%] tracking-[-0.16px]"
                  >
                    Company
                  </Typography>
                  <List>
                    <ListItem className="!pl-0 !py-2">
                      <Link
                        href="/about-us"
                        className="!text-[14px] !font-[400] font-poppins leading-[140%] tracking-[-0.16px] text-white hover:text-ersPrimary"
                      >
                        About Us
                      </Link>
                    </ListItem>
                    <ListItem className="!pl-0 !py-2">
                      <Link
                        href="/portfolio"
                        className="!text-[14px] !font-[400] font-poppins leading-[140%] tracking-[-0.16px] text-white capitalize hover:text-ersPrimary"
                      >
                        Portfolio
                      </Link>
                    </ListItem>
                    <ListItem className="!pl-0 !py-2">
                      <Link
                        href="/careers"
                        className="!text-[14px] !font-[400] font-poppins leading-[140%] tracking-[-0.16px] text-white capitalize hover:text-ersPrimary"
                      >
                        Careers
                      </Link>
                    </ListItem>
                    <ListItem className="!pl-0 !py-2">
                      <Link
                        href="/blogs"
                        className="!text-[14px] !font-[400] font-poppins leading-[140%] tracking-[-0.16px] text-white capitalize hover:text-ersPrimary"
                      >
                        Blogs
                      </Link>
                    </ListItem>
                  </List>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={3}>
                <Box className="text-start">
                  <Typography
                    variant="h4"
                    component="p"
                    gutterBottom
                    className="!text-xl !font-[600] font-poppins leading-[140%] tracking-[-0.16px]"
                  >
                    Services
                  </Typography>
                  <List>
                    <ListItem className="!pl-0 !py-2">
                      <Link
                        href="/services"
                        className="text-white !text-[14px] !font-[400] font-poppins leading-[140%] tracking-[-0.16px] capitalize hover:text-ersPrimary"
                      >
                        Web Development
                      </Link>
                    </ListItem>
                    <ListItem className="!pl-0 !py-2">
                      <Link
                        href="/services"
                        className="text-white !text-[14px] !font-[400] font-poppins leading-[140%] tracking-[-0.16px] capitalize hover:text-ersPrimary"
                      >
                        Mobile App Development
                      </Link>
                    </ListItem>
                    <ListItem className="!pl-0 !py-2">
                      <Link
                        href="/services"
                        className="text-white !text-[14px] !font-[400] font-poppins leading-[140%] tracking-[-0.16px] capitalize hover:text-ersPrimary"
                      >
                        Software Development
                      </Link>
                    </ListItem>
                    <ListItem className="!pl-0 !py-2">
                      <Link
                        href="/services"
                        className="text-white !text-[14px] !font-[400] font-poppins leading-[140%] tracking-[-0.16px] capitalize hover:text-ersPrimary"
                      >
                        UI/UX Design
                      </Link>
                    </ListItem>
                  </List>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={3}>
                <Box className="text-start">
                  <Typography
                    variant="h4"
                    component="p"
                    gutterBottom
                    className="!text-xl !font-[600] font-poppins leading-[140%] tracking-[-0.16px]"
                  >
                    Contact
                  </Typography>
                  <address className="not-italic">
                    <List>
                      <ListItem className="!pl-0 !py-1">
                        <ListItemText
                          primary={
                            <Typography
                              variant="subtitle1"
                              component={"p"}
                              className="!text-[14px] !font-[400] font-poppins leading-[140%] tracking-[-0.16px] capitalize"
                            >
                              Divine Mega 2, Office 226, 2nd Floor, Airport Rd.
                              Lahore, Pakistan
                            </Typography>
                          }
                        />
                      </ListItem>
                      <ListItem className="!pl-0 !py-1">
                        <ListItemText
                          primary={
                            <a
                              href="mailto:info@erstech.org"
                              className="text-white !text-[14px] !font-[400] font-poppins leading-[140%] tracking-[-0.16px] hover:text-ersPrimary"
                            >
                              Email: info@erstech.org
                            </a>
                          }
                        />
                      </ListItem>
                      <ListItem className="!pl-0 !py-1">
                        <ListItemText
                          primary={
                            <a
                              href="tel:+923001420033"
                              onClick={openWhatsApp}
                              className="text-white !text-[14px] !font-[400] font-poppins leading-[140%] tracking-[-0.16px] capitalize hover:text-ersPrimary"
                            >
                              +923001420033
                            </a>
                          }
                        />
                      </ListItem>
                    </List>
                  </address>
                </Box>
              </Grid>
            </Grid>
          </Stagger>
        </Box>
        <Box className="lg:w-[60%] md:w-[80%] sm:w-[80%] xsm:w-[80%] xxs:w-[80%] xxxs:w-[70%] max-w-full mx-auto">
            <Divider className="!my-10 !border-white opacity-20" />
            <List className="flex items-center justify-center !mb-6">
              <ListItem className="xl:!w-[10%] lg:!w-[10%] md:!w-[10%] sm:!w-[10%] xsm:!w-[20%] xxs:!w-[20%] xxxs:!w-[25%]">
                <Link
                  href="https://www.linkedin.com/company/erstech/"
                  target="_blank"
                  aria-label="Visit ERS TECH on LinkedIn"
                >
                  <Box className="w-[35px] h-[35px] border-[2px] border-white flex items-center justify-center rounded-[7px] group hover:bg-white">
                    <FaLinkedinIn
                      color="#fff"
                      size={20}
                      className="text-white group-hover:!text-ersPrimary"
                    />
                  </Box>
                </Link>
              </ListItem>
              <ListItem className="xl:!w-[10%] lg:!w-[10%] md:!w-[10%] sm:!w-[10%] xsm:!w-[20%] xxs:!w-[20%] xxxs:!w-[25%]">
                <Link
                  href="https://x.com/erstechinfo?s=11"
                  target="_blank"
                  aria-label="Follow ERS TECH on X"
                >
                  <Box className="w-[35px] h-[35px] border-[2px] border-white flex items-center justify-center rounded-[7px] group hover:bg-white">
                    <FaTwitter
                      color="#fff"
                      size={20}
                      className="text-white group-hover:!text-ersPrimary"
                    />
                  </Box>
                </Link>
              </ListItem>
              <ListItem className="xl:!w-[10%] lg:!w-[10%] md:!w-[10%] sm:!w-[10%] xsm:!w-[20%] xxs:!w-[20%] xxxs:!w-[25%]">
                <Link
                  href="https://www.instagram.com/erstechofficial?igsh=MXJhNnQxaDlwcmRsaQ=="
                  target="_blank"
                  aria-label="Follow ERS TECH on Instagram"
                >
                  <Box className="w-[35px] h-[35px] border-[2px] border-white flex items-center justify-center rounded-[7px] group hover:bg-white">
                    <FaInstagram
                      color="#fff"
                      size={20}
                      className="text-white group-hover:!text-ersPrimary"
                    />
                  </Box>
                </Link>
              </ListItem>
              {/* <ListItem className="xl:!w-[10%] lg:!w-[10%] md:!w-[10%] sm:!w-[10%] xsm:!w-[20%] xxs:!w-[20%] xxxs:!w-[25%]">
                <Link href="#">
                  <Box className="w-[35px] h-[35px] border-[2px] border-white flex items-center justify-center rounded-[7px] group hover:bg-white">
                    <FaYoutube color="#fff" size={20} className="text-white group-hover:!text-ersPrimary"/>
                  </Box>
                </Link>
              </ListItem> */}
              <ListItem className="xl:!w-[10%] lg:!w-[10%] md:!w-[10%] sm:!w-[10%] xsm:!w-[20%] xxs:!w-[20%] xxxs:!w-[25%]">
                <Link
                  href="https://www.pinterest.com/erstechofficial/"
                  target="_blank"
                  aria-label="Follow ERS TECH on Pinterest"
                >
                  <Box className="w-[35px] h-[35px] border-[2px] border-white flex items-center justify-center rounded-[7px] group hover:bg-white">
                    <FaPinterestP
                      color="#fff"
                      size={20}
                      className="text-white group-hover:!text-ersPrimary"
                    />
                  </Box>
                </Link>
              </ListItem>
              <ListItem className="xl:!w-[10%] lg:!w-[10%] md:!w-[10%] sm:!w-[10%] xsm:!w-[20%] xxs:!w-[20%] xxxs:!w-[25%]">
                <Link
                  href="https://www.facebook.com/share/15eNRvup3Y/?mibextid=wwXIfr"
                  target="_blank"
                  aria-label="Follow ERS TECH on Facebook"
                >
                  <Box className="w-[35px] h-[35px] border-[2px] border-white flex items-center justify-center rounded-[7px] group hover:bg-white">
                    <FaFacebookF
                      color="#fff"
                      size={20}
                      className="text-white group-hover:!text-ersPrimary"
                    />
                  </Box>
                </Link>
              </ListItem>
              <ListItem className="xl:!w-[10%] lg:!w-[10%] md:!w-[10%] sm:!w-[10%] xsm:!w-[20%] xxs:!w-[20%] xxxs:!w-[25%]">
                <button
                  type="button"
                  onClick={openWhatsApp}
                  aria-label="Chat with ERS TECH on WhatsApp"
                >
                  <Box className="w-[35px] h-[35px] border-[2px] border-white flex items-center justify-center rounded-[7px] group hover:bg-white">
                    <FaWhatsapp
                      color="#fff"
                      size={20}
                      className="text-white group-hover:!text-ersPrimary"
                    />
                  </Box>
                </button>
              </ListItem>
            </List>
            <Typography
              variant="subtitle1"
              component={"p"}
              className="!text-[14px] !font-[400] font-poppins leading-[140%] tracking-[-0.16px] text-center text-white"
            >
              &copy; {new Date().getFullYear()} ERS TECH. All rights reserved.
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Back to top button */}
      {showBackToTop && (
        <button
          type="button"
          onClick={() => scrollTo(0)}
          aria-label="Scroll to top"
          className="fixed bottom-6 right-6 z-40 p-3.5 bg-white text-[#26AFED] rounded-full shadow-2xl hover:bg-[#26AFED] hover:text-white transition-all duration-300 flex items-center justify-center border-2 border-[#26AFED]/20 hover:scale-110 focus:outline-none"
        >
          <FaArrowUp size={16} />
        </button>
      )}
    </>
  );
}

export default Footer;
