import React, { useState, useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { FaEye } from "react-icons/fa";
import RequestQueryForm from "./RequestQueryForm";
import Link from "next/link";
import Image from "next/image";
import { projectToCaseStudyMap } from "@/data/caseStudies";
function FeaturedProjects({ initialProjects = [] }) {
  const [data, setData] = useState(initialProjects);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState("all");

  const handleCategory = (category) => {
    setSelected(category);
    if (initialProjects && initialProjects.length > 0) {
      if (category.toLowerCase() === "all") {
        setData(initialProjects);
      } else {
        const filtered = initialProjects.filter((item) => {
          const itemCategories = (item.category || "")
            .split(",")
            .map((cat) => cat.trim().toLowerCase());
          return itemCategories.includes(category.toLowerCase());
        });
        setData(filtered);
      }
      return;
    }

    fetch(`/api/filterByCategory?category=${encodeURIComponent(category)}`)
      .then((res) => res.json())
      .then((result) => {
        if (result.error) {
          setError(result.error);
          setData([]);
          setSelected("all");
        } else {
          setError("");
          setData(result);
          setSelected(category);
        }
      });
  };

  useEffect(() => {
    if (initialProjects && initialProjects.length > 0) {
      setData(initialProjects);
    } else {
      handleCategory("all");
    }
  }, [initialProjects]);

  return (
    <>
      <Box className="4xl:!container xxxl:!container xxl:!container xl:!container lg:!container md:!container sm:max-w-full xsm:max-w-full xxs:max-w-full xxxs:max-w-full mt-[3rem] mb-20">
        <Box className="block text-center pb-6 lg:w-[70%] md:w-[70%] sm:w-[70%] xsm:w-[85%] xxs:w-[85%] xxxs:w-[85%] m-auto mb-8">
          <Typography
            className="capitalize !text-3xl !font-[600] font-poppins !leading-[140%] !tracking-[-0.16px] text-center"
            variant="h2"
            component={"h2"}
            gutterBottom
          >
            Our Featured&nbsp;<span className="text-ersPrimary">Projects</span>
          </Typography>
          <Typography
            className="!text-[14px] !font-[400] font-poppins !leading-[150%] !tracking-[-0.16px] text-center"
            variant="subtitle1"
            component={"p"}
            gutterBottom
          >
            Discover the Impact of Our Expertise
          </Typography>
        </Box>
        <Box className="w-[90%] max-w-full mx-auto pt-10">
          <Box className="flex items-center justify-center flex-wrap mb-20 xl:gap-10 lg:gap-8 md:gap-4 sm:gap-4 xsm:gap-4 xxs:gap-4 xxxs:gap-4">
            <button
              type="button"
              onClick={() => handleCategory("all")}
              className={`!capitalize !text-[18px] !font-[600] font-poppins !leading-[140%] !tracking-[-0.16px] !text-black block border-active hover:!text-ersPrimary ${
                selected === "all" ? "border-actived !text-ersPrimary" : ""
              }`}
            >
              All
            </button>
            <button
              onClick={() => handleCategory("mob app")}
              className={`!capitalize !text-[18px] !font-[600] font-poppins !leading-[140%] !tracking-[-0.16px] !text-black block border-active hover:!text-ersPrimary ${
                selected === "mob app" ? "border-actived !text-ersPrimary" : ""
              }`}
            >
              App Development
            </button>
            <button
              onClick={() => handleCategory("web app")}
              type="button"
              className={`!capitalize !text-[18px] !font-[600] font-poppins !leading-[140%] !tracking-[-0.16px] !text-black block border-active hover:!text-ersPrimary ${
                selected === "web app" ? "border-actived !text-ersPrimary" : ""
              }`}
            >
              Web Development
            </button>
            <button
              onClick={() => handleCategory("software")}
              type="button"
              className={`!capitalize !text-[18px] !font-[600] font-poppins !leading-[140%] !tracking-[-0.16px] !text-black block border-active hover:!text-ersPrimary ${
                selected === "software" ? "border-actived !text-ersPrimary" : ""
              }`}
            >
              Software Development
            </button>
            <button
              onClick={() => handleCategory("blockchain")}
              type="button"
              className={`!capitalize !text-[18px] !font-[600] font-poppins !leading-[140%] !tracking-[-0.16px] !text-black block border-active hover:!text-ersPrimary ${
                selected === "blockchain"
                  ? "border-actived !text-ersPrimary"
                  : ""
              }`}
            >
              Blockchain Development
            </button>
          </Box>
          <Box className="h-full mb-32">
            <Grid container spacing={6}>
              {data.map((data, i) => {
                return (
                  <Grid key={data.id || data.name || i} item xs={12} sm={12} md={6} lg={4}>
                    <Box className="block w-[90%] h-[250px] mb-6 mx-auto portfolio-container rounded-[15px]">
                      <Image
                        width={1000}
                        height={1000}
                        src={data.imageUrl}
                        className="w-[90%] h-full rounded-[15px] object-cover portfolio-image"
                        alt={data.name}
                      />
                      <div className="overlay">
                        <Link
                          href={data.url}
                          target="_blank"
                          className="icon"
                          title={data.name}
                        >
                          <FaEye color="#fff" className="eye-icon" />
                        </Link>
                      </div>
                    </Box>
                    <Box className="text-center">
                      <Link href={data.url} target="_blank" rel="noopener noreferrer">
                        <Typography
                          variant="h6"
                          component="h3"
                          gutterBottom
                          className="!text-[16px] !font-[600] font-poppins !leading-[140%] !tracking-[-0.16px] capitalize"
                        >
                          {data.name}
                        </Typography>
                      </Link>
                      <Box className="flex items-center justify-center text-center gap-2">
                        <Typography
                          variant="body2"
                          gutterBottom
                          display={"block"}
                          className="capitalize text-ersPrimary border-r-[2px] pr-2 !text-sm !font-[400] font-poppins !leading-[140%] !tracking-[-0.16px]"
                        >
                          {data.techStack.frontend}
                        </Typography>
                        <Typography
                          variant="body2"
                          gutterBottom
                          display={"block"}
                          className="capitalize text-ersPrimary border-r-[2px] pr-2 !font-[400] font-poppins !leading-[140%] !tracking-[-0.16px]"
                        >
                          {data.techStack.backend}
                        </Typography>
                        <Typography
                          variant="body2"
                          gutterBottom
                          display={"block"}
                          className="capitalize text-ersPrimary !font-[400] font-poppins !leading-[140%] !tracking-[-0.16px]"
                        >
                          {data.techStack.database}
                        </Typography>
                      </Box>
                      {Boolean(
                        projectToCaseStudyMap.byDataId[data.id] ||
                        projectToCaseStudyMap.bySliderName[data.name]
                      ) && (
                        <Box className="mt-2">
                          <Link
                            href={`/portfolio/${
                              projectToCaseStudyMap.byDataId[data.id] ||
                              projectToCaseStudyMap.bySliderName[data.name]
                            }`}
                            className="inline-flex items-center text-xs font-semibold text-ersPrimary hover:underline"
                          >
                            View Case Study &rarr;
                          </Link>
                        </Box>
                      )}
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
          <RequestQueryForm />
        </Box>
      </Box>
    </>
  );
}

export default FeaturedProjects;
