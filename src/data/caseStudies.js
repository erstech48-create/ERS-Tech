// Case study content for all 5 projects (Aconomy, Salharo, Wise1ne, FocusMonk, BCCoin)
// Unified Section/Block Schema:
//   section = { id, title, layout?, verify?, blocks: [...], cards?: [...], stats?: [...], image?: { src, alt } }
//   layout: "text" (default) | "cards" | "stats" | "tools"
//   block types: p(text) | h3(text) | h4(text) | ul(items) | result(text)

export const p = (text) => ({ type: "p", text });
export const h3 = (text) => ({ type: "h3", text });
export const h4 = (text) => ({ type: "h4", text });
export const ul = (items) => ({ type: "ul", items });
export const result = (text) => ({ type: "result", text });
export const L = (label, text) => ({ label, text });

// ---------------------------------------------------------------- ACONOMY
export const aconomy = {
  slug: "aconomy",
  name: "Aconomy",
  seoTitle: "Aconomy Case Study: Crypto Exchange & Wallet | ERS TECH",
  seoDescription:
    "How ERS TECH built Aconomy, a crypto platform with trading, exchange, wallet, marketplace, crypto cards and staking, using Next.js, Node.js and MongoDB.",
  ogImage: "/assets/case-studies/aconomy/hero.webp",
  hero: {
    h1: "Aconomy: Complete Crypto Platform",
    kicker: "TAKE BACK WHAT IS YOURS.",
    title: "Complete Crypto Platform",
    image: {
      src: "/assets/case-studies/aconomy/hero.webp",
      alt: "Aconomy crypto platform dashboard shown on a laptop",
    },
  },
  theme: {
    mode: "light",
    accent: "#ff5c16",
    cardBg: "#f8f9fa",
    cardShadow: "0px 4px 16px rgba(0,0,0,0.06)",
    cardRadius: "12px",
    textColor: "#263238",
    headingColor: "#111827",
    heroBg: "#f8fafc",
    sectionBg: "#ffffff",
  },
  sections: [
    {
      id: "introduction",
      title: "Introduction",
      blocks: [
        p(
          "In the rapidly evolving world of digital finance, the demand for versatile, secure, and real-time crypto platforms is growing exponentially. Aconomy is a powerful, full-featured cryptocurrency ecosystem developed to empower users with seamless crypto transactions, asset management, and spending capabilities. This case study explores the strategic vision, technical execution, and successful implementation of Aconomy, a project built to redefine crypto usability and accessibility.",
        ),
      ],
      image: {
        src: "/assets/case-studies/aconomy/exchange-screen.webp",
        alt: "Aconomy exchange screen converting Bitcoin to Ethereum",
      },
    },
    {
      id: "background",
      title: "Background",
      blocks: [
        p(
          "As cryptocurrencies mature from speculative assets to usable currencies, there's a strong demand for platforms that go beyond simple trading. The client envisioned a single hub where users could trade, buy, sell, exchange, and spend cryptocurrencies — essentially, a crypto-based economy.",
        ),
        p(
          "The idea behind Aconomy was to bridge the gap between decentralized finance (DeFi) and real-world usability. The system needed to offer users everything — from trading and marketplace capabilities to wallet management, crypto cards, and fiat conversion — under one secure, reliable platform.",
        ),
      ],
    },
    {
      id: "challenges",
      title: "Challenges",
      layout: "cards",
      cards: [
        {
          title: "Comprehensive Feature Integration",
          text: "Combining trading, exchange, wallet, marketplace, crypto cards, and staking (earning) into one unified interface.",
        },
        {
          title: "Real-Time Performance",
          text: "Enabling real-time trading and exchange functionalities with instant updates and minimal latency.",
        },
        {
          title: "High Security Standards",
          text: "Ensuring the platform adhered to best-in-class security practices given the sensitive nature of financial and personal data.",
        },
        {
          title: "Regulatory Compliance",
          text: "Integrating fiat gateways and crypto cards while keeping in line with legal and KYC/AML requirements.",
        },
        {
          title: "User Experience",
          text: "Creating a seamless experience for both novice and expert crypto users.",
        },
        {
          title: "Blockchain Integration",
          text: "Tying core platform operations into multiple blockchain networks (e.g., Ethereum, Bitcoin, Litecoin).",
        },
        {
          title: "Scalability",
          text: "Architecting the system for high performance, uptime, and scalability across a global user base.",
        },
      ],
      blocks: [],
    },
    {
      id: "solutions",
      title: "The Solution",
      blocks: [
        p(
          "To meet these challenges, a modern tech stack and structured development methodology were adopted. Here’s how the solution was built:",
        ),
        h3("1. Platform Architecture & Design"),
        ul([
          "Built a modular architecture using Next.js and Node.js, enabling fast performance, SSR, and flexibility for new features.",
          "MongoDB was used for high-performance storage of user data, transactions, and logs with optimized indexing and queries.",
        ]),
        h3("2. Core Features Developed"),
        ul([
          L(
            "Trading Engine:",
            "Real-time crypto trading using websocket-based connections with third-party exchanges.",
          ),
          L(
            "Buy/Sell Crypto:",
            "Seamless fiat-to-crypto and crypto-to-fiat conversions via 3rd-party API integrations.",
          ),
          L(
            "Marketplace:",
            "A dedicated portal for buying physical/digital goods using crypto.",
          ),
          L(
            "Crypto Wallet:",
            "Unified dashboard showing balances of BTC, ETH, USDT, Litecoin, and more.",
          ),
          L(
            "Crypto Card:",
            "Integration of a crypto debit card for online and in-store payments, including top-up functionality.",
          ),
          L(
            "Earn Crypto:",
            "Staking module where users can lock crypto to earn yield over a defined period.",
          ),
          L(
            "Security:",
            "Two-Factor Authentication, encryption of private keys, transaction signing, secure KYC flows, rate-limiting, and DDoS protection.",
          ),
          L(
            "Admin Panel:",
            "Comprehensive control panel to manage users, KYC, transactions, reports, and platform metrics.",
          ),
        ]),
        h3("3. Blockchain and API Integration"),
        ul([
          "Implemented direct integration with major blockchain nodes.",
          "Used Web3 and other blockchain SDKs to handle wallet creation, transaction broadcasting, and staking mechanisms.",
          "Partnered with APIs for crypto pricing, identity verification (KYC), payment gateways, and card issuance.",
        ]),
        h3("4. Real-Time Data Handling"),
        ul([
          "Implemented WebSockets for live trading, exchange rates, and wallet updates.",
          "Used cron jobs and workers for syncing on-chain data and processing batch jobs.",
        ]),
        h3("5. Deployment & Infrastructure"),
        ul([
          "Deployed on scalable cloud infrastructure with containerization (Docker) and CI/CD pipelines for reliable rollouts.",
          "Monitored with tools like Prometheus/Grafana and integrated alert systems for anomaly detection.",
        ]),
      ],
      image: {
        src: "/assets/case-studies/aconomy/app-screens.webp",
        alt: "Aconomy mobile app screens",
      },
    },
    {
      id: "tools",
      title: "Tools & Technologies",
      layout: "tools",
      image: {
        src: "/assets/case-studies/aconomy/tech-icons.webp",
        alt: "Logos of the technologies used to build Aconomy",
      },
      blocks: [
        ul([
          L("Frontend:", "Next.js, Tailwind CSS, Redux"),
          L("Backend:", "Node.js, Express"),
          L("Database:", "MongoDB"),
          L(
            "Blockchain:",
            "Ethereum, Bitcoin, Litecoin integrations via Web3 and native SDKs",
          ),
          L("Authentication & Security:", "JWT, OAuth2, 2FA, KYC integration"),
          L(
            "APIs Integrated:",
            "Chainlink, CryptoCompare, Plaid, Onfido, payment gateways",
          ),
          L("DevOps:", "Docker, NGINX, GitHub Action"),
        ]),
      ],
    },
    {
      id: "results",
      title: "Results",
      verify: true,
      blocks: [
        ul([
          L(
            "Unified User Experience:",
            "All essential crypto features in one platform — reducing friction and increasing engagement.",
          ),
          L(
            "Performance & Scalability:",
            "The real-time infrastructure supports thousands of concurrent users with minimal latency.",
          ),
          L(
            "High Security:",
            "The platform meets enterprise-level security benchmarks with robust protection layers.",
          ),
          L(
            "User Adoption:",
            "Early adoption rates exceeded expectations due to user-friendly UI and diverse offerings.",
          ),
          L(
            "Business Growth:",
            "Enabled the client to attract partnerships and expand to new markets by offering crypto cards and staking.",
          ),
        ]),
      ],
    },
    {
      id: "conclusion",
      title: "Conclusion",
      blocks: [
        p(
          "Aconomy is a shining example of what’s possible when user-centered design meets cutting-edge blockchain technology. The platform not only serves as a secure crypto hub but also fosters mainstream crypto adoption by offering real-world usability and financial freedom. The success of this project reflects the power of tailored solutions built on scalable modern stacks.",
        ),
      ],
    },
  ],
  cta: { title: "Have a Project? Let’s Discuss!", href: "/services#contact" },
};

