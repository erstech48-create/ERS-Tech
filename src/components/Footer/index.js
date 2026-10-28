import React, { useState } from "react";
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
} from "react-icons/fa";

function Footer() {
  const router = useRouter();
  const [workEmail, setWorkEmail] = useState("");

  const handleWorkWithUsSubmit = (e) => {
    e.preventDefault();
    if (!workEmail.trim()) return;
    router.push(`/services?email=${encodeURIComponent(workEmail.trim())}#contact`);
  };

  const openWhatsApp = () => {
    const phoneNumber = "03001420033";
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
                    On the other hand, we denounce with righteous indignation
                    and dislike men.
                  </Typography>
                  <Typography
                    variant="h6"
                    component="p"
                    gutterBottom
                    className="!text-base !font-[600] font-poppins leading-[140%] tracking-[-0.16px] !pb-1"
                  >
                    Interested To Work With Us
                  </Typography>
                  <Box>
                    <form className="subscription-form" onSubmit={handleWorkWithUsSubmit}>
                      <input
                        type="email"
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
                        className="!text-[14px] !font-[400] font-poppins leading-[140%] tracking-[-0.16px] capitalize text-white hover:text-ersPrimary"
                      >
                        about us
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
                        UI/UX Development
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
                              className="text-white !text-[14px] !font-[400] font-poppins leading-[140%] tracking-[-0.16px] capitalize hover:text-ersPrimary"
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
          </Box>
          <Box className="lg:w-[60%] md:w-[80%] sm:w-[80%] xsm:w-[80%] xxs:w-[80%] xxxs:w-[70%] max-w-full mx-auto">
            <Divider className="!my-10 !border-white opacity-20" />
            <List className="flex items-center justify-center !mb-6">
              <ListItem className="xl:!w-[10%] lg:!w-[10%] md:!w-[10%] sm:!w-[10%] xsm:!w-[20%] xxs:!w-[20%] xxxs:!w-[25%]">
                <Link
                  href="https://www.linkedin.com/company/erstech/"
                  target="_blank"
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
                <Link href="https://x.com/erstechinfo?s=11" target="_blank">
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
                <button type="button" onClick={openWhatsApp}>
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
              &copy;2024 ERSTECH - All rights reserved.
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Footer;
