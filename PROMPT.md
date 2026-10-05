MASTER IMPLEMENTATION PROMPT FOR CLAUDE CODE

You are implementing AI Laboratory, a multilingual, static-first website for a practical AI engineering laboratory.



Build the website. Do not produce another research report, business-concept rewrite, or UX essay.



Use the requirements below as the implementation contract. Begin by inspecting the repository, then implement the site in manageable phases.



Do not invent missing business facts, project results, contacts, infrastructure, legal information, or source material.



Whenever a real value is unavailable, mark it:



TODO — REAL VALUE REQUIRED



1\. Project objective and decision hierarchy

1.1 Objective

Build a credible, compact, engineering-oriented website that explains:



AI Laboratory — practical AI engineering for organizations: process automation, document processing and local AI, starting with a verifiable prototype.



Extended positioning:



We help turn an AI idea into a concrete solution: define the task, choose the right approach, build a prototype, evaluate the result and determine the next step toward deployment.



The central method is:



Build → Test → Measure → Automate



The visitor’s understanding should follow:



Real problem → engineering approach → prototype → verification → measured result → next step



1.2 Audiences

Prioritize:



Small and medium-sized businesses.

Education.

Public, municipal, and budget-funded institutions.

The site must also be suitable for sharing with international grant reviewers. Do not describe grant funding as the purpose of the laboratory or website.



1.3 Positioning boundaries

Present a developing but real engineering capability, not:



a personal QA portfolio;

a generic AI startup;

a large enterprise vendor;

a GPU showcase;

a random repository collection;

an already operational Private AI infrastructure provider.

QA and evaluation support the broader engineering proposition.



1.4 Resolve specification conflicts explicitly

The approved decisions below supersede older conflicting requirements:



Earlier requirement	Final implementation decision

Russian-first website	English primary, complete Ukrainian and Russian versions from the beginning

Contact form in V1	Telegram-first contact; no working website form or backend in V1

Form submission acceptance criteria	Replaced by correct Telegram configuration and honest unavailable states

Language selector withheld until localization exists	Implement complete localization now, with a visible selector

Seven case studies conditional on materials	Implement all seven case-study records and preview routes; publish only those meeting evidence requirements

Missing project information	Preserve the structure, use explicit TODOs, and apply publication gates

1.5 Implementation behavior

Inspect existing files, package manifests, lockfiles, assets, documentation, and project evidence before changing anything.

Preserve unrelated work and uncommitted changes.

Reuse a suitable existing stack.

Do not undertake another broad research round.

Do not search for substitute projects, customers, founder identities, or repository URLs.

Do not stop implementation merely because real content values are missing. Build the safe implementation and record the blockers.

Do not deploy to production, contact Telegram users, or configure external automation without explicit authorization.

2\. Information architecture

2.1 Required routes

Implement the following route registry.



Route	Page

/	Homepage

/solutions	Four solution directions

/local-ai	Local / Private AI and AI Model Engineering

/business	Business audience

/education	Education audience

/public-sector	Public institutions audience

/lab	Project catalogue

/lab/document-processing	UniBooks Translator

/lab/voice-to-ticket	AI Voice Bug Reporting System

/lab/local-llm-benchmark	Auto LLM Benchmark

/lab/llm-evaluation	QA-LLM-Lab

/lab/local-transcription	Local transcription

/lab/calendar-assistant	Calendar assistant

/lab/jira-reporting	Jira reporting

/approach	Engineering approach

/about	About the laboratory

/contact	Discuss a task

/privacy	Factual website data-processing information

System 404	Localized not-found experience

Generate Ukrainian and Russian equivalents from the same registry:



text

Copy

/solutions

/uk/solutions

/ru/solutions



/lab/document-processing

/uk/lab/document-processing

/ru/lab/document-processing

Locale home routes:



text

Copy

/

/uk/

/ru/

Do not create /en/.



Keep non-home slugs identical across languages. Use one consistent canonical trailing-slash policy: locale home routes end with /; other canonical page paths do not.



Validate that the final hosting configuration supports the chosen clean URLs.



2.2 Main navigation

Desktop order:



text

Copy

AI Laboratory

Solutions

Local AI

For whom

&#x20; Business

&#x20; Education

&#x20; Public institutions

Projects

About

Discuss a task

Language selector

Logo links to the current language’s homepage.

“Discuss a task” links to the localized /contact.

“For whom” is an accessible disclosure, not hover-only navigation.

“Approach” is linked from process sections, solution pages, and the footer.

Provide breadcrumbs on internal pages.

Indicate the active section with more than color alone.

Do not add Fine-tuning, GPU, GitHub, Blog, or Platform as primary navigation items.



2.3 Footer

Use four groups:



Brand, short positioning, and method.

Solutions and Local AI.

Business, Education, Public institutions.

Projects, Approach, About, Contact, Privacy.

Show GitHub and other external contacts only when actual URLs are supplied.



Never render empty or fabricated links.



3\. Multilingual architecture

3.1 Required languages

ts

Copy

type Locale = "en" | "uk" | "ru";

type Localized<T> = Record<Locale, T>;

English is the default public language. Ukrainian and Russian are full localized versions, not abbreviated translations.



3.2 Content separation

Separate:



shared factual data;

localized editorial copy;

rendering components;

route generation;

configuration.

Store numbers, project IDs, maturity states, source references, and technical identifiers once.



Localize their labels and explanations.



Do not copy entire page implementations into three language folders.



3.3 Localize all user-facing strings

Include:



navigation;

headings and body copy;

buttons;

project cards and case studies;

maturity and evidence labels;

FAQ;

metadata;

diagram labels;

table headings;

accessibility names;

empty states;

missing-configuration messages;

404 content;

future form labels and validation messages when that feature is introduced.

Do not leave hidden English strings in Ukrainian or Russian accessibility attributes.



Technical terms and project names may remain in English where appropriate:



Local AI, Private AI, RAG, LLM, LoRA, QLoRA, AI Evaluation, AI Model Engineering, Build → Test → Measure → Automate.



Produce natural Ukrainian and Russian translations. Do not merely transliterate English copy.



3.4 Language switching

The language selector must:



remain visible in the header on desktop and mobile;

display English, Українська, Русский;

identify the current language;

work with keyboard and screen readers;

use actual links to equivalent localized pages;

preserve the current project or page;

preserve a valid catalogue category and existing section anchor where appropriate;

avoid forwarding arbitrary query parameters;