// ---------------------------------------------------------------- SALHARO
export const salharo = {
  slug: "salharo",
  name: "Salharo",
  seoTitle: "Salharo Case Study: E-commerce Platform | ERS TECH",
  seoDescription:
    "How ERS TECH built Salharo, a multilingual e-commerce platform with Stripe payments, ShipBob tracking and a role-based admin panel, on Next.js and Node.js.",
  ogImage: "/assets/case-studies/salharo/hero.webp",
  hero: {
    h1: "Salharo: Revolutionizing e-commerce with Smart Technology",
    kicker: "Revolutionizing e-commerce with",
    title: "Smart Technology",
    image: {
      src: "/assets/case-studies/salharo/hero.webp",
      alt: "Salharo e-commerce website shown on several screens",
    },
  },
  theme: {
    mode: "light",
    accent: "#ff6a00",
    cardBg: "#f8f9fa",
    cardShadow: "0px 4px 12px rgba(0,0,0,0.06)",
    cardRadius: "12px",
    textColor: "#263238",
    headingColor: "#111827",
    heroBg: "#f4f6f8",
    sectionBg: "#ffffff",
  },
  sections: [
    {
      id: "challenges",
      title: "Challenges",
      blocks: [
        ul([
          L(
            "Performance & Scalability:",
            "Ensuring the platform loads quickly and can scale under increasing demand.",
          ),
          L(
            "Smooth Payment Integration:",
            "Implementing a reliable and secure payment gateway that supports various cards.",
          ),
          L(
            "Shipping Integration & Tracking:",
            "Integrating a logistics API that offers detailed tracking for customers and logistics updates for admins.",
          ),
          L(
            "Admin Access Control:",
            "Creating an admin panel with tiered access levels and full oversight of products, orders, and users.",
          ),
          L(
            "SEO & Multilingual Support:",
            "Making the site optimized for search engines and accessible in multiple languages.",
          ),
          L(
            "Deployment & Uptime:",
            "Ensuring fast global access with minimal downtime.",
          ),
        ]),
      ],
      image: {
        src: "/assets/case-studies/salharo/devices-mockup.webp",
        alt: "Salharo responsive layout mockup on multiple devices",
      },
    },
    {
      id: "solutions",
      title: "Solutions",
      blocks: [
        p(
          "We designed and developed Salharo using a modern, full-stack JavaScript ecosystem, with a focus on performance, security, and user experience.",
        ),
        h3("Frontend"),
        ul([
          "Built using Next.js for fast rendering, SEO optimization, and smooth navigation.",
          "Multilingual support via internationalization (i18n) features.",
          "Responsive, clean, and accessible UI design.",
        ]),
        h3("Backend"),
        ul([
          "Developed using Node.js with a custom REST API.",
          "MongoDB was used as the primary database for flexibility and performance.",
          "Authentication and authorization flows for users and multi-role admins.",
        ]),
        h3("Key Integrations"),
        ul([
          "Stripe was integrated for secure, PCI-compliant payment processing.",
          "ShipBob API was implemented for seamless shipment execution and real-time tracking.",
          "Admins can track orders, update statuses, and receive logistics info through the dashboard.",
        ]),
        h3("Admin Panel"),
        ul([
          "Role-based access (Super Admin, Manager, Support, etc.)",
          "Product & inventory management.",
          "Customer management.",
          "Analytics and order monitoring.",
        ]),
        h3("Deployment & Hosting"),
        ul([
          "Hosted on AWS (EC2 + S3 + CloudFront + Route 53) for fast, scalable, and reliable performance across the USA.",
          "CI/CD setup for smooth deployment and updates.",
        ]),
        h3("Live Chat Support"),
        ul([
          "Tawk.to live chat support integrated for 24/7 customer communication and assistance.",
        ]),
        h3("SEO & Accessibility"),
        ul([
          "Full on-page SEO strategy including meta tags, canonical URLs, and structured data.",
          "Sitemap and robots.txt implementation.",
          "Multilingual URL structure.",
        ]),
      ],
    },
    {
      id: "tools",
      title: "Tools & Technologies",
      layout: "tools",
      blocks: [
        ul([
          L("Frontend:", "Next.js, Tailwind CSS, React"),
          L("Backend:", "Node.js, Express"),
          L("Database:", "MongoDB"),
          L("Deployment:", "AWS (EC2, S3, CloudFront, Route 53)"),
          L("Payments:", "Stripe"),
          L("Shipping:", "ShipBob APIs"),
          L("SEO:", "Next.js SEO, Sitemap, Structured Data"),
          L("Live Chat:", "Tawk.to"),
        ]),
      ],
    },
    {
      id: "results",
      title: "Results",
      verify: true,
      blocks: [
        ul([
          L("Performance:", "95+ Lighthouse scores in performance and SEO."),
          L(
            "Conversion Rates:",
            "Increased by ~28% due to fast checkout and clear UX.",
          ),
          L(
            "Reduced Shipping Complaints:",
            'Real-time tracking led to a 40% drop in "Where is my order?" queries.',
          ),
          L(
            "Admin Efficiency:",
            "Role-based access improved operational workflows.",
          ),
          L(
            "Global Readiness:",
            "Multilingual support opened the platform to diverse markets.",
          ),
        ]),
      ],
    },
    {
      id: "conclusion",
      title: "Conclusion",
      blocks: [
        p(
          "Salharo is a prime example of how modern web technologies and smart integrations can lead to a powerful, scalable, and customer-centric e-commerce experience. From smooth payments and shipping to advanced admin controls and multilingual support — the platform is built for growth and adaptability in the competitive U.S. market.",
        ),
      ],
    },
  ],
  cta: { title: "Have a Project? Let’s Discuss!", href: "/services#contact" },
};

// ---------------------------------------------------------------- WISE1NE
export const wise1ne = {
  slug: "wise1ne",
  name: "Wise1ne",
  seoTitle: "Wise1ne HRMS Case Study: Attendance & Shifts | ERS TECH",
  seoDescription:
    "How ERS TECH built Wise1ne, an HRMS with geofenced attendance, shift scheduling, UK leave policies, payroll and a React Native mobile app for staff.",
  ogImage: "/assets/case-studies/wise1ne/hero.webp",
  hero: {
    h1: "Wise1ne: HRMS with Geofenced Attendance and Shift Management",
    kicker: "Smart Enterprise Operations",
    title: "HRMS & Workforce Platform",
    image: {
      src: "/assets/case-studies/wise1ne/hero.webp",
      alt: "Wise1ne HRMS admin portal screens",
    },
  },
  theme: {
    mode: "light",
    accent: "#1e88e5",
    cardBg: "#ffffff",
    cardShadow: "0px 4px 16px rgba(0,0,0,0.06)",
    cardRadius: "12px",
    textColor: "#263238",
    headingColor: "#111827",
    heroBg: "#f0f4f8",
    sectionBg: "#ffffff",
  },
  sections: [
    {
      id: "background",
      title: "Background",
      blocks: [
        p(
          "In a rapidly growing organization, the traditional HR processes—manual attendance, shift planning, leave management, and communication—were causing delays and inefficiencies. The company required a centralized system to digitize and automate these processes while aligning with UK labor regulations and improving employee accountability and engagement.",
        ),
        h3("Key Objectives"),
        ul([
          "Automate employee management and attendance tracking.",
          "Enable flexible shift scheduling and location-based attendance.",
          "Implement a task assignment and tracking system.",
          "Centralize announcements, meetings, and training schedules.",
          "Integrate with UK leave and bank holiday policies.",
          "Ensure real-time communication via live chat and notifications.",
        ]),
      ],
    },
    {
      id: "challenges",
      title: "Challenges",
      blocks: [
        ul([
          L(
            "Geolocation-based Attendance:",
            "Accurately mark attendance only when the employee is within a 30-meter radius of their assigned duty area.",
          ),
          L(
            "Flexible Shift Management:",
            "Allow shift creation, multiple shifts in a day, and shift swaps with supervisor approval.",
          ),
          L(
            "UK Leave Compliance:",
            "Integrate leave policies and bank holidays in accordance with UK labor law.",
          ),
          L(
            "Real-time Notifications:",
            "Enable push notifications and live chat across mobile and admin platforms.",
          ),
          L(
            "Role-Based Access:",
            "Provide access-specific modules to CEOs, Admins, Coaches, and Staff.",
          ),
          L(
            "Cross-Platform Mobile Support:",
            "Ensure smooth functionality for both Android and iOS.",
          ),
        ]),
      ],
    },
    {
      id: "solutions",
      title: "Solutions",
      blocks: [
        p(
          "We developed a modular, scalable, and dynamic HRMS ecosystem consisting of:",
        ),
        h3("Admin Portal (Web)"),
        p("Built With: React.js frontend + Node.js backend."),
        p("User Roles: CEO, DOO, Admins, Area Coaches, Nursery Coaches."),
        h4("Modules"),
        ul([
          "Dashboard",
          "HR Management (Employee List, Add New Employee, Roles, Departments, Locations)",
          "Attendance (All Attendance, My Attendance, Shift Scheduling, Shift Swap Requests)",
          "Room Management (Rooms for Training & Meetings)",
          "Leave Management (Leave Requests, Leave Stats, Policy, UK Bank Holidays)",
          "Training Management (Schedule & Track)",
          "Task Management (Create, Assign, Monitor Tasks)",
          "Announcements",
          "Meeting Scheduler",
          "Payroll Management",
        ]),
        h3("Mobile Application (Android & iOS)"),
        p("Built With: React Native."),
        p("Users: Staff only."),
        h4("Key Features"),
        ul([
          "Geofenced attendance marking with GPS-based validation (auto-detects longitude/latitude and compares within 30m radius).",
          "Leave application and stats view.",
          "Push notifications for announcements, meetings, tasks.",
          "Task progress updates and file submissions.",
          "Shift info and swap requests.",
        ]),
        h3("Location & Mapping"),
        ul([
          "Admins define duty zones via a map interface.",
          "Coordinates (lat/long) are stored and matched with staff device location.",
          "Staff can only mark attendance within 30 meters of their assigned zone.",
        ]),
        h3("Payroll Integration"),
        ul([
          "Payroll is auto-updated based on attendance, leaves, and shift hours.",
          "Dynamic rules for hourly, daily, and monthly wage calculations.",
        ]),
        h3("Notifications & Communication"),
        ul([
          L(
            "Live Chat:",
            "Embedded via third-party integration for 24/7 internal communication.",
          ),
          L(
            "Push Notifications:",
            "Real-time alerts for tasks, announcements, training, and meetings.",
          ),
        ]),
      ],
    },
    {
      id: "results",
      title: "The Results",
      layout: "stats",
      verify: true,
      stats: [
        {
          value: "95%",
          text: "Reduction in manual attendance-related discrepancies.",
        },
        { value: "80%", text: "Faster onboarding and employee setup process." },
        {
          value: "60%",
          text: "Boost in productivity through clear task assignments and mobile flexibility.",
        },
      ],
      blocks: [
        ul([
          "Managers have complete visibility of employee performance, availability, and shift adherence.",
          L(
            "Higher Engagement:",
            "Mobile-first design and real-time features led to active participation and fewer missed shifts.",
          ),
        ]),
      ],
    },
    {
      id: "tools",
      title: "Tools & Technologies",
      layout: "tools",
      blocks: [
        ul([
          L("Frontend:", "React.js, Tailwind CSS"),
          L("Backend:", "Node.js, Express"),
          L("Database:", "PostgreSQL"),
          L("Mobile App:", "React Native (Android & iOS)"),
          L("Deployment:", "AWS (EC2, S3, CloudFront, Route 53)"),
          L("Push Notifications:", "Firebase"),
          L("Location:", "Google Maps API"),
          L("Authentication:", "JWT / Role-Based Access Control"),
        ]),
      ],
    },
    {
      id: "conclusion",
      title: "Conclusion",
      blocks: [
        p(
          "Our custom-built HRMS provided a one-stop solution for the client’s operational challenges. By blending automation, mobility, and smart access controls, we delivered a system that enhanced both HR and staff productivity. With flexible shift handling, precise location tracking, leave policy compliance, and intuitive design — this HRMS is future-ready, scalable, and aligned with modern workforce needs.",
        ),
      ],
    },
  ],
  cta: { title: "Have a Project? Let’s Discuss!", href: "/services#contact" },
};

