import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/../public/assets/images/white-logo.png";
import CLogo from "@/../public/assets/images/colorlogo.png";
import AboutIcon from "@/../public/assets/images/about-us.png";
import CareersIcon from "@/../public/assets/images/careers.png";
import PortfolioIcon from "@/../public/assets/images/portfolio.png";
import BlogsIcon from "@/../public/assets/images/blogs.png";
import { useLenis } from "@/components/motion/SmoothScroll";

const COMPANY = [
  { href: "/about-us", label: "About Us", icon: AboutIcon },
  { href: "/careers", label: "Careers", icon: CareersIcon },
  { href: "/portfolio", label: "Portfolio", icon: PortfolioIcon },
  { href: "/blogs", label: "Blogs", icon: BlogsIcon },
];
const LINKS = [
  { href: "/", label: "Home" },
  { label: "Company", children: COMPANY },
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
];

function Header() {
  const router = useRouter();
  const headerRef = useRef(null);
  const ddRef = useRef(null);
  const { lenis, scrollTo } = useLenis();

  const isCaseStudyPage =
    router.pathname === "/portfolio/[slug]" ||
    (Boolean(router.asPath) && router.asPath.startsWith("/portfolio/") && router.asPath !== "/portfolio");
  const [isScrolled, setIsScrolled] = useState(isCaseStudyPage);
  const [menuOpen, setMenuOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false); // mobile accordion
  const [ddOpen, setDdOpen] = useState(false); // desktop dropdown
  const solid = isScrolled || isCaseStudyPage || menuOpen;

  // Keep --nav-h in sync with the real navbar height (used by the home scroll story)
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return undefined;
    const update = () => {
      const h = el.offsetHeight;
      if (h > 0) document.documentElement.style.setProperty("--nav-h", `${h}px`);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // White navbar after scrolling
  useEffect(() => {
    let ticking = false;
    const update = () => {
      const s = window.scrollY > 20 || isCaseStudyPage;
      setIsScrolled((prev) => (prev !== s ? s : prev));
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isCaseStudyPage]);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    setCompanyOpen(false);
  }, []);

  // Lock page scroll while the mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      lenis?.stop();
      document.documentElement.classList.add("eh-locked");
    } else {
      lenis?.start();
      document.documentElement.classList.remove("eh-locked");
    }
  }, [menuOpen, lenis]);

  // Close menus on route change, Escape and when growing to desktop width
  useEffect(() => {
    const onRoute = () => {
      closeMenu();
      setDdOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") {
        closeMenu();
        setDdOpen(false);
      }
    };
    const mq = window.matchMedia("(min-width: 1024px)");
    const onMq = (e) => e.matches && closeMenu();
    router.events.on("routeChangeStart", onRoute);
    window.addEventListener("keydown", onKey);
    mq.addEventListener?.("change", onMq);
    return () => {
      router.events.off("routeChangeStart", onRoute);
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener?.("change", onMq);
    };
  }, [router.events, closeMenu]);

  // Close desktop dropdown on outside click
  useEffect(() => {
    if (!ddOpen) return undefined;
    const onDown = (e) => {
      if (ddRef.current && !ddRef.current.contains(e.target)) setDdOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [ddOpen]);

  const onContact = (e) => {
    closeMenu();
    if (typeof document !== "undefined" && document.getElementById("contact")) {
      e.preventDefault();
      scrollTo("#contact", { offset: -90 });
    }
  };

  const isActive = (href) =>
    href === "/" ? router.pathname === "/" || router.pathname === "/home" : router.asPath.startsWith(href);
  const companyActive = COMPANY.some((c) => isActive(c.href));

  return (
    <header ref={headerRef} className={`eh ${solid ? "eh-solid" : ""} ${menuOpen ? "eh-open" : ""}`}>
      <div className="eh-bar">
        <Link href="/" className="eh-logo" aria-label="ERS TECH home">
          <Image src={solid ? CLogo : Logo} alt="ERS TECH Logo" width={125} height={49} priority />
        </Link>

        {/* Desktop navigation (>= 1024px) */}
        <nav className="eh-nav" aria-label="Main">
          <ul>
            {LINKS.map((l) =>
              l.children ? (
                <li
                  key={l.label}
                  ref={ddRef}
                  className={`eh-dd ${ddOpen ? "eh-dd-open" : ""}`}
                  onMouseEnter={() => setDdOpen(true)}
                  onMouseLeave={() => setDdOpen(false)}
                >
                  <button
                    type="button"
                    className={`eh-link ${companyActive ? "eh-active" : ""}`}
                    aria-expanded={ddOpen}
                    aria-haspopup="true"
                    onClick={() => setDdOpen((v) => !v)}
                  >
                    {l.label}
                    <svg className="eh-caret" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                  <div className="eh-dd-panel">
                    {l.children.map((c) => (
                      <Link key={c.href} href={c.href} className="eh-dd-item" onClick={() => setDdOpen(false)}>
                        <span className="eh-dd-ic">
                          <Image src={c.icon} alt="" width={20} height={20} />
                        </span>
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </li>
              ) : (
                <li key={l.href}>
                  <Link href={l.href} className={`eh-link ${isActive(l.href) ? "eh-active" : ""}`}>
                    {l.label}
                  </Link>
                </li>
              )
            )}
          </ul>
        </nav>
        <Link href="/services#contact" className="eh-cta" onClick={onContact}>
          Contact Us
        </Link>

        {/* Mobile trigger (< 1024px) */}
        <button
          type="button"
          className="eh-burger"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="eh-mobile"
          onClick={() => (menuOpen ? closeMenu() : setMenuOpen(true))}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile menu */}
      <div className="eh-overlay" onClick={closeMenu} aria-hidden="true" />
      <nav id="eh-mobile" className="eh-mobile" aria-label="Mobile" aria-hidden={!menuOpen}>
        <ul>
          {LINKS.map((l) =>
            l.children ? (
              <li key={l.label} className={companyOpen ? "eh-m-open" : ""}>
                <button
                  type="button"
                  className={`eh-m-link ${companyActive ? "eh-active" : ""}`}
                  aria-expanded={companyOpen}
                  onClick={() => setCompanyOpen((v) => !v)}
                  tabIndex={menuOpen ? 0 : -1}
                >
                  {l.label}
                  <svg className="eh-caret" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                <div className="eh-m-sub">
                  {l.children.map((c) => (
                    <Link key={c.href} href={c.href} onClick={closeMenu} tabIndex={menuOpen && companyOpen ? 0 : -1}>
                      <span className="eh-dd-ic">
                        <Image src={c.icon} alt="" width={18} height={18} />
                      </span>
                      {c.label}
                    </Link>
                  ))}
                </div>
              </li>
            ) : (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`eh-m-link ${isActive(l.href) ? "eh-active" : ""}`}
                  onClick={closeMenu}
                  tabIndex={menuOpen ? 0 : -1}
                >
                  {l.label}
                </Link>
              </li>
            )
          )}
        </ul>
        <Link href="/services#contact" className="eh-cta eh-m-cta" onClick={onContact} tabIndex={menuOpen ? 0 : -1}>
          Contact Us
        </Link>
        <div className="eh-m-foot">
          <a href="mailto:info@erstech.org" tabIndex={menuOpen ? 0 : -1}>info@erstech.org</a>
          <a href="tel:+923001420033" tabIndex={menuOpen ? 0 : -1}>+92 300 1420033</a>
        </div>
      </nav>
    </header>
  );
}

export default Header;
