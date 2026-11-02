import React from "react";
import dynamic from "next/dynamic";
import Hero from "../../components/Hero";
import TrustedBy from "../../components/TrustedBy";
import JourneyScene from "../../components/JourneyScene";
import StatsStrip from "../../components/StatsStrip";
import OurServices from "../../components/OurServices";
import IndustriesWeServe from "../../components/IndustriesWeServe";
import CoreValues from "../../components/CoreValues";
import ClientImg from "@/../public/assets/icons/CLIENT-IMG.png";
import Client2 from "@/../public/assets/icons/client-2-opt.webp";
import Head from "../../corelayout/Head/index";

// Below-the-fold dynamic imports for performance
const Projects = dynamic(() => import("../../components/Projects"));
const ClientsAboutUs = dynamic(() => import("../../components/ClientsAboutUs"));

function HomePage() {
  let TestimonialsClients = [
    {
      id: 1,
      name: "Arie Amir",
      image: ClientImg,
      designation: "Onboarding Officer Fintech Cashier",
      description:
        "My name is Arie Amir and I am the onboarding officer and customer support at FINTECHCASHIER, & as such appreciate ERS TECH's expertise in developing & maintaining sophisticated APIs for our LATAM Fintech markets. They maintain high professional responsiveness & cooperation to guarantee our business success in those markets. I warmly recommend a partnership with ERS TECH for all potential customers.",
    },
    {
      id: 2,
      name: "Faiqa Anwer",
      image: Client2,
      designation: "Owner LiftSplit App",
      description:
        "My name is Faiqa, and I am the founder of the LiftSplit app. ERS TECH has developed an application for my business that was top-notch in quality. I am satisfied with the company's services as their team is highly cooperative and expert in their domain. Highly recommended!",
    },
  ];
  return (
    <>
      <Head
        title="ERS TECH - Custom Software & Blockchain Solutions"
        description="Discover ERS TECH, a leading software development company specializing in Fintech and blockchain solutions. Empower your business with cutting-edge technology."
        canonicalUrl="https://erstech.org/"
      />
      <div className="w-full max-w-[1920px] mx-auto">
        <Hero />
        <TrustedBy />
        <JourneyScene />
        <StatsStrip />
        <OurServices title={{ titleOne: "Our", titleTwo: "Services" }} page={"home"}/>
        <IndustriesWeServe />
        <Projects title={{ titleOne: "Our Latest", titleTwo: "Projects" }} page={"home"} />
        <CoreValues />
        <ClientsAboutUs
          Heading={"What Our Clients Say"}
          Testimonials={TestimonialsClients}
        />
      </div>
    </>
  );
}

export default HomePage;
