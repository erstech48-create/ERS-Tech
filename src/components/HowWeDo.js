import React from "react";
import { Box, ListItem, Typography, List } from "@mui/material";
import Meeting from '@/../public/assets/images/Meeting.png'
import desing from '@/../public/assets/images/desing.png'
import develop from '@/../public/assets/images/develop.png'
import test from '@/../public/assets/images/test.png'
import review from '@/../public/assets/images/review.png'
import live from '@/../public/assets/images/live.png'
import {isIphone} from "../utils/DetectDevice"
import Image from "next/image";

function HowWeDo() {
  return (
    <>
      <Box className="xl:!container lg:!container md:!container sm:max-w-full xsm:max-w-full xxs:max-w-full xxxs:max-w-full relative !mb-[5rem]">
        <Box className="block text-center py-6">
          <Typography
            className="capitalize !text-3xl !font-[600] font-poppins !leading-[140%] !tracking-[-0.16px] text-center"
            variant="h2"
            component={"h2"}
            gutterBottom
          >
            How We <span className="text-ersPrimary">Work</span>
          </Typography>
        </Box>
        <Box className="w-[90%] max-w-[100%] mx-auto mt-5 pt-5 relative how-we-do-box">
          <List className="flex items-center relative w-full border-bottom-boxs">
            <ListItem className="!justify-center border-bottom-box1">
              <Box className="bg-[#F6F6F4] w-[120px] h-[120px] flex justify-center items-center rounded-[50%] cruve-box1">
                <Box className="bg-gradient-to-r from-[#28B8EF] to-[#115BD0] w-[100px] h-[100px] flex justify-center items-center rounded-[50%]">
                  <Image src={Meeting} className="w-[55px] object-cover" alt="" />
                </Box>
              </Box>
            </ListItem>
            <ListItem className="!justify-center border-bottom-box2">
              <Box className="bg-[#F6F6F4] w-[120px] h-[120px] flex justify-center items-center rounded-[50%] cruve-box2">
                <Box className="bg-gradient-to-r from-[#28B8EF] to-[#115BD0] w-[100px] h-[100px] flex justify-center items-center rounded-[50%]">
                  <Image src={desing} className="w-[55px] object-cover" alt="" />
                </Box>
              </Box>
            </ListItem>
            <ListItem className="!justify-center border-bottom-box3">
              <Box className="bg-[#F6F6F4] w-[120px] h-[120px] flex justify-center items-center rounded-[50%] cruve-box3">
                <Box className="bg-gradient-to-r from-[#28B8EF] to-[#115BD0] w-[100px] h-[100px] flex justify-center items-center rounded-[50%]">
                  <Image src={develop} className="w-[55px] object-cover" alt="" />
                </Box>
              </Box>
            </ListItem>
            <ListItem className="!justify-center border-bottom-box4">
              <Box className="bg-[#F6F6F4] w-[120px] h-[120px] flex justify-center items-center rounded-[50%] cruve-box4">
                <Box className="bg-gradient-to-r from-[#28B8EF] to-[#115BD0] w-[100px] h-[100px] flex justify-center items-center rounded-[50%]">
                  <Image src={test} className="w-[55px] object-cover" alt="" />
                </Box>
              </Box>
            </ListItem>
            <ListItem className="!justify-center border-bottom-box5">
              <Box className="bg-[#F6F6F4] w-[120px] h-[120px] flex justify-center items-center rounded-[50%] cruve-box5">
                <Box className="bg-gradient-to-r from-[#28B8EF] to-[#115BD0] w-[100px] h-[100px] flex justify-center items-center rounded-[50%]">
                  <Image src={review} className="w-[55px] object-cover" alt="" />
                </Box>
              </Box>
            </ListItem>
            <ListItem className="!justify-center border-bottom-box6">
              <Box className="bg-[#F6F6F4] w-[120px] h-[120px] flex justify-center items-center rounded-[50%]">
                <Box className="bg-gradient-to-r from-[#28B8EF] to-[#115BD0] w-[100px] h-[100px] flex justify-center items-center rounded-[50%]">
                  <Image src={live} className="w-[55px] object-cover" alt="" />
                </Box>
              </Box>
            </ListItem>
          </List>
          <List className="flex items-center relative w-full !mt-[0.9rem] !gap-[1px]">
            <ListItem className="!justify-center bg-gradient-to-b from-[#4CADEA] to-[#115AD0] !pt-[4px] !pb-[4px]" style={{borderTopLeftRadius:'50px',borderBottomLeftRadius:"50px"}}>
             <Typography variant="overline" display="block" className={isIphone () ? "capitalize !leading-loose !text-[10px] !font-[500] font-poppins !leading-[140%] !text-white"   :  "capitalize !leading-loose !text-sm !font-[500] font-poppins !leading-[140%] !text-white"} >step&nbsp;1</Typography>
            </ListItem>
            <ListItem className="!justify-center bg-gradient-to-b from-[#4CADEA] to-[#115AD0] !pt-[4px] !pb-[4px]">
             <Typography variant="overline" display="block" className={isIphone () ? "capitalize !leading-loose !text-[10px] !font-[500] font-poppins !leading-[140%] !text-white"   :  "capitalize !leading-loose !text-sm !font-[500] font-poppins !leading-[140%] !text-white"} >step&nbsp;2</Typography>
            </ListItem>
            <ListItem className="!justify-center bg-gradient-to-b from-[#4CADEA] to-[#115AD0] !pt-[4px] !pb-[4px]">
             <Typography variant="overline" display="block" className={isIphone () ? "capitalize !leading-loose !text-[10px] !font-[500] font-poppins !leading-[140%] !text-white"   :  "capitalize !leading-loose !text-sm !font-[500] font-poppins !leading-[140%] !text-white"} >step&nbsp;3</Typography>
            </ListItem>
            <ListItem className="!justify-center bg-gradient-to-b from-[#4CADEA] to-[#115AD0] !pt-[4px] !pb-[4px]">
             <Typography variant="overline" display="block" className={isIphone () ? "capitalize !leading-loose !text-[10px] !font-[500] font-poppins !leading-[140%] !text-white"   :  "capitalize !leading-loose !text-sm !font-[500] font-poppins !leading-[140%] !text-white"} >step&nbsp;4</Typography>
            </ListItem>
            <ListItem className="!justify-center bg-gradient-to-b from-[#4CADEA] to-[#115AD0] !pt-[4px] !pb-[4px]">
             <Typography variant="overline" display="block" className={isIphone () ? "capitalize !leading-loose !text-[10px] !font-[500] font-poppins !leading-[140%] !text-white"   :  "capitalize !leading-loose !text-sm !font-[500] font-poppins !leading-[140%] !text-white"} >step&nbsp;5</Typography>
            </ListItem>
            <ListItem className="!justify-center bg-gradient-to-b from-[#4CADEA] to-[#115AD0] !pt-[4px] !pb-[4px]" style={{borderTopRightRadius:'50px',borderBottomRightRadius:"50px"}} >
             <Typography variant="overline" display="block" className={isIphone () ? "capitalize !leading-loose !text-[10px] !font-[500] font-poppins !leading-[140%] !text-white"   :  "capitalize !leading-loose !text-sm !font-[500] font-poppins !leading-[140%] !text-white"}>step&nbsp;6</Typography>
            </ListItem>
          </List>
          <List className="flex items-center relative w-full !mt-[0.9rem] !gap-[1px] relative">
            <ListItem className="!justify-center !grid">
              <Typography variant="h6" component="h3" display={"block"} className={isIphone () ? "!text-sm !font-[400] font-poppins !leading-[140%] !uppercase"    :  "!text-lg !font-[400] font-poppins !leading-[140%] !uppercase"}>
              Discovery
              </Typography>
              <span className="gradient-b-border"></span>
            </ListItem>
            <ListItem className="!justify-center !grid">
              <Typography variant="h6" display={"block"} className={isIphone () ? "!text-sm !font-[400] font-poppins !leading-[140%] !uppercase"    :  "!text-lg !font-[400] font-poppins !leading-[140%] !uppercase"}>
              Design
              </Typography>
              <span className="gradient-b-border"></span>
            </ListItem>
            <ListItem className="!justify-center !grid">
              <Typography variant="h6" display={"block"} className={isIphone () ? "!text-sm !font-[400] font-poppins !leading-[140%] !uppercase"    :  "!text-lg !font-[400] font-poppins !leading-[140%] !uppercase"}>
              Develop
              </Typography>
              <span className="gradient-b-border"></span>
            </ListItem>
            <ListItem className="!justify-center !grid">
              <Typography variant="h6" display={"block"} className={isIphone () ? "!text-sm !font-[400] font-poppins !leading-[140%] !uppercase"    :  "!text-lg !font-[400] font-poppins !leading-[140%] !uppercase"}>
              Test
              </Typography>
              <span className="gradient-b-border"></span>
            </ListItem>
            <ListItem className="!justify-center !grid">
              <Typography variant="h6" display={"block"} className={isIphone () ? "!text-sm !font-[400] font-poppins !leading-[140%] !uppercase"    :  "!text-lg !font-[400] font-poppins !leading-[140%] !uppercase"}>
              Review
              </Typography>
              <span className="gradient-b-border"></span>
            </ListItem>
            <ListItem className="!justify-center !grid">
              <Typography variant="h6" display={"block"} className={isIphone () ? "!text-sm !font-[400] font-poppins !leading-[140%] !uppercase"    :  "!text-lg !font-[400] font-poppins !leading-[140%] !uppercase"}>
              Launch
              </Typography>
              <span className="gradient-b-border"></span>
            </ListItem>
          </List>
        </Box>
      </Box>
    </>
  );
}

export default HowWeDo;
