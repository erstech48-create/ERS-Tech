import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
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
import { fetchAllPosts, sanitizeWordPressHtml } from "@/utils/fetchWordPress";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import ScrollProgress from "@/components/motion/ScrollProgress";
import SplitHeading from "@/components/motion/SplitHeading";
import Reveal from "@/components/motion/Reveal";

const formatLongDate = (dateStr) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  const month = d.toLocaleString("en-US", { month: "long" });
  const day = d.getDate();
  const year = d.getFullYear();
  return `${month} ${day}, ${year}`;
};

function SingleBlog({ post }) {
  const router = useRouter();
  const articleRef = useRef(null);
  const [showStickyShare, setShowStickyShare] = useState(false);
  const [shareUrl, setShareUrl] = useState(
    post?.slug
      ? `https://erstech.org/blogs/${post.slug}`
      : "https://erstech.org/blogs"
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      setShareUrl(window.location.href);

      const handleScroll = () => {
        setShowStickyShare(window.scrollY > 300);
      };

      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  // Fade-in article container once
  useEffect(() => {
    if (prefersReducedMotion() || !articleRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        articleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );
    }, articleRef);

    return () => ctx.revert();
  }, [post?.slug]);

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
          datePublished: post.date
            ? post.date.replace(" ", "T") + "Z"
            : undefined,
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

      {/* Reading Progress Bar (Measuring Article Element) */}
      <ScrollProgress targetRef={articleRef} color="#26AFED" />

      {/* Sticky Side Share Bar on Desktop (>= 1280px) fading in after 300px */}
      <div
        className={`hidden xl:flex fixed left-8 top-1/2 -translate-y-1/2 z-40 flex-col gap-3 p-3 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-blue-50 transition-all duration-300 ${
          showStickyShare ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6 pointer-events-none"
        }`}
      >
        <span className="text-[10px] font-bold text-gray-400 text-center uppercase tracking-wider mb-1">
          Share
        </span>
        <FacebookShareButton
          url={shareUrl}
          quote={post.title}
          hashtag="#Blockchain,#ERS,#ERSTECH,#Fintech"
        >
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <LinkedinShareButton url={shareUrl}>
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
        <TelegramShareButton url={shareUrl} title={post.title}>
          <TelegramIcon size={32} round />
        </TelegramShareButton>
        <TwitterShareButton url={shareUrl} title={post.title}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>
        <WhatsappShareButton url={shareUrl} title={post.title} separator=":: ">
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
      </div>

      <div
        className="4xl:!container xxxl:!container xxl:!container xl:!container lg:!container md:!container sm:max-w-full xsm:max-w-full xxs:max-w-full xxxs:max-w-full blog-hero-bg relative"
        style={
          post.image
            ? { backgroundImage: `url(${post.image})` }
            : { backgroundColor: "#115DCE" }
        }
      >
        <div className="flex flex-col items-center justify-center h-full px-6 max-w-4xl mx-auto text-center">
          <SplitHeading
            as="h1"
            className="md:text-[45px] text-[32px] text-center font-poppins font-[600] leading-normal tracking-[-0.18px] text-white"
          >
            {post.title}
          </SplitHeading>
          {post.date && (
            <Reveal direction="up" distance={15} delay={0.3}>
              <p className="text-white/80 font-poppins text-sm mt-3">
                {formatLongDate(post.date)}
              </p>
            </Reveal>
          )}
        </div>
      </div>

      <div ref={articleRef} className="container relative lg:px-0 px-4">
        <div className="grid place-content-center gap-6 md:px-12 max-w-4xl mx-auto">
          {/* Article body container faded in once without modifying WP markup */}
          <div
            className="w-full text-start single-blog-content"
            dangerouslySetInnerHTML={{ __html: post.description }}
          />

          <div className="flex items-start justify-start">
            <button
              onClick={() => router.back()}
              type="button"
              className="flex items-center text-base font-[500] font-poppins leading-[120%] text-black hover:text-ersPrimary transition-colors"
            >
              <IoMdArrowBack size={25} />
              &nbsp;Back
            </button>
          </div>

          <div className="border-b-[1px] border-solid border-[#606060] w-full" />

          {/* Inline Share buttons for mobile / smaller screens */}
          <div className="flex items-center justify-between mb-8">
            <span className="text-sm font-poppins font-[400] leading-normal tracking-[-0.16px] mb-0 text-gray-500">
              {post.date ? formatLongDate(post.date) : ""}
            </span>

            <div className="flex justify-end items-center share-buttons">
              <div className="flex items-center gap-3">
                <FacebookShareButton
                  url={shareUrl}
                  quote={post.title}
                  hashtag="#Blockchain,#ERS,#ERSTECH,#Fintech"
                >
                  <FacebookIcon size={30} round />
                </FacebookShareButton>
                <LinkedinShareButton url={shareUrl}>
                  <LinkedinIcon size={30} round />
                </LinkedinShareButton>
                <TelegramShareButton url={shareUrl} title={post.title}>
                  <TelegramIcon size={30} round />
                </TelegramShareButton>
                <TwitterShareButton url={shareUrl} title={post.title}>
                  <TwitterIcon size={30} round />
                </TwitterShareButton>
                <WhatsappShareButton
                  url={shareUrl}
                  title={post.title}
                  separator=":: "
                >
                  <WhatsappIcon size={30} round />
                </WhatsappShareButton>
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

  if (posts === null) {
    throw new Error(
      `WordPress API unreachable while fetching post "${slug}". Keeping last good version.`
    );
  }

  const post = posts.find((item) => item.slug === slug);
  if (!post) {
    return {
      notFound: true,
      revalidate: 60,
    };
  }

  const sanitizedPost = {
    ...post,
    description: sanitizeWordPressHtml(post.description),
  };

  return {
    props: {
      post: sanitizedPost,
    },
    revalidate: 600,
  };
}

export default SingleBlog;
