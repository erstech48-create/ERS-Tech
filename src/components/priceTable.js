import React from "react";
import {
  Box,
  Divider,
  Grid,
  ListItem,
  List,
  Typography,
  Button,
} from "@mui/material";
import Support from "@/../public/assets/images/support.png";
import Team from "@/../public/assets/images/teamwork.png";
import Customdevelop from "@/../public/assets/images/graphic-design.png";
import Image from "next/image";
function priceTable() {
  const scrollToContact = () => {
    const contactElem = document.getElementById("contact");
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.location.hash = "#contact";
    }
  };

  return (
    <>
      <Box className="4xl:!container xxxl:!container xxl:!container xl:!container lg:!container md:!container sm:max-w-full xsm:max-w-full xxs:max-w-full xxxs:max-w-full bg-[rgba(222,233,251,0.3)] pb-16 mb-16">
      <Box className='mx-auto w-[1305px] max-w-full'>
        <Box className="block text-center pt-8 pb-12 w-[70%] m-auto mb-8">
          <Typography
            className="capitalize !text-3xl !font-[600] font-poppins !leading-[140%] !tracking-[-0.16px] text-center"
            variant="h2"
            component={"h2"}
            gutterBottom
          >
            Choose Your <span className="text-ersPrimary">Plan</span>
          </Typography>
          <Typography
            className="!text-sm !font-[400] font-poppins !leading-[140%] !tracking-[-0.16px] text-center"
            variant="subtitle1"
            component={"p"}
            gutterBottom
          >
           Choose the right plan and get access to high-quality services and expert support that will help your business succeed. Explore our pricing options and find the perfect fit for your goals!
          </Typography>
        </Box>
        <Box className="w-[80%] max-w-full mx-auto">
          <Grid container spacing={2} rowGap={8}>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <Box className="bg-white shadow-xl rounded-[25px] mx-auto relative h-[600px] min-h-[95%] ba z-[1]">
                <Box className="h-[70px]">
                  <Box className="w-[100px] h-[100px] rounded-[50px] flex justify-center items-center bg-gradient-to-b from-[#27B4EE] to-[#115DCE] ptable-circle">
                    <Image
                      src={Support} className="w-[50%] object-cover" alt="Technical Support plan icon"
                    />
                  </Box>
                </Box>
                <Typography
                  variant="h5"
                  className="text-center capitalize !text-xl !font-[500] font-poppins !leading-[140%] !tracking-[-0.16px] !mb-0"
                >
                  Technical Support
                </Typography>
                <Box className="mx-4 py-4">
                  <Divider className="!border-[rgba(112,112,112,0.3)]" />
                </Box>
                <Box className="py-4 px-6">
                  <List className="price-list">
                    <ListItem className="price-item">
                      <Typography
                        variant="subtitle2"
                        className="font-poppins !font-[500] !text-[14px] !leading-[180%] !tracking-[-0.16px]"
                      >
                       24/7 support for any technical issues
                      </Typography>
                    </ListItem>
                    <ListItem className="price-item">
                      <Typography
                        variant="subtitle2"
                        className="font-poppins !font-[500] !text-[14px] !leading-[180%] !tracking-[-0.16px]"
                      >
                        Troubleshooting and issue resolution
                      </Typography>
                    </ListItem>
                    <ListItem className="price-item">
                      <Typography
                        variant="subtitle2"
                        className="font-poppins !font-[500] !text-[14px] !leading-[180%] !tracking-[-0.16px]"
                      >
                       Regular system monitoring and 
                       maintenance
                      </Typography>
                    </ListItem>
                    <ListItem className="price-item">
                      <Typography
                        variant="subtitle2"
                        className="font-poppins !font-[500] !text-[14px] !leading-[180%] !tracking-[-0.16px]"
                      >
                      Fast response times to ensure minimal 
                      downtime
                      </Typography>
                    </ListItem>
                  </List>
                </Box>
                <Box className="text-center absolute bottom-0 left-[50%] transform -translate-x-[50%] -translate-y-[100%]">
                  <Button
                    type="button"
                    size="medium"
                    onClick={scrollToContact}
                    className="bg-gradient-to-r from-[#29BCF1] to-[#0F53CE] !text-white !px-6 !rounded-[50px] !capitalize !w-[150px] !text-base !font-[500] font-poppins !leading-[140%] !tracking-[-0.16px] send-msg-btn cursor-pointer"
                  >
                    Get a Quote
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <Box className="bg-white shadow-xl rounded-[25px] mx-auto relative h-[600px] min-h-[95%] ba z-[1]">
                <Box className="h-[70px]">
                  <Box className="w-[100px] h-[100px] rounded-[50px] flex justify-center items-center bg-gradient-to-b from-[#27B4EE] to-[#115DCE] ptable-circle">
                    <Image
                      src={Customdevelop}
                      className="w-[50%] object-cover"
                      alt="Custom Development plan icon"
                    />
                  </Box>
                </Box>
                <Typography
                  variant="h5"
                  className="text-center capitalize !text-xl !font-[500] font-poppins !leading-[140%] !tracking-[-0.16px] !mb-0"
                >
                  Custom Development
                </Typography>
                <Box className="mx-4 py-4">
                  <Divider className="!border-[rgba(112,112,112,0.3)]" />
                </Box>
                <Box className="py-4 px-6">
                  <List className="price-list">
                    <ListItem className="price-item">
                      <Typography
                        variant="subtitle2"
                        className="font-poppins !font-[500] !text-[14px] !leading-[180%] !tracking-[-0.16px]"
                      >
                        Tailored solutions based on your 
                        project requirements
                      </Typography>
                    </ListItem>
                    <ListItem className="price-item">
                      <Typography
                        variant="subtitle2"
                        className="font-poppins !font-[500] !text-[14px] !leading-[180%] !tracking-[-0.16px]"
                      >
                        End-to-end development, from 
                        planning to execution
                      </Typography>
                    </ListItem>
                    <ListItem className="price-item">
                      <Typography
                        variant="subtitle2"
                        className="font-poppins !font-[500] !text-[14px] !leading-[180%] !tracking-[-0.16px]"
                      >
                        Flexible pricing depending on the 
                        project scope
                      </Typography>
                    </ListItem>
                    <ListItem className="price-item">
                      <Typography
                        variant="subtitle2"
                        className="font-poppins !font-[500] !text-[14px] !leading-[180%] !tracking-[-0.16px]"
                      >
                       Regular progress reviews and 
                       collaboration with your team
                      </Typography>
                    </ListItem>
                  </List>
                </Box>
                <Box className="text-center absolute bottom-0 left-[50%] transform -translate-x-[50%] -translate-y-[100%]">
                  <Button
                    type="button"
                    size="medium"
                    onClick={scrollToContact}
                    className="bg-gradient-to-r from-[#29BCF1] to-[#0F53CE] !text-white !px-6 !rounded-[50px] !capitalize !w-[150px] !text-base !font-[500] font-poppins !leading-[140%] !tracking-[-0.16px] send-msg-btn cursor-pointer"
                  >
                    Get a Quote
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <Box className="bg-white shadow-xl rounded-[25px] mx-auto relative h-[600px] min-h-[95%] ba z-[1]">
                <Box className="h-[70px]">
                  <Box className="w-[100px] h-[100px] rounded-[50px] flex justify-center items-center bg-gradient-to-b from-[#27B4EE] to-[#115DCE] ptable-circle">
                    <Image
                      src={Team}
                      className="w-[50%] object-cover"
                      alt="Dedicated Team plan icon"
                    />
                  </Box>
                </Box>
                <Typography
                  variant="h5"
                  className="text-center capitalize !text-xl !font-[500] font-poppins !leading-[140%] !tracking-[-0.16px] !mb-0"
                >
                  Hire a Dedicated Team
                </Typography>
                <Box className="mx-4 py-4">
                  <Divider className="!border-[rgba(112,112,112,0.3)]" />
                </Box>
                <Box className="py-4 px-6">
                  <List className="price-list">
                    <ListItem className="price-item">
                      <Typography
                        variant="subtitle2"
                        className="font-poppins !font-[500] !text-[14px] !leading-[180%] !tracking-[-0.16px]"
                      >
                        Access to a team of skilled 
                        professionals
                      </Typography>
                    </ListItem>
                    <ListItem className="price-item">
                      <Typography
                        variant="subtitle2"
                        className="font-poppins !font-[500] !text-[14px] !leading-[180%] !tracking-[-0.16px]"
                      >
                       Custom resource allocation based 
                       on your needs
                      </Typography>
                    </ListItem>
                    <ListItem className="price-item">
                      <Typography
                        variant="subtitle2"
                        className="font-poppins !font-[500] !text-[14px] !leading-[180%] !tracking-[-0.16px]"
                      >
                        Full transparency with daily and weekly updates
                      </Typography>
                    </ListItem>
                    <ListItem className="price-item">
                      <Typography
                        variant="subtitle2"
                        className="font-poppins !font-[500] !text-[14px] !leading-[180%] !tracking-[-0.16px]"
                      >
                       Flexible engagement model, from 
                       short-term to long-term
                      </Typography>
                    </ListItem>
                  </List>
                </Box>
                <Box className="text-center absolute bottom-0 left-[50%] transform -translate-x-[50%] -translate-y-[100%]">
                  <Button
                    type="button"
                    size="medium"
                    onClick={scrollToContact}
                    className="bg-gradient-to-r from-[#29BCF1] to-[#0F53CE] !text-white !px-6 !rounded-[50px] !capitalize !w-[150px] !text-base !font-[500] font-poppins !leading-[140%] !tracking-[-0.16px] send-msg-btn cursor-pointer"
                  >
                    Get a Quote
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
      </Box>
    </>
  );
}

export default priceTable;