// ---------------------------------------------------------------- FOCUSMONK
export const focusmonk = {
  slug: "focusmonk",
  name: "FocusMonk",
  seoTitle: "FocusMonk Case Study: Focus & Productivity App | ERS TECH",
  seoDescription:
    "How ERS TECH built FocusMonk, a cross-platform focus app with app blocking, scheduled sessions, driving mode, parental controls, rewards and an admin panel.",
  ogImage: "/assets/case-studies/focusmonk/hero.webp",
  hero: {
    h1: "FocusMonk: Affordable Solutions for Elevated Productivity and Well-being",
    kicker: "Elevate Productivity & Well-being",
    title: "Focus & Digital Well-being App",
    image: {
      src: "/assets/case-studies/focusmonk/hero.webp",
      alt: "FocusMonk website and app screens",
    },
  },
  theme: {
    mode: "light",
    accent: "#ff9800",
    cardBg: "#ffffff",
    cardShadow: "0px 4px 14px rgba(0,0,0,0.07)",
    cardRadius: "12px",
    textColor: "#333333",
    headingColor: "#111827",
    heroBg: "#f9fafb",
    sectionBg: "#ffffff",
  },
  sections: [
    {
      id: "introduction",
      title: "Introduction",
      blocks: [
        p(
          "In an increasingly distracted digital world, staying focused is a challenge for individuals, professionals, and even entire teams. Whether it’s mindless scrolling on social media, constant phone checking, or multitasking during work hours, productivity is taking a serious hit.",
        ),
        p(
          "Focusmonk was created to solve this very problem — to help users block distractions, encourage mindful usage of devices, and improve productivity using behavioral science and reward-based motivation. Designed for individuals, teams, children, and even drivers.",
        ),
      ],
    },
    {
      id: "background",
      title: "Background",
      blocks: [
        p(
          "Modern lifestyles are intertwined with smartphones, laptops, and apps. This hyper-connectivity, while beneficial, has led to:",
        ),
        ul([
          "Decreased productivity",
          "Increased screen time, especially in children",
          "Reduced focus in professionals",
          "Digital fatigue and poor mental well-being",
          "Unsafe behaviors, like phone usage while driving",
        ]),
        p(
          "Parents struggle to limit screen time, employers want focused employees, and individuals crave discipline. But without the right tools and incentives, creating lasting change is difficult.",
        ),
        p(
          "We set out to build Focusmonk — a platform that not only blocks distractions but rewards discipline, creating a positive feedback loop for productivity and mindfulness.",
        ),
      ],
    },
    {
      id: "challenges",
      title: "Challenges",
      blocks: [
        p("We identified several core issues across different user groups:"),
        h3("For Individuals"),
        ul([
          "Difficulty focusing during work/study",
          "Addictive use of social media and games",
          "Lack of motivation to reduce screen time",
        ]),
        h3("For Drivers"),
        ul(["Unsafe phone usage while driving"]),
        h3("For Parents"),
        ul([
          "Children spending excessive time on phones",
          "No control over app access or usage schedules",
        ]),
        h3("For Employers"),
        ul([
          "Reduced productivity due to workplace distractions",
          "No team-wide control or monitoring tools",
        ]),
        h3("For Everyone"),
        ul([
          "No rewards for staying focused",
          "Lack of structured schedules and tracking systems",
        ]),
      ],
    },
    {
      id: "solutions",
      title: "The Solution",
      blocks: [
        p(
          "Focusmonk is a cross-platform productivity and focus-enhancing system designed for individuals, families, and organizations. It combines digital well-being features with an engaging reward system and powerful admin tools.",
        ),
        h3("Distraction App/Link Blocking"),
        ul([
          "Block selected apps or URLs during focus sessions.",
          "Control access on mobile and desktop platforms.",
        ]),
        h3("Scheduled Focus Sessions"),
        ul([
          "Users can define daily schedules where distracting apps are auto-blocked.",
          "Balance productivity and leisure with clear boundaries.",
        ]),
        h3("Driving Mode"),
        ul([
          "Detects when the user is driving and automatically activates app-blocking.",
          "Promotes safer, distraction-free driving habits.",
        ]),
        h3("Parental Control"),
        p("Parents can:"),
        ul([
          "Block specific apps for their children",
          "Set usage schedules",
          "Monitor activity and performance",
        ]),
        h3("Employee Productivity Mode"),
        ul([
          "Teams can set focus schedules during working hours.",
          "Admins track team activity, distractions avoided, and productivity stats.",
        ]),
        h3("Reward System: Focus Coins"),
        ul([
          "Earn coins for each distraction-free session.",
          "Spend coins in the Focusmonk Marketplace on digital and physical rewards.",
        ]),
        h3("Admin Panel Features"),
        ul([
          L("View Performance Analytics", "– User-wise stats and trends"),
          L("Set Focus Schedule", "– Global or user-level configurations"),
          L("Manage Controlled Apps/Links", "– Blacklist for blocked content"),
          L("Marketplace Management", "– Add/edit/delete rewards"),
          L("Order Management", "– Track redemptions and purchases"),
          L("Add & Manage Members", "– Invite users, assign roles"),
          L("View Ranking Stats", "– Compare users based on focus metrics"),
          L("Leaderboard", "– Encourage healthy competition"),
          L("Settings", "– Full admin control for system rules and behaviors"),
        ]),
      ],
    },
    {
      id: "results",
      title: "The Results",
      layout: "stats",
      verify: true,
      stats: [
        {
          value: "35–50%",
          text: "Productivity Increase measured across teams",
        },
        { value: "3–5 hrs", text: "Daily average reduction in mobile usage" },
        {
          value: "70%",
          text: "Reduction in app distractions during drive time",
        },
        { value: "100k+", text: "Focus sessions completed in launch quarter" },
        { value: "85%", text: "Engagement in the reward marketplace" },
        {
          value: "90%",
          text: 'Parental satisfaction rating system "very effective"',
        },
      ],
      blocks: [],
    },
    {
      id: "tools",
      title: "Tools & Technologies",
      layout: "tools",
      blocks: [
        ul([
          L("Frontend:", "React.js, Tailwind CSS"),
          L("Backend:", "Node.js, Express"),
          L("Database:", "MongoDB"),
          L("Cross Platform:", "React Native"),
          L("Native iOS:", "Swift"),
          L("Native Android:", "Android SDK"),
          L("Deployment:", "Digital Ocean hosting & Deployment"),
          L("Web App:", "MacOS, Windows"),
          L("Notifications:", "Firebase"),
          L(
            "Other Tools:",
            "Real-time Notifications, WebSockets, Secure Authentication & Synchronization",
          ),
        ]),
      ],
    },
    {
      id: "conclusion",
      title: "Conclusion",
      blocks: [
        p(
          "Focusmonk transforms digital behavior using the perfect blend of restriction, motivation, and reward. Whether you're a student, a parent, a driver, or an enterprise leader—Focusmonk helps you build better digital habits and unlock your full potential.",
        ),
        p(
          "The platform has already started changing lives by making productivity enjoyable and rewarding. With its robust admin controls, scalable infrastructure, and flexible scheduling system, it’s set to become the go-to platform for digital discipline and focus.",
        ),
      ],
    },
  ],
  cta: { title: "Have a Project? Let’s Discuss!", href: "/services#contact" },
};