avoid flags as the only language identifiers.

Do not automatically redirect visitors based on browser language or location.



No translation API or runtime translation service is required.



3.5 Missing translations

Treat missing required translation keys as validation failures.



Do not silently fall back to English in production.



The literal placeholder TODO — REAL VALUE REQUIRED may remain unchanged across locales, with localized surrounding explanatory text.



4\. Page-by-page requirements

4.1 Homepage

Preserve this exact section order:



Header

Hero

Solution directions

Featured projects

Local / Private AI

Audiences

Evidence

Process

About

FAQ

Final CTA

Footer

Keep summaries concise. Link to detailed pages rather than reproducing them on the homepage.



Hero

Use this exact English copy:



Eyebrow



Practical AI engineering



H1



AI for real processes. With measurable results.



Supporting text



AI Laboratory builds and tests prototypes for automation, document processing and local AI. We start with one concrete task, measure the result and determine what is needed for the next stage.



Audience



For small and medium-sized businesses, education and public institutions.



Primary button



Discuss a task



Links to localized /contact.



Secondary button



Explore projects



Links to localized /lab.



Visible Telegram contact row



Discuss a task in Telegram



Use the shared Telegram CTA component and its configured/unconfigured behavior.



Display the temporary bot identity as secondary text:



TG AI Studio Bot



Method



Build → Test → Measure → Automate



Use a static conceptual diagram:



text

Copy

Task and data → AI / automation → Verification → Result

Label it as a working principle, not an implemented customer system.



Desktop: text approximately 7 columns, diagram 5.



Mobile: copy and CTAs before the diagram.



Do not add animated counters, model rankings, GPU specifications, live logs, or uptime indicators.



Solution directions

Heading:



Start with a process, not a model.



Four cards, numbered 01–04:



AI Process Automation \& Integrations

Documents \& Speech

Local AI Model Selection \& Benchmarking

AI System Evaluation

Each card contains:



a recognizable organizational problem;

practical value;

the bounded prototype or output;

a link to the appropriate /solutions anchor.

Explain business value before technical implementation.



Featured projects

Show these four projects in this order:



UniBooks Translator

AI Voice Bug Reporting System

Auto LLM Benchmark

QA-LLM-Lab

Introductory copy must identify them as the laboratory’s engineering projects, prototypes, and experiments—not customer success stories.



Use a 2×2 desktop grid and one column on small screens.



Each card includes:



project type;

category;

outcome-oriented title;

short problem and implementation summary;

a compact, correctly labeled process sequence;

a factual result or available-materials summary;

original project name;

one primary link to its case study.

Do not compress all seven case-study questions into the card. Answer them fully on the detail page.



Local / Private AI

This may be the homepage’s primary dark section.



Explain:



why local processing may be considered;

that placement depends on task and data requirements;

what is supported by current projects;

what remains a development or R\&D direction.

Use a conceptual diagram such as:



text

Copy

Data → Local model → Evaluation → Result

Label the diagram as illustrative unless it describes a documented implementation.



Separate local and external components. Include an “unknown / not documented” state where necessary.



Link to:



/local-ai;

local LLM benchmark;

local transcription.

Never imply that laboratory infrastructure, on-premise deployment, or a fully private end-to-end workflow already exists.



Audiences

Three visible cards, not tabs:



Business;

Education;

Public institutions.

Give Business visual priority.



Use concrete scenarios and include a concise disclosure that these are possible applications, not claims of completed deployments for those organizations.



Evidence

Two panels:



QA-LLM-Lab.

Auto LLM Benchmark.

Use the metric records and publication rules defined below.



In preview, supplied figures may appear with a prominent localized label:



Owner-supplied results; source verification pending.



Expose missing source, date, and conditions as TODOs in the relevant details.



In production, show numerical evidence only when its publication requirements pass. Otherwise use a non-numerical explanation of the evaluation method and link to the eligible case study.



Do not invent charts to fill empty space.



Process

Heading:



Build → Test → Measure → Automate



Four steps:



Build: create a bounded prototype for one task.

Test: check normal cases, failures, and edge conditions.

Measure: compare agreed measures against the starting process.

Automate: integrate a verified scenario within agreed boundaries.

Above:



Before implementation: define the task, data and success criteria.



Below:



Moving to a pilot is a separate decision based on the results.



Link to /approach.



Do not present automation or production deployment as an automatic outcome.



About

Short, typography-led section covering:



practical engineering;

automation;

local experiments;

evaluation as a discipline;

development toward Local / Private AI Model Engineering.

Do not claim a team size, founder identity, location, career history, or years of experience without supplied evidence.



FAQ

Use these five topics, in this order:



Can we start with one small process?

Do we need to choose a model or technology first?

Is cloud AI required?

Is fine-tuning already available?

How are cost and timing determined?

Answers must reflect:



bounded initial scope;

no requirement for technical terminology;

architecture-dependent hosting;

LoRA / QLoRA as planned R\&D;

pricing and timing determined after scope clarification.

Do not invent prices, deadlines, free-consultation offers, or response-time promises.



Use independently expandable questions, closed by default.



Final CTA

Heading:



Start with one process.



Supporting text:



Describe what is currently done manually, what data is involved and what result you would like to achieve. You do not need a technical specification or a chosen model to begin.



Primary action:



Discuss a task in Telegram



Secondary link:



What to include in your message



Links to localized /contact.



Include a localized warning not to send confidential documents, credentials, or third-party personal information in an initial message.



4.2 /solutions

Implement this order:



Hero: solutions for a concrete process.

Four anchored solution directions.

Engagement formats.

Tangible deliverables.

Capability boundaries.

Three related projects.

FAQ.

CTA.

Required stable anchor IDs:



text

Copy

automation

documents

model-selection

evaluation

Use this structure for each direction:



text

Copy

When useful

What we would test

What the prototype can deliver

What inputs and access are needed

Relevant engineering project

Discuss a task

Engagement formats:



Task assessment.

Verifiable prototype.

Pilot and integration, conditional on prototype results.

A valid outcome of assessment is that normal automation is sufficient and AI is unnecessary.



Potential deliverables:



solution diagram;

bounded working scenario;

documented configuration;

test examples;

evaluation report;

known limitations;

recommendation to continue, revise, or stop.

Do not promise any CRM integration, arbitrary file support, autonomous agents, enterprise operations, or production readiness.



Related projects:



UniBooks Translator;

AI Voice Bug Reporting System;

Auto LLM Benchmark.

