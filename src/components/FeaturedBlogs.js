import React, { useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { ImCalendar } from "react-icons/im";
import { MdArrowRightAlt } from "react-icons/md";
import Link from "next/link";
import Image from "next/image";
import { getBlogs } from "@/redux/features/blogs/blogSlice";
import { useSelector, useDispatch } from "react-redux";
import Loader from "@/utils/Loader";
import dummy from "../../public/assets/imgs/dummy.jpg";

const formatShortDate = (dateStr) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  const day = d.getDate();
  const month = d.toLocaleString("en-US", { month: "short" });
  const year = String(d.getFullYear()).slice(-2);
  return `${day}-${month}-${year}`;
};

function FeaturedBlogs({ initialBlogs = null }) {
  const dispatch = useDispatch();
  const { AllBlogs, loading } = useSelector((state) => state.blogs);
  const Limit = 10;

  const blogsToDisplay = (AllBlogs && AllBlogs.length > 0) ? AllBlogs : (initialBlogs || []);
  const isLoading = loading && blogsToDisplay.length === 0;

  useEffect(() => {
    if (!AllBlogs && (!initialBlogs || initialBlogs.length === 0)) {
      dispatch(getBlogs(Limit));
    }
  }, [AllBlogs, initialBlogs, dispatch]);

  function truncateString(str, maxLength = 100) {
    if (!str) return "";
    return str.length > maxLength ? str.substring(0, maxLength) + "..." : str;
  }

  return (
    <>
      <Box className="4xl:!container xxxl:!container xxl:!container xl:!container lg:!container md:!container sm:max-w-full xsm:max-w-full xxs:max-w-full xxxs:max-w-full mt-[3rem] mb-20">
        <Box className="block text-center pb-6 lg:w-[60%] md:w-[60%] sm:w-[75%] xsm:w-[85%] xxs:w-[85%] xxxs:w-[85%] m-auto mb-8">
          <Typography
            className="capitalize !text-3xl !font-[600] font-poppins !leading-[140%] !tracking-[-0.16px] text-center"
            variant="h2"
            component={"h2"}
            gutterBottom
          >
            Our Featured&nbsp;<span className="text-ersPrimary">Blogs</span>
          </Typography>
          <Typography
            className="!text-[14px] !font-[400] font-poppins leading-[140%] !tracking-[-0.16px] text-center"
            variant="subtitle1"
            component={"p"}
            gutterBottom
          >
            Welcome to our blog, where innovation meets knowledge. Here, we
            share valuable insights, expert opinions, and industry trends on the
            latest in technology, software development, blockchain, fintech, and
            much more.
          </Typography>
        </Box>
        <Box className="w-[90%] max-w-full mx-auto">
          <Box className="h-full">
            {isLoading ? (
              <Loader />
            ) : blogsToDisplay.length > 0 ? (
              <Grid container spacing={6}>
                {blogsToDisplay?.map((data, i) => {
                  return (
                    <Grid key={data.id || data.slug || i} item xs={12} sm={12} md={6} lg={4}>
                      <Link
                        href={`/blogs/${data.slug}`}
                        aria-label={`Read more about ${data.title}`}
                        className="block h-full group"
                      >
                        <Box className="h-[430px] min-h-full relative">
                          <Box className="block w-full h-[250px] mb-6 mx-auto rounded-[20px] relative z-[1]">
                            <Image
                              src={data.image ? data.image : dummy}
                              width={400}
                              height={250}
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              loading="lazy"
                              className="w-full h-full rounded-[20px] object-cover"
                              alt={data.title || "Blog post preview"}
                            />
                          </Box>
                          <Box className="text-start blog-content-box px-4">
                            <Typography
                              variant="h6"
                              component="h3"
                              gutterBottom
                              className="!text-[16px] !font-[600] font-poppins !leading-[140%] !tracking-[-0.16px]  capitalize !mb-4"
                            >
                              {data.title}
                            </Typography>
                            <Typography
                              variant="body2"
                              gutterBottom
                              display={"block"}
                              className="!text-[#8989A2] !text-sm !font-[400] font-poppins !leading-[160%] !tracking-[-0.16px mb-6"
                            >
                              {truncateString(data.meta_description)}
                            </Typography>
                            <Box className="flex justify-between items-center w-[100%]">
                              <Typography
                                variant="caption"
                                gutterBottom
                                className="!font-[500] !text-[14px] font-poppins !leading-[140%] !tracking-[-0.16px] !flex items-center gap-1"
                              >
                                <ImCalendar size={16} color="#25A9EB" />
                                &nbsp;{formatShortDate(data.date)}
                              </Typography>
                              <span className="!text-[14px] text-ersPrimary capitalize !font-[400] font-poppins flex items-center read-more-btn">
                                Read more&nbsp;
                                <MdArrowRightAlt
                                  size={23}
                                  className="arrow-read-more"
                                />
                              </span>
                            </Box>
                          </Box>
                        </Box>
                      </Link>
                    </Grid>
                  );
                })}
              </Grid>
            ) : (
              <Box className="text-center py-16 px-4 bg-white/60 rounded-[20px] border border-[#C1ECFB] max-w-xl mx-auto shadow-sm">
                <Typography
                  variant="h5"
                  className="font-poppins !font-[600] !text-xl !text-[#1057CF] !mb-2"
                >
                  Articles Coming Soon
                </Typography>
                <Typography
                  variant="body1"
                  className="font-poppins !font-[400] !text-sm !text-gray-600 !mb-6"
                >
                  We are curating insightful articles on Fintech, blockchain, AI, and modern software engineering. Check back soon!
                </Typography>
                <Link
                  href="/services"
                  className="inline-block bg-gradient-to-r from-[#29BCF1] to-[#0F53CE] !text-white !py-2.5 !px-6 rounded-full font-poppins text-sm font-medium hover:shadow-lg transition-shadow"
                >
                  Explore Our Services
                </Link>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default FeaturedBlogs;
