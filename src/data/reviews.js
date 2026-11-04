// Client reviews shown on the home page and on matching case studies.
export const REVIEWS = [
  {
    project: "Card Access",
    kind: "Crypto Card System",
    href: "/portfolio/card-access",
    name: "Toni",
    text: "We hired ERS TECH to build our crypto card platform, and the experience has been good overall. They worked on the card management system and the features needed to make the platform easy to use. The team was cooperative and handled our requirements professionally.",
  },
  {
    project: "QuikiPay",
    kind: "Payment Provider",
    href: "/portfolio/quikipay",
    name: "Chris",
    text: "ERS TECH developed our payment platform, Quikipay, which we wanted to use to manage digital payment transactions. They handled the development work and helped us bring the different payment-related features together. Communication was smooth, and we were happy with their involvement.",
  },
  {
    project: "Vymopay",
    kind: "AI Crypto Exchange Bot",
    href: "/portfolio/a-bot",
    name: "Xando",
    text: "We approached ERS TECH to develop Vymopay, our AI-powered crypto exchange bot. The idea was to make crypto trading easier through automation. Their team worked on the bot and its related platform features. We appreciated their support and technical input throughout the project.",
  },
  {
    project: "Wise1ne",
    kind: "AI-Based HRMS",
    href: "/portfolio/wise1ne",
    name: "Andrew Omole",
    text: "ERS TECH built our HRMS platform, Wise1ne, to help us manage employee information and everyday HR activities in one place. We wanted something simple and practical for our organization, and the team worked closely with us to understand what we needed. Overall, a positive experience.",
  },
  {
    project: "Salharo",
    kind: "E-commerce Platform",
    href: "/portfolio/salharo",
    name: "Soulat Bajwa",
    text: "We hired ERS TECH for the development of our USA based e-commerce platform, Salharo. They helped us build the online shopping platform, including the main features required to manage products and customer orders. The team was responsive and easy to work with whenever we needed changes.",
  },
  {
    project: "Aconomy",
    kind: "All-in-One Crypto Platform",
    href: "/portfolio/aconomy",
    name: "Kelvin Sebastian",
    text: "ERS TECH developed Aconomy for us, an all-in-one crypto platform bringing multiple digital asset services under one roof. The project involved several interconnected features, including crypto wallets, exchange functionality, and other financial services. It was a complex project, but the team put in considerable effort to bring everything together.",
  },
  {
    project: "LiftSplit",
    kind: "Ride-Sharing App",
    href: "/portfolio/liftsplit",
    name: "Faiqa Anwar",
    text: "We worked with ERS TECH to develop Liftsplit, our ride-sharing application. The concept was to help people share rides and make their daily commutes more convenient. They worked on the mobile application and its core functionality. The team was helpful and receptive to our feedback during development.",
  },
  {
    project: "FocusMonk",
    kind: "AI-Based Team Management System",
    href: "/portfolio/focusmonk",
    name: "Luca Albertinazi",
    text: "ERS TECH developed Focusmonk, our AI-based team management system. We wanted a platform where teams could manage their work, organize tasks, and keep track of their daily activities. They understood the overall concept and helped turn it into a working software solution. Really appreciated their cooperation.",
  },
];

export const reviewForSlug = (slug) => REVIEWS.find((r) => r.href === `/portfolio/${slug}`) || null;
