import React from "react";
import dynamic from "next/dynamic";
import Head from "../../corelayout/Head/index";
import AboutHero from "../../components/About-Hero ";
import OurStats from "../../components/OurStats";
import HowWeDo from "../../components/HowWeDo";
import Team from "../../components/Team";
import WhyChooseUs from "../../components/WhyChooseUs";
import TrustedBy from "../../components/TrustedBy";

// Dynamic import for below-the-fold FAQs
const Faqs = dynamic(() => import("../../components/Faqs"));

// FAQ data mirrored exactly from Faqs.js (visible Q&A only — no commented-out entries)
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What services do you offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We specialize in Android App Development, Blockchain Solutions, Hybrid Apps Development, Website Development, WordPress Development, and Software Development. We also provide solutions in Fintech and HRM systems.",
      },
    },
    {
      "@type": "Question",
      name: "How do I start a project with your company?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Simply reach out to us through the contact form or our business email. We'll schedule a consultation to understand your requirements and then craft a tailored solution for your project.",
      },
    },
    {
      "@type": "Question",
      name: "Do you provide post-launch support?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, we offer ongoing support after the launch of the project. This includes maintenance, troubleshooting, and any updates you may require.",
      },
    },
    {
      "@type": "Question",
      name: "Do you work with clients globally?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, we serve clients worldwide. Our team has the expertise to collaborate remotely and manage projects across different time zones.",
      },
    },
    {
      "@type": "Question",
      name: "What types of technologies does ERS TECH support?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ERS TECH caters for the following technologies: PHP / Laravel, Blockchain, JavaScript, Node.js, iOS & Android, React.js, and React Native.",
      },
    },
    {
      "@type": "Question",
      name: "What are the major products developed by ERS TECH?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ERS TECH has developed a diverse number of products: Quikipay, CardHolder, FocusMonk, Salharo, LiftSplit, Wise1HRM, and Mukaf.",
      },
    },
    {
      "@type": "Question",
      name: "How long does it take to complete a project?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The timeline depends on the complexity and scope of the project. We provide an estimated timeline during the initial consultation and work with you closely to meet your deadlines.",
      },
    },
    {
      "@type": "Question",
      name: "How do you manage communication with clients?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our dedicated development teams align seamlessly with your time zone and manage daily communication through modern collaboration tools such as Slack, Jira, Microsoft Teams, and Zoom.",
      },
    },
  ],
};

function page() {
  return (
    <>
      <Head
        title="About ERS TECH - Trusted Software Development Partner"
        description="Learn more about ERS TECH, a dynamic software development company delivering proven Fintech and blockchain solutions. Discover our mission, team, and values."
        canonicalUrl="https://erstech.org/about-us"
        breadcrumbs={[
          { name: "Home", item: "https://erstech.org/" },
          { name: "About Us" },
        ]}
        extraJsonLd={faqSchema}
      />
      <div className="w-full max-w-[1920px] mx-auto">
        <AboutHero />
        <OurStats />
        <div className="mx-auto w-[1263px] max-w-full">
          <HowWeDo />
        </div>
        {/* <Team /> */}
        <WhyChooseUs />
        <TrustedBy />
        <Faqs />
      </div>
    </>
  );
}

export default page;
