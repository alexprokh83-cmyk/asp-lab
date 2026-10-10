/**
 * English translation dictionary.
 * English is the default public language.
 */
export const enSource = {
  site: {
    name: "ASP Lab",
    tagline: "Practical AI engineering for organizations",
    description:
      "We help turn an AI idea into a concrete solution: define the task, choose the right approach, build a working solution, evaluate the result and determine the next step toward deployment.",
  },

  nav: {
    mainNav: "Main navigation",
    mobileMenu: "Navigation menu", mobileNav: "Mobile navigation",
    home: "ASP Lab",
    solutions: "Solutions",
    localAi: "Local AI",
    forWhom: "For whom",
    forWhomExpand: "Expand For whom menu",
    forWhomCollapse: "Collapse For whom menu",
    business: "Business",
    education: "Education",
    publicSector: "Public institutions",
    projects: "Projects",
    about: "About",
    openaiApi: "OpenAI API",
    cta: "Discuss a task",
    skipToMain: "Skip to main content",
    openMenu: "Open navigation menu",
    closeMenu: "Close navigation menu",
    language: "Language",
    currentLanguage: "Current language: English",
    chooseLanguage: "Choose language",
  },

  footer: {
    fullName: "Automation of Systems & Processes",
    tagline: "Practical AI engineering for organizations.",
    method: "Build \u2192 Test \u2192 Measure \u2192 Automate",
    groupSolutions: "Solutions",
    groupLocalAi: "Local AI",
    groupAudiences: "Audiences",
    groupSite: "Site",
    links: {
      localAi: "Local / Private AI",
      business: "Business",
      education: "Education",
      publicSector: "Public institutions",
      projects: "Projects",
      approach: "Approach",
      about: "About",
      contact: "Contact",
      privacy: "Privacy",
    },
    copyright: "ASP Lab",
    githubLabel: "GitHub",
  },

  breadcrumbs: {
    home: "Home",
    ariaLabel: "Breadcrumb",
  },

  langSwitcher: {
    label: "Language",
    en: "English",
    uk: "\u0423\u043a\u0440\u0430\u0457\u043d\u0441\u044c\u043a\u0430",
    ru: "\u0420\u0443\u0441\u0441\u043a\u0438\u0439",
  },

  home: {
    hero: {
      eyebrow: "Practical AI engineering",
      heading: "AI for real processes. With measurable results.",
      headingPrefix: "AI",
      headingFirstRest: " for real processes.",
      headingSecond: "With measurable results.",
      lead: "ASP Lab develops solutions that automate systems and processes with AI, n8n and API integrations: documents, requests, voice, assistants, integrations and testing. We start with one concrete task and build a working solution around it.",
      audience: "For small and medium-sized businesses, education and public institutions.",
      cta: "Discuss a task",
      ctaSecondary: "Explore projects",
      principle: "How we work",
      flow: ["Task and data", "AI / automation", "Verification", "Result"],
    },
    solutions: {
      heading: "Start with a process, not a model.",
      lead: "Pick the direction closest to your process. Each one is backed by solutions we have built.",
    },    localAi: {
      heading: "Local / Private AI",
      lead: "Processing data locally may be worth considering when data sensitivity, connectivity or cost make external APIs a poor fit. Where processing should happen depends on the task and the data.",
      flow: ["Data", "Local model", "Evaluation", "Result"],
      diagramLabel: "Illustrative diagram — not a documented implementation",
      supportedHeading: "Supported by current projects",
      supported: ["Local LLM experiments and model comparison", "Local transcription of long audio recordings"],
      developingHeading: "Development and R&D direction",
      developing: ["Production local model deployment", "Dedicated Private AI infrastructure"],
      caution: "Local execution alone does not make a whole workflow private. Telegram, Google services and external AI APIs remain external components.",
      cta: "Learn about Local AI",
      linkBenchmark: "Auto LLM Benchmark",
      linkTranscription: "Local transcription",
    },
    audiences: {
      heading: "Who it is for",
      lead: "Possible applications, not descriptions of completed deployments for these organizations.",
      business: { title: "Business", text: "Document routing, workflow automation across existing systems, and turning voice notes into task drafts." },
      education: { title: "Education", text: "Permitted educational and administrative materials, lecture transcription for human review, internal knowledge assistance (developing)." },
      publicSector: { title: "Public institutions", text: "Preliminary document triage and draft summaries, starting with a noncritical process and clear data rules." },
      link: "Read more",
    },
    process: {
      heading: "Build → Test → Measure → Automate",
      lead: "A repeatable method for turning one task into a verified result.",
      before: "Before implementation: define the task, data and success criteria.",
      after: "Moving to a pilot is a separate decision based on the results.",
      link: "Read about the approach",
      steps: {
        build: { title: "Build", description: "Build a working solution for one task." },
        test: { title: "Test", description: "Check normal cases, failures and edge conditions." },
        measure: { title: "Measure", description: "Compare agreed measures against the starting process." },
        automate: { title: "Automate", description: "Integrate a verified scenario within agreed boundaries." },
      },
    },
    about: {
      heading: "A practical engineering laboratory",
      text: "ASP Lab combines automation, local experiments and evaluation as a discipline. It is developing toward Local / Private AI model engineering. The projects here are laboratory work, shown with their limits.",
      link: "About the laboratory",
    },
    faq: {
      heading: "Questions",
      items: [
        { q: "Can we start with one small process?", a: "Yes. The first stage is one bounded task with agreed data and success criteria." },
        { q: "Do we need to choose a model or technology first?", a: "No. Describe the task and what is involved; choosing an approach is part of the work." },
        { q: "Is cloud AI required?", a: "Not necessarily. Where processing happens depends on the task, data and architecture, and is agreed per project." },
        { q: "Is fine-tuning already available?", a: "Partially. LoRA / QLoRA is a planned R&D direction, not a launched service. Simpler approaches are evaluated first." },
        { q: "How are cost and timing determined?", a: "After the scope is clarified. No prices or deadlines are quoted in advance." },
      ],
    },
    finalCta: {
      heading: "Start with one process.",
      lead: "Describe what is currently done manually, what data is involved and what result you would like to achieve. You do not need a technical specification or a chosen model to begin.",
      cta: "Discuss a task in Telegram",
      secondary: "What to include in your message",
      warning: "Do not send confidential documents, credentials or third-party personal information in an initial message.",
    },
  },

  solutions: {
    heading: "Solutions",
    lead: "Four practical engineering directions \u2014 each grounded in laboratory projects and experiments.",
    cards: {
      processAutomation: { title: "Process Automation & Integrations", problem: "Repetitive cross-system workflows consume engineer time and introduce errors.", value: "Automate structured handoffs between tools using AI-assisted workflow engines." },
      documentsAndSpeech: { title: "Documents & Speech", problem: "Organisations process large volumes of unstructured documents and audio.", value: "Extract, transform, and route content from documents and speech recordings." },
      localModels: { title: "Local AI Model Selection & Benchmarking", problem: "Choosing the right local model for a task without a structured comparison is unreliable.", value: "Systematic scenario-based benchmarking to identify the best-fit local model." },
      aiEvaluation: { title: "AI System Evaluation", problem: "Deploying an AI system without structured evaluation introduces unpredictable failures.", value: "Functional and adversarial evaluation using defined test suites and metrics." },
    },
  },

  localAi: {
    heading: "Local / Private AI",
    lead: "Understanding when local AI processing is appropriate \u2014 and what has been built so far.",
    diagramLabel: "Conceptual illustration \u2014 not a documented production deployment",
    maturity: { confirmed: "Confirmed by projects", developing: "Developing direction", planned: "Planned / R&D", concept: "Demonstration concept" },
  },

  audiences: {
    business: { heading: "AI engineering for business", lead: "Practical automation for organizations that need to move carefully from idea to verified result." },
    education: { heading: "AI engineering for education", lead: "Document processing, local AI, and workflow automation for educational institutions." },
    publicSector: { heading: "AI engineering for public institutions", lead: "Structured AI prototyping for municipal, governmental, and budget-funded organizations." },
    disclaimer: "These are possible application scenarios \u2014 not claims of completed deployments for these organizations.",
  },


  approach: { heading: "Engineering approach", lead: "How we move from an AI idea to a verifiable result." },
  about: { heading: "About ASP Lab", lead: "A practical AI engineering laboratory for organizations." },

  openaiApi: {
    heading: "OpenAI API Desk",
    workspaceTitle: "OpenAI API",
    workspaceSubtitle: "Developer mode",
    workspaceDescription: "Use OpenAI models directly through the API with your own API key.",
    tokenWarning: "Attention: Your API token is sent to OpenAI to process requests. Don’t use keys you aren’t willing to share with a browser app.",
    pageTitle: "OpenAI API Desk — browser tool",
    lead: "Explore OpenAI models and API options using your own API key.",
    warning: "Heads up! Your API token is not stored on our server.",
    keyHandling: "The key stays in this page’s memory until you reload it and is sent directly to api.openai.com. The conversation is held in memory in this tab; OpenAI may store Responses by default.",
    platformLabel: "OpenAI Platform",
    apiKeysLabel: "Create an API key",
    keySafetyLabel: "How your API key is used",
    keyTooltip: "Your key stays in this tab's memory until reload and is sent directly to api.openai.com, not ASP Lab. OpenAI may process or retain requests under its own policies.",
    frameTitle: "OpenAI API Desk interface",
  },
  contact: {
    heading: "Discuss a task",
    lead: "Start with a concrete problem. Describe what happens now, what you need to change, and what constraints apply.",
    telegramCta: "Open Telegram",
    telegramUnavailable: "Telegram contact is not yet configured.",
    checklistHeading: "Helpful to include in your message:",
    checklistItems: ["What happens now (the current process or problem)", "Which inputs are involved (documents, audio, data, etc.)", "Desired output or outcome", "Systems involved", "Known data or hosting constraints"],
    warning: "Do not send credentials, confidential documents, third-party personal information, or student data in an initial message.",
    form: { heading: "Send us a message", name: "Name", email: "Email", phone: "Phone (optional)", message: "Message", nameError: "Enter a valid name. Use letters, spaces, hyphens or apostrophes.", emailError: "Enter a valid email address.", phoneError: "Enter a valid phone number.", messageError: "Enter a message between 10 and 2000 characters.", submit: "Send message", loading: "Sending…", success: "Thank you! Your message has been sent. We’ll get back to you soon.", cooldown: "You can send another message in {seconds} seconds.", sendError: "We couldn’t send your message. Please try again.", website: "Leave this field empty" },
  },

  privacy: { heading: "Privacy information", lead: "Factual information about how this website handles data.", requiresReview: "This page requires owner review before production publication.", fields: { operator: "Site operator", contact: "Privacy contact", hosting: "Hosting provider" } },

  notFound: { heading: "Page not found", lead: "The page you requested does not exist or has been moved.", homeLink: "Go to home", solutionsLink: "Solutions", projectsLink: "Projects" },

  ui: {
    telegram: { external: "opens Telegram, an external service", unavailable: "Telegram contact is not available yet", unavailableNote: "The Telegram link has not been configured. The general contact page remains available." },
    previewBanner: "Preview build — not indexed by search engines",    capabilityLabel: "Capability maturity", boundaryHeading: "Architecture", statusLabel: "Status",    learnMore: "Learn more",
    viewAll: "View all projects",
    back: "Back",
    externalLink: "Opens in a new tab",
    previewLabel: "Preview",
    draftLabel: "Draft",
    ownerSuppliedLabel: "Owner-supplied results; source verification pending.",
    maturity: { confirmed: "Confirmed by projects", developing: "Developing", planned: "Planned / R&D", concept: "Demonstration concept" },
    diagramConceptual: "Conceptual illustration",
    diagramDocumented: "Documented implementation",
    diagramProposed: "Proposed addition",
    boundaryLocal: "Local",
    boundaryExternal: "External",
    boundaryUnknown: "Unknown / not documented",
  },
} as const;

type Widen<T> = T extends string ? string : T extends readonly (infer U)[] ? readonly Widen<U>[] : { -readonly [K in keyof T]: Widen<T[K]> };

/** Shape of every dictionary. uk.ts and ru.ts are typed against it: a missing key is a compile error. */
export type TranslationDictionary = Widen<typeof enSource>;

export const en: TranslationDictionary = enSource;