// ---------------------------------------------------------------- BCCOIN
export const bccoin = {
  slug: "bccoin",
  name: "BCCoin",
  seoTitle: "BCCoin Case Study: Staking & Crypto Banking | ERS TECH",
  seoDescription:
    "How ERS TECH built the BCCoin Staking & Crypto Banking Platform: tiered staking, wallet, referral tree, crypto debit cards, KYC and a marketplace.",
  ogImage: "/assets/case-studies/bccoin/hero.webp",
  hero: {
    h1: "BCCoin: Staking & Crypto Banking Platform",
    kicker: "Next-Gen DeFi Platform",
    title: "Staking & Crypto Banking Platform",
    image: {
      src: "/assets/case-studies/bccoin/hero.webp",
      alt: "BCCoin staking and banking dashboard",
    },
  },
  theme: {
    mode: "light",
    accent: "#f5a623",
    cardBg: "#f8f9fa",
    cardShadow: "0px 4px 16px rgba(0,0,0,0.06)",
    cardRadius: "12px",
    textColor: "#263238",
    headingColor: "#111827",
    heroBg: "#f8fafc",
    sectionBg: "#ffffff",
  },
  sections: [
    {
      id: "introduction",
      title: "Introduction",
      blocks: [
        p(
          "The BCCoin Staking & Banking System is a next-generation decentralized finance (DeFi) platform that blends crypto staking with real-world banking capabilities. Built for both crypto enthusiasts and practical users, this platform allows users to earn rewards by staking BCCoin while also enabling everyday transactions through a crypto debit card—available in both physical and virtual formats.",
        ),
      ],
    },
    {
      id: "background",
      title: "Background",
      blocks: [
        p(
          "As cryptocurrencies continue to gain mainstream traction, the demand for practical, secure, and profitable crypto applications is growing. Staking offers a compelling passive income stream, while crypto debit cards bridge the gap between digital assets and real-world spending.",
        ),
        p(
          "Our goal was to build a unified platform where users can stake, spend, manage, and monitor their crypto—all under one ecosystem.",
        ),
      ],
    },
    {
      id: "challenges",
      title: "Challenges",
      blocks: [
        p(
          "Building such a comprehensive platform brought several technical and product challenges:",
        ),
        ul([
          L(
            "Staking Logic:",
            "Designing a dynamic, tiered staking system with varying profit ratios based on amount and time.",
          ),
          L(
            "Secure Wallet Integration:",
            "Implementing user wallet management and profit withdrawal systems.",
          ),
          L(
            "Banking Integration:",
            "Syncing crypto cards (both virtual and physical) with real-time balances and supporting top-ups.",
          ),
          L(
            "Regulatory Compliance:",
            "Integrating a seamless KYC system to verify users for banking services.",
          ),
          L(
            "Referral System:",
            "Developing a multi-level referral tree for performance-based profit sharing.",
          ),
          L(
            "Marketplace Functionality:",
            "Enabling product browsing, purchasing, and order tracking through crypto payments.",
          ),
        ]),
      ],
    },
    {
      id: "solutions",
      title: "The Solution",
      blocks: [
        p(
          "To meet the multifaceted requirements of our vision, we designed and developed a powerful web platform that offers two primary modules: the BCCoin Staking System and the Crypto Banking System. Both modules are seamlessly integrated into a unified dashboard, delivering a comprehensive experience to users.",
        ),
        h3("1. BCCoin Staking System"),
        p(
          "The staking system was engineered to provide flexible investment options with tiered profit structures:",
        ),
        h4("a. Staking Engine"),
        ul([
          "Developed a dynamic staking logic engine that allows users to choose from multiple plans based on the amount and duration of BCCoin staked.",
          "The profit calculation adjusts automatically depending on the staking tier.",
          "Implemented real-time profit accumulation and compounding options.",
        ]),
        h4("b. Stake More BCCoin"),
        ul([
          "Users can stake additional coins anytime, which either creates a new staking instance or compounds with existing plans.",
          "Staking actions trigger balance updates and wallet locking protocols for the duration of the stake.",
        ]),
        h4("c. Claim History"),
        ul([
          "All rewards and staking outcomes are logged in the Claim History with time-stamped details.",
        ]),
        h4("d. Wallet & Withdrawals"),
        ul([
          "Users have a dedicated wallet module to track balances (available, staked, earned).",
          "They can manage multiple withdrawal addresses, setting default or whitelisted destinations for payouts.",
        ]),
        h4("e. Referral Tree & History"),
        ul([
          "A visual multi-level referral system was built to track direct and indirect referrals.",
          "Profits are shared based on tree depth and user engagement.",
          "Users can see individual referral performance, commissions, and total earnings from the network.",
        ]),
        h4("f. Marketplace Integration"),
        ul([
          "Users can browse, search, and purchase products using their BCCoin directly.",
          "Fully integrated order management system including product catalog, cart, crypto checkout, and order tracking.",
        ]),
        h3("2. Crypto Banking System"),
        p(
          "This module transforms the platform from a staking app to a full-featured crypto bank:",
        ),
        h4("a. Bank Dashboard"),
        ul([
          "Displays all linked physical and virtual cards, along with current balances, card status, and usage summaries.",
        ]),
        h4("b. Card Management"),
        ul([
          "Apply for new cards (Virtual/Physical), activate/deactivate, and view masked card details for security.",
        ]),
        h4("c. Card Transactions"),
        ul([
          "Complete transaction feed showing merchant name, amount, date/time, and geolocation.",
        ]),
        h4("d. Top-Up Functionality"),
        ul([
          "Users can top-up their cards using crypto (BCCoin, USDT, or others via real-time exchange rates).",
        ]),
        h4("e. KYC Verification"),
        ul([
          "Mandatory bank-grade KYC implemented via third-party identity verification provider.",
        ]),
      ],
    },
    {
      id: "tools",
      title: "Tools & Technologies",
      layout: "tools",
      blocks: [
        ul([
          L("Frontend:", "Next.js, Tailwind CSS, Redux"),
          L("Backend:", "Node.js, Express"),
          L("Database:", "MongoDB"),
          L(
            "Blockchain:",
            "Ethereum, Bitcoin, Litecoin integrations via Web3 and native SDKs",
          ),
          L("Authentication & Security:", "JWT, OAuth2, 2FA, KYC integration"),
          L(
            "APIs Integrated:",
            "Chainlink, CryptoCompare, Plaid, Onfido, payment gateways",
          ),
          L("DevOps:", "Docker, NGINX, GitHub Actions"),
        ]),
      ],
    },
    {
      id: "results",
      title: "The Results",
      verify: true,
      blocks: [
        p(
          "The launch generated tangible outcomes across user engagement, system performance, financial utility, and market reputation:",
        ),
        h3("1. Increased User Engagement & Retention"),
        ul([
          "The dual-purpose platform combining staking with card usage improved user retention.",
          "Over 60% of users actively used both modules.",
        ]),
        result("40% increase in daily active users within the first 3 months."),
        h3("2. Higher Investment Volumes & Profitability"),
        ul([
          "The tier-based staking model encouraged larger investments by offering proportional profit margins.",
        ]),
        result(
          "2.5x increase in total staked BCCoin within the first quarter.",
        ),
        h3("3. Real-World Crypto Utility via Banking Features"),
        ul([
          "Cards were used for online shopping, physical retail, and digital subscriptions.",
        ]),
        result(
          "Over 70% of KYC-verified users ordered and used their crypto debit cards.",
        ),
        h3("4. Operational Efficiency & Admin Control"),
        result(
          "Reduced manual overhead by 50% through smart admin tools and dashboards.",
        ),
      ],
    },
    {
      id: "conclusion",
      title: "Conclusion",
      blocks: [
        p(
          "The BCCoin Staking & Crypto Banking Platform goes beyond traditional DeFi use cases by combining earning, spending, and sharing in one streamlined ecosystem. It offers crypto users the ability to grow wealth through staking, use it in the real world via debit cards, and incentivize growth through referrals—all with full transparency and control.",
        ),
      ],
    },
  ],
  cta: { title: "Have a Project? Let’s Discuss!", href: "/services#contact" },
};