4.3 /local-ai

Implement:



Hero.

Capabilities supported by projects.

When local processing may be relevant.

Cloud / Local / Hybrid comparison.

Definitions of Local, Private, On-premise, and laboratory infrastructure.

Approach-selection decision guide.

AI Model Engineering chain with maturity labels.

Benchmark and transcription evidence.

Developing and planned directions.

FAQ.

CTA.

Required distinctions

Explain:



Cloud AI: processing through an external provider.

Local AI: processing in a specified local environment.

Private AI: an architecture involving access, isolation, storage, and data-transfer controls; not a synonym for local execution.

On-premise: deployment within the organization’s infrastructure.

Laboratory infrastructure: a separate environment, not automatically the organization’s environment.

State that:



local execution alone does not make an entire workflow private;

Telegram, Google services, external AI APIs, and other remote systems remain external components;

local transcription does not prove local downstream LLM processing;

locally benchmarked models do not prove that an evaluator ran locally;

local is not inherently cheaper, faster, or more accurate;

laboratory experimentation does not establish production hosting capability.

Decision guide

Need	First approach to evaluate

Stable output format	Prompting, examples, configuration, schema validation

Changing internal knowledge	Retrieval / RAG

Actions in organizational systems	Tools, APIs, bounded agent workflows

Domain-specific behavior	Evaluate whether adaptation is necessary

Persistent behavior change, sufficient suitable data, simpler approaches insufficient	Fine-tuning experiment

Deterministic task	Normal automation

These approaches can be combined. Do not depict fine-tuning as the inevitable destination.



AI Model Engineering chain

Preserve this order:



Model Selection → Local Deployment → Configuration \& Optimization → Adaptation → Fine-tuning → Evaluation → Integration → Deployment



Render as a readable vertical list or responsive structured sequence.



Attach scope and maturity to every stage:



Stage	Public interpretation

Model Selection	Supported by local comparison experiments

Local Deployment	Laboratory-scale local execution, not production hosting

Configuration \& Optimization	Measurement supported; systematic optimization is developing

Adaptation	Developing direction

Fine-tuning	Planned LoRA / QLoRA R\&D

Evaluation	Supported by projects; no fine-tuning before/after results claimed

Integration	Prototype experience; boundaries depend on each project

Deployment	Future operational stage requiring separate assessment

Fine-tuning subsection

Clearly state:



Planned AI Model Engineering / R\&D direction—not a currently launched standard commercial service.



Before a future experiment, require:



measured baseline;

specific target deficiency;

justification against simpler alternatives;

authorized, suitable data;

separate training, validation, and test data;

improvement and regression criteria;

resource and deployment considerations;

evaluation of overall complexity and cost.

No pricing table, purchase CTA, or standalone commercial fine-tuning page.



4.4 Audience pages

Use a shared audience template, but substantively different content.



Shared structure:



Context-specific hero.

Three scenario groups.

First-pilot requirements and constraints.

Applicable current capabilities.

Developing directions, separately labeled.

Two relevant engineering projects.

First-stage deliverables.

CTA.

Required disclosure:



Possible applications, not descriptions of completed customer deployments.



Present suggested measurements as “What we would measure”, not achieved results.



/business

Scenario groups:



Document processing and routing.

Workflow automation and integration with existing systems.

Voice-to-task preparation.

Possible measures:



processing time;

completeness;

correctness;

manual corrections;

employee acceptance of drafts.

Related projects:



AI Voice Bug Reporting System;

Jira reporting.

/education

Cover administrative documents, educational materials, transcription, and internal knowledge.



Three groups:



Transforming or translating permitted educational and administrative materials.

Transcribing lectures or meetings for human review.

Internal knowledge assistance—explicitly a developing RAG direction.

Constraints:



permitted materials;

anonymized or synthetic prototype data where possible;

staff review;

no claims of automated student assessment;

no collection of information about children through the public website.

Related projects:



UniBooks Translator;

local transcription.

/public-sector

Cover administrative processes through:



Preliminary document triage and draft summaries.

Processing text collections.

Internal knowledge assistance—developing direction.

Pilot requirements:



define permitted data;

identify processing location;

agree access;

preserve employee responsibility;

plan error handling and logging;

start with a noncritical process.

Do not imply procurement eligibility, legal compliance, certifications, or completed institutional deployments.



Related projects:



UniBooks Translator;

Auto LLM Benchmark.

4.5 /lab

Implement a curated project catalogue, not a GitHub browser.



Categories:



All;

Process automation;

Documents \& speech;

Local models;

AI evaluation.

Requirements:



up to two categories per project;

one active filter;

editorial ordering;

no search or pagination for seven projects;

category stored in a validated query parameter;

clean localized catalogue URL used as canonical;

filter changes announced accessibly;

preserve filter and scroll position when returning from a case study;

prefer native history restoration; use minimal session storage only if necessary for non-sensitive UI state;

all eligible cards remain available without JavaScript;

explain filter limitations in a no-JavaScript fallback if needed.

Production counts must use published projects only.



Preview may include drafts, but must clearly distinguish them.



4.6 All seven case studies

Use one reusable template.



Required sections:



Hero: readable title, original project name, category, type, status, real dates when available.

Summary: problem, what was built, what is supported by evidence.

Potential organizational application: clearly separate from actual project results.

Scope and inputs: boundaries and exclusions.

Architecture: nodes, flows, local/external/unknown boundaries.

Implementation: documented technologies and engineering decisions.

Verification: scenarios, criteria, configuration, and run conditions.

Results: measurements, interpretation, and what the result proves.

Limitations: visible, not hidden in an accordion.

Evidence: actual reports, configurations, repositories, workflows, and examples.

What a pilot would require: prospective work, not completed features.

Related projects and contextual CTA.

Provide a desktop contents list and a compact mobile contents disclosure.



Every case study must answer:



What problem?

What was built?

How does it work?

How was it verified?

What result was obtained?

What does that result actually prove?

What are its limitations?

When an answer is unsupported, show a TODO in preview. Do not fill the gap with plausible implementation details.



4.7 /approach

Implement:



task definition and baseline;

Build / Test / Measure / Automate;

ordinary, error, and edge-case testing;

human review where relevant;

suggested prototype report contents;

criteria for continuing, revising, or stopping;

separate requirements for a pilot;

contextual CTA.

Label an example report structure as a template, not an actual completed report.



Do not claim every historical project implemented every proposed practice.



4.8 /about

Present:



the laboratory’s approved purpose;

