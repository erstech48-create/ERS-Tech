import React from "react";
import Head from "../../corelayout/Head/index";
import { Box } from "@mui/material";
import Careerhero from "../../components/Careerhero";
import PricingHero from "@/../public/assets/images/pricing-hero.webp";
import PriceTable from "../../components/priceTable";
import RequestQueryForm from "../../components/RequestQueryForm";
function pricing() {
  return (
    <>
      <Head
        title="Transparent Software Development Pricing | ERS TECH"
        description="Get transparent, competitive pricing for software development services at ERS TECH. We deliver top-quality digital solutions tailored to your business budget."
        canonicalUrl="https://erstech.org/pricing"
        breadcrumbs={[
          { name: "Home", item: "https://erstech.org/" },
          { name: "Pricing" },
        ]}
      />
      <div className="w-full max-w-[1920px] mx-auto">
        <Careerhero
          btnText={"Pricing"}
          Mainheading={"Your Plan — Your Way"}
          subHeading={
            "Choose a plan tailored to your requirements and specifications."
          }
          subHeading2={"Want a customized plan? Get a Quote."}
          img={PricingHero}
          top={"75%"}
        />
        <PriceTable />
        <Box className="mb-16">
          <RequestQueryForm />
        </Box>
      </div>
    </>
  );
}

export default pricing;
