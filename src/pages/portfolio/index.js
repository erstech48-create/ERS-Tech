import React from "react";
import fs from "fs";
import path from "path";
import Head from "../../corelayout/Head/index";
import Careerhero from "../../components/Careerhero";
import PortfoiloGraphic from "@/../public/assets/images/portfolio-grapjics2.webp";
import FeaturedProjects from "../../components/FeaturedProjects";

function index({ initialProjects = [] }) {
  return (
    <>
      <Head
        title="ERS TECH Portfolio - Our Latest Projects & Case Studies"
        description="Browse our portfolio of successful projects in Fintech and blockchain development. Discover how ERS TECH transforms complex ideas into high-impact software."
        canonicalUrl="https://erstech.org/portfolio"
        breadcrumbs={[
          { name: "Home", item: "https://erstech.org/" },
          { name: "Portfolio" },
        ]}
      />
      <div className="w-full max-w-[1920px] mx-auto">
        <Careerhero
          btnText={"Portfolio"}
          Mainheading={
            "A Showcase of <br /> Innovative Solutions <br /> and Successful Projects"
          }
          subHeading={
            "Dive into our portfolio to explore the wide array of projects. We transform complex ideas into intuitive, high-performance solutions that not only meet but exceed client expectations."
          }
          img={PortfoiloGraphic}
          width={""}
        />
        <FeaturedProjects initialProjects={initialProjects} />
      </div>
    </>
  );
}

export async function getStaticProps() {
  try {
    const filePath = path.join(process.cwd(), "public", "data.json");
    const initialProjects = JSON.parse(fs.readFileSync(filePath, "utf8"));
    return {
      props: {
        initialProjects: Array.isArray(initialProjects) ? initialProjects : [],
      },
    };
  } catch (err) {
    console.error("Failed to load data.json:", err.message);
    return {
      props: {
        initialProjects: [],
      },
    };
  }
}

export default index;
