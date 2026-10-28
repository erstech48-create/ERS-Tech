import React, { useState, useEffect } from "react";
import { Box, Typography, Grid } from "@mui/material";
import Image from "next/image";
import Web3 from "../../public/assets/icons/web3.jpg";

function OurStack({ initialStack = null }) {
  const [selected, setSelected] = useState("web-dev");
  const [data, setData] = useState(initialStack || []);
  const [error, setError] = useState("");

  const handleStack = (category) => {
    fetch(`/api/stackByCategory?category=${encodeURIComponent(category)}`)
      .then((res) => res.json())
      .then((result) => {
        if (result.error) {
          setError(result.error);
          setData([]);
          setSelected("web-dev");
        } else {
          setError("");
          setData(result);
          setSelected(category);
        }
      });
  };

  useEffect(() => {
    if (!initialStack || !initialStack.imageUrls || initialStack.imageUrls.length === 0) {
      handleStack("web-dev");
    }
  }, [initialStack]);

  return (
    <>
      <Box className="mb-[5rem]">
        <Box className="block text-center m-auto mb-8">
          <Typography
            className="capitalize !text-3xl !font-[600] text-center font-poppins"
            variant="h2"
            component={"h2"}
            gutterBottom
          >
            Our&nbsp;
            <span className="text-ersPrimary">Stacks</span>
          </Typography>
        </Box>
        <Box className="w-[80%] max-w-[100%] m-auto">
          <Box className="flex items-center justify-center flex-wrap mb-20 xl:gap-12 lg:gap-8 md:gap-4 sm:gap-4 xsm:gap-4 xxs:gap-4 xxxs:gap-4">
            <button
              type="button"
              onClick={() => handleStack("web-dev")}
              className={`!capitalize !text-[18px] !font-[600] font-poppins !leading-[140%] !tracking-[-0.16px] !text-black block border-active hover:!text-ersPrimary ${
                selected === "web-dev" ? "border-actived !text-ersPrimary" : ""
              }`}
            >
              Web Development
            </button>
            <button
              onClick={() => handleStack("app-dev")}
              className={`!capitalize !text-[18px] !font-[600] font-poppins !leading-[140%] !tracking-[-0.16px] !text-black block border-active hover:!text-ersPrimary ${
                selected === "app-dev" ? "border-actived !text-ersPrimary" : ""
              }`}
            >
              App Development
            </button>
            <button
              onClick={() => handleStack("dev-ops")}
              type="button"
              className={`!capitalize !text-[18px] !font-[600] font-poppins !leading-[140%] !tracking-[-0.16px] !text-black block border-active hover:!text-ersPrimary ${
                selected === "dev-ops" ? "border-actived !text-ersPrimary" : ""
              }`}
            >
              Dev Ops
            </button>
            <button
              onClick={() => handleStack("uiux")}
              type="button"
              className={`!capitalize !text-[18px] !font-[600] font-poppins !leading-[140%] !tracking-[-0.16px] !text-black block border-active hover:!text-ersPrimary ${
                selected === "uiux" ? "border-actived !text-ersPrimary" : ""
              }`}
            >
              UI/UX Design
            </button>
            <button
              onClick={() => handleStack("technical-support")}
              type="button"
              className={`!capitalize !text-[18px] !font-[600] font-poppins !leading-[140%] !tracking-[-0.16px] !text-black block border-active hover:!text-ersPrimary ${
                selected === "technical-support"
                  ? "border-actived !text-ersPrimary"
                  : ""
              }`}
            >
              Technical support
            </button>
          </Box>
          <Grid container spacing={2}>
            {data?.imageUrls?.slice(0, 5).map((url, i) => (
              <Grid
                key={i}
                item
                xs={6}
                sm={6}
                md={2.4}
                lg={2.4}
                className="flex items-center justify-center"
              >
                <Image
                  src={url}
                  width={120}
                  height={120}
                  className="stack-icons" alt="Technology stack logo"
                />
              </Grid>
            ))}

            <Grid container item xs={12} justifyContent="center" spacing={2}>
              {data?.imageUrls?.slice(5, 9).map((url, i) => (
                <Grid
                  key={`row2-${i}`}
                  item
                  xs={6}
                  sm={6}
                  md={2}
                  lg={2}
                  className="flex items-center justify-center"
                >
                  <Image
                    src={url}
                    width={120}
                    height={120}
                    className="stack-icons" alt="Technology stack logo"
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default OurStack;
