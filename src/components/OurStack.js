import React, { useState } from "react";
import { Box, Typography, Grid } from "@mui/material";
import Image from "next/image";
import defaultStackData from "../../public/stackdata.json";

const TABS = [
  { key: "web-dev", label: "Web Development" },
  { key: "app-dev", label: "App Development" },
  { key: "dev-ops", label: "DevOps" },
  { key: "uiux", label: "UI/UX Design" },
  { key: "technical-support", label: "Technical Support" },
];

// Pre-group stack items by category for instant 0ms switching
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

  const handleTabChange = (category) => {
    if (category === selected) return;
    // 1. Immediately highlight the clicked tab (zero lag)
    setSelected(category);
    // 2. Smooth fade-out of current icons
    setIsFading(true);
    // 3. Switch icons after short fade and smoothly fade in
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

  return (
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
        {/* Tabs Bar with smooth transition */}
        <Box className="flex items-center justify-center flex-wrap mb-14 xl:gap-12 lg:gap-8 md:gap-4 sm:gap-4 xsm:gap-4 xxs:gap-4 xxxs:gap-4">
          {TABS.map((tab) => {
            const isActive = selected === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => handleTabChange(tab.key)}
                className={`!capitalize !text-[18px] !font-[600] font-poppins !leading-[140%] !tracking-[-0.16px] !text-black block border-active hover:!text-ersPrimary transition-colors duration-200 cursor-pointer ${
                  isActive ? "border-actived !text-ersPrimary" : ""
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </Box>

        {/* Stable container with min-height and smooth fade transition */}
        <div className="min-h-[260px] flex flex-col justify-center">
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
                  className="flex items-center justify-center"
                >
                  <div className="flex items-center justify-center transition-transform duration-200 hover:scale-105">
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
                      className="flex items-center justify-center"
                    >
                      <div className="flex items-center justify-center transition-transform duration-200 hover:scale-105">
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
