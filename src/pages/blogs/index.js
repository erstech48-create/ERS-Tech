import React from "react";
import Head from "../../corelayout/Head/index";
import Careerhero from "../../components/Careerhero";
import Blogsimg from "@/../public/assets/images/blogs-hero.webp";
import FeaturedBlogs from "../../components/FeaturedBlogs";
import { fetchAllPosts } from "@/utils/fetchWordPress";

function blogs({ initialBlogs = [] }) {
  return (
    <>
      <Head
        title="ERS TECH Blog - Software, Fintech & Tech Insights"
        description="Stay updated with the latest trends in Fintech, blockchain, and software development. Explore expert tech insights, engineering guides, and industry updates."
        canonicalUrl="https://erstech.org/blogs"
        breadcrumbs={[
          { name: "Home", item: "https://erstech.org/" },
          { name: "Blogs" },
        ]}
      />
      <div className="w-full max-w-[1920px] mx-auto">
        <Careerhero
          btnText={"Blogs"}
          Mainheading={"Insights & Expertise <br /> from Our Blog"}
          subHeading={
            "Stay updated with our thought leadership, success stories, and company updates. Dive in and explore a wealth of content aimed at helping you stay ahead in the fast-paced world of tech."
          }
          img={Blogsimg}
          width={""}
        />
        <FeaturedBlogs initialBlogs={initialBlogs} />
      </div>
    </>
  );
}

export async function getStaticProps() {
  const posts = await fetchAllPosts(4000);

  // Case b: WordPress unreachable / timed out / returned invalid data
  if (posts === null) {
    // In development mode or during build, never crash the page with a 500 error.
    // Return empty blogs list with revalidate: 30 so it self-heals quickly instead of caching empty for 600s
    if (
      process.env.NODE_ENV === "development" ||
      process.env.NEXT_PHASE === "phase-production-build" ||
      process.env.npm_lifecycle_event === "build"
    ) {
      return {
        props: {
          initialBlogs: [],
        },
        revalidate: 30,
      };
    }
    // During production ISR revalidation, throw so Next.js retains last good version
    throw new Error("WordPress API unreachable during ISR revalidation. Keeping last good version.");
  }

  const initialBlogs = posts.map((post) => ({
    id: post.id,
    title: post.title,
    meta_description: post.meta_description,
    image: post.image,
    categories: post.categories,
    date: post.date,
    slug: post.slug,
  }));

  return {
    props: {
      initialBlogs,
    },
    revalidate: 600,
  };
}

export default blogs;