practical engineering principles;

automation and evaluation foundations;

current, developing, and planned capabilities;

selected supporting tools and projects.

Founder name, biography, location, photograph, team size, and legal identity:



TODO — REAL VALUE REQUIRED



Do not generate people, biographies, team photographs, or office imagery.



Supporting project mentions may include:



AI\_API\_Desk;

Telegram bot testing framework;

FloriaShopTest.

Keep these secondary. Do not allow the page to become a QA portfolio.



4.9 /contact

V1 is a contact information page, not a form.



Include:



“Start with one process” heading;

an explanation that technical terminology is unnecessary;

a prominent Telegram CTA;

temporary bot identity;

a short message checklist:

what happens now;

which inputs are involved;

desired output;

systems involved;

known data or hosting constraints.

Warn against sending credentials, confidential documents, third-party personal information, or student information in an initial message.



Do not render:



email fields;

submit buttons;

upload controls;

form success states;

fake alternative contacts.

If Telegram is not configured, render the honest unavailable state described in section 12.



4.10 /privacy

Implement the localized page structure without inventing legal text.



Known implementation facts may be described accurately, such as the absence of a website contact form in V1 and the fact that Telegram is an external destination.



Unknown values require TODOs:



site operator;

legal identity, if applicable;

privacy contact;

hosting provider and actual logging practices;

actual processors or recipients;

retention;

legal basis and any required consent language;

applicable policy wording.

Do not claim that a static website processes no data or creates no logs.



Do not invent GDPR compliance, cookie practices, legal jurisdiction, or approved policy dates.



Require owner review before production publication.



4.11 404

Provide localized:



not-found heading;

brief explanation;

links to Home, Solutions, and Projects;

language navigation.

Use a genuine 404 response where the hosting platform permits.



Document hosting-specific 404 configuration if the deployment target is unknown.



Do not add a marketing form or decorative game.



5\. Reusable components

Implement a small, coherent component set. Combine trivial presentational components where appropriate.



Required responsibilities:



SiteLayout: language, metadata, skip link, header, main, footer.

Header / MobileNavigation: responsive navigation and accessible disclosure behavior.

LanguageSwitcher: equivalent-route links.

Breadcrumbs.

Button / ActionLink: consistent action styling without invalid semantics.

TelegramCTA: single source of configured/unconfigured contact behavior.

SectionHeading.

SolutionCard.

ProjectCard.

AudienceCard / AudiencePageTemplate.

CapabilityStatus: visible textual maturity label.

EvidencePanel / MetricTable: contextual numerical results.

PassFailSummary: absolute passed and failed values.

ArchitectureDiagram: data-driven nodes, connections, and boundaries.

CaseStudyTemplate.

FAQ: native disclosure preferred.

CallToAction.

MissingValue: consistent TODO presentation in preview.

Avoid a component for every paragraph or decorative span.



Do not place a link inside another link. A project card must have one clear primary destination.



6\. General content model and configuration

6.1 Configuration

Centralize configurable values.



Use a structure equivalent to:



ts

Copy

export const TODO = "TODO — REAL VALUE REQUIRED";



export const siteConfig = {

&#x20; brandName: "AI Laboratory",

&#x20; defaultLocale: "en",

&#x20; locales: \["en", "uk", "ru"],



&#x20; siteUrl: null,       // TODO — REAL VALUE REQUIRED

&#x20; telegramUrl: null,   // TODO — REAL VALUE REQUIRED

&#x20; telegramLabel: "TG AI Studio Bot",

&#x20; githubUrl: null,     // TODO — REAL VALUE REQUIRED



&#x20; mode: "preview",



&#x20; features: {

&#x20;   contactForm: false,

&#x20;   analytics: false,

&#x20; },

} as const;

Use suitable environment variables where appropriate, but keep a single validated configuration interface.



Do not treat a preview origin or localhost as the production canonical domain.



Do not put the TODO string into an actual URL attribute.



6.2 Content organization

A suitable initial structure is:



text

Copy

src/

&#x20; config/

&#x20;   site.ts



&#x20; content/

&#x20;   locales/

&#x20;     en.ts

&#x20;     uk.ts

&#x20;     ru.ts

&#x20;   projects/

&#x20;     document-processing.ts

&#x20;     voice-to-ticket.ts

&#x20;     local-llm-benchmark.ts

&#x20;     llm-evaluation.ts

&#x20;     local-transcription.ts

&#x20;     calendar-assistant.ts

&#x20;     jira-reporting.ts

&#x20;   evidence.ts

&#x20;   capabilities.ts



&#x20; lib/

&#x20;   routes.ts

&#x20;   i18n.ts

&#x20;   content-validation.ts



&#x20; components/

&#x20; layouts/

&#x20; pages/

&#x20; styles/

&#x20;   tokens.css

&#x20;   global.css



public/

&#x20; fonts/

&#x20; evidence/



scripts/

&#x20; validate-content.\*



tests/



docs/

&#x20; content-blockers.md

&#x20; future-contact.md



README.md

Adapt this to an existing suitable repository. Do not create duplicate systems merely to match the example.



Store localized page copy outside visual components.



6.3 Maturity model

Maintain these three categories separately from editorial publication status.



Confirmed by projects



AI workflow automation;

document processing;

local transcription;

local LLM experimentation;

model comparison;

AI evaluation;

API-based AI tools.

Developing



RAG;

systematic inference optimization;

specialized datasets;

domain adaptation.

Planned / R\&D



LoRA / QLoRA fine-tuning;

production local model deployment;

dedicated Private AI infrastructure;

supported local model API.

“Developing” means a development direction. Do not change it to “actively being implemented” without evidence.



“Confirmed by projects” does not mean deployed for customers.



Associate capability claims with the relevant project records and their evidence status.



7\. Project, metric, and evidence data models

7.1 Separate four different concepts

Do not conflate:



Project type: experiment, prototype, verified pilot, verified production.

Capability maturity: confirmed, developing, planned.

Editorial status: draft or published.

Evidence verification: owner-reported or source-reviewed.

A published laboratory experiment is not a production service.



7.2 Project model

Use typed structured records with at least:



ts

Copy