// ---------------------------------------------------------------- A-BOT
export const aBot = {
  slug: "a-bot",
  name: "A-Bot",
  seoTitle: "A-Bot Case Study: AI Telegram Crypto Bot | ERS TECH",
  seoDescription:
    "How ERS TECH built A-Bot, an AI-powered Telegram Crypto Agent enabling multi-asset wallet operations, trading, AML compliance, and financial automation.",
  ogImage: "/assets/case-studies/a-bot/hero.png",
  hero: {
    h1: "A-Bot: AI Telegram Crypto Bot",
    kicker: "AI TELEGRAM CRYPTO BOT",
    title: "AI Telegram Crypto Bot",
    image: {
      src: "/assets/case-studies/a-bot/hero.png",
      alt: "A-Bot AI Telegram Crypto Bot dashboard and mobile interfaces",
    },
  },
  theme: {
    mode: "light",
    accent: "#0088cc",
    cardBg: "#f8f9fa",
    cardShadow: "0px 4px 16px rgba(0,0,0,0.06)",
    cardRadius: "12px",
    textColor: "#263238",
    headingColor: "#111827",
    heroBg: "#f8fafc",
    sectionBg: "#ffffff",
  },
  sections: [
    {
      id: "introduction",
      title: "Introduction",
      blocks: [
        p(
          "ERS TECH developed an AI-powered Crypto Agent for Telegram, designed to simplify cryptocurrency management by bringing multiple digital asset operations into a single, convenient interface.",
        ),
        p(
          "The platform enables users to access essential crypto services, including wallet management, deposits, withdrawals, trading, financial operations, transaction monitoring, and account security, directly through Telegram.",
        ),
        p(
          "By combining diverse functionalities within one platform, the solution aims to reduce the complexity of managing cryptocurrency across multiple applications. It provides a streamlined user experience for individuals and businesses seeking convenient access to digital asset management tools.",
        ),
        p(
          "The project reflects ERS TECH's expertise in fintech software development, blockchain integrations, API connectivity, and intelligent workflow automation.",
        ),
      ],
    },
    {
      id: "background",
      title: "Background",
      blocks: [
        p(
          "The cryptocurrency ecosystem offers a wide range of financial opportunities, but managing these services often requires users to navigate multiple platforms. Wallets, exchanges, payment providers, staking services, lending platforms, and transaction monitoring tools frequently operate independently.",
        ),
        p(
          "This fragmented environment can make routine operations more time-consuming and create challenges in maintaining visibility across different financial activities.",
        ),
        p(
          "ERS TECH identified an opportunity to consolidate these workflows through Telegram, a familiar messaging platform that supports interactive bot experiences.",
        ),
        p(
          "The project's objective was to develop a centralized crypto management solution where users could access multiple services through a consistent interface. The platform was designed to extend beyond basic wallet functionality by incorporating trading, financial services, risk monitoring, reporting, and account management.",
        ),
        p(
          "This approach creates a flexible foundation for delivering a broader range of crypto-related services while improving accessibility and operational convenience.",
        ),
      ],
    },
    {
      id: "challenges",
      title: "Challenges",
      layout: "cards",
      cards: [
        {
          title: "1. Secure Crypto Transactions",
          text: "Handling cryptocurrency transactions requires high security standards to protect user funds and prevent unauthorized access.",
        },
        {
          title: "2. Real-Time Blockchain Integration",
          text: "The system needed to synchronize wallet balances, deposits, withdrawals, and transaction statuses in real time.",
        },
        {
          title: "3. AML & Compliance Verification",
          text: "Financial regulations require Anti-Money Laundering (AML) screening before processing certain transactions.",
        },
        {
          title: "4. User Experience Within Telegram",
          text: "Telegram bots have limitations compared to web applications, requiring careful design to provide a smooth and intuitive user journey.",
        },
        {
          title: "5. Multi-Service Integration",
          text: "The platform needed to communicate with external blockchain APIs, wallet services, AML providers, and internal databases while maintaining performance and reliability.",
        },
        {
          title: "6. Scalability",
          text: "The system was designed to support thousands of users and growing transaction volumes without compromising speed or security.",
        },
      ],
      blocks: [],
    },
    {
      id: "solution",
      title: "The Solution",
      blocks: [
        p(
          "ERS TECH developed a feature-rich Telegram Crypto Agent that consolidates essential cryptocurrency and financial workflows into one accessible platform.",
        ),
        h3("Wallet and Transaction Management"),
        p(
          "Users can view crypto balances, manage wallet settings, retrieve deposit addresses and QR codes, and process individual or bulk withdrawals. Transaction history and downloadable reports provide convenient access to financial records.",
        ),
        h3("Trading and Currency Automation"),
        p(
          "The platform supports buying and selling supported cryptocurrencies, placing and cancelling limit orders, and configuring automatic conversions between supported currencies. Tunnel wallets provide deposit-forwarding capabilities for supported wallet and network configurations.",
        ),
        h3("Financial Services and Earnings"),
        p(
          "Users can access supported fiat withdrawal workflows, create and manage staking positions, review rewards, and manage available loan and repayment functions. Crypto card features include supported card issuance, card management, viewing card details, and eligible card top-ups.",
        ),
        h3("Invoice and Business Operations"),
        p(
          "The invoice management module enables users to create, track, download, and cancel invoices. These features provide a more organized approach to invoice-related workflows within the broader crypto management environment.",
        ),
        h3("Security and Transaction Monitoring"),
        p(
          "The platform provides AML risk checks for supported wallet addresses and transaction hashes, configurable freeze alerts for monitored addresses, and SWIFT transfer checks using UETR references where supported. Account management features include profile settings, language preferences, timezone configuration, and two-factor authentication.",
        ),
        h3("Referral Management and Customer Support"),
        p(
          "Users can review eligible referral commissions, redeem available rewards, and share referral links. The integrated Telegram support channel provides a convenient way to contact the configured customer support team.",
        ),
        p(
          "Together, these features create a unified experience that brings multiple crypto management activities into one familiar interface.",
        ),
      ],
    },
    {
      id: "tools",
      title: "Tools & Technologies",
      layout: "tools",
      blocks: [
        ul([
          L("Frontend:", "Next.js, Tailwind CSS, Telegram Bot API"),
          L("Backend:", "Node.js, Express, Solana, Webhooks"),
          L("Database:", "MongoDB"),
          L(
            "Blockchain:",
            "Cryptocurrency Wallet APIs, Blockchain Network APIs, Payment Gateway Integrations, Exchange Service Integrations, synchronization",
          ),
          L(
            "Compliance & Monitoring:",
            "AML Verification APIs, Transaction Risk Assessment, Activity Logging, Audit Trail System",
          ),
          L("KMS:", "Golang"),
          L("Ledger:", "Golang"),
        ]),
      ],
    },
    {
      id: "results",
      title: "The Results",
      blocks: [
        p(
          "• The completed solution brings 19 major feature areas together within a single Telegram-based crypto management experience.",
        ),
        h3("Centralized User Experience"),
        ul([
          "Users can access a broad range of supported crypto and financial operations without navigating a separate interface for every feature.",
        ]),
        h3("Simplified Financial Workflows"),
        ul([
          "Wallet management, deposits, withdrawals, exchange operations, invoices, and reporting are organized within a consistent interaction environment.",
        ]),
        h3("Broader Financial Functionality"),
        ul([
          "The platform extends beyond basic crypto transfers by incorporating trading tools, automated conversions, staking, lending, card management, and supported fiat payout services.",
        ]),
        h3("Improved Visibility and Monitoring"),
        ul([
          "Transaction history, available reports, AML risk information, freeze alerts, and SWIFT reference checks provide convenient access to relevant financial and monitoring information.",
        ]),
        h3("Operational Automation"),
        ul([
          "Features such as bulk withdrawals, automatic currency conversion, deposit forwarding, and configurable alerts support more streamlined workflows where enabled.",
        ]),
        h3("Foundation for Future Growth"),
        ul([
          "The integrated structure provides a foundation for expanding supported financial services, introducing additional integrations, and enhancing conversational AI capabilities as business requirements evolve.",
        ]),
        p(
          "Overall, the project demonstrates how multiple crypto-related services can be brought together through a unified messaging-based interface. Actual improvements in transaction speed, cost savings, revenue, and user engagement can be established through verified production metrics.",
        ),
      ],
    },
    {
      id: "conclusion",
      title: "Conclusion",
      blocks: [
        p(
          "The AI Crypto Agent for Telegram demonstrates ERS TECH's ability to develop comprehensive fintech solutions that combine cryptocurrency management, financial service integrations, security-related functionality, and workflow automation.",
        ),
        p(
          "By bringing wallet operations, trading, financial services, monitoring, reporting, referral management, and customer support into one platform, the solution aims to make digital asset management more accessible and convenient.",
        ),
        p(
          "Its modular feature set also provides a foundation for future enhancements in AI-powered assistance, service integrations, and operational automation.",
        ),
        p(
          "At ERS TECH, we help businesses transform complex requirements into practical digital products through software engineering, fintech development, blockchain-oriented solutions, and AI-enabled automation.",
        ),
      ],
    },
  ],
  cta: { title: "Have a Project? Let’s Discuss!", href: "/services#contact" },
};

