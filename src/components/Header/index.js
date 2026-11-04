import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { IoClose } from "react-icons/io5";
import { IoMdArrowRoundBack } from "react-icons/io";
import Logo from "@/../public/assets/images/white-logo.png";
import CLogo from "@/../public/assets/images/colorlogo.png";
import AboutIcon from "@/../public/assets/images/about-us.png";
import CareersIcon from "@/../public/assets/images/careers.png";
import PortfolioIcon from "@/../public/assets/images/portfolio.png";
import BlogsIcon from "@/../public/assets/images/blogs.png";
import WebIcon from "@/../public/assets/images/web-dev-icon.png";
import AppIcon from "@/../public/assets/images/app-dev-icon.png";
import QAIcon from "@/../public/assets/images/qa-icon.png";
import BlockchainIcon from "@/../public/assets/images/blockchain-icon.png";
import UIIcon from "@/../public/assets/images/ui-icon.png";
import SupportIcon from "@/../public/assets/images/support-icon.png";
import Image from "next/image";
import { useLenis } from "@/components/motion/SmoothScroll";
import { gsap } from "@/lib/gsap";

function Header() {
  const router = useRouter();
  const menuRef = useRef(null);
  const headerRef = useRef(null);
  const menuOverlayRef = useRef(null);
  const { lenis, scrollTo } = useLenis();
  let subMenu;

  const [menuActive, setMenuActive] = useState(false);
  const [mobileMenuTitle, setMobileMenuTitle] = useState("");
  const isCaseStudyPage =
    router.pathname === "/portfolio/[slug]" ||
    (Boolean(router.asPath) &&
      router.asPath.startsWith("/portfolio/") &&
      router.asPath !== "/portfolio");
  const [isScrolled, setIsScrolled] = useState(isCaseStudyPage);

  const showWhiteNav = isScrolled || isCaseStudyPage;

  // Keep --nav-h in sync with the real navbar height
  useEffect(() => {
    if (!headerRef.current) return;
    const updateNavH = () => {
      if (headerRef.current) {
        const height = headerRef.current.offsetHeight;
        if (height > 0) {
          document.documentElement.style.setProperty("--nav-h", `${height}px`);
        }
      }
    };
    updateNavH();
    const ro = new ResizeObserver(updateNavH);
    ro.observe(headerRef.current);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    let ticking = false;

    const updateScroll = () => {
      const currentScrollY = window.scrollY;
      const scrolled = currentScrollY > 20 || isCaseStudyPage;
      setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    updateScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isCaseStudyPage]);

  useEffect(() => {
    if (menuActive) {
      lenis?.stop();
      if (menuRef.current) {
        const items = menuRef.current.querySelectorAll(".menu-section > li");
        gsap.fromTo(
          items,
          { opacity: 0, x: -16 },
          { opacity: 1, x: 0, duration: 0.3, stagger: 0.05, ease: "power2.out" }
        );
      }
    } else {
      lenis?.start();
    }
  }, [menuActive, lenis]);

  useEffect(() => {
    const menu = menuRef.current;
    const menuSection = menu ? menu.querySelector(".menu-section") : null;
    const menuArrow = menu ? menu.querySelector(".menu-mobile-arrow") : null;
    const menuClosed = menu ? menu.querySelector(".menu-mobile-close") : null;
    const menuTrigger = document.querySelector(".menu-mobile-trigger");
    const menuOverlay = menuOverlayRef.current;

    const toggleMenu = () => {
      setMenuActive(!menuActive);
      menuOverlay?.classList?.toggle("active");
    };

    const showSubMenu = (hasChildren) => {
      subMenu = hasChildren.querySelector(".menu-subs");
      if (subMenu) {
        subMenu?.classList?.add("active");
        subMenu.style.animation = "slideLeft 0.5s ease forwards";
        const menuTitle =
          hasChildren.querySelector("i")?.parentNode?.childNodes[0].textContent;
        setMobileMenuTitle(menuTitle || "");
        menu.querySelector(".menu-mobile-header")?.classList?.add("active");
      }
    };

    const hideSubMenu = () => {
      if (subMenu) {
        subMenu.style.animation = "slideRight 0.5s ease forwards";
      }
      setTimeout(() => {
        subMenu?.classList?.remove("active");
        setMobileMenuTitle("");
        menu.querySelector(".menu-mobile-header")?.classList?.remove("active");
      }, 300);
    };

    const handleResize = () => {
      if (window.innerWidth > 1195 && menuActive) {
        toggleMenu();
      }
    };

    if (menuSection) {
      menuSection.addEventListener("click", (e) => {
        if (!menu?.classList?.contains("active")) {
          return;
        }
        if (e.target.closest(".menu-item-has-children")) {
          const hasChildren = e.target.closest(".menu-item-has-children");
          showSubMenu(hasChildren);
        }
      });
    }

    if (menuArrow) {
      menuArrow.addEventListener("click", hideSubMenu);
    }

    if (menuTrigger) {
      menuTrigger.addEventListener("click", toggleMenu);
    }

    if (menuClosed) {
      menuClosed.addEventListener("click", toggleMenu);
    }

    if (menuOverlay) {
      menuOverlay.addEventListener("click", toggleMenu);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      if (menuSection) {
        menuSection.removeEventListener("click", handleResize);
      }
      if (menuArrow) {
        menuArrow.removeEventListener("click", hideSubMenu);
      }
      if (menuTrigger) {
        menuTrigger.removeEventListener("click", toggleMenu);
      }
      if (menuClosed) {
        menuClosed.removeEventListener("click", toggleMenu);
      }
      if (menuOverlay) {
        menuOverlay.removeEventListener("click", toggleMenu);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [menuActive]);

  const headerStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: showWhiteNav ? "#fff" : "transparent",
    color: showWhiteNav ? "#3E3E3E !important" : "#fff",
    transform: "translateY(0)",
    transition: "background-color 0.3s ease, box-shadow 0.3s ease, color 0.3s ease",
    boxShadow:
      showWhiteNav
        ? "0 4px 6px -1px rgba(0, 0, 0, 0.1),0 2px 4px -1px rgba(0, 0, 0, 0.06)"
        : undefined,
  };

  return (
    <header ref={headerRef} className="header" style={headerStyle}>
      <div className="px-lg-cus container mx-auto">
        <div className="wrapper-new-menu">
          <div className="logo-btn header-item-left">
            <Link href="/">
              <Image
                src={showWhiteNav ? CLogo : Logo}
                alt="ERS TECH Logo"
                width={125}
                height={125}
                priority
                className="!mb-0 object-cover !rounded-[0px]"
              />
            </Link>
          </div>
          <div className="header-item-center">
            {/* <div className="overlay"></div> */}
            <nav ref={menuRef} className={`menu ${menuActive ? "active" : ""}`}>
              <div className="menu-mobile-header">
                <button type="button" className="btn menu-mobile-arrow">
                  <IoMdArrowRoundBack className="ml-4" size={40} />
                </button>
                <div className="menu-mobile-title">{mobileMenuTitle}</div>
                <button type="button" className="btn menu-mobile-close">
                  <IoClose size={40} />
                </button>
              </div>
              <ul className="menu-section">
                <li className="menu-item-has-children">
                  <Link
                    href="/"
                    className={showWhiteNav ? "!text-[#3E3E3E]" : "text-white"}
                  >
                    Home
                  </Link>
                </li>

                <li className="menu-item-has-children">
                  <Link
                    href="/about-us"
                    onClick={(e) => e.preventDefault()}
                    className={showWhiteNav ? "!text-[#3E3E3E]" : "text-white"}
                  >
                    Company <i className="ion ion-ios-arrow-down"></i>
                  </Link>
                  <div className="menu-subs menu-mega menu-column-4 xl:!w-[16%] lg:!w-full md:!w-full sm:!w-full xsm:!w-full xxs:!w-full xxxs:!w-full  xl:!left-[46%] lg:!left-[0%] md:!left-[0%] sm:!left-[0%] xsm:!left-[0%] xxs:!left-[0%] xxxs:!left-[0%] !translate-x-0">
                    <div className="list-item">
                      <ul>
                        <li className="menuuu">
                          <Link href="/about-us">
                            <Image
                              src={AboutIcon}
                              width={20}
                              height={20}
                              className="object-cover"
                              alt=""
                            />
                            &nbsp;About Us
                          </Link>
                        </li>
                        <li className="menuuu">
                          <Link href="/careers">
                            <Image
                              src={CareersIcon}
                              width={20}
                              height={20}
                              className="object-cover"
                              alt=""
                            />
                            &nbsp;Careers
                          </Link>
                        </li>
                        <li className="menuuu">
                          <Link href="/portfolio">
                            <Image
                              src={PortfolioIcon}
                              width={20}
                              height={20}
                              className="object-cover"
                              alt=""
                            />
                            &nbsp;Portfolio
                          </Link>
                        </li>
                        <li className="menuuu">
                          <Link href="/blogs">
                            <Image
                              src={BlogsIcon}
                              width={20}
                              height={20}
                              className="object-cover"
                              alt=""
                            />
                            &nbsp;Blogs
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>

                <li className="menu-item-has-children">
                  <Link
                    href="/services"
                    className={showWhiteNav ? "!text-[#3E3E3E]" : "text-white"}
                  >
                    Services <i className="ion ion-ios-arrow-down"></i>
                  </Link>
                </li>
                <li className="menu-item-has-children">
                  <Link
                    href="/pricing"
                    className={showWhiteNav ? "!text-[#3E3E3E]" : "text-white"}
                  >
                    Pricing
                  </Link>
                </li>
                <li className="menu-item-has-children">
                  <Link
                    href="/services#contact"
                    className="hire_team"
                    onClick={(e) => {
                      if (router.pathname === "/services") {
                        e.preventDefault();
                        scrollTo("#contact", { offset: -90 });
                      }
                    }}
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className="header-item-right d-block d-md-block ">
            <button type="button" className="btn menu-mobile-trigger">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
