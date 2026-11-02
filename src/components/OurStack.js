import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, Grid } from "@mui/material";
import Image from "next/image";
import defaultStackData from "../../public/stackdata.json";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import SplitHeading from "@/components/motion/SplitHeading";
import SlidingUnderlineTabs from "@/components/motion/SlidingUnderlineTabs";

const TABS = [
  { key: "web-dev", label: "Web Development" },
  { key: "app-dev", label: "App Development" },
  { key: "dev-ops", label: "DevOps" },
  { key: "uiux", label: "UI/UX Design" },
  { key: "technical-support", label: "Technical Support" },
];

const PREPARED_STACKS = defaultStackData.reduce((acc, item) => {
  if (item.category && item.imageUrl) {
    const cat = item.category.toLowerCase();
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item.imageUrl);
  }
  return acc;
}, {});

function OurStack({ initialStack = null, allStacks = null }) {
  const stacksMap = allStacks || PREPARED_STACKS;
  const [selected, setSelected] = useState("web-dev");
  const [activeCategory, setActiveCategory] = useState("web-dev");
  const [isFading, setIsFading] = useState(false);
  const gridContainerRef = useRef(null);

  const handleTabChange = (category) => {
    if (category === selected) return;
    setSelected(category);
    setIsFading(true);
    setTimeout(() => {
      setActiveCategory(category);
      setIsFading(false);
    }, 150);
  };

  const currentUrls =
    stacksMap[activeCategory] ||
    (activeCategory === "web-dev" && initialStack?.imageUrls) ||
    [];

  const firstRow = currentUrls.slice(0, 5);
  const secondRow = currentUrls.slice(5);

  // Stagger in logos on mount and when activeCategory changes
  useEffect(() => {
    if (prefersReducedMotion() || !gridContainerRef.current) return;

    const ctx = gsap.context(() => {
      const items = gridContainerRef.current.querySelectorAll(".stack-logo-item");
      if (items.length) {
        gsap.fromTo(
          items,
          { opacity: 0, scale: 0.85 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            stagger: 0.04,
            ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: gridContainerRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }
    }, gridContainerRef);

    return () => ctx.revert();
  }, [activeCategory]);

  return (
    <Box className="mb-[5rem] overflow-hidden">
      <Box className="block text-center m-auto mb-8">
        <Typography
          className="capitalize !text-3xl !font-[600] text-center font-poppins"
          variant="h2"
          component={"h2"}
          gutterBottom
        >
          <SplitHeading as="span">Our </SplitHeading>
          <span className="text-ersPrimary">
            <SplitHeading as="span">Stacks</SplitHeading>
          </span>
        </Typography>
      </Box>

      <Box className="w-[80%] max-w-[100%] m-auto">
        {/* Animated Sliding Underline Tabs */}
        <SlidingUnderlineTabs
          tabs={TABS}
          activeKey={selected}
          onChange={handleTabChange}
          className="mb-12"
        />

        {/* Stable container with min-height and smooth fade transition */}
        <div ref={gridContainerRef} className="min-h-[260px] flex flex-col justify-center">
          <div
            className={`transition-all duration-300 ease-in-out ${
              isFading
                ? "opacity-0 translate-y-1 scale-[0.98]"
                : "opacity-100 translate-y-0 scale-100"
            }`}
          >
            <Grid container spacing={3} justifyContent="center" alignItems="center">
              {firstRow.map((url, i) => (
                <Grid
                  key={`${activeCategory}-${url}-${i}`}
                  item
                  xs={6}
                  sm={6}
                  md={2.4}
                  lg={2.4}
                  className="flex items-center justify-center stack-logo-item"
                >
                  <div className="flex items-center justify-center transition-transform duration-200 hover:-translate-y-1 cursor-pointer">
                    <Image
                      src={url}
                      width={120}
                      height={120}
                      className="stack-icons"
                      alt="Technology stack logo"
                    />
                  </div>
                </Grid>
              ))}

              {secondRow.length > 0 && (
                <Grid container item xs={12} justifyContent="center" spacing={3}>
                  {secondRow.map((url, i) => (
                    <Grid
                      key={`${activeCategory}-row2-${url}-${i}`}
                      item
                      xs={6}
                      sm={6}
                      md={2}
                      lg={2}
                      className="flex items-center justify-center stack-logo-item"
                    >
                      <div className="flex items-center justify-center transition-transform duration-200 hover:-translate-y-1 cursor-pointer">
                        <Image
                          src={url}
                          width={120}
                          height={120}
                          className="stack-icons"
                          alt="Technology stack logo"
                        />
                      </div>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Grid>
          </div>
        </div>
      </Box>
    </Box>
  );
}

export default OurStack;
