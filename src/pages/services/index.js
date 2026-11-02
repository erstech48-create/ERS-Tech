import React from "react";
import dynamic from "next/dynamic";
import fs from "fs";
import path from "path";
import Head from "../../corelayout/Head/index";
import ServicesHero from "../../components/Careerhero";
import ServicesGraphic from "../../../public/assets/images/services.webp";
import OurServices from "@/components/OurServices";
import OurStack from "@/components/OurStack";

// Dynamic imports for below-the-fold sections
const Projects = dynamic(() => import("@/components/Projects"));
const RequestQueryForm = dynamic(() => import("@/components/RequestQueryForm"));

function index({ initialStack = null, allStacks = null }) {
  return (
    <>
      <Head
        title="Software Development Services | ERS TECH"
        description="Explore ERS TECH software development services. We deliver custom web, mobile, blockchain, and fintech solutions tailored to accelerate your business growth."
        canonicalUrl="https://erstech.org/services"
        breadcrumbs={[
          { name: "Home", item: "https://erstech.org/" },
          { name: "Services" },
        ]}
      />
      <div className="w-full max-w-[1920px] mx-auto">
        <ServicesHero
          btnText={"Services"}
          Mainheading={"Our Expertise in  <br /> Software Development"}
          subHeading={
            "At ERS TECH, we specialize in delivering cutting-edge software solutions tailored to meet your business needs. From Fintech systems and blockchain development to educational platforms and beyond, our team of experts is committed to innovation, quality, and excellence. Let us transform your ideas into powerful digital solutions."
          }
          img={ServicesGraphic}
          width={"90%"}
        />
        <OurServices
          title={{ titleOne: "Services", titleTwo: "We Offer" }}
          page={"services"}
        />
        <OurStack initialStack={initialStack} allStacks={allStacks} />
        <div className="mb-20">
          <Projects
            title={{ titleOne: "Featured", titleTwo: "Projects" }}
            page={"Services"}
          />
        </div>
        <div className="mb-10">
          <RequestQueryForm />
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  try {
    const filePath = path.join(process.cwd(), "public", "stackdata.json");
    const stackData = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const allStacks = {};
    stackData.forEach((item) => {
      if (item.category && item.imageUrl) {
        const cat = item.category.toLowerCase();
        if (!allStacks[cat]) allStacks[cat] = [];
        allStacks[cat].push(item.imageUrl);
      }
    });
    const webDevItems = allStacks["web-dev"] || [];
    const initialStack = { imageUrls: webDevItems };

    return {
      props: {
        initialStack,
        allStacks,
      },
    };
  } catch (err) {
    console.error("Failed to load stackdata.json:", err.message);
    return {
      props: {
        initialStack: null,
        allStacks: null,
      },
    };
  }
}

export default index;