type Project = {

&#x20; id: string;

&#x20; slug: string;

&#x20; originalName: string;



&#x20; categories: string\[];

&#x20; featuredOrder: number | null;



&#x20; projectType:

&#x20;   | "laboratory-experiment"

&#x20;   | "engineering-prototype"

&#x20;   | "client-pilot"

&#x20;   | "production-system";



&#x20; capabilityMaturity: "confirmed" | "developing" | "planned";

&#x20; publicationStatus: "draft" | "published";



&#x20; sourceRepository: string | null;



&#x20; dates: {

&#x20;   experiment: string | null;

&#x20;   contentUpdated: string | null;

&#x20; };



&#x20; copy: Localized<{

&#x20;   title: string;

&#x20;   positioning: string;

&#x20;   summary: string;

&#x20;   potentialValue: string;



&#x20;   context: {

&#x20;     problem: string | null;

&#x20;     inputs: string\[];

&#x20;     scope: string\[];

&#x20;     exclusions: string\[];

&#x20;   };



&#x20;   implementation: {

&#x20;     summary: string | null;

&#x20;     technologies: string\[];

&#x20;     decisions: string\[];

&#x20;   };



&#x20;   verification: {

&#x20;     summary: string | null;

&#x20;     scenarios: string\[];

&#x20;     criteria: string\[];

&#x20;     conditions: string\[];

&#x20;   };



&#x20;   results: {

&#x20;     summary: string | null;

&#x20;     whatItProves: string\[];

&#x20;     whatItDoesNotProve: string\[];

&#x20;   };



&#x20;   limitations: string\[];

&#x20;   pilotRequirements: string\[];

&#x20; }>;



&#x20; architecture: Architecture | null;



&#x20; metricIds: string\[];

&#x20; evidenceIds: string\[];

&#x20; relatedProjectIds: string\[];



&#x20; missingFields: string\[];

};

Keep the implementation practical. Extend only where actual content requires it.



Use null for unknown values and render the required placeholder where appropriate. Never substitute zero, an empty fake object, or the current date.



7.3 Architecture model

Include:



nodes;

edges;

localized labels;

component boundary:

local;

external;

unknown;

implementation status:

documented implementation;

conceptual illustration;

proposed addition.

An unknown component location must not be rendered as local.



A proposed human-review step must not appear as an already implemented step.



Use text-based HTML/CSS or lightweight SVG. No diagramming framework is required.



7.4 Metric model

Each metric must support:



ts

Copy

type Metric = {

&#x20; id: string;

&#x20; projectId: string;



&#x20; runKey: string; // Internal content key, not a fabricated external run ID

&#x20; externalRunId: string | null;



&#x20; name: Localized<string>;

&#x20; value: number | null;

&#x20; unit: Localized<string>;

&#x20; definition: Localized<string>;



&#x20; date: string | null;

&#x20; conditions: Localized<string\[]> | null;

&#x20; sourceIds: string\[];



&#x20; interpretationLimit: Localized<string>;

};

Keep separate runs separate. Do not aggregate metrics from unrelated projects or testing tools.



7.5 Evidence model

Include:



internal ID;

localized title;

evidence type;

source URL or local artifact path;

date;

version or commit, if applicable;

provenance;

verification state;

what the material supports;

interpretation limits.

Valid provenance can distinguish:



owner-supplied brief;

repository material;

report;

configuration;

workflow export;

real screenshot;

anonymized example.

A brief is a known source of an owner-reported claim. It is not a substitute for reviewing the underlying report.



Do not create report-download or repository buttons when the real resource is missing.



7.6 Seed the seven projects

Use only these supplied facts as initial content.



Route	Original project	Permitted starting description

document-processing	UniBooks-Translator	Long-document processing and translation, with structure preservation as the project’s stated objective

voice-to-ticket	ai-voice-bug-reporting-system	Voice input transformed into a structured bug-report workflow

local-llm-benchmark	auto-llm-benchmark	Comparison of local models using supplied scenarios and benchmark records

llm-evaluation	QA-LLM-Lab	Functional and adversarial LLM evaluation using the supplied Promptfoo and Garak results

local-transcription	whisper-batch-transcriber	Local transcription of long audio recordings using the supplied Whisper project context

calendar-assistant	telegram-calendar-ai	Telegram-based calendar-assistance prototype

jira-reporting	jira-to-google-sheets-n8n-auto	Workflow involving Jira, n8n, and Google Sheets for reporting-data preparation

Important boundaries:



Do not claim measured document fidelity without measurements.

Do not broaden bug reporting into an already completed universal ticketing product.

Do not assume a ticket destination or calendar provider.

Do not assume downstream transcription processing is local.

Do not invent file formats, model names, runtime versions, APIs, permission scopes, retries, or verification procedures.

For Jira reporting, Telegram, and Google components, show known external services as external.

Missing implementation details remain TODOs.

7.7 Seed the supplied numerical evidence

QA-LLM-Lab: Promptfoo

60 tests;

48 passed;

12 failed.

Render passed and failed together.



Do not describe 48/60 as general model quality, accuracy, or safety.



QA-LLM-Lab: Garak

1,038 attempts;

DAN group score: 0.121;

promptinject.HijackLongPrompt: 0.977.

Preserve the identifiers and supplied raw values.



Do not:



call attempts vulnerabilities;

call attempts blocked attacks;

infer unique findings;

convert the scores into safety percentages;

infer score direction, denominator, or meaning without the report and configuration;

claim any failures were fixed.

Auto LLM Benchmark

6 local models;

10 scenarios;

60 benchmark rows.

Possible measurement dimensions:



latency;

tokens/sec;

quality evaluation.

No actual performance values or rankings have been supplied.



Do not draw a speed chart or ranking.



For future comparative values, require the experiment’s model versions, runtime, hardware, configuration, measurement definitions, repetitions, evaluation method, date, and source results.



Telegram bot testing

40 tests;

27 passed;

13 failed.

Keep this in a separate supporting-project/run record. Do not merge it with QA-LLM-Lab.



FloriaShopTest

92 requests;

449 assertions.

Do not call these 449 test cases or claim all passed.



7.8 Evidence display rules

For every displayed numerical result:



identify the project and run;

display the unit;

explain what was measured;

provide the source status;

show real date and conditions where supplied;

state the interpretation limit.

Use no decorative count-up animations.



Prefer absolute values to derived percentages.



For LLM-as-a-Judge results, require evaluator identity, criteria, scale, and human-review status before presenting an interpretation.



8\. Visual design system

Implement Paper / Graphite / Deep Teal.



Use one light theme. Do not build a theme switcher.



8.1 Exact palette

Define CSS custom properties using these values:



Token purpose	Value

Page background	#F6F7F4

Card surface	#FFFFFF

