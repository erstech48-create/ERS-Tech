import React from "react";
import dynamic from "next/dynamic";
import Head from "../../corelayout/Head/index";
import ScrollStory from "../../components/scrollStory";

// Contact form (id="contact") stays below the story; the CTA buttons scroll to it.
const RequestQueryForm = dynamic(() => import("../../components/RequestQueryForm"));

function HomePage() {
  return (
    <>
      <Head
        title="ERS TECH - Custom Software & Blockchain Solutions"
        description="Discover ERS TECH, a leading software development company specializing in Fintech and blockchain solutions. Empower your business with cutting-edge technology."
        canonicalUrl="https://erstech.org/"
      />
      <ScrollStory />
      <div className="w-full max-w-[1920px] mx-auto pt-16">
        <RequestQueryForm />
      </div>
    </>
  );
}

export default HomePage;
