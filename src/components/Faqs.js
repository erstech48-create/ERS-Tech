import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
function Faqs() {
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
    // {
    //   question: "What are the major services ERS delivers?",
    //   answer:
    //     "ERS delivers multiple services for its clients, which are as follows.\n" +
    //     "Mobile App Development\n" +
    //     "Web App Development\n" +
    //     "Quality Assurance\n" +
    //     "UI/UX Design\n" +
    //     "Software Development",
    // },
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
    // {
    //   question: "How is ERS different from other development companies?",
    //   answer:
    //     "You’ll experience the following perks and benefits.\n" +
    //     "Diverse source of expert developers\n" +
    //     "Simple and sleek hiring process\n" +
    //     "Shortlisting of talent under 24 hours\n" +
    //     "Dedicated talent specialist\n" +
    //     "Catering payments, legal and admin issues\n" +
    //     "Talent management and performance reporting throughout the collaboration",
    // },
  ];
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  return (
    <>
      <Box className="4xl:!container xxxl:!container xxl:!container xl:!container lg:!container md:!container sm:max-w-full xsm:max-w-full xxs:max-w-full xxxs:max-w-full">
        <Box className="block text-center pb-6">
          <Typography
            className="capitalize !text-3xl !font-[600] font-poppins leading-[140%] tracking-[-0.16px] text-center"
            variant="h2"
            component={"h2"}
            gutterBottom
          >
            Want To <span className="text-ersPrimary">Know More?</span>
          </Typography>
        </Box>
        <Box className="xl:w-[80%] lg:w-[80%] md:w-[80%] sm:w-[90%] xsm:w-[95%] xxs:w-[95%] xxxs:w-[95%] max-w-full mx-auto h-full min-h-full mb-[3rem]">
          {faqsData.map((faq, index) => (
            <div
              key={faq.id || faq.question || index}
              className={`faq-item ${activeIndex === index ? "open" : ""}`}
            >
              <div className="faq-question" onClick={() => toggleFAQ(index)}>
              <div className="flex items-center gap-4">
                <span className="accordian-counter text-ersPrimary">
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
                <span className="">
                  {activeIndex === index ? (
                    <Box className="text-ersPrimary h-[30px] w-[30px] border-[1px] border-[#707070] rounded-[50%] flex items-center justify-center">
                      -
                    </Box>
                  ) : (
                    <Box className="text-ersPrimary h-[30px] w-[30px] border-[1px] border-[#707070] rounded-[50%] flex items-center justify-center">
                      +
                    </Box>
                  )}
                </span>
              </div>
              <div className="faq-answer">
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
          ))}
        </Box>
      </Box>
    </>
  );
}

export default Faqs;