Secondary surface	#EBEFED

Primary text	#17252B

Secondary text	#526268

Decorative border	#D7DEDB

Significant control border	#71827E

Primary accent	#09675E

Accent hover	#07534C

Dark surface	#111F26

Text on dark	#F3F6F4

Secondary text on dark	#B8C7C5

Light accent on dark	#9CE6CB

Passed / success	#146847

Failed / error	#B83C35

Developing / warning	#8A520D

Informational status	#235C87

Focus on light	#175CD3

Validate actual color combinations. Do not assume that every token works on every background.



Select a contrasting focus treatment on dark surfaces using the approved palette.



8.2 Typography

Self-host:



IBM Plex Sans: 400, 500, 600;

IBM Plex Mono: 400, 500.

Include Latin and Cyrillic coverage and the font license.



Use font-display: swap.



If font assets are unavailable, use an honest system-font fallback during development and record the missing approved assets. Do not silently substitute another branded typeface.



Element	Desktop	Mobile

H1	56 / 62 px	34 / 40 px

H2	36 / 44 px	28 / 34 px

H3	24 / 32 px	22 / 28 px

Lead	20 / 30 px	18 / 28 px

Body	18 / 28 px	16 / 26 px

Labels	14 / 20 px	14 / 20 px

Main metrics	40 / 46 px	32 / 38 px

Tablet H1: approximately 44 / 50 px.



Use fluid sizing where appropriate.



Reading width: approximately 65–72 characters.

Case-study prose: approximately 760 px maximum.

Mono: metrics, identifiers, units, short technical labels.

Use tabular numerals for metrics.

Do not truncate important titles.

8.3 Layout and spacing

Maximum container: 1216 px.



Spacing scale:



text

Copy

4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128 px

Default section spacing:



desktop: 96 px;

tablet: 64 px;

mobile: 48 px.

Use tighter spacing for short adjacent editorial sections where needed, without flattening hierarchy.



Cards:



12 px radius;

1 px border;

24 px padding desktop;

20 px mobile;

no heavy permanent shadows;

no lift or rotation effects.

Buttons:



48 px preferred height;

8 px radius;

primary teal fill;

clear secondary border;

visible hover, pressed, focus, and disabled states.

Status labels:



compact;

4 px radius;

visible text;

not decorative oversized pills.

8.4 Logo and assets

Create a simple SVG mark:



four corner elements around a square;

paired with AI Laboratory;

no flask, brain, robot, or atom.

Use the mark for the favicon.



Do not imply trademark registration.



Use real project screenshots only if supplied and reviewed for secrets or personal data.



Do not generate fake dashboards, telemetry, server monitoring, people, or customer interfaces.



8.5 Diagrams and motion

Diagrams:



maximum approximately 5–7 nodes per level;

clear labels;

explicit local/external boundaries;

conceptual and planned states visibly labeled;

readable text alternative;

vertical mobile layout.

Motion:



short interaction transitions only;

approximately 120–180 ms for hover;

approximately 200 ms for panels;

no parallax;

no scroll-jacking;

no reveal animations that hide content until JavaScript runs;

respect reduced motion.

9\. Responsive behavior

Breakpoints:



Width	Layout

Below 768 px	Mobile, 4-column foundation

768–1199 px	Tablet, 8-column foundation

1200 px and above	Desktop, 12-column foundation

Gutters:



narrow mobile: 16 px;

normal mobile: 20 px;

tablet and desktop: at least 32 px outside the centered container where space allows.

Required compositions:



hero: 7/5 desktop, stacked mobile;

solutions: 2×2 desktop, single column mobile;

projects: 2×2 desktop, single column mobile;

audiences: 6/3/3 desktop;

case studies: contents/material approximately 3/9 desktop;

contact: introduction/contact actions split desktop, stacked mobile.

Header:



72 px desktop;

64 px mobile/tablet;

opaque;

sticky;

bottom border;

no glassmorphism.

Below 1200 px, use mobile navigation.



Mobile navigation must include:



all primary routes;

audience links;

“Discuss a task”;

prominent Telegram CTA;

accessible language controls.

Keep a language control visible before opening the menu.



Do not add a fixed bottom CTA bar.



Test widths:



320, 375, 768, 1024, 1440, 1920 px.



At all widths:



no page-level horizontal overflow;

no clipped headings or statuses;

no unreadably scaled diagrams;

tables may scroll inside labeled containers;

translated text may wrap naturally;

sticky elements must not cover focused controls or anchor targets.

10\. Accessibility

Target WCAG 2.2 AA principles. Do not claim certification.



Implement:



semantic landmarks;

one H1 per page;

logical heading order;

a visible-on-focus skip link;

keyboard navigation;

visible focus;

sufficient text and control contrast;

descriptive links;

meaningful alt text for actual images;

empty alt text or aria-hidden for decorative graphics;

text labels for statuses and diagram boundaries;

reduced-motion support.

Use at least 44×44 px targets for principal interactive controls.



Navigation behavior:



click/tap and keyboard activation;

no hover-only information;

Escape closes open menus;

mobile modal navigation traps focus while open;

closing restores focus to its trigger;

background content is not keyboard-accessible while the modal is active;

a usable navigation fallback exists without JavaScript.

FAQ:



use native <details> / <summary> where suitable;

allow multiple open questions.

Metrics:



actual text accompanies charts;

passed and failed states are distinguishable without color;

tables have headers and captions where useful.

Anchors:



use appropriate scroll offset for the sticky header.

Language selector:



correctly label languages;

identify the selected language;

avoid inaccessible custom dropdown behavior.

Perform both automated checks and manual keyboard review. Automated scans alone do not establish conformance.



11\. SEO and indexability

11.1 Metadata

For every publishable localized page, implement:



unique localized title;

unique localized description;

one H1;

semantic headings;

clean URL;

canonical URL;

language alternatives;

appropriate social metadata using real brand assets.

Do not fabricate ratings, addresses, founder information, or publication dates in structured data.



If structured data is added, keep it minimal and factually supported.



11.2 Canonical and language rules

Each localized page is self-canonical.



Example relationship:



text

Copy

English page → canonical to English page

Ukrainian page → canonical to Ukrainian page

Russian page → canonical to Russian page

Do not canonicalize Ukrainian and Russian pages to English.



For each eligible page, include reciprocal alternatives for:



text

Copy

en

uk

ru

x-default

x-default points to the English equivalent.



Set document language correctly:



html

Copy