// ---------------------------------------------------------------- QUIKIPAY
export const quikipay = {
  slug: "quikipay",
  name: "QuikiPay",
  seoTitle: "QuikiPay Case Study: Global Payment Gateway | ERS TECH",
  seoDescription:
    "How ERS TECH engineered QuikiPay, a scalable payment gateway supporting cards, crypto, bank transfers, real-time analytics, and automated payouts.",
  ogImage: "/assets/projects/Mockups/quikipay.webp",
  hero: {
    h1: "QuikiPay: Global Payment Gateway Provider",
    kicker: "GLOBAL PAYMENT GATEWAY SOLUTION",
    title: "Global Payment Gateway Solution",
    image: {
      src: "/assets/projects/Mockups/quikipay.webp",
      alt: "QuikiPay payment gateway platform preview",
    },
  },
  theme: {
    mode: "light",
    accent: "#ff5c16",
    cardBg: "#f8f9fa",
    cardShadow: "0px 4px 16px rgba(0,0,0,0.06)",
    cardRadius: "12px",
    textColor: "#263238",
    headingColor: "#111827",
    heroBg: "#f8fafc",
    sectionBg: "#ffffff",
  },
  sections: [
    {
      id: "introduction",
      title: "Introduction",
      blocks: [
        p(
          "In today's fast-paced digital economy, businesses demand seamless, secure, and versatile payment solutions. Our client approached us to build a robust payment gateway provider platform capable of handling multiple transaction methods, supporting global currencies (fiat and crypto), and empowering developers and merchants with tools for integration, management, and reporting. This case study outlines the journey from ideation to execution of a world-class payment system.",
        ),
      ],
    },
    {
      id: "background",
      title: "Background",
      blocks: [
        p(
          "Digital payments have become the backbone of global commerce. Whether it's traditional card payments or modern cryptocurrency transactions, businesses need a reliable gateway that supports flexibility, scalability, and security. Existing solutions often fall short in offering an all-in-one platform that seamlessly combines fiat and crypto capabilities, advanced reporting, and intelligent transaction handling.",
        ),
      ],
    },
    {
      id: "challenges",
      title: "Challenges",
      layout: "cards",
      cards: [
        {
          title: "Multi-Method Payment Support",
          text: "Supporting cards, global cryptocurrencies, bank transfers, and cash deposits within a single unified checkout pipeline.",
        },
        {
          title: "Developer APIs & Integration",
          text: "Providing clean RESTful APIs, webhooks, and hosted checkout flows for swift integration across diverse platforms.",
        },
        {
          title: "Real-Time Reporting",
          text: "Delivering instant visibility and exportable financial reports on payments, chargebacks, fees, and settlements.",
        },
        {
          title: "Security & Fraud Detection",
          text: "Implementing 3D Secure (3DS), AES encryption, tokenization, and AI-driven fraud pattern detection.",
        },
        {
          title: "Global Payout Handling",
          text: "Facilitating multi-flow settlements including crypto-to-crypto, local-to-crypto, and international withdrawals.",
        },
        {
          title: "Comprehensive Merchant Portal",
          text: "Building a granular dashboard giving merchants full control over wallets, disputes, tickets, and automated cron jobs.",
        },
      ],
      blocks: [],
    },
    {
      id: "solution",
      title: "The Solution",
      blocks: [
        p(
          "We engineered a full-fledged payment gateway system using a secure and scalable architecture. The solution was designed for global reach, catering to a variety of industries, use cases, and customer types.",
        ),
        h3("1. Multi-Method Payment Support"),
        ul([
          "Credit/Debit Cards: Visa, MasterCard, AMEX, Diners.",
          "Cryptocurrency: USDT, TUSDT, BTC, ETH, USDC, XRP, BUSDT, LTC.",
          "Bank Transfers & Cash Deposits via Bank.",
        ]),
        h3("2. Developer-Friendly APIs & Hosted Checkout"),
        ul([
          "RESTful APIs with full documentation and webhooks for real-time payment events and status updates.",
          "Customizable hosted checkout pages designed for rapid zero-friction deployment.",
        ]),
        h3("3. Security First & Smart Retry"),
        ul([
          "3D Secure (3DS) authentication alongside tokenization and AES data encryption.",
          "Intelligent retry mechanism for failed payments and AI-driven fraud pattern detection.",
        ]),
        h3("4. Payouts, Settlements & Dispute Management"),
        ul([
          "Support for Crypto to Crypto, Local to Crypto, Local withdrawal, and International withdrawal.",
          "Instant settlements for verified merchants and in-app automated dispute and chargeback tracking.",
        ]),
        h3("5. Comprehensive Merchant Dashboard"),
        ul([
          "Full oversight of balances, wallets, conversion logs, custom orders, ticket support, and POS management.",
        ]),
      ],
    },
    {
      id: "tools",
      title: "Tools & Technologies",
      layout: "tools",
      blocks: [
        ul([
          L("Frontend:", "HTML, CSS, JavaScript"),
          L("Backend:", "Laravel (PHP Framework)"),
          L("Database:", "MySQL"),
          L("Security:", "Tokenization, 3D Secure (3DS), Data Encryption"),
          L(
            "Third-Party Integrations:",
            "Stripe (fiat), Crypto Exchanges, Bank Transfer APIs",
          ),
          L(
            "Hosting & DevOps:",
            "Cloud infrastructure with CI/CD pipelines and automated backups",
          ),
        ]),
      ],
    },
    {
      id: "results",
      title: "The Results",
      blocks: [
        p(
          "The project delivered outstanding results and exceeded client expectations:",
        ),
        ul([
          "Enabled support for crypto payments worldwide alongside fiat via Stripe and direct bank transfers.",
          "Onboarded merchants quickly through hosted checkout and developer-friendly REST APIs.",
          "Reduced chargeback handling time by over 60% using the integrated dispute management tools.",
          "Achieved 99.99% platform uptime through optimized, resilient cloud infrastructure.",
          "Significantly improved merchant satisfaction through real-time dashboards and instant settlements.",
        ]),
      ],
    },
    {
      id: "conclusion",
      title: "Conclusion",
      blocks: [
        p(
          "This project is a testament to our ability to develop scalable fintech platforms that meet complex business requirements. The Payment Gateway Provider System bridges traditional and modern financial ecosystems, offering merchants and developers a reliable, secure, and future-proof solution. With full support for crypto and fiat, smart features, and a user-friendly dashboard, the system sets a new benchmark in digital payments.",
        ),
      ],
    },
  ],
  cta: { title: "Have a Project? Let’s Discuss!", href: "/services#contact" },
};

// ---------------------------------------------------------------- LIFTSPLIT
export const liftsplit = {
  slug: "liftsplit",
  name: "LiftSplit",
  seoTitle: "LiftSplit Case Study: Smart Ride-Sharing Platform | ERS TECH",
  seoDescription:
    "How ERS TECH built LiftSplit, an eco-friendly ride-sharing app with dual-role driver/rider features, in-app wallet, real-time booking, and admin oversight.",
  ogImage: "/assets/case-studies/liftsplit/hero.webp",
  hero: {
    h1: "LiftSplit: Smart Ride-Sharing & Commute Platform",
    kicker: "ECO-FRIENDLY RIDE-SHARING SYSTEM",
    title: "Smart Ride-Sharing Mobile Application",
    image: {
      src: "/assets/case-studies/liftsplit/hero.webp",
      alt: "LiftSplit Ride-Sharing Mobile Application preview",
    },
  },
  theme: {
    mode: "light",
    accent: "#3CB7EE",
    cardBg: "#f8f9fa",
    cardShadow: "0px 4px 16px rgba(0,0,0,0.06)",
    cardRadius: "12px",
    textColor: "#263238",
    headingColor: "#111827",
    heroBg: "#f8fafc",
    sectionBg: "#ffffff",
  },
  sections: [
    {
      id: "introduction",
      title: "Introduction",
      blocks: [
        p(
          "Liftsplit is a smart and efficient ride-sharing mobile application that enables users to register as either a driver or a rider. Designed to optimize empty car seats during daily commutes, Liftsplit empowers drivers to monetize their routine routes and helps riders find affordable, convenient transportation. The platform is engineered for urban professionals and daily commuters looking to reduce travel costs while contributing to environmental sustainability.",
        ),
      ],
    },
    {
      id: "background",
      title: "Background",
      blocks: [
        p(
          "In metropolitan areas, a significant number of individuals commute in personal vehicles with unused seats. These empty seats represent untapped potential to reduce traffic congestion, fuel consumption, and transportation costs. Recognizing this opportunity, Liftsplit was conceived as a people-first, eco-conscious ride-sharing system.",
        ),
      ],
    },
    {
      id: "challenges",
      title: "Challenges",
      layout: "cards",
      cards: [
        {
          title: "Dual-Role User Architecture",
          text: "Enabling users to switch smoothly between driver and rider modes using a single unified account.",
        },
        {
          title: "Driver Safety & Verification",
          text: "Ensuring rider safety through strict multi-step ID and vehicle documentation approval workflows.",
        },
        {
          title: "Flexible Ride Publishing",
          text: "Allowing drivers to schedule recurring or instant rides with custom stops, dates, and available seat limits.",
        },
        {
          title: "Integrated Wallet & Top-ups",
          text: "Managing ride fares, automated commission deductions, wallet top-ups, and bank withdrawals.",
        },
        {
          title: "Full Admin Operational Control",
          text: "Providing admins full control over user approvals, vehicle checks, regional availability, and revenue.",
        },
        {
          title: "High Performance Cross-Platform",
          text: "Delivering a seamless native experience across iOS and Android with live notifications and routing.",
        },
      ],
      blocks: [],
    },
    {
      id: "solution",
      title: "The Solution",
      blocks: [
        p(
          "A powerful, scalable ride-sharing system was developed that includes rich capabilities for riders, drivers, and platform operators.",
        ),
        h3("User & Driver Features"),
        ul([
          "Dual Role Capability: Users can effortlessly toggle between Rider and Driver roles.",
          "Driver Verification: ID and vehicle documents are securely uploaded for administrative review.",
          "Ride Publishing: Approved drivers publish rides for immediate or future schedules with dates, stops, and seat counts.",
          "Booking Management: Drivers can accept, ignore, or cancel incoming ride requests.",
          "Wallet System: Integrated wallet for driver earnings, rider top-ups via card, and instant automated fare payments.",
          "Real-Time Notifications: Live updates for ride confirmations, cancellations, and route milestones.",
          "Smart Search Filters: Route and destination matching for riders to find convenient rides fast.",
        ]),
        h3("Admin Control & Operations"),
        ul([
          "User & Vehicle Management: Approvals, document review, and status management for drivers and riders.",
          "Regional Availability: Granular city, state, or country-level rollout switches without code changes.",
          "Financial Tracking: Real-time oversight over ride revenues, wallet balances, withdrawals, and platform commissions.",
          "Promotions & Analytics: Coupon generation tools and detailed performance reports.",
        ]),
      ],
    },
    {
      id: "tools",
      title: "Tools & Technologies",
      layout: "tools",
      blocks: [
        ul([
          L("Frontend:", "React.js, Tailwind CSS"),
          L("Backend:", "Node.js, Express"),
          L("Database:", "MongoDB"),
          L("Native Mobile:", "Swift (iOS), Android SDK"),
          L("Cloud & Deployment:", "DigitalOcean, Linux Servers"),
          L("Real-Time & Notifications:", "Firebase, WebSockets"),
          L(
            "Security:",
            "Secure authentication and encrypted data synchronization",
          ),
        ]),
      ],
    },
    {
      id: "results",
      title: "The Results",
      blocks: [
        p(
          "Liftsplit delivered measurable improvements across the ecosystem, benefiting drivers, riders, and administrators:",
        ),
        h3("For Drivers"),
        ul([
          "Monetized daily commutes by turning regular trips into steady income opportunities.",
          "Flexible ride scheduling with full control over booking approvals and cancellations.",
          "Transparent wallet earnings and convenient on-demand withdrawals to bank accounts.",
        ]),
        h3("For Riders"),
        ul([
          "Significantly lower travel costs compared to traditional taxis and on-demand ride-hailing services.",
          "Precise route matching for home-to-work commutes with instant digital wallet payments.",
          "Eco-friendly mobility that reduces carbon footprint by filling otherwise empty car seats.",
        ]),
        h3("For Administrators"),
        ul([
          "Complete centralized visibility into operations, ride revenue, user verification, and commissions.",
          "Effortless scalable rollout into new cities and regions without engineering dependencies.",
        ]),
      ],
    },
    {
      id: "conclusion",
      title: "Conclusion",
      blocks: [
        p(
          "Liftsplit successfully bridges the gap between empty vehicle seats and daily commuters looking for cost-effective rides. By integrating real-time booking, dual-role functionality, and financial systems within a sleek UI, Liftsplit is not just a ride-sharing app — it's a community-driven, sustainable transportation solution.",
        ),
      ],
    },
  ],
  cta: { title: "Have a Project? Let’s Discuss!", href: "/services#contact" },
};

