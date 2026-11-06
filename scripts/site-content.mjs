// Single source of truth for the machine-readable copy of the site.
// Used by scripts/prerender.mjs to generate, at build time:
//   - static HTML per route (readable without JavaScript)
//   - JSON-LD structured data
//   - llms.txt, llms-full.txt, sitemap.xml
//
// KEEP IN SYNC with the React components when you change site copy:
//   Hero/About/Portfolio/Contact -> "/", Approach.tsx -> "/approach",
//   Packages.tsx -> "/packages", CustomPlatforms.tsx -> "/platforms", book.tsx -> "/book".

export const SITE = {
  name: "Gaia AI Strategy",
  url: "https://www.gaiawebservices.com",
  email: "dtaplin21@gmail.com",
  phone: "+1-510-326-1121",
  phoneDisplay: "(510) 326-1121",
  tagline: "AI strategy consulting, workflow audits, and custom automation systems.",
  summary:
    "Gaia AI Strategy is an AI strategy consulting team that finds where companies lose time to repetitive workflows and inefficient processes, then designs, tests, and deploys AI and automation systems to fix it. Services: AI opportunity strategy, workflow audits, pilot development, deployment planning, custom front-end and back-end platforms, and ROI measurement.",
  founder: {
    name: "Dominique Taplin",
    jobTitle: "Managing Partner",
    role: "AI Strategy Consultant",
    credential: "IBM AI Certification",
  },
};