<html lang="en">

<html lang="uk">

<html lang="ru">

11.3 Sitemap and robots

Include only published, indexable routes in the production sitemap.

Exclude drafts, 404 pages, and catalogue filter variants.

Filtered catalogue URLs canonicalize to the localized unfiltered catalogue.

Preview deployments must be noindex and excluded from production sitemaps.

Preview robots rules must discourage indexing; do not describe these as access control.

Do not generate production canonical URLs until the real domain is configured.

11.4 Print

Make case studies and /approach printable:



hide navigation and CTA controls;

retain headings, status, dates, results, limitations, and source references;

avoid clipped tables and diagrams;

use readable paper backgrounds.

12\. Telegram CTA

Implement one shared Telegram CTA component.



Required label:



Discuss a task in Telegram



Temporary identity:



TG AI Studio Bot



Required placements:



hero contact row;

final CTA;

mobile navigation;

/contact;

appropriate contextual CTA sections.

Configured state

When a valid real Telegram URL is supplied:



render a genuine link;

use the configured URL without guessing or altering the identity;

identify Telegram as an external destination;

apply appropriate external-link behavior;

if opening a new tab, communicate that and use safe link attributes.

Unconfigured state

When telegramUrl is missing:



do not render href="#";

do not invent a t.me address;

do not create a fake working button;

show a visibly unavailable action and localized explanation;

show TODO — REAL VALUE REQUIRED in preview;

keep the general /contact route available;

do not claim that contact functionality is complete.

The missing Telegram URL is a production-release blocker.



Do not place credentials, user messages, confidential text, or personal data into Telegram URLs.



13\. Future contact form and n8n integration

Do not implement the integration in V1.



Do not add:



an API route;

a custom backend;

a webhook request;

a hidden working form;

a simulated success state;

n8n credentials;

a Google Sheets or CRM connection.

Prepare a clean extension point on /contact and document the future integration in docs/future-contact.md.



Planned flow:



text

Copy

Website

&#x20; ↓

Contact form

&#x20; ↓

n8n webhook

&#x20; ↓

Validation / processing

&#x20; ↓

Telegram notification

&#x20; ↓

Optional Google Sheets / CRM / email

&#x20; ↓

Optional AI classification

Document a future payload containing only necessary fields, such as:



reply email;

optional name;

optional organization;

task description;

topic;

optional organization type;

optional systems and hosting requirements;

locale;

source page.

Future requirements:



accessible labels and localized validation;

server-side validation in the receiving system;

appropriate abuse protection and rate limiting outside the static frontend;

no secret embedded in frontend code;

do not treat a public webhook URL as a secret;

success only after confirmed successful processing;

field, network, server, and rate-limit error states;

preserve entered text in current page memory after failure;

no automatic persistent storage of personal data;

no PII in analytics or query strings;

no file upload;

reviewed privacy information before enabling submission.

A feature flag may remain false. Do not build unused form infrastructure merely to demonstrate the future architecture.



14\. Technical constraints and implementation structure

14.1 Stack

If the repository already contains a suitable static-first implementation, retain it.



If starting from an empty repository, use:



Astro;

TypeScript;

plain CSS with design tokens;

minimal vanilla JavaScript.

Use static generation and reusable localized templates.



Do not add React, a global state library, a CMS, or a UI framework unless an existing implementation genuinely requires it.



Use the repository’s package manager and lockfile.



Do not claim a particular dependency version is “latest” without checking. Exact framework versions are implementation details, not content to invent.



14.2 Static-first behavior

The primary content must arrive as HTML.



JavaScript should enhance:



mobile navigation;

accessible disclosures where needed;

language-context preservation;

catalogue filtering;

optional UI-state restoration.

Do not require client-side fetching to reveal the main page copy or case studies.



Use one route registry and shared rendering components for all locales.



14.3 Performance

Target:



LCP ≤ 2.5 s;

INP ≤ 200 ms;

CLS ≤ 0.1.

Treat these as targets, not achieved claims.



Before launch, run laboratory checks and report the conditions. Do not equate laboratory results with verified field performance.



Where field data later exists, assess the 75th percentile separately for mobile and desktop.



Implementation requirements:



self-hosted fonts;

sensible font loading;

explicit image dimensions;

lazy-load below-the-fold images;

minimal browser JavaScript;

no WebGL;

no background video;

no heavy 3D;

no charting library for simple count summaries;

no unnecessary animation packages.

14.4 Analytics

Do not add analytics, advertising pixels, session replay, or third-party tracking in V1.



Do not add a cookie banner without an actual implementation-related need and approved wording.



Future analytics must never receive form contents or personal data.



14.5 Required commands

Provide working equivalents of:



text

Copy

dev

build

preview

check

test

check:release

check should validate types, content structure, localization, and internal references.



check:release must distinguish missing business/evidence configuration from code failures and return a failing status when mandatory publication blockers remain.



Do not make normal preview development impossible because the owner has not supplied real URLs.



14.6 Exclusions

Do not build:



website AI chatbot;

accounts or login;

payments;

public uploads;

model marketplace;

GPU dashboard;

fake live infrastructure;

blog without content;

enterprise support system;

custom backend;

commercial fine-tuning product page;

speculative infrastructure management tools.

15\. Content integrity and publication gates

15.1 Never invent

Do not fabricate:



customers or customer logos;

testimonials;

certifications;

deployments;

uptime;

security assurances;

infrastructure;

founder or team details;

legal information;

performance values;

rankings;

money or time saved;

source URLs;

report files;

dates;

screenshots;

implementation details.

Do not use the specification date or build date as an experiment date.



15.2 Safe handling of missing information

Use null in structured data and the exact TODO marker in preview.



Do not:



replace missing results with zero;

insert a current date;

generate fake repository URLs;

render broken downloads;

turn a concept diagram into implementation evidence;

silently promote a draft or maturity status.

Keep a consolidated docs/content-blockers.md identifying:



missing value;

affected pages;

consequence;

required owner input.

15.3 Preview mode

Preview is the default until release requirements pass.



It must:



implement all required pages and all seven case-study routes;

show complete layout and localized copy;

clearly label owner-reported evidence;

visibly identify drafts and missing real values;

use noindex;

avoid fake working contact links.

A preview banner may identify editorial status without overwhelming the design.



15.4 Production mode

Before production publication, require:



real canonical domain;

real Telegram URL;

complete translations;

approved factual privacy content;

eligible published content;

no fabricated links or claims;