// ---------------------------------------------------------------- KOKER
export const koker = {
  slug: "koker",
  name: "Koker",
  seoTitle: "Koker Case Study: Crypto Wallet & Trading Platform | ERS TECH",
  seoDescription:
    "How ERS TECH built Koker, a secure crypto wallet and exchange platform with spot trading, staking, KYC/AML compliance, and risk monitoring.",
  ogImage: "/assets/case-studies/koker/KOKER.jpg",
  hero: {
    h1: "Koker: Cryptocurrency Wallet & Trading Platform",
    kicker: "SECURE CRYPTO ECOSYSTEM",
    title: "Cryptocurrency Wallet and Trading Platform",
    image: {
      src: "/assets/case-studies/koker/KOKER.jpg",
      alt: "Koker cryptocurrency wallet and trading platform preview",
    },
  },
  theme: {
    mode: "light",
    accent: "#ff5c16",
    cardBg: "#f8f9fa",
    cardShadow: "0px 4px 16px rgba(0,0,0,0.06)",
    cardRadius: "12px",
    textColor: "#263238",
    headingColor: "#111827",
    heroBg: "#f8fafc",
    sectionBg: "#ffffff",
  },
  sections: [
    {
      id: "introduction",
      title: "Introduction",
      blocks: [
        p(
          "Koker is a secure and feature-rich cryptocurrency wallet and trading platform designed to provide users with a seamless digital asset management experience. The platform enables users to store, send, receive, trade, and stake cryptocurrencies while maintaining high security, regulatory compliance, and operational transparency.",
        ),
        p(
          "The objective of Koker was to create a scalable crypto ecosystem that combines wallet management, exchange functionality, AML compliance, and advanced security controls into a single unified platform for both end users and administrators.",
        ),
      ],
    },
    {
      id: "background",
      title: "Background",
      blocks: [
        p(
          "As cryptocurrency adoption continues to grow globally, users demand platforms that offer not only trading capabilities but also secure asset management, regulatory compliance, and a user-friendly experience.",
        ),
        p(
          "Many existing solutions either focus solely on trading or provide limited wallet functionality. Businesses entering the crypto industry also face challenges related to KYC compliance, AML monitoring, risk management, and secure transaction processing.",
        ),
        p(
          "Koker was developed to bridge these gaps by providing a comprehensive crypto financial platform that supports secure onboarding, multi-currency asset management, trading, staking, compliance monitoring, and administrative controls.",
        ),
      ],
    },
    {
      id: "challenges",
      title: "Challenges",
      layout: "cards",
      cards: [
        {
          title: "Regulatory Compliance",
          text: "Implementing KYC verification, AML screening, and transaction monitoring while maintaining smooth onboarding.",
        },
        {
          title: "Security Requirements",
          text: "Safeguarding user assets through 2FA, withdrawal address whitelisting, and strict audit logging.",
        },
        {
          title: "Multi-Currency Management",
          text: "Managing multiple blockchain assets efficiently while ensuring 100% accurate balances and records.",
        },
        {
          title: "Real-Time Trading Engine",
          text: "Building a reliable order matching execution engine capable of instant balance settlements.",
        },
        {
          title: "Transaction Risk Assessment",
          text: "Evaluating transaction risk scores in real time to catch suspicious activity and protect platform integrity.",
        },
        {
          title: "Scalability & Admin Oversight",
          text: "Equipping administrators with granular controls over wallets, limits, fees, and compliance analytics.",
        },
      ],
      blocks: [],
    },
    {
      id: "solution",
      title: "The Solution",
      blocks: [
        p(
          "To address these challenges, a comprehensive crypto platform was designed and implemented with key operational modules:",
        ),
        h3("1. User Authentication & Security"),
        ul([
          "User registration, KYC verification workflows, Two-Factor Authentication (2FA), and email notifications.",
          "Address whitelisting for withdrawals and comprehensive audit logs to prevent unauthorized access.",
        ]),
        h3("2. Wallet Infrastructure & Non-Custodial Support"),
        ul([
          "Centralized multi-currency wallet with automated deposit detection across major blockchain networks.",
          "Support for non-custodial wallets and a double-entry internal ledger for accurate transaction reconciliation.",
        ]),
        h3("3. Compliance & Risk Management"),
        ul([
          "Integrated AML screening for every transaction with an automated risk-scoring engine.",
          "Continuous transaction monitoring that generates immediate alerts for administrative review.",
        ]),
        h3("4. Spot Trading, Exchange & Staking"),
        ul([
          "Real-time spot order execution engine for buying and selling cryptocurrencies with live order books.",
          "Flexible staking plans with automatic reward distributions and earnings tracking.",
        ]),
        h3("5. Administrative Operations"),
        ul([
          "Comprehensive admin dashboard for KYC approval/rejection, fee configuration, withdrawal controls, and analytics.",
        ]),
      ],
    },
    {
      id: "tools",
      title: "Tools & Technologies",
      layout: "tools",
      blocks: [
        ul([
          L("Frontend:", "React.js, Tailwind CSS"),
          L("Backend:", "Node.js, Express"),
          L("Database:", "MongoDB"),
          L(
            "Blockchain Integrations:",
            "Cryptocurrency Wallet APIs, Blockchain Network APIs, Trading Engine",
          ),
          L(
            "Security & Compliance:",
            "2FA, KYC Verification APIs, AML Screening, Audit Logging",
          ),
          L(
            "DevOps & Infrastructure:",
            "DigitalOcean, Linux Servers, NGINX, Docker, CI/CD Pipelines",
          ),
        ]),
      ],
    },
    {
      id: "results",
      title: "The Results",
      blocks: [
        p(
          "The deployment of Koker established an enterprise-grade digital asset infrastructure:",
        ),
        ul([
          "Enhanced Security: Multi-layer protection including 2FA, KYC, and withdrawal whitelisting reduced fraudulent risks.",
          "Improved Compliance: Streamlined review workflows enabled compliance teams to efficiently flag high-risk transactions.",
          "Streamlined Asset Management: Unified multi-currency wallet simplified deposits, transfers, and balance tracking.",
          "Efficient Trading: Low-latency spot trading platform delivered fast, accurate order matching and settlements.",
          "Revenue Generation: Monetization unlocked through configurable trading fees, withdrawal fees, and staking products.",
          "Administrative Efficiency: Centralized dashboard reduced manual operational overhead significantly.",
        ]),
      ],
    },
    {
      id: "conclusion",
      title: "Conclusion",
      blocks: [
        p(
          "Koker successfully delivers a complete cryptocurrency wallet and exchange ecosystem that combines security, compliance, trading, staking, and administrative management into a unified platform.",
        ),
        p(
          "The implementation of KYC verification, AML screening, risk monitoring, secure wallet infrastructure, and advanced trading capabilities enables users to manage digital assets with confidence while ensuring regulatory compliance and operational transparency.",
        ),
        p(
          "The platform's scalable architecture, comprehensive security framework, and robust administrative tools position Koker as a reliable and future-ready solution for the rapidly evolving cryptocurrency industry.",
        ),
      ],
    },
  ],
  cta: { title: "Have a Project? Let’s Discuss!", href: "/services#contact" },
};