export const pages = [
  {
    path: "/",
    file: "index.html",
    navLabel: "Home",
    title: "Gaia AI Strategy | AI Strategy Consulting & Workflow Automation",
    description:
      "AI strategy consulting team. We find where your company is losing time, then automate it: workflow audits, AI pilots, custom front-end and back-end systems, deployment planning, and ROI tracking.",
    h1: "Simplify Operations. Strengthen Performance. Scale With Confidence.",
    intro:
      "We help organizations identify repetitive workflows, inefficient processes, and opportunities where AI and automation can reduce manual work, improve decision-making, and increase productivity.",
    blocks: [
      {
        h2: "Strategy outcomes",
        list: [
          "A prioritized AI opportunity roadmap",
          "Pilot systems tested against real workflows",
          "A responsible deployment and scale plan",
          "ROI measures tied to business outcomes",
        ],
      },
      {
        h2: "Selected client work: built systems, not slide decks",
        paragraphs: [
          "AI consulting that connects strategy with implementation—from workflow automation and custom AI systems to adoption and measurable business value.",
        ],
        items: [
          {
            title: "10+ companies supported",
            text: "Over the past three years, we have helped more than 10 companies introduce automation into their operations. Experience includes AI strategy consulting, business process automation, workflow optimization, AI implementation, and custom automation systems.",
          },
          {
            title: "Systems designed around your workflow",
            text: "We design connected front-end and back-end systems that integrate with existing business workflows, tools, data, and automation processes.",
          },
          {
            title: "Front-end systems",
            text: "Clear, responsive interfaces that make AI tools and automated workflows easy for teams to use.",
          },
          {
            title: "Back-end systems",
            text: "Secure APIs, databases, business logic, and integrations that power reliable AI automation.",
          },
        ],
      },
      {
        h2: "Credentials and expertise: strategy grounded in technical execution",
        paragraphs: [
          "We work at the intersection of business strategy, AI systems, and digital product development. Our role is to translate broad AI goals into focused initiatives your team can test, understand, and scale with confidence.",
          "With hands-on experience building web platforms and AI-enabled workflows, we bring both the strategic view and the implementation awareness needed to keep recommendations practical.",
        ],
        items: [
          {
            title: "Dominique Taplin — Managing Partner, AI Strategy Consultant",
            text: "Holds an IBM AI Certification.",
          },
          {
            title: "AI opportunity design",
            text: "Use cases, readiness, governance, and implementation roadmaps.",
          },
          {
            title: "Business-first systems",
            text: "Solutions aligned to workflows, adoption, and measurable outcomes.",
          },
        ],
      },
      {
        h2: "Technical skills: full-stack systems expertise",
        paragraphs: [
          "Technical depth across interface architecture, spatial systems, data integration, testing, and production infrastructure.",
        ],
        items: [
          {
            title: "Frontend Engineering & UI Architecture",
            text: "React, Next.js, TypeScript, JavaScript (ES6+), component-driven architecture, modular UI systems, Context API, Redux patterns, real-time UI updates, WebSockets, data-driven interfaces, and configurable workflow UIs.",
          },
          {
            title: "2D / 3D Spatial & Visualization Systems",
            text: "Canvas API, SVG rendering, coordinate systems, geometric transformations, vector math, bounding-box calculations, distance and area computation, grid-based layouts, CAD/PDF spatial data interpretation, and visualization dashboards.",
          },
          {
            title: "Data-Oriented Design & Integration",
            text: "REST APIs, distributed-system integration, PostgreSQL schema modeling, structured domain models, live data streams, event-driven architecture, Redis job queues, asynchronous processing, and simulator-style data workflows.",
          },
          {
            title: "Testing & Reliability",
            text: "Playwright end-to-end testing, test fixtures, frontend validation workflows, regression testing, GitHub Actions CI/CD, and structured logging for UI-state traceability.",
          },
          {
            title: "Infrastructure & Deployment",
            text: "Docker, Render, Vercel, Supabase Auth, production deployment, and microservices coordination.",
          },
        ],
      },
      {
        h2: "Coding agent experience: AI-assisted software orchestration",
        paragraphs: [
          "We direct, review, test, and document AI-assisted software development from original concept through production deployment. Our process includes identifying bugs, edge cases, and failure modes before implementation into service.",
          "Prompt engineering with Claude, Cursor, and OpenAI (remote, 2020–present). More than 600,000 lines of source code orchestrated and reviewed.",
        ],
        list: [
          "Original system concepts developed without copying or adapting existing GitHub repositories.",
          "Documented software architecture, inference pipelines, licensed-data workflows, and implementation decisions.",
          "Maintained records, documentation, and video evidence showing application design and development direction.",
          "Established beta-testing contracts with companies for software created through Cursor-assisted development.",
        ],
      },
      {
        h2: "Production evidence",
        items: [
          {
            title: "The Unnamed Farm (theunnamedfarm.com)",
            text: "Frontend deployment with CI/CD, continuous growth, and active maintenance since 2023.",
            url: "https://www.theunnamedfarm.com/",
          },
        ],
      },
      {
        h2: "Contact",
        paragraphs: [
          "Share the challenge, workflow, or idea you are exploring. We'll begin with your business goals and determine the clearest next step.",
          `Email: ${SITE.email}. Phone: ${SITE.phoneDisplay}.`,
        ],
      },
    ],
  },
  {
    path: "/approach",
    file: "approach.html",
    navLabel: "Approach",
    title: "Our AI Strategy Approach | Gaia AI Strategy",
    description:
      "How we run AI engagements in six steps: understand the ambition, audit systems and workflows, create an AI manifesto, develop and test pilots, deploy and scale, and track ROI.",
    h1: "From first question to measurable value.",
    intro:
      "A structured, evidence-led process keeps the work focused on the systems your organization needs—not AI for its own sake.",
    blocks: [
      {
        h2: "The engagement model: six steps",
        ordered: true,
        items: [
          {
            title: "Understand the ambition",
            text: "Clarify what you want AI to improve, the business constraints, and what success should look like.",
          },
          {
            title: "Audit systems & workflows",
            text: "Map current tools, data, processes, risks, and team readiness to identify practical opportunities.",
          },
          {
            title: "Create the AI manifesto",
            text: "Define guiding principles, priority use cases, governance boundaries, and a focused implementation plan.",
          },
          {
            title: "Develop & test pilots",
            text: "Build small, useful pilots and validate them with the people who will use them in real workflows.",
          },
          {
            title: "Deploy & scale",
            text: "Move successful pilots into production, support adoption, and create a responsible path to expansion.",
          },
          {
            title: "Track ROI",
            text: "Measure time saved, quality, revenue impact, adoption, and operating cost against agreed baselines.",
          },
        ],
      },
    ],
  },
  {
    path: "/packages",
    file: "packages.html",
    navLabel: "Packages",
    title: "AI Consulting Packages: Audit, Testing & Implementation, Scale | Gaia AI Strategy",
    description:
      "Three AI consulting packages: a focused AI Audit, Testing & Implementation of a pilot in a real workflow, and Scale for expanding proven automation with ROI tracking.",
    h1: "Start where your business is today.",
    intro:
      "Choose a focused AI audit, move a priority use case through testing and implementation, or scale an automation system that has already proven its value.",
    blocks: [
      {
        h2: "AI consulting packages",
        items: [
          {
            title: "1. Audit — Find the right AI opportunity",
            text: "A focused assessment of your workflows, systems, data, and team readiness to identify where AI automation can create practical value.",
            list: [
              "Workflow and systems review",
              "AI readiness assessment",
              "Prioritized opportunity map",
              "Recommended implementation roadmap",
            ],
          },
          {
            title: "2. Testing & Implementation — Turn the strategy into a working system",
            text: "Design, build, and test an AI pilot inside a real workflow before moving into a broader production deployment.",
            list: [
              "Pilot design and development",
              "Front-end and back-end integration",
              "Workflow testing with your team",
              "Deployment and adoption plan",
            ],
          },
          {
            title: "3. Scale — Expand what is already working",
            text: "Strengthen a proven AI system, expand it across teams or workflows, and connect growth to measurable operating results.",
            list: [
              "Production optimization",
              "Additional workflow integrations",
              "Governance and documentation",
              "ROI and performance tracking",
            ],
          },
        ],
      },
    ],
  },
  {
    path: "/platforms",
    file: "platforms.html",
    navLabel: "Custom Platforms",
    title: "Custom Platforms: Front-End & Back-End Systems | Gaia AI Strategy",
    description:
      "Examples of custom platforms we have designed and directed: The Unnamed Farm, Batana Oil Ecommerce, and an AI Quality Control System that compares inspection drawings to master drawings.",
    h1: "Frontend and backend systems built around real workflows.",
    intro:
      "Examples of custom platforms we have designed and directed—from customer-facing interfaces to backend services, data models, automation, and production deployment.",
    blocks: [
      {
        h2: "Custom platform examples",
        items: [
          {
            title: "The Unnamed Farm — Business & agricultural platform",
            text: "A production platform designed to communicate company operations, support ongoing growth, and provide a maintainable digital foundation for the business.",
            list: [
              "Frontend: Responsive customer-facing experience, reusable interface components, and structured content presentation.",
              "Backend: Application services, PostgreSQL data modeling, deployment workflows, and ongoing production maintenance.",
              "Technologies: Next.js, Node.js, PostgreSQL, CI/CD",
            ],
            url: "https://www.theunnamedfarm.com/",
          },
          {
            title: "Batana Oil Ecommerce — Full-stack commerce platform",
            text: "A customer-facing ecommerce system built to present products, support the buying journey, and connect frontend interactions with backend commerce workflows.",
            list: [
              "Frontend: Product discovery, responsive shopping experiences, conversion-focused interfaces, and customer checkout flows.",
              "Backend: Commerce logic, order and payment integrations, deployment pipelines, and production operations.",
              "Technologies: React, TypeScript, Ecommerce, Payments",
            ],
            url: "https://www.thegrandgaia.com/",
          },
          {
            title: "AI Quality Control System — AI-enabled operations platform",
            text: "A custom quality-control and quality-assurance platform that connects an operational dashboard with AI-assisted testing and monitoring workflows.",
            list: [
              "Problem: Inspection data and construction drawings required substantial manual comparison.",
              "Solution: Designed an AI-assisted system capable of aligning inspection drawings with master drawings and identifying differences.",
              "Business impact: Faster inspection review, centralized evidence, and reduced manual drawing comparison.",
              "Technologies: AI Automation, Python, TensorFlow, React, Node.js",
            ],
            url: "https://dellsystemmanager.vercel.app/",
          },
        ],
      },
    ],
  },
  {
    path: "/book",
    file: "book.html",
    navLabel: "Book a strategy call",
    title: "Book a Strategy Call | Gaia AI Strategy",
    description:
      "Request a strategy call with Gaia AI Strategy. Describe what you want to improve, automate, or build and we will identify the most useful next conversation.",
    h1: "Start with the business problem.",
    intro:
      "Tell us what you are trying to improve, automate, or build. We will review the request and identify the most useful next conversation.",
    blocks: [
      {
        h2: "What to expect",
        items: [
          { title: "Focused first conversation", text: "We use your description to prepare before responding." },
          { title: "Practical next steps", text: "Audit, pilot implementation, or scale—based on your current stage." },
          { title: "Direct and confidential", text: "Your request is delivered directly to our team email." },
        ],
      },
      {
        h2: "Contact",
        paragraphs: [
          `Use the form on this page (name, email, and a description of what you want), or email ${SITE.email} directly. Phone: ${SITE.phoneDisplay}.`,
        ],
      },
    ],
  },
];