successful technical checks.

For each of the four required featured projects, require:



a substantive case study;

appropriate project type;

visible limitations;

at least one real reviewed supporting artifact;

source-supported factual claims.

If any of the four is ineligible, report a release blocker. Do not silently replace it with another project.



The other three case studies must be fully implemented in preview but may remain unpublished drafts until their materials are ready.



Unpublished drafts must not appear in the production catalogue, public navigation, sitemap, or generated indexable routes.



For numerical evidence, require the actual source and sufficient date, definition, and run context before enabling the production numerical presentation. Missing metrics must not prevent the non-numerical page structure from being implemented.



Do not present a technically complete preview as an evidence-approved production launch.



16\. Implementation phases

Execute in this order.



Phase 1 — Inspect and establish the foundation

Inspect repository and existing materials.

Identify stack and package manager.

Preserve unrelated changes.

Create or adapt the static-first application.

Add configuration and design tokens.

Establish preview mode and release validation.

Record missing real values.

Phase 2 — Establish multilingual routing before page implementation

Add locale types.

Add route registry and URL helpers.

Add translation dictionaries.

Add document language handling.

Implement language switching.

Establish localized metadata interfaces.

Test equivalent routes.

Do not build an English-only site and retrofit localization afterward.



Phase 3 — Shared shell and visual system

Implement logo.

Load approved fonts.

Implement header, navigation, language selector, footer, breadcrumbs.

Implement buttons, cards, status labels, disclosures, and diagrams.

Check keyboard behavior and small-screen layout early.

Phase 4 — Structured content and evidence

Add all seven project records.

Add supporting evidence records.

Add metrics with exact supplied values.

Add capability maturity data.

Add missing-value handling.

Add source and publication validation.

Phase 5 — Pages

Build:



Homepage.

Solutions.

Local AI.

Three audience pages.

Catalogue.

Reusable case studies.

Approach.

About.

Telegram-first Contact.

Privacy structure.

Localized 404.

Complete English, Ukrainian, and Russian content as part of each page implementation.



Phase 6 — SEO, accessibility, responsive behavior, performance

Implement canonical/hreflang generation.

Add production sitemap and robots behavior.

Verify one H1 and unique metadata.

Review all required viewport widths.

Check keyboard navigation and focus.

Check contrast.

Check diagram and table behavior.

Add print styles.

Run available performance checks.

Phase 7 — Validation and handoff

Run and report:



type/content checks;

automated tests;

build;

accessibility checks available in the environment;

production-readiness validation.

Do not report a test as passed if it was not run.



Document:



setup and commands;

configuration locations;

how to update translations;

how to add or publish a project;

how evidence approval works;

how to supply Telegram and domain values;

future n8n extension point;

remaining blockers.

Finish with a concise implementation summary, executed checks, and outstanding real-value requirements—not another design proposal.



17\. Definition of done

Architecture

\[ ] Static-first site implemented without a custom backend.

\[ ] Shared templates power all three languages.

\[ ] All required pages exist in preview.

\[ ] All seven case-study records and preview routes exist.

\[ ] Project content is not hardcoded into visual components.

\[ ] Configuration is centralized.

\[ ] No excluded features were added.

Positioning and content

\[ ] The first screen explains the practical prototype-led offer.

\[ ] Business remains the primary audience.

\[ ] Education and public institutions have substantive separate pages.

\[ ] Homepage section order is correct.

\[ ] The four featured projects and their order are correct.

\[ ] Current, developing, and planned capabilities are clearly separated.

\[ ] LoRA / QLoRA is visibly planned R\&D, not a mature commercial service.

\[ ] Local execution is not equated with full privacy.

\[ ] Potential applications are not described as completed deployments.

Evidence

\[ ] All supplied numerical values are preserved correctly.

\[ ] Passed and failed counts are both visible.

\[ ] Garak attempts are not called vulnerabilities.

\[ ] Garak scores are not reinterpreted without definitions.

\[ ] Benchmark rows are not called repetitions or rankings.

\[ ] FloriaShopTest assertions are not called test cases.

\[ ] Separate runs remain separate.

\[ ] Sources, dates, conditions, and interpretation limits have explicit fields.

\[ ] Unknown facts use TODOs rather than invented content.

\[ ] Draft and production-publication rules are enforced.

Localization and SEO

\[ ] English, Ukrainian, and Russian copy is complete.

\[ ] No silent production language fallback exists.

\[ ] Language switching preserves the equivalent page.

\[ ] HTML lang is correct.

\[ ] Localized pages are self-canonical.

\[ ] Reciprocal hreflang and English x-default are correct.

\[ ] Drafts and filter variants are excluded from production sitemaps.

\[ ] Preview indexing is disabled.

\[ ] Metadata is unique and localized.

Contact

\[ ] Telegram CTA appears in the hero, final CTA, mobile navigation, and Contact page.

\[ ] Actual URL is configurable in one place.

\[ ] Missing URL produces an honest unavailable state.

\[ ] No fake submission or contact success exists.

\[ ] No V1 webhook, form backend, or external automation was implemented.

\[ ] Future n8n requirements are documented.

Visual quality and usability

\[ ] Exact approved palette is implemented.

\[ ] IBM Plex Sans and Mono are used with required language coverage.

\[ ] Logo uses the four-corner geometric mark.

\[ ] No generic AI imagery or fake dashboards are present.

\[ ] Layout works at all specified widths.

\[ ] No page-level horizontal overflow exists.

\[ ] Mobile diagrams are readable.

\[ ] Important limitations remain visible on mobile.

Accessibility and performance

\[ ] Navigation and disclosures work with keyboard.

\[ ] Skip link and visible focus are present.

\[ ] Mobile navigation manages and restores focus.

\[ ] Color is not the only carrier of meaning.

\[ ] Reduced motion is respected.

\[ ] Tables and diagrams have accessible textual structure.

\[ ] Sticky header does not obscure anchors or focus.

\[ ] Main content is available without client-side rendering.

\[ ] Performance checks are documented without unsupported field-performance claims.

Handoff

\[ ] Build succeeds.

\[ ] Implemented checks and tests have been run, with results reported honestly.

\[ ] README explains operation and maintenance.

\[ ] Missing real values are consolidated.

\[ ] check:release identifies remaining launch blockers.

\[ ] Implementation completion and production readiness are reported separately.

Begin implementation now. Build the complete, truthful multilingual preview first; enable production publication only when the real configuration and evidence requirements are satisfied.

