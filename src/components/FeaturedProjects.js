import React, { useState, useEffect, useRef } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { FaEye } from "react-icons/fa";
import RequestQueryForm from "./RequestQueryForm";
import Link from "next/link";
import Image from "next/image";
import { projectToCaseStudyMap } from "@/data/caseStudies";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import SplitHeading from "@/components/motion/SplitHeading";
import Reveal from "@/components/motion/Reveal";
import SlidingUnderlineTabs from "@/components/motion/SlidingUnderlineTabs";

const FILTER_TABS = [
  { key: "all", label: "All" },
  { key: "mob app", label: "App Development" },
  { key: "web app", label: "Web Development" },
  { key: "software", label: "Software Development" },
  { key: "blockchain", label: "Blockchain Development" },
];

function FeaturedProjects({ initialProjects = [] }) {
  const [data, setData] = useState(initialProjects);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState("all");
  const gridContainerRef = useRef(null);
  const rootRef = useRef(null);

  const applyCategoryFilter = (category) => {
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

  const handleCategory = (category) => {
    if (category === selected) return;
    setSelected(category);

    const cards = gridContainerRef.current?.querySelectorAll(".portfolio-card-item");
    if (cards && cards.length && !prefersReducedMotion()) {
      // Animate old cards out (.2s opacity + scale .96)
      gsap.to(cards, {
        opacity: 0,
        scale: 0.96,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          applyCategoryFilter(category);
        },
      });
    } else {
      applyCategoryFilter(category);
    }
  };

  // Animate new cards in with stagger .06 + clip-path inset reveal
  useEffect(() => {
    if (prefersReducedMotion() || !gridContainerRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gridContainerRef.current.querySelectorAll(".portfolio-card-item");
      if (cards.length) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.06,
            ease: "power3.out",
            scrollTrigger: {
              trigger: gridContainerRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );

        const wrappers = gridContainerRef.current.querySelectorAll(".portfolio-img-wrapper");
        const images = gridContainerRef.current.querySelectorAll(".portfolio-image");

        if (wrappers.length) {
          gsap.fromTo(
            wrappers,
            { clipPath: "inset(8% round 12px)" },
            {
              clipPath: "inset(0% round 12px)",
              duration: 0.8,
              stagger: 0.06,
              ease: "power3.out",
            }
          );
        }

        if (images.length) {
          gsap.fromTo(
            images,
            { scale: 1.08 },
            {
              scale: 1,
              duration: 0.8,
              stagger: 0.06,
              ease: "power3.out",
            }
          );
        }

        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 100);
      }
    }, gridContainerRef);

    return () => ctx.revert();
  }, [data]);

  useEffect(() => {
    if (initialProjects && initialProjects.length > 0) {
      setData(initialProjects);
    } else {
      applyCategoryFilter("all");
    }
  }, [initialProjects]);

  return (
    <>
      <Box
        ref={rootRef}
        className="4xl:!container xxxl:!container xxl:!container xl:!container lg:!container md:!container sm:max-w-full xsm:max-w-full xxs:max-w-full xxxs:max-w-full mt-[3rem] mb-20 overflow-hidden"
      >
        <Box className="block text-center pb-6 lg:w-[70%] md:w-[70%] sm:w-[70%] xsm:w-[85%] xxs:w-[85%] xxxs:w-[85%] m-auto mb-8">
          <Typography
            className="capitalize !text-3xl !font-[600] font-poppins !leading-[140%] !tracking-[-0.16px] text-center"
            variant="h2"
            component={"h2"}
            gutterBottom
          >
            <SplitHeading as="span">Our Featured </SplitHeading>
            <span className="text-ersPrimary">
              <SplitHeading as="span">Projects</SplitHeading>
            </span>
          </Typography>
          <Reveal direction="up" distance={20} delay={0.2}>
            <Typography
              className="!text-[14px] !font-[400] font-poppins !leading-[150%] !tracking-[-0.16px] text-center"
              variant="subtitle1"
              component={"p"}
              gutterBottom
            >
              Discover the Impact of Our Expertise
            </Typography>
          </Reveal>
        </Box>

        <Box className="w-[90%] max-w-full mx-auto pt-6">
          {/* Filter Tabs using sliding underline */}
          <SlidingUnderlineTabs
            tabs={FILTER_TABS}
            activeKey={selected}
            onChange={handleCategory}
            className="mb-16"
          />

          {/* Project Cards Grid with min-height to prevent jump */}
          <Box ref={gridContainerRef} className="h-full min-h-[500px] mb-32">
            <Grid container spacing={6}>
              {data.map((item, i) => (
                <Grid
                  key={item.id || item.name || i}
                  item
                  xs={12}
                  sm={12}
                  md={6}
                  lg={4}
                  className="portfolio-card-item"
                >
                  <Box className="portfolio-img-wrapper block w-[90%] h-[250px] mb-6 mx-auto portfolio-container rounded-[15px] relative">
                    <Image
                      width={1000}
                      height={1000}
                      src={item.imageUrl}
                      className="w-[90%] h-full rounded-[15px] object-cover portfolio-image"
                      alt={item.name}
                    />
                    <div className="overlay">
                      <Link
                        href={item.url}
                        target="_blank"
                        className="icon"
                        title={item.name}
                      >
                        <FaEye color="#fff" className="eye-icon" />
                      </Link>
                    </div>
                  </Box>
                  <Box className="text-center">
                    <Link href={item.url} target="_blank" rel="noopener noreferrer">
                      <Typography
                        variant="h6"
                        component="h3"
                        gutterBottom
                        className="!text-[16px] !font-[600] font-poppins !leading-[140%] !tracking-[-0.16px] capitalize hover:text-ersPrimary transition-colors"
                      >
                        {item.name}
                      </Typography>
                    </Link>
                    <Box className="flex items-center justify-center text-center gap-2">
                      <Typography
                        variant="body2"
                        gutterBottom
                        display={"block"}
                        className="capitalize text-ersPrimary border-r-[2px] pr-2 !text-sm !font-[400] font-poppins !leading-[140%] !tracking-[-0.16px]"
                      >
                        {item.techStack.frontend}
                      </Typography>
                      <Typography
                        variant="body2"
                        gutterBottom
                        display={"block"}
                        className="capitalize text-ersPrimary border-r-[2px] pr-2 !font-[400] font-poppins !leading-[140%] !tracking-[-0.16px]"
                      >
                        {item.techStack.backend}
                      </Typography>
                      <Typography
                        variant="body2"
                        gutterBottom
                        display={"block"}
                        className="capitalize text-ersPrimary !font-[400] font-poppins !leading-[140%] !tracking-[-0.16px]"
                      >
                        {item.techStack.database}
                      </Typography>
                    </Box>
                    {Boolean(
                      projectToCaseStudyMap.byDataId[item.id] ||
                        projectToCaseStudyMap.bySliderName[item.name]
                    ) && (
                      <Box className="mt-2">
                        <Link
                          href={`/portfolio/${
                            projectToCaseStudyMap.byDataId[item.id] ||
                            projectToCaseStudyMap.bySliderName[item.name]
                          }`}
                          className="inline-flex items-center text-xs font-semibold text-ersPrimary hover:underline"
                        >
                          View Case Study &rarr;
                        </Link>
                      </Box>
                    )}
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
          <RequestQueryForm />
        </Box>
      </Box>
    </>
  );
}

export default FeaturedProjects;
