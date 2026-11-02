import React, { useState, useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import Reveal from "@/components/motion/Reveal";

function Faqs() {
  const rootRef = useRef(null);
  const faqsData = [
    {
      question: "What services do you offer?",
      answer:
        "We specialize in Android App Development, Blockchain Solutions, Hybrid Apps Development, Website Development, WordPress Development, and Software Development. We also provide solutions in Fintech and HRM systems.",
    },
    {
      question: "How do I start a project with your company?",
      answer:
        "Simply reach out to us through the contact form or our business email. We’ll schedule a consultation to understand your requirements and then craft a tailored solution for your project.",
    },
    {
      question: "Do you provide post-launch support?",
      answer:
        "Yes, we offer ongoing support after the launch of the project. This includes maintenance, troubleshooting, and any updates you may require.",
    },
    {
      question: "Do you work with clients globally?",
      answer:
        "Yes, we serve clients worldwide. Our team has the expertise to collaborate remotely and manage projects across different time zones.",
    },
    {
      question: "What types of technologies does ERS support?",
      answer:
        "ERS caters for the following technologies:\n" +
        "PHP / Laravel\n" +
        "Blockchain\n" +
        "JavaScript\n" +
        "Node.js\n" +
        "iOS & Android\n" +
        "ReactJS\n" +
        "React Native",
    },
    {
      question: "What are the major products developed by ERS?",
      answer:
        "ERS has developed a diverse number of products, which are as follows:\n" +
        "Quikipay\n" +
        "CardHolder\n" +
        "FocusMonk\n" +
        "Salharo\n" +
        "LiftSplit\n" +
        "Wise1HRM\n" +
        "Mukaf",
    },
    {
      question: "How long does it take to complete a project?",
      answer:
        "The timeline depends on the complexity and scope of the project. We provide an estimated timeline during the initial consultation and work with you closely to meet your deadlines.",
    },
    {
      question: "How do you manage communication with clients?",
      answer:
        "Our dedicated development teams align seamlessly with your time zone and manage daily communication through modern collaboration tools such as Slack, Jira, Microsoft Teams, and Zoom.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    if (prefersReducedMotion() || !rootRef.current) return;

    const ctx = gsap.context(() => {
      const items = rootRef.current.querySelectorAll(".faq-item");
      if (items.length) {
        gsap.set(items, { opacity: 0, y: 25 });
        ScrollTrigger.batch(items, {
          start: "top 85%",
          once: true,
          onEnter: (batch) => {
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.08,
              ease: "power3.out",
            });
          },
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 360);
  };

  return (
    <>
      <Box
        ref={rootRef}
        className="4xl:!container xxxl:!container xxl:!container xl:!container lg:!container md:!container sm:max-w-full xsm:max-w-full xxs:max-w-full xxxs:max-w-full"
      >
        <Box className="block text-center pb-6">
          <Reveal direction="up" distance={25}>
            <Typography
              className="capitalize !text-3xl !font-[600] font-poppins leading-[140%] tracking-[-0.16px] text-center"
              variant="h2"
              component={"h2"}
              gutterBottom
            >
              Want To <span className="text-ersPrimary">Know More?</span>
            </Typography>
          </Reveal>
        </Box>
        <Box className="xl:w-[80%] lg:w-[80%] md:w-[80%] sm:w-[90%] xsm:w-[95%] xxs:w-[95%] xxxs:w-[95%] max-w-full mx-auto h-full min-h-full mb-[3rem]">
          {faqsData.map((faq, index) => (
            <div
              key={faq.id || faq.question || index}
              className={`faq-item ${activeIndex === index ? "open" : ""}`}
            >
              <div
                className="faq-question cursor-pointer flex items-center justify-between"
                onClick={() => toggleFAQ(index)}
              >
                <div className="flex items-center gap-4">
                  <span className="accordian-counter text-ersPrimary font-semibold">
                    0{index + 1}
                  </span>
                  <Typography
                    variant="h6"
                    component="h3"
                    className="!text-lg !font-[500] font-poppins !leading-[140%] tracking-[-0.16px] xl:!mr-0 lg:!mr-0 md:!mr-0 sm:!mr-4 xsm:!mr-0 xxs:!mr-4 xxxs:!mr-4"
                  >
                    {faq.question}
                  </Typography>
                </div>
                <span>
                  <Box className="faq-toggle-icon text-ersPrimary h-[30px] w-[30px] border-[1px] border-[#707070] rounded-full flex items-center justify-center font-bold">
                    {activeIndex === index ? "−" : "+"}
                  </Box>
                </span>
              </div>
              <div className="faq-answer-wrapper">
                <div className="faq-answer-inner faq-answer">
                  {faq.answer.includes("\n") ? (
                    <ul className="custom-list">
                      {faq.answer.split("\n").map((item, i) =>
                        i === 0 ? (
                          <Typography
                            key={i}
                            variant="h6"
                            component="p"
                            className="!text-[15px] !font-[500] font-poppins !leading-[140%] !tracking-[-0.16px] !mb-2"
                          >
                            {item}
                          </Typography>
                        ) : (
                          <li key={i}>
                            <Typography
                              variant="h6"
                              component="p"
                              className="!text-[14px] !font-[400] font-poppins"
                            >
                              {item}
                            </Typography>
                          </li>
                        )
                      )}
                    </ul>
                  ) : (
                    <Typography
                      variant="h6"
                      component="p"
                      className="!text-[14px] !font-[400] font-poppins !leading-[140%] !tracking-[-0.16px]"
                    >
                      {faq.answer}
                    </Typography>
                  )}
                </div>
              </div>
            </div>
          ))}
        </Box>
      </Box>
    </>
  );
}

export default Faqs;