// ---------------------------------------------------------------- CARD ACCESS
export const cardAccess = {
  slug: "card-access",
  name: "Card Access",
  seoTitle: "Card Access Case Study: Crypto Card FinTech System | ERS TECH",
  seoDescription:
    "How ERS TECH built Card Access, a crypto card fintech management platform with mediator admin portals, multi-tier commission structures, and user self-service card management.",
  ogImage: "/assets/case-studies/card-access/hero.webp",
  hero: {
    h1: "Card Access: Crypto Card FinTech Management Platform",
    kicker: "CRYPTO CARD FINTECH SYSTEM",
    title: "Crypto Card FinTech Management Platform",
    image: {
      src: "/assets/case-studies/card-access/hero.webp",
      alt: "Card Access Crypto Card FinTech Management Platform preview",
    },
  },
  theme: {
    mode: "light",
    accent: "#ff5c16",
    cardBg: "#f8f9fa",
    cardShadow: "0px 4px 16px rgba(0,0,0,0.06)",
    cardRadius: "12px",
    textColor: "#263238",
    headingColor: "#111827",
    heroBg: "#f8fafc",
    sectionBg: "#ffffff",
  },
  sections: [
    {
      id: "introduction",
      title: "Introduction",
      blocks: [
        p(
          "ERS TECH developed a comprehensive Crypto Card FinTech System designed to simplify digital asset management, card operations, and financial administration through an integrated web-based platform.",
        ),
        p(
          "The solution combines two major components: a centralized Admin/Mediator Portal for managing companies, users, cards, balances, commissions, settlements, and system operations; and a User Website that enables customers, sellers, and referral partners to manage their cards, fund balances, review transactions, complete identity verification, and track earnings.",
        ),
        p(
          "The platform brings multiple financial workflows together within a unified environment, helping businesses manage complex card operations while providing users with a convenient interface for everyday financial activities.",
        ),
        p(
          "By combining card management, cryptocurrency deposits, transaction monitoring, reconciliation, referral management, and security controls, the system provides a flexible foundation for operating a modern crypto card program.",
        ),
      ],
    },
    {
      id: "background",
      title: "Background",
      blocks: [
        p(
          "The growing adoption of cryptocurrency and digital payments has created demand for platforms that connect digital assets with practical payment solutions.",
        ),
        p(
          "However, operating a crypto card program involves more than issuing cards. Businesses must manage corporate clients, user onboarding, identity verification, card configurations, funding operations, transaction records, processor settlements, commissions, and internal financial transfers.",
        ),
        p(
          "Managing these activities across disconnected systems can increase operational complexity and make financial tracking more difficult.",
        ),
        p(
          "ERS TECH addressed this need by developing an integrated platform that connects administrative controls with customer-facing card and wallet management features.",
        ),
        p(
          "The system was designed to support multiple companies, administrative roles, end users, and referral or seller networks while maintaining visibility across financial operations. Its core objective is to centralize the operational lifecycle of a crypto card program, from user onboarding and card issuance to funding, transaction tracking, reconciliation, and commission payouts.",
        ),
      ],
    },
    {
      id: "challenges",
      title: "Challenges",
      layout: "cards",
      cards: [
        {
          title: "Unified User & Card Lifecycle",
          text: "Providing administrators with a unified interface to manage corporate clients, sub-admins, KYC data, and issued cards across companies.",
        },
        {
          title: "Cryptocurrency Funding & Balances",
          text: "Coordinating deposit addresses, incoming transactions, card top-ups, internal transfers, and withdrawal requests.",
        },
        {
          title: "Financial Reconciliation & Ledgers",
          text: "Maintaining a consistent real-time view of balances, financial movements, processor activity, and internal accounting records.",
        },
        {
          title: "Multi-Level Commission Management",
          text: "Bringing referral performance, sales agent tiers, and commission payout management into the same operational environment.",
        },
        {
          title: "Security & Access Control",
          text: "Supporting granular role-based access, WebAuthn passkey security, withdrawal address whitelisting, and auditable financial workflows.",
        },
        {
          title: "Operational Monitoring & Reliability",
          text: "Equipping administrators with tools to identify integration failures, monitor processing activity, and investigate operational issues.",
        },
      ],
      blocks: [],
    },
    {
      id: "solution",
      title: "The Solution",
      blocks: [
        p(
          "ERS TECH developed an integrated platform with two interconnected components, each designed for a distinct operational role:",
        ),
        h3("A. Admin / Mediator Platform"),
        ul([
          "Companies, Admins & User Management: Manage corporate clients, sub-admins, customized depositor roles, KYC details, and card issuance pipelines.",
          "Card Issuance & Configuration: Visibility into issued physical/virtual cards, card balances, freeze/unfreeze actions, card plans, and BIN configurations.",
          "Financial Reconciliation & Ledgers: Processor ledgers, admin ledgers, commission histories, and centralized transaction movements.",
          "Deposits, Commissions & Withdrawals: Manage receiving addresses, review pending deposits, fund commission pools, and process verified withdrawals.",
          "Transfers & Balance Management: Inter-account balance transfers, transfer records, and Web3 multisignature administrative workflows.",
          "Agents, Referrals & Platform Settings: Seller agents, sales tiers, referral codes, commission rules, and zero-fee user configurations.",
          "System Operations & Monitoring: Error logs, process management tools, background job workflows, and notification broadcasting.",
        ]),
        h3("B. User Website — End User, Referral & Seller Portal"),
        ul([
          "Dashboard & Card Onboarding: Wallet balances, card summaries, live exchange rates, and guided step-by-step card application flows.",
          "KYC Verification & Account Security: Veriff-powered identity verification, WebAuthn biometric passkey security, and session management.",
          "Card Management & Funding: Physical and virtual card details, freeze/unfreeze controls, transaction limits, and crypto card top-ups.",
          "Crypto Deposits & Transaction History: Dedicated deposit addresses for USDT, BTC, and ETH with blockchain confirmation tracking and statements.",
          "Referral & Seller Management: Track invited users, referred card activations, sales commissions, and customer top-up workflows.",
          "Secure Withdrawals: Whitelisted cryptocurrency payout addresses and protected withdrawal submission.",
        ]),
      ],
    },
    {
      id: "tools",
      title: "Tools & Technologies",
      layout: "tools",
      blocks: [
        ul([
          L("Frontend:", "Next.js, Tailwind CSS, Telegram Bot API"),
          L("Backend:", "Node.js, Express, Solana, Webhooks"),
          L("Database:", "MongoDB"),
          L(
            "Blockchain:",
            "Cryptocurrency Wallet APIs, Blockchain Network APIs, Payment Gateway Integrations, Exchange Service Integrations",
          ),
          L(
            "Compliance & Monitoring:",
            "AML Verification APIs, Transaction Risk Assessment, Activity Logging, Audit Trail System",
          ),
          L("KMS & Ledger:", "Golang"),
        ]),
      ],
    },
    {
      id: "results",
      title: "The Results",
      blocks: [
        p(
          "The completed system brings card management, crypto funding, financial administration, and referral operations into one integrated platform:",
        ),
        ul([
          "Centralized Operational Control: Administrators gain a unified interface for managing companies, users, card configurations, and commissions.",
          "Improved Financial Visibility: Dedicated ledgers, processor records, and reconciliation tools provide structured balance tracking.",
          "Streamlined Customer Experience: Users access card onboarding, identity verification, funding, and card controls through a single website.",
          "Integrated Referral Operations: Seller and referral partners monitor invited customers, card activity, and commissions in a dedicated portal.",
          "Stronger Security Controls: Role-based permissions, KYC, passkey authentication, and whitelisted withdrawal addresses support strict security.",
          "Better Operational Monitoring: Error logs, background process management, and settlement records provide fast troubleshooting.",
        ]),
      ],
    },
    {
      id: "conclusion",
      title: "Conclusion",
      blocks: [
        p(
          "The Crypto Card FinTech Management Platform demonstrates ERS TECH's capability to develop integrated financial software that connects cryptocurrency operations, card management, payment workflows, accounting, and customer-facing services.",
        ),
        p(
          "By combining a comprehensive Admin/Mediator Portal with a feature-rich User Website, the solution supports the operational lifecycle of a crypto card program, from company and user management to card issuance, funding, reconciliation, commissions, and transaction monitoring.",
        ),
        p(
          "Its integrated architecture helps bring complex workflows into a consistent environment while providing a foundation for future enhancements in financial automation, blockchain integration, and digital payment services.",
        ),
        p(
          "At ERS TECH, we develop tailored fintech and blockchain solutions that help businesses streamline operations, integrate financial services, and build technology platforms for evolving digital markets.",
        ),
      ],
    },
  ],
  cta: { title: "Have a Project? Let’s Discuss!", href: "/services#contact" },
};

// All case studies map
export const caseStudies = {
  aconomy,
  salharo,
  wise1ne,
  focusmonk,
  bccoin,
  "a-bot": aBot,
  abot: aBot,
  quikipay,
  liftsplit,
  koker,
  "card-access": cardAccess,
  cardaccess: cardAccess,
  "adm-card": cardAccess,
};

// Explicit mapping table (data.json ID and slider project names -> case study slug)
export const projectToCaseStudyMap = {
  byDataId: {
    1: "wise1ne",
    2: "focusmonk",
    3: "aconomy",
    4: "bccoin",
    5: "quikipay",
    6: "salharo",
    7: "quikipay",
    8: "quikipay",
    9: "liftsplit",
    10: "focusmonk",
    11: "wise1ne",
    12: "aconomy",
    13: "card-access",
    15: "focusmonk",
    16: "a-bot",
    17: "koker",
  },
  bySliderName: {
    Aconomy: "aconomy",
    "Aconomy Web": "aconomy",
    "Aconomy Mobile": "aconomy",
    Salharo: "salharo",
    Wise1HRM: "wise1ne",
    "Wise1HRM Web": "wise1ne",
    "Wise1HRM Mobile": "wise1ne",
    Wise1ne: "wise1ne",
    FocusMonk: "focusmonk",
    "FocusMonk Web": "focusmonk",
    "FocusMonk Mobile": "focusmonk",
    "FocusMonk Desktop": "focusmonk",
    BlackCardCoin: "bccoin",
    BCCoin: "bccoin",
    "A-Bot": "a-bot",
    "A-bot": "a-bot",
    ABot: "a-bot",
    QuikiPay: "quikipay",
    QuickPayCrypto: "quikipay",
    IBBA: "quikipay",
    LiftSplit: "liftsplit",
    Koker: "koker",
    "Card Access": "card-access",
    "CardAccess": "card-access",
    "ADM Card": "card-access",
  },
};

export function getCaseStudy(slug) {
  if (!slug || typeof slug !== "string") return null;
  return caseStudies[slug.toLowerCase()] || null;
}

export function getAllCaseStudySlugs() {
  return Object.keys(caseStudies);
}
