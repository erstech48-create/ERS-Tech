import React from "react";
import dynamic from "next/dynamic";
import Head from "../../corelayout/Head/index";
import Careerhero from "../../components/Careerhero";
import CurrentOpening from "../../components/CurrentOpening";
import PerksAndBenefits from "../../components/PerksAndBenefits";
import CareerGraphic from "@/../public/assets/images/career-hero.webp";
import AbrarImg from "@/../public/assets/images/abrar.png";
import BilalImg from "@/../public/assets/images/men-avatar.jpg";
import AishaImg from "@/../public/assets/icons/client-2-opt.webp";

// Below-the-fold testimonial slider
const ClientsAboutUs = dynamic(() => import("../../components/ClientsAboutUs"));
function page() {
  let TestimonialsEmp = [
    {
      id: 3,
      name: "Abrar Amin",
      image: AbrarImg,
      designation: "Senior SQA Engineer",
      description:
        "I’ve been with ERS TECH for over two years now, and I can honestly say it’s been an amazing experience. From day one, I’ve felt supported by my team and leadership. The company's commitment to innovation and learning has given me the opportunity to work on cutting-edge technologies and grow professionally. The collaborative atmosphere makes each day exciting, and the leadership team truly cares about our success and work-life balance.",
    },
    {
      id: 4,
      name: "Bilal Tahir",
      image: BilalImg,
      designation: "Chief Technology Officer",
      description:
        "ERS TECH is more than just a place to work—it's a place where my ideas matter. I am constantly encouraged to think outside the box and contribute to the growth of the company. The culture here fosters creativity, teamwork, and innovation. Every challenge we face is treated as an opportunity to learn and grow, and that's what makes working here so rewarding.",
    },
    {
      id: 5,
      name: "Aisha Anwar",
      image: AishaImg,
      designation: "Marketing Lead",
      description:
        "I have never felt more valued in my career than I do at ERS TECH. Not only do I have the opportunity to work on impactful projects, but I also feel truly heard by leadership. The company's emphasis on career growth and offering continuous learning opportunities has helped me grow both professionally and personally. It's inspiring to be part of a company that always strives for excellence while putting its people first.",
    },
  ];
  return (
    <>
      <Head
        title="Careers at ERS TECH - Join Our Engineering Team"
        description="Explore exciting career opportunities at ERS TECH. Join a talented team building innovative software solutions while enjoying industry-leading perks and growth."
        canonicalUrl="https://erstech.org/careers"
        breadcrumbs={[
          { name: "Home", item: "https://erstech.org/" },
          { name: "Careers" },
        ]}
      />
      <div className="w-full max-w-[1920px] mx-auto">
        <Careerhero
          btnText={"Careers"}
          Mainheading={"Want to Be Part of <br /> an Innovative Team?"}
          subHeading={
            "Ready to take the next step in your career? Explore our open positions and become part of a dynamic team that’s shaping the future of software development."
          }
          img={CareerGraphic}
          width={""}
        />
        <CurrentOpening />
        <PerksAndBenefits />
        <ClientsAboutUs
          Heading={"What Our Employees Say"}
          Testimonials={TestimonialsEmp}
        />
      </div>
    </>
  );
}

export default page;
