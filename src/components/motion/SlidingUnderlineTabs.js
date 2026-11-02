import React, { useEffect, useRef, useState } from "react";

export default function SlidingUnderlineTabs({
  tabs,
  activeKey,
  onChange,
  className = "",
  buttonClassName = "",
  indicatorColor = "#26AFED",
}) {
  const containerRef = useRef(null);
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const updateIndicator = () => {
    if (!containerRef.current) return;
    const activeBtn = containerRef.current.querySelector(
      `[data-tab-key="${activeKey}"]`
    );
    if (activeBtn) {
      setIndicatorStyle({
        left: activeBtn.offsetLeft,
        width: activeBtn.offsetWidth,
        opacity: 1,
      });
    }
  };

  useEffect(() => {
    updateIndicator();
    const handleResize = () => updateIndicator();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeKey, tabs]);

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center flex-wrap gap-4 lg:gap-8 pb-2 ${className}`}
    >
      {tabs.map((tab) => {
        const isActive = activeKey === tab.key;
        return (
          <button
            key={tab.key}
            type="button"
            data-tab-key={tab.key}
            onClick={() => onChange(tab.key)}
            className={`!capitalize !text-[16px] lg:!text-[18px] !font-[600] font-poppins !leading-[140%] !tracking-[-0.16px] px-2 py-1 transition-colors duration-200 cursor-pointer ${
              isActive ? "text-ersPrimary" : "text-gray-700 hover:text-ersPrimary"
            } ${buttonClassName}`}
          >
            {tab.label}
          </button>
        );
      })}

      {/* Moving Underline Indicator */}
      <span
        className="absolute bottom-0 h-[3px] rounded-full pointer-events-none transition-all duration-300 ease-out"
        style={{
          left: `${indicatorStyle.left}px`,
          width: `${indicatorStyle.width}px`,
          backgroundColor: indicatorColor,
          opacity: indicatorStyle.opacity,
          transform: "translateZ(0)",
        }}
      />
    </div>
  );
}

