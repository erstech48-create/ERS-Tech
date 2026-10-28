import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import moment from "moment";
import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "next-share";
import Head from "@/corelayout/Head/index";
import NextHead from "next/head";
import { IoMdArrowBack } from "react-icons/io";
import { fetchAllPosts } from "@/utils/fetchWordPress";

function SingleBlog({ post }) {
  const router = useRouter();
  const [shareUrl, setShareUrl] = useState(
    post?.slug ? `https://erstech.org/blogs/${post.slug}` : "https://erstech.org/blogs"
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      setShareUrl(window.location.href);
    }
  }, []);

  if (!post) {
    return null;
  }

  return (
    <>
      <Head
        title={post.title ? `${post.title} | ERS TECH` : "ERS TECH Blog"}
        description={
          post.meta_description ||
          "Read expert insights on Fintech, blockchain, and custom software development from the engineering team at ERS TECH."
        }
        canonicalUrl={`https://erstech.org/blogs/${post.slug}`}
        image={post.image || ""}
        publishedTime={post.date || ""}
        breadcrumbs={[
          { name: "Home", item: "https://erstech.org/" },
          { name: "Blogs", item: "https://erstech.org/blogs" },
          { name: post.title || post.slug },
        ]}
        extraJsonLd={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title || "",
          datePublished: post.date ? post.date.replace(" ", "T") + "Z" : undefined,
          image: post.image || undefined,
          author: {
            "@type": "Organization",
            "@id": "https://erstech.org/#organization",
            name: "ERS TECH",
          },
          publisher: {
            "@type": "Organization",
            "@id": "https://erstech.org/#organization",
            name: "ERS TECH",
          },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `https://erstech.org/blogs/${post.slug}`,
          },
        }}
      />
      <NextHead>
        <link rel="stylesheet" href="/slug.css" />
      </NextHead>

      <div
        className="4xl:!container xxxl:!container xxl:!container xl:!container lg:!container md:!container sm:max-w-full xsm:max-w-full xxs:max-w-full xxxs:max-w-full blog-hero-bg relative"
        style={
          post.image
            ? { backgroundImage: `url(${post.image})` }
            : { backgroundColor: "#115DCE" }
        }
      >
        <div className="flex items-center justify-center h-full">
          <h1 className="md:text-[45px] text-[36px] text-center font-inter font-[600] leading-normal tracking-[-0.18px] text-white inline-block">
            {post.title}
          </h1>
        </div>
      </div>

      <div className="container relative lg:px-0 px-4">
        <div className="grid place-content-center gap-6 md:px-12">
          <div
            className="w-full text-start single-blog-content"
            dangerouslySetInnerHTML={{ __html: post.description }}
          />

          <div className="flex items-start justify-start">
            <button
              onClick={() => router.back()}
              type="button"
              className="flex items-center text-base font-[500] font-inter leading-[120%] text-black"
            >
              <IoMdArrowBack size={25} color="#000" />
              &nbsp;Back
            </button>
          </div>

          <div className="border-b-[1px] border-solid border-[#606060] w-full" />

          <div className="flex items-center justify-between mb-8">
            <span className="text-sm font-inter font-[400] leading-normal tracking-[-0.16px] mb-0">
              {post.date ? moment(post.date).format("MMMM D, YYYY") : ""}
            </span>

            <div className="flex justify-end items-center share-buttons">
              <div className="flex items-center gap-3">
                <div>
                  <FacebookShareButton
                    url={shareUrl}
                    quote={post.title}
                    hashtag="#Blockchain,#ERS,#ERSTECH,#Fintech,#SoftwareDevelopment"
                  >
                    <FacebookIcon size={32} round />
                  </FacebookShareButton>
                </div>
                <div>
                  <LinkedinShareButton url={shareUrl}>
                    <LinkedinIcon size={32} round />
                  </LinkedinShareButton>
                </div>
                <div>
                  <TelegramShareButton url={shareUrl} title={post.title}>
                    <TelegramIcon size={32} round />
                  </TelegramShareButton>
                </div>
                <div>
                  <TwitterShareButton url={shareUrl} title={post.title}>
                    <TwitterIcon size={32} round />
                  </TwitterShareButton>
                </div>
                <div>
                  <WhatsappShareButton url={shareUrl} title={post.title} separator=":: ">
                    <WhatsappIcon size={32} round />
                  </WhatsappShareButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const posts = await fetchAllPosts(4000);
  const paths = Array.isArray(posts)
    ? posts.map((post) => ({ params: { slug: post.slug } }))
    : [];

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const posts = await fetchAllPosts(4000);

  // Case b: WordPress unreachable / timed out / returned invalid data
  // Unreachable => NEVER return notFound (never cache a 404). Throw so Next.js preserves last good version or retries.
  if (posts === null) {
    throw new Error(`WordPress API unreachable while fetching post "${slug}". Keeping last good version (no cached 404).`);
  }

  // Case a: WordPress responded, but slug is not found in the list => real 404
  const post = posts.find((item) => item.slug === slug);
  if (!post) {
    return {
      notFound: true,
      revalidate: 60,
    };
  }

  return {
    props: {
      post,
    },
    revalidate: 600,
  };
}

export default SingleBlog;
