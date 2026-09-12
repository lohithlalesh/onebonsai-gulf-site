export type Service = {
  slug: string;
  name: string;
  eyebrow: string;
  headline: string;
  title: string;
  description: string;
  summary: string;
  image: string;
  imageAlt: string;
  primaryKeyword: string;
  relatedKeywords: string[];
  outcomes: string[];
  capabilities: Array<{ title: string; copy: string }>;
  process: Array<{ title: string; copy: string }>;
  guidance?: Array<{
    title: string;
    copy: string[];
    points?: string[];
  }>;
  faqs: Array<{ question: string; answer: string }>;
};

export const services: Service[] = [
  {
    slug: "ai-consulting-abu-dhabi",
    name: "AI consulting",
    eyebrow: "AI consulting in Abu Dhabi",
    headline: "AI consulting in Abu Dhabi for enterprise delivery.",
    title: "Turn AI ambition into a delivery plan your team can use.",
    description:
      "AI consulting in Abu Dhabi for UAE organizations that need a practical strategy, prioritized use cases, governance, and a clear route from pilot to production.",
    summary:
      "We work with leaders and delivery teams to identify where AI can create measurable value, what must be true for implementation to succeed, and which use case should move first. The result is a decision-ready plan, not a catalogue of tools.",
    image: "/media/capability-consulting-v1.jpg",
    imageAlt: "OneBonsai Gulf AI consulting workshop in Abu Dhabi",
    primaryKeyword: "AI consulting Abu Dhabi",
    relatedKeywords: ["artificial intelligence consulting", "AI strategy consulting", "AI readiness assessment"],
    outcomes: [
      "A ranked portfolio of use cases tied to business outcomes",
      "A realistic view of data, integration, security, and adoption constraints",
      "A governance model with named owners and human approval points",
      "A phased roadmap with measures for the first production workflow",
    ],
    capabilities: [
      {
        title: "AI readiness assessment",
        copy: "Assess data access, system architecture, operating processes, team capability, risk, and executive sponsorship before committing to a build.",
      },
      {
        title: "Use-case discovery",
        copy: "Map high-friction workflows and compare opportunities by value, feasibility, time to evidence, and governance exposure.",
      },
      {
        title: "AI strategy and operating model",
        copy: "Define how decisions are made, who owns models and data, how vendors are evaluated, and how successful pilots become managed services.",
      },
      {
        title: "Implementation roadmap",
        copy: "Translate the strategy into sequenced work: discovery, prototype, controlled pilot, production integration, adoption, and measurement.",
      },
    ],
    process: [
      { title: "Frame the decision", copy: "Agree on the business outcome, stakeholders, constraints, and evidence needed to move forward." },
      { title: "Inspect the workflow", copy: "Trace the people, systems, data, exceptions, and approval points behind the work." },
      { title: "Prioritize the portfolio", copy: "Score opportunities and select a first use case that is valuable, feasible, and safe to operate." },
      { title: "Plan for production", copy: "Set the architecture, controls, ownership, change plan, and success measures before delivery starts." },
    ],
    faqs: [
      {
        question: "What does an AI consulting engagement include?",
        answer: "The scope depends on the decision you need to make. A typical engagement covers workflow discovery, AI readiness, use-case prioritization, data and integration constraints, governance, solution options, and a phased implementation roadmap.",
      },
      {
        question: "Can you work with our existing systems and technology partners?",
        answer: "Yes. We begin with the platforms, policies, and partners already in place. The objective is to add the minimum capability required, not to replace systems that are working.",
      },
      {
        question: "Do you advise only, or can you build the solution as well?",
        answer: "We can advise, build, integrate, and support adoption. If an internal team or another vendor will deliver the system, we can provide an independent plan and governance model instead.",
      },
      {
        question: "We don't know how to use AI. Where do we start?",
        answer: "Start with the work, not the tool. We identify costly or repetitive processes, the decisions people make, the data and systems involved, and what a useful result would change. Those opportunities are compared by value, feasibility, governance exposure, and time to evidence. The output is a ranked first use case and a practical route to test it before committing to a broad AI program.",
      },
      {
        question: "What does this problem actually cost the business?",
        answer: "We examine the time, delay, rework, error, missed demand, operational exposure, and management attention created by the current process. Where the organisation has reliable evidence, those inputs form the baseline. Where it does not, discovery identifies what must be measured. The purpose is to decide whether solving the problem is worth funding and which outcome should govern the first pilot.",
      },
      {
        question: "Which process should we automate first?",
        answer: "Choose a process with a meaningful outcome, repeatable work, accessible inputs, clear ownership, and manageable exceptions. It should be narrow enough to test and important enough that the evidence matters. We compare candidate processes by value, feasibility, integration needs, risk, and time to evidence, then recommend the first workflow rather than assuming the most visible task is the best place to begin.",
      },
      {
        question: "If we solved this, what would success look like?",
        answer: "Success should describe a changed business result and the evidence that proves it. That may involve reduced handling time, fewer manual handoffs, better visibility, more consistent decisions, or a safer approval path, depending on the stated problem. We agree the baseline, target behaviour, responsible owner, acceptance evidence, and review point before selecting technology so the pilot has a decision to answer.",
      },
    ],
  },
  {
    slug: "ai-integration",
    name: "AI integration",
    eyebrow: "Enterprise AI integration in the UAE",
    headline: "Enterprise AI integration services in the UAE.",
    title: "Connect AI to the systems and decisions that run your business.",
    description:
      "Enterprise AI integration in the UAE: connect approved models to ERP, CRM, documents, data, and operational workflows with human oversight built in.",
    summary:
      "A useful AI system must do more than generate an answer. It needs the right business context, controlled access to systems, clear approval boundaries, and a reliable way to record what happened. We design that complete operating path.",
    image: "/media/capability-ai-integration-v1.jpg",
    imageAlt: "Enterprise AI integration architecture for UAE organizations",
    primaryKeyword: "AI integration UAE",
    relatedKeywords: ["enterprise AI solutions UAE", "AI implementation UAE", "systems integration company UAE"],
    outcomes: [
      "Faster access to approved business knowledge",
      "Fewer manual handoffs across fragmented systems",
      "Traceable actions with human review where it matters",
      "A maintainable integration layer your team can operate",
    ],
    capabilities: [
      { title: "Enterprise knowledge assistants", copy: "Ground answers in approved documents, records, policies, and product knowledge with access controls and source references." },
      { title: "Workflow copilots", copy: "Bring summaries, recommendations, drafting, and next actions into the tools where employees already work." },
      { title: "AI agents with boundaries", copy: "Allow agents to retrieve information or trigger approved actions through explicit permissions, validation, and audit trails." },
      { title: "Model and platform integration", copy: "Select and connect the model, retrieval, data, interface, and observability components that fit the use case." },
    ],
    process: [
      { title: "Map the current system", copy: "Identify source systems, data ownership, interfaces, security requirements, and process exceptions." },
      { title: "Design the control plane", copy: "Define permissions, human review, logging, fallback behavior, and measurable acceptance criteria." },
      { title: "Integrate one workflow", copy: "Build a narrow production path and validate it with the people who perform the work." },
      { title: "Harden and expand", copy: "Improve reliability, documentation, monitoring, training, and only then extend the pattern to adjacent workflows." },
    ],
    faqs: [
      { question: "What systems can you integrate AI with?", answer: "We design integrations around the systems in scope, including ERP and CRM platforms, document repositories, operational databases, analytics tools, service desks, and custom applications. Access depends on the interfaces and permissions available." },
      { question: "Do we need to move all our data into a new platform?", answer: "Usually not. Many useful systems can retrieve approved information from existing sources and return results through current tools. Data movement should be limited to what the use case, security model, and performance requirements justify." },
      { question: "How do you keep people in control?", answer: "We define which actions can be automated, which require confirmation, what evidence must be shown, how exceptions are handled, and how every material action is logged." },
      { question: "We do this manually. Can it be automated?", answer: "Possibly. We first trace the manual steps, inputs, exceptions, approvals, and systems involved. A suitable workflow has repeatable work, accessible context, a measurable outcome, and a clear way to return uncertain or high-consequence decisions to a person. We then automate the smallest complete path and test whether it improves the result without hiding new operating risk." },
      { question: "We have too much data and no visibility. Where do we start?", answer: "Start with the decision people cannot make, then identify the minimum trusted data needed to support it. We map the systems that own those records, access and quality constraints, definitions, and the workflow where the result should appear. This keeps the first integration focused on usable visibility rather than moving every dataset into a new platform without a defined operating purpose." },
    ],
  },
  {
    slug: "agentic-ai-implementation",
    name: "Agentic AI implementation",
    eyebrow: "Agentic AI implementation in the UAE",
    headline: "Agentic AI implementation in the UAE.",
    title: "Build AI agents around governed, observable work.",
    description:
      "Agentic AI implementation in the UAE for enterprises that need controlled automation across data, software, approvals, and human teams.",
    summary:
      "Agentic AI is useful when a system must complete a bounded sequence of work, not when a chatbot is simply renamed an agent. We define the job, available tools, permissions, stopping conditions, and human checkpoints before automating it.",
    image: "/media/capability-ai-integration-v1.jpg",
    imageAlt: "Governed agentic AI workflow for a UAE enterprise",
    primaryKeyword: "agentic AI UAE implementation",
    relatedKeywords: ["AI agents UAE", "enterprise AI agents", "AI automation UAE"],
    outcomes: [
      "A clearly bounded job with explicit start and stop conditions",
      "Permissioned access to the minimum tools and data required",
      "Human approval for consequential or uncertain actions",
      "Logs, evaluation, and fallback behavior for production operation",
    ],
    capabilities: [
      { title: "Agent workflow design", copy: "Break a complex process into goals, tools, rules, checkpoints, and exception paths that can be tested independently." },
      { title: "Tool and system connections", copy: "Connect agents to approved APIs, documents, databases, inboxes, and business applications through scoped permissions." },
      { title: "Evaluation and guardrails", copy: "Test accuracy, task completion, unsafe actions, prompt injection exposure, and failure recovery before rollout." },
      { title: "Operations and observability", copy: "Record inputs, tool calls, decisions, approvals, cost, latency, and outcomes so teams can manage the system." },
    ],
    process: [
      { title: "Choose a bounded workflow", copy: "Start where inputs, outputs, tools, and owners can be defined, not with an open-ended mandate." },
      { title: "Set authority levels", copy: "Specify what the agent may read, draft, recommend, or execute and where people must intervene." },
      { title: "Test against reality", copy: "Use representative cases, edge conditions, hostile inputs, and failure scenarios to evaluate behavior." },
      { title: "Release with supervision", copy: "Introduce the agent to a limited group, monitor outcomes, and expand authority only when evidence supports it." },
    ],
    faqs: [
      { question: "What is agentic AI implementation?", answer: "It is the design and deployment of AI systems that can plan or complete a bounded sequence of actions using approved tools. A production implementation also includes permissions, evaluation, monitoring, human oversight, and fallback behavior." },
      { question: "Which workflows are suitable for AI agents?", answer: "Good candidates have repeatable goals, accessible data, defined tools, measurable outcomes, and manageable exceptions. High-consequence work may still benefit, but it normally requires tighter authority limits and human approval." },
      { question: "Can an agent work across several business systems?", answer: "Yes, when each connection has an approved interface, scoped permissions, and reliable validation. We avoid giving one agent unrestricted access simply because the integration is technically possible." },
    ],
  },
  {
    slug: "custom-software-development",
    name: "Custom software development",
    eyebrow: "Custom software development in Abu Dhabi",
    headline: "Custom software development in Abu Dhabi.",
    title: "Build the software your operating model actually needs.",
    description:
      "Custom software development in Abu Dhabi for UAE organizations that need secure applications, workflow platforms, AI products, and system integrations.",
    summary:
      "When off-the-shelf software leaves a critical workflow fragmented, we design and build the missing layer. That may be an internal application, customer platform, automation service, AI-enabled product, or integration across existing systems.",
    image: "/media/capability-custom-software-v1.jpg",
    imageAlt: "Custom software development for an Abu Dhabi enterprise",
    primaryKeyword: "custom software development Abu Dhabi",
    relatedKeywords: ["custom software development company", "software development companies in Abu Dhabi", "custom application development services"],
    outcomes: [
      "A product shaped around real users and operational constraints",
      "Architecture that fits existing systems and security requirements",
      "Clear delivery stages with usable software at each milestone",
      "Documentation and handover that reduce long-term dependency",
    ],
    capabilities: [
      { title: "Internal workflow applications", copy: "Replace spreadsheets, disconnected approvals, and manual reporting with software built around the actual process." },
      { title: "Customer and partner portals", copy: "Create secure interfaces for service requests, records, collaboration, status, and self-service." },
      { title: "AI-enabled products", copy: "Combine product design, custom software, and responsible AI features within one maintained application." },
      { title: "Integration services", copy: "Connect legacy and cloud systems through APIs, event flows, validation, and operational monitoring." },
    ],
    process: [
      { title: "Discover the job", copy: "Observe the workflow, user needs, edge cases, dependencies, and measures that define a useful release." },
      { title: "Prototype the critical path", copy: "Test the highest-risk interaction or technical assumption before expanding the build." },
      { title: "Deliver in working increments", copy: "Release usable slices, gather evidence, and keep scope tied to operational value." },
      { title: "Operate and transfer", copy: "Document architecture, train owners, monitor performance, and support an orderly handover." },
    ],
    guidance: [
      {
        title: "Decide whether custom development is justified.",
        copy: [
          "Custom software should solve a constraint that configuration, process change, or an existing platform cannot solve economically. We start by measuring the cost of the current workflow: delays, duplicate entry, compliance exposure, poor customer experience, and the decisions people cannot make with the information available.",
          "The business case should compare the smallest useful custom layer with credible alternatives. In some cases that is a focused application around an existing ERP or CRM, not a replacement program. The decision record should state the intended outcome, affected users, critical integrations, operational owner, and the evidence required before further investment.",
        ],
        points: [
          "Prioritize one valuable workflow and its measurable baseline.",
          "Separate must-have operating requirements from preferences.",
          "Confirm data access, integration ownership, and security constraints early.",
          "Fund a controlled first release before committing to a broad platform roadmap.",
        ],
      },
      {
        title: "Structure the engagement around ownership and evidence.",
        copy: [
          "A credible Abu Dhabi software development partner should make delivery governance visible. That includes named product and technical owners, milestone acceptance criteria, access to the source repository, documented architecture decisions, automated quality checks, and a release process the client can inspect.",
          "Commercial terms should address intellectual-property assignment, third-party and open-source components, credentials, documentation, data export, warranty obligations, and the conditions for transition to another team. Source-code escrow or contractual step-in rights may be appropriate where a system is operationally critical. UAE legal advice should be obtained for the final contract; our role is to make the technical dependencies and handover evidence explicit.",
        ],
        points: [
          "Tie payments to accepted, demonstrable increments, not activity reports.",
          "Keep production credentials and core cloud accounts under client control.",
          "Require a software bill of materials and dependency policy where risk warrants it.",
          "Define documentation, training, and transition as deliverables from the start.",
        ],
      },
      {
        title: "Plan cost and timeline by uncertainty, not page count.",
        copy: [
          "Pricing depends on workflow complexity, integration quality, data readiness, assurance requirements, and the number of decisions that still need to be made. A focused discovery or technical validation can take two to four weeks. A narrow production release often runs eight to sixteen weeks; multi-system platforms are normally phased over longer periods.",
          "For market context, experienced UAE delivery roles are often discussed in day-rate bands rather than a single blended figure. The useful comparison is total cost to a production outcome: discovery, design, engineering, quality assurance, security, cloud operation, change management, and post-release support. Any estimate should identify assumptions, exclusions, contingency, and what will be learned at each milestone.",
        ],
      },
      {
        title: "Define what production-ready means before the first sprint.",
        copy: [
          "A first release is not production-ready simply because its core screen works. The release definition should include identity and role access, data validation, audit events, performance under realistic load, accessibility, backup and recovery, operational monitoring, user support, and a controlled deployment path. Bilingual services should test complete Arabic and English journeys, including right-to-left layout, rather than translating isolated labels at the end.",
          "Quality evidence belongs inside each milestone. Automated tests should cover critical business rules and integrations; security checks should cover dependencies, secrets, authorization, and likely misuse; product analytics should show whether users complete the intended job. The team should rehearse rollback and recovery before the application carries business-critical work.",
        ],
        points: [
          "Agree measurable performance, availability, and recovery targets.",
          "Test permissions with representative roles and restricted records.",
          "Include accessibility and bilingual acceptance in the definition of done.",
          "Release first to a bounded user group with monitoring and support in place.",
        ],
      },
    ],
    faqs: [
      { question: "When should a business choose custom software?", answer: "Custom development is justified when a valuable workflow cannot be served well by configurable products, when integration gaps create material cost or risk, or when the software itself creates strategic differentiation." },
      { question: "Can you add AI to an existing application?", answer: "Yes. We first check whether the feature has a clear user outcome, reliable context, suitable controls, and an operating owner. The AI component is then integrated into the existing product architecture rather than treated as a separate demo." },
      { question: "How do you control project scope?", answer: "We agree on the smallest valuable release, make constraints visible, validate risky assumptions early, and deliver in increments that can be reviewed by users and decision-makers." },
      { question: "We run everything in Excel. What replaces that?", answer: "The answer depends on why the spreadsheets exist. We map the records, calculations, approvals, handoffs, reporting, and exceptions they currently support, then decide what should remain configurable and what needs a governed application. The replacement may be a focused operational system connected to existing platforms, with role-based access, validation, workflow status, history, and reporting built around the people who perform the work." },
    ],
  },
  {
    slug: "ai-training-academy",
    name: "AI training and Academy",
    eyebrow: "Corporate AI training in the UAE",
    headline: "Corporate AI training and Academy programs in the UAE.",
    title: "Give every role the confidence to use AI responsibly at work.",
    description:
      "Corporate AI training in the UAE for executives, business teams, and technical leaders, built around real workflows, responsible use, and practical adoption.",
    summary:
      "AI training works when it changes how people perform a real job. We tailor programs to the decisions, tools, policies, and data each audience handles, from executive oversight to everyday knowledge work and technical delivery.",
    image: "/media/uae-ai-workshop-v1.jpg",
    imageAlt: "Corporate AI training workshop for UAE leaders and teams",
    primaryKeyword: "AI courses in UAE",
    relatedKeywords: ["AI courses in Dubai", "artificial intelligence course Dubai", "AI training courses"],
    outcomes: [
      "Leaders who can assess AI opportunities and risks",
      "Teams that can use approved tools on relevant work",
      "Shared standards for privacy, verification, and human review",
      "Internal champions able to support adoption after the program",
    ],
    capabilities: [
      { title: "AI for executives", copy: "A decision-focused program covering opportunity selection, economics, governance, operating models, and questions leaders should ask." },
      { title: "Applied AI for business teams", copy: "Hands-on sessions using representative tasks such as research, drafting, analysis, service operations, and knowledge retrieval." },
      { title: "Agentic AI and automation", copy: "Help product, operations, and technical teams understand where agents fit, how they fail, and how to design human oversight." },
      { title: "Responsible AI practice", copy: "Turn policy into usable routines for data handling, verification, escalation, documentation, and accountable decision-making." },
      { title: "Immersive learning options", copy: "Extend classroom and workshop programs with ready-made or custom VR practice. Educational institutions receive 50% off all VR training modules." },
    ],
    process: [
      { title: "Profile the audience", copy: "Identify roles, current capability, approved tools, policy constraints, and the work participants need to improve." },
      { title: "Build relevant exercises", copy: "Use realistic scenarios and sanitized materials rather than generic demonstrations." },
      { title: "Teach through practice", copy: "Combine concise instruction with guided tasks, feedback, and role-specific decision frameworks." },
      { title: "Measure adoption", copy: "Set follow-up actions, champions, office hours, and indicators that show whether capability is being used safely." },
    ],
    faqs: [
      { question: "Are the programs technical?", answer: "They are matched to the audience. Executive and business programs focus on decisions and applied use. Technical sessions can cover architecture, evaluation, agents, integration, and operations in more depth." },
      { question: "Can training use our company workflows?", answer: "Yes. We can design exercises around representative workflows and approved, sanitized materials so participants practise work that matters without exposing sensitive information." },
      { question: "Do you provide public AI courses?", answer: "Our current focus is organization-led programs for executive, functional, and technical teams. Contact us with the audience and outcome you have in mind and we will recommend the right format." },
      { question: "Can the Academy include immersive training?", answer: "Yes. A program can include ready-made or custom VR training where repeatable practice, spatial understanding, risk recognition, or procedure rehearsal matters. Educational institutions receive 50% off all VR modules; licence requirements depend on concurrent use and the delivery timetable." },
    ],
  },
  {
    slug: "vr-training-simulation",
    name: "VR training and simulation",
    eyebrow: "VR training and simulation in the UAE",
    headline: "VR training and simulation for work that cannot fail.",
    title: "Practise high-risk, repeatable, or expensive work without interrupting operations.",
    description:
      "VR training in the UAE with ready-made fire, first aid, hazard and cybersecurity modules, custom simulations, AI avatars and enterprise tracking.",
    summary:
      "Use immersive training for procedures that are dangerous, expensive, rare, or difficult to reproduce. Choose a ready-made module or commission a custom simulation around your equipment and operating standards. More than 80,000 people have trained on immersive solutions across the OneBonsai group.",
    image: "/media/portshield.avif",
    imageAlt: "Immersive operational training environment for a UAE team",
    primaryKeyword: "VR training UAE",
    relatedKeywords: ["virtual reality training UAE", "immersive training UAE", "VR simulation company UAE"],
    outcomes: [
      "Repeatable practice without live operational risk",
      "Consistent instruction and assessment across teams, languages, and locations",
      "Recorded actions, errors, completion, and training performance",
      "Less dependence on aircraft, machinery, facilities, or staged hazards",
    ],
    capabilities: [
      {
        title: "Four ready-made modules",
        copy: "Deploy Fire response, First Aid, Hazard Spotting, or Cybersecurity training without beginning with a custom production. Every module includes an AI avatar and is available in a wide range of languages.",
      },
      {
        title: "VR Fire Protection",
        copy: "Train fire response, extinguisher use, and evacuation across 20 distinct levels. A SaaS platform supports different zones, fire types, extinguishers, and environments so the module can reflect the risks people actually face.",
      },
      {
        title: "First Aid and emergency response",
        copy: "Guide learners through emergency response and procedural practice in an approximately 45-minute module, using a repeatable sequence and an AI avatar without exposing a person to a live emergency.",
      },
      {
        title: "Hazard and security awareness",
        copy: "Use Hazard Spotting to recognise workplace risk before an incident and Cybersecurity to rehearse interactive security-awareness scenarios in an environment where decisions can be observed and reviewed.",
      },
      {
        title: "Custom simulation",
        copy: "Create safety, technical, equipment, emergency-response, operations, onboarding, AI role-play, or digital-human experiences where the ready-made modules do not match the required competence or working environment.",
      },
      {
        title: "Enterprise deployment and tracking",
        copy: "Plan licences, the client's chosen hardware, multilingual rollout, access, performance tracking, completion records, and updates as one training operation.",
      },
    ],
    process: [
      {
        title: "Select the training path",
        copy: "Start with a ready-made module when it fits. Define a custom simulation when the objective depends on specific equipment, procedures, or decisions.",
      },
      {
        title: "Define competence and evidence",
        copy: "Specify what the learner must recognise, decide, and do; which errors matter; what an instructor needs to observe; and what completion or performance data should be retained.",
      },
      {
        title: "Configure or model the scenario",
        copy: "Configure languages and module options, or model the custom environment, interactions, procedure, hazards, branches, AI role-play, feedback, and assessment standards required for the training outcome.",
      },
      {
        title: "Validate with subject experts",
        copy: "Review the content, physical behaviour, terminology, sequence, and scoring with the people responsible for the real procedure before the simulation becomes part of formal training.",
      },
      {
        title: "Deploy, track, and improve",
        copy: "Set licences against the training schedule, choose compatible devices, prepare facilitators, manage access, review completion and performance evidence, and revise the learning operation as requirements change.",
      },
    ],
    guidance: [
      {
        title: "Choose immersive training for the right operating signal.",
        copy: [
          "VR is useful when practice is high-risk, repeatable, or expensive to deliver. It lets energy, defence, aviation, healthcare, logistics, construction, manufacturing, and education teams rehearse work without creating the live condition each time. Spatial procedures, equipment interaction, hazard recognition, emergency response, and decisions under pressure are stronger candidates than material that only needs to be read or discussed.",
          "The objective remains competence, not novelty. A sound brief identifies the behaviour that must change, the mistakes the learner must recognise, the evidence an assessor needs, and the part of the live training operation that remains essential. VR normally supports instructors and subject-matter experts; it does not remove their accountability for briefing, debriefing, and sign-off.",
        ],
        points: [
          "Use Fire response for extinguisher choice, safe sequence, and evacuation practice.",
          "Use First Aid for repeatable emergency response and procedural rehearsal.",
          "Use Hazard Spotting to train recognition before workplace incidents occur.",
          "Use Cybersecurity for interactive awareness decisions rather than passive instruction.",
        ],
      },
      {
        title: "Start with a module, then configure what matters.",
        copy: [
          "The ready-made modules have been developed from 2017 onward and revised for layout, design, and international certification. Each includes an AI avatar and supports a wide range of languages. That gives organisations a tested starting point while preserving room to configure the delivery around audience, location, policy, and training schedule.",
          "VR Fire Protection has 20 levels and a SaaS layer for configuring zones, fire types, extinguishers, and environments. First Aid runs for approximately 45 minutes. Hazard Spotting and Cybersecurity focus on recognising and responding to risk. Where the required competence sits outside those modules, the same delivery model can create a custom safety, equipment, emergency, operations, onboarding, AI role-play, or digital-human simulation.",
        ],
        points: [
          "Keep terminology, language, and feedback appropriate to the learner group.",
          "Define the required level of visual and physical fidelity from the learning objective.",
          "Validate custom procedure content with accountable subject-matter experts.",
          "Separate practice completion from any formal certification decision.",
        ],
      },
      {
        title: "Plan licences around concurrent use, not headcount.",
        copy: [
          "Fire, First Aid, and Hazard Spotting each cost €2,000 per licence per year. A licence is consumed while a learner is using the module; it is not permanently assigned to one person. This concurrent model allows the same licence to train several people in sequence, so the right quantity depends on the module duration, available headsets, shift pattern, locations, and deadline.",
          "A 100-person organisation training everyone within one week needs around four licences, roughly €8,000–10,000, because an eight-hour shift pattern limits how many people can pass through a single headset. Educational institutions receive 50% off all modules. The calculation should be based on the delivery window rather than buying one licence for every employee.",
        ],
        points: [
          "Software licences are sold separately from the hardware chosen by the client.",
          "Supported devices include Meta Quest, Pico, and Samsung or HTC Vive.",
          "Staggered training can reduce the peak number of concurrent licences required.",
          "Compressed delivery across sites can require more licences and facilitator capacity.",
        ],
      },
    ],
    faqs: [
      {
        question: "How much does VR training cost?",
        answer: "Fire, First Aid, and Hazard Spotting cost €2,000 per licence per year. Licences are concurrent rather than assigned permanently to individual learners, so the total depends on how many people must train at the same time, the module duration, the shift pattern, and the delivery window. Custom simulations require a separate scope because the environment, procedure, interactions, assessment, languages, integrations, and deployment requirements vary.",
      },
      {
        question: "Do we need to buy the VR headsets from you?",
        answer: "No. We sell the software licences and the client chooses the hardware. The modules run on Meta Quest, Pico, and Samsung or HTC Vive devices. We can help the training team match hardware quantities to the schedule, locations, facilitation model, and supported application, while keeping device ownership and procurement with the organisation.",
      },
      {
        question: "How many licences do we need for 100 staff?",
        answer: "A 100-person organisation training everyone within one week typically needs around four concurrent licences, or roughly €8,000–10,000, because an eight-hour shift limits how many people can pass through one headset. A longer rollout may need fewer licences; several simultaneous locations or a shorter deadline may need more. We calculate against the training timetable rather than the total employee count alone.",
      },
      {
        question: "Which languages are supported?",
        answer: "The modules are multilingual and available in a wide range of languages. The right configuration depends on the selected module and learner groups. We confirm the required languages during scoping, along with terminology, voice, instructions, assessment text, and any organisation-specific content that must be reviewed before deployment.",
      },
      {
        question: "Do you build custom training, or only the ready-made modules?",
        answer: "Both. Ready-made Fire, First Aid, Hazard Spotting, and Cybersecurity modules provide a faster starting point, and every module includes an AI avatar. Custom work can cover safety, technical and equipment procedures, emergency response, operations, onboarding, AI role-play, and digital humans when the learning objective depends on a specific environment, sequence, or decision model.",
      },
      {
        question: "Is there a discount for schools and universities?",
        answer: "Yes. Educational institutions receive 50% off all modules. The concurrent licensing model still applies, so the required number depends on class size, session length, available devices, facilitator capacity, and how quickly the institution wants learners to complete the training.",
      },
      {
        question: "How do we track who has completed training?",
        answer: "Enterprise deployment includes performance tracking. The training operation can record completion and, where the module supports it, choices, sequence, errors, and assessment results. During scoping we define which evidence instructors or administrators need, who may access it, how it will be retained, and how results connect to further practice or internal sign-off.",
      },
    ],
  },
  {
    slug: "system-integration",
    name: "System integration",
    eyebrow: "System integration services in the UAE",
    headline: "System integration services for UAE enterprises.",
    title: "Connect the systems your business already depends on.",
    description:
      "System integration services in the UAE for enterprises connecting ERP, CRM, data, cloud, custom software, and AI through governed, observable interfaces.",
    summary:
      "We connect business platforms, data, and operational workflows without forcing a wholesale replacement. The work begins with the process that needs to move, then selects the smallest reliable combination of APIs, events, data pipelines, and human controls required to support it.",
    image: "/media/capability-ai-integration-v1.jpg",
    imageAlt: "System integration services connecting enterprise platforms in the UAE",
    primaryKeyword: "system integration UAE",
    relatedKeywords: [
      "system integration companies in Dubai",
      "systems integrator UAE",
      "enterprise application integration",
      "API integration services UAE",
    ],
    outcomes: [
      "A reliable path between the systems that own each business record",
      "Less duplicate entry, reconciliation, and manual status chasing",
      "Security, validation, monitoring, and recovery built into every interface",
      "Clear technical ownership with documentation your team can operate",
    ],
    capabilities: [
      {
        title: "Enterprise application integration",
        copy: "Connect ERP, CRM, service management, content, identity, finance, and industry platforms while preserving each system's role as a source of record.",
      },
      {
        title: "API and event architecture",
        copy: "Design secure APIs, webhooks, event flows, queues, and orchestration that keep systems decoupled and make failures visible.",
      },
      {
        title: "Data and document flows",
        copy: "Move, validate, and reconcile operational data with lineage, retention, access, and quality rules suited to the information involved.",
      },
      {
        title: "AI-ready integration",
        copy: "Give approved AI services controlled access to business context and actions without exposing entire systems or bypassing established approvals.",
      },
    ],
    process: [
      {
        title: "Map the operating flow",
        copy: "Trace the people, decisions, systems of record, interfaces, data owners, exceptions, and service levels behind the target workflow.",
      },
      {
        title: "Choose the integration pattern",
        copy: "Select APIs, events, managed integration tooling, batch movement, or a combination based on latency, reliability, ownership, and cost.",
      },
      {
        title: "Prove the critical path",
        copy: "Integrate one end-to-end transaction, including identity, validation, failure handling, monitoring, and a safe route back to manual operation.",
      },
      {
        title: "Harden and transfer",
        copy: "Load-test the interfaces, document dependencies and runbooks, train operators, and release through controlled environments.",
      },
    ],
    guidance: [
      {
        title: "Start with system ownership, not connector selection.",
        copy: [
          "A system integration succeeds when each record, action, and exception has an accountable owner. Before choosing middleware, we identify the system of record for customers, contracts, identities, assets, documents, and transactions. We then map who may create or change each record, what validations apply, and how downstream teams learn that something has changed.",
          "That map determines the architecture. Synchronous APIs suit interactions that need an immediate verified response. Events help several systems react independently to a business change. Queues protect services from traffic spikes and temporary outages. Scheduled movement remains valid for controlled, non-urgent data. An integration platform can reduce maintenance when it supports the required protocols and remains operable by the client team.",
        ],
        points: [
          "Name a business and technical owner for every connected system.",
          "Document the source of record and acceptable propagation delay for each dataset.",
          "Define idempotency, retry, reconciliation, and manual recovery before launch.",
          "Treat observability and support runbooks as part of the interface contract.",
        ],
      },
      {
        title: "Evaluate a UAE systems integrator on operating evidence.",
        copy: [
          "A proposal should show how the partner will inspect existing architecture, work with incumbent vendors, protect production systems, and demonstrate value before a broad rollout. Ask to see sample interface contracts, architecture decision records, automated tests, monitoring views, release controls, and handover material, not only a list of technologies or partner badges.",
          "For system integration companies in Dubai or Abu Dhabi, local availability can help with workshops, stakeholder coordination, and restricted environments, but it is not a substitute for engineering discipline. Commercial evaluation should cover milestone acceptance, defect responsibility, subcontractors, third-party licensing, data access, source ownership, warranty, support response, and transition rights.",
        ],
        points: [
          "Require a dependency map and explicit non-functional requirements.",
          "Confirm how credentials, secrets, certificates, and privileged access are governed.",
          "Review the plan for testing with representative volumes and failure conditions.",
          "Keep repositories, production accounts, and operational telemetry accessible to the client.",
        ],
      },
      {
        title: "Design for UAE data and security obligations.",
        copy: [
          "The integration boundary should make data location, purpose, access, retention, and transfer visible. Where personal data is involved, organizations should assess the UAE Personal Data Protection Law and any sector or free-zone rules that apply to them. Legal interpretation remains the responsibility of qualified counsel; the technical design should give that review concrete data flows and controls to examine.",
          "Residency requirements do not automatically mean every component must run in one environment. They do require an intentional record of where payloads, logs, backups, model requests, support access, and recovery copies reside. Architecture options can include UAE cloud regions, sovereign cloud services, private infrastructure, tokenization, field-level minimization, and a design that keeps sensitive records in their existing system of record.",
        ],
      },
      {
        title: "Set a realistic path from discovery to operation.",
        copy: [
          "A focused integration discovery normally takes two to four weeks when system owners and interface documentation are available. A production connection between two well-understood systems may take six to twelve weeks; multi-system programs are better delivered as a sequence of independently useful flows. Legacy access, vendor approvals, data remediation, assurance, and change windows often matter more than coding speed.",
          "We estimate in milestones: operating map and architecture, critical-path proof, production hardening, controlled release, and handover. Each milestone has evidence and an explicit decision to continue, change course, or stop. That structure gives sponsors a clearer view of risk than one large estimate built before the interfaces have been inspected.",
        ],
      },
    ],
    faqs: [
      {
        question: "What does a system integration company do?",
        answer: "A system integration company connects applications, data, infrastructure, and operating processes so information and actions move reliably between them. Production work also covers identity, validation, monitoring, failure recovery, documentation, and ownership.",
      },
      {
        question: "Can you integrate legacy systems with cloud and AI services?",
        answer: "Often, yes. The safe pattern may use an existing API, a controlled adapter, secure file exchange, an event layer, or a read-only retrieval service. We inspect the legacy platform and its operational constraints before choosing the connection method.",
      },
      {
        question: "How long does enterprise system integration take?",
        answer: "A focused discovery often takes two to four weeks, and a well-bounded production integration may take six to twelve weeks. Programs involving several systems, legacy dependencies, complex assurance, or major data remediation are normally phased over a longer period.",
      },
      {
        question: "Do you replace our existing integration partner or platform?",
        answer: "Not by default. We can work with internal teams, incumbent vendors, and existing integration platforms. The objective is to close a defined operating gap with the least unnecessary replacement and a clear division of responsibility.",
      },
      {
        question: "Our tools don't talk to each other. Can you connect them?",
        answer: "Yes, when the systems provide a safe way to exchange the required information or action. We begin with the business flow, identify each system of record, and then select an API, event, managed integration, controlled data movement, or adapter pattern. The production connection includes identity, validation, monitoring, failure recovery, and ownership so the result is operable rather than a fragile data transfer.",
      },
      {
        question: "We have too many subscriptions. Can you consolidate them?",
        answer: "We can assess which subscriptions support distinct operating needs, where capabilities overlap, what data or workflows depend on each tool, and what could move into an existing or custom platform. Consolidation is justified when it reduces cost or fragmentation without removing a needed control or creating a larger migration risk. The recommendation can retain, integrate, replace, or retire each service with an explicit transition path.",
      },
    ],
  },
  {
    slug: "cybersecurity",
    name: "Cybersecurity",
    eyebrow: "Cybersecurity services in the UAE",
    headline: "Cybersecurity services for UAE enterprises.",
    title: "Secure the architecture, workflows, and people around every deployment.",
    description:
      "Cybersecurity services in the UAE for enterprise applications, cloud, AI workflows, integrations, identity, secure delivery, and operational readiness.",
    summary:
      "Security is most effective when it shapes architecture and operating decisions early. We help teams identify credible threats, reduce unnecessary access, build verifiable controls, and prepare people to detect and recover from failures across software, cloud, integrations, and AI-enabled workflows.",
    image: "/media/higgsfield-ai-services-uae-v1.jpg",
    imageAlt: "Cybersecurity services for enterprise technology and AI in the UAE",
    primaryKeyword: "cybersecurity UAE",
    relatedKeywords: [
      "cyber security companies UAE",
      "cybersecurity consulting UAE",
      "AI security UAE",
      "application security Abu Dhabi",
    ],
    outcomes: [
      "A risk picture tied to real assets, identities, suppliers, and workflows",
      "Security controls that engineering and operations teams can verify",
      "Bounded access and traceable activity across software, cloud, and AI",
      "Clear incident ownership, recovery priorities, and decision paths",
    ],
    capabilities: [
      {
        title: "Architecture and threat review",
        copy: "Model credible abuse, compromise, data exposure, service disruption, and supplier failure before controls and delivery plans are finalized.",
      },
      {
        title: "Application and cloud security",
        copy: "Strengthen identity, secrets, network boundaries, software dependencies, deployment pipelines, logging, backups, and recovery across the delivery lifecycle.",
      },
      {
        title: "AI and agent security",
        copy: "Test prompt injection, excessive agency, sensitive-data exposure, unsafe tool access, output handling, and the human controls around consequential actions.",
      },
      {
        title: "Exercises and readiness",
        copy: "Run role-based simulations that expose decision gaps, clarify escalation, and turn policy into rehearsed operational behavior.",
      },
    ],
    process: [
      {
        title: "Define the assets and decisions",
        copy: "Identify critical services, sensitive information, privileged identities, dependencies, and the business consequences of loss or disruption.",
      },
      {
        title: "Model credible threats",
        copy: "Trace how an attacker, insider, failed supplier, or unsafe automation could reach the assets and where detection or containment should occur.",
      },
      {
        title: "Implement verifiable controls",
        copy: "Prioritize architectural and operating changes by risk reduction, testability, delivery effort, and impact on the people doing the work.",
      },
      {
        title: "Exercise and improve",
        copy: "Validate monitoring, response, recovery, communications, and executive decisions through technical tests and realistic scenarios.",
      },
    ],
    guidance: [
      {
        title: "Buy an outcome, not a catalogue of security activities.",
        copy: [
          "A useful cybersecurity engagement starts with the service that must keep operating and the information that must remain protected. Asset lists and compliance controls matter, but they become actionable only when connected to business consequences, credible threat paths, detection signals, and accountable owners.",
          "When comparing cyber security companies in the UAE, ask how findings will be validated and prioritized. A report should distinguish exploitable weaknesses from theoretical exposure, identify affected systems and owners, explain business impact, and define the evidence that will show remediation is complete. High-severity labels without operating context create queues, not resilience.",
        ],
        points: [
          "Define the critical service and acceptable recovery objectives.",
          "Test identity and privileged-access paths across employees, suppliers, and machines.",
          "Verify that logs support detection and investigation, not only retention.",
          "Assign remediation owners and retest material findings.",
        ],
      },
      {
        title: "Treat AI security as a system problem.",
        copy: [
          "AI risk does not sit inside the model alone. It appears in the documents used for context, the identities making requests, the tools an agent can call, the applications receiving output, and the people deciding whether to act on it. Controls should therefore cover data minimization, retrieval permissions, prompt and content handling, tool allowlists, approval thresholds, audit logs, evaluation, and a safe fallback path.",
          "Bounded authority is especially important for agentic systems. Reading an approved knowledge base is a different risk class from changing a customer record, initiating a payment, or sending an external message. We map these authority levels and require stronger validation, separation of duties, and human confirmation as consequence and uncertainty increase.",
        ],
        points: [
          "Keep high-consequence actions behind explicit human approval.",
          "Test indirect prompt injection through documents, webpages, and connected tools.",
          "Record model inputs, tool calls, approvals, outputs, and exceptions within policy limits.",
          "Define stop conditions and manual operation before production access is granted.",
        ],
      },
      {
        title: "Make sovereignty and supplier access inspectable.",
        copy: [
          "Organizations should be able to show where sensitive data is processed and stored, who can administer the service, which subcontractors participate, and what happens during support or recovery. UAE cloud regions and sovereign service options can be part of the answer, but the architecture must also account for logs, backups, telemetry, model endpoints, developer access, and data leaving through integrated workflows.",
          "Applicable UAE, emirate, free-zone, and sector requirements vary. Legal and regulatory interpretations should be confirmed by qualified advisers. Our contribution is the technical evidence: data-flow maps, identity boundaries, control ownership, configuration records, test results, and an operating model that makes compliance assertions verifiable.",
        ],
      },
      {
        title: "Build response around decisions people can rehearse.",
        copy: [
          "An incident plan should tell each role what decisions it owns, what evidence it needs, how to communicate, and when to escalate. Tabletop exercises are most valuable when they use a realistic service, supplier, data set, and sequence of incomplete signals rather than a generic breach story.",
          "The output is a short improvement backlog with owners and dates: monitoring gaps, access changes, recovery tests, contact routes, decision thresholds, and customer or authority communications where applicable. Technical recovery is only one part of the exercise; operational continuity and executive judgment are equally important.",
        ],
      },
    ],
    faqs: [
      {
        question: "What cybersecurity services do you provide in the UAE?",
        answer: "We focus on security architecture, threat modelling, application and cloud security, secure software delivery, AI and agent controls, technical assurance, and incident-readiness exercises. The exact scope follows the assets and decisions the organization needs to protect.",
      },
      {
        question: "Can you assess the security of an AI or agentic AI system?",
        answer: "Yes. We examine data and retrieval permissions, prompt injection, model and tool access, excessive agency, output handling, auditability, human approvals, monitoring, and failure recovery as one end-to-end system.",
      },
      {
        question: "Does a cybersecurity review guarantee compliance?",
        answer: "No. A technical review can provide evidence and identify gaps, but legal or regulatory compliance depends on the organization's obligations and should be confirmed with qualified legal and sector advisers.",
      },
      {
        question: "How quickly can a cybersecurity engagement start?",
        answer: "A focused architecture or readiness review can often be framed in a short discovery. Timing then depends on system access, stakeholder availability, assurance depth, and whether the work includes implementation or retesting.",
      },
    ],
  },
  {
    slug: "application-development",
    name: "Application development",
    eyebrow: "Application development services in the UAE",
    headline: "Application development services in Abu Dhabi and the UAE.",
    title: "Design and deliver applications around the work that creates value.",
    description:
      "Application development services in Abu Dhabi and the UAE for secure web, mobile, internal, customer, and AI-enabled applications with clear ownership.",
    summary:
      "We design and engineer applications for workflows that generic platforms cannot serve well. Product discovery, experience design, architecture, integration, secure delivery, and handover remain one accountable path from the first operating problem to a maintained production service.",
    image: "/media/capability-custom-software-v1.jpg",
    imageAlt: "Application development services for organizations in Abu Dhabi and the UAE",
    primaryKeyword: "application development UAE",
    relatedKeywords: [
      "application development company UAE",
      "application development Abu Dhabi",
      "web application development UAE",
      "custom application development services",
    ],
    outcomes: [
      "A product definition tied to user and operating evidence",
      "A secure application that fits current data, identity, and systems",
      "Working releases with explicit acceptance and quality measures",
      "Source, documentation, environments, and knowledge under client control",
    ],
    capabilities: [
      {
        title: "Web and mobile applications",
        copy: "Build responsive customer, partner, field, and workforce experiences around real tasks, environments, accessibility needs, and service constraints.",
      },
      {
        title: "Internal business platforms",
        copy: "Replace fragmented spreadsheets, inboxes, approvals, and reporting with role-based software that makes ownership and status visible.",
      },
      {
        title: "AI-enabled applications",
        copy: "Integrate search, generation, classification, computer vision, or agentic workflows where they produce a measurable user outcome and can be governed.",
      },
      {
        title: "Modernization and integration",
        copy: "Refactor high-friction journeys, expose stable interfaces, and move legacy capabilities in controlled increments instead of relying on a high-risk rewrite.",
      },
    ],
    process: [
      {
        title: "Discover the product boundary",
        copy: "Define users, jobs, evidence, constraints, system dependencies, assurance needs, and the smallest release that changes an operating outcome.",
      },
      {
        title: "Prototype the risk",
        copy: "Test the hardest workflow, integration, data, security, or adoption assumption before expanding the solution and delivery team.",
      },
      {
        title: "Build in accepted increments",
        copy: "Design, engineer, test, and demonstrate production-shaped slices with visible quality measures and decisions at each milestone.",
      },
      {
        title: "Release, operate, and transfer",
        copy: "Deploy through controlled environments, observe real use, resolve operating gaps, and complete documentation, training, and handover.",
      },
    ],
    guidance: [
      {
        title: "Evaluate an application development company on delivery control.",
        copy: [
          "A strong Abu Dhabi or UAE application development company should be able to explain how product decisions, architecture, security, testing, and release ownership work together. Ask who owns the backlog and technical decisions, where source code and cloud environments live, how quality is measured, and what evidence is required before a milestone is accepted.",
          "Relevant experience is more than a portfolio image. Look for evidence of production operation, integration with comparable systems, accessibility and performance practice, secure development, support, and a clean client handover. References should describe how the team handled uncertainty and failure, not only whether the interface looked polished.",
        ],
        points: [
          "Use paid discovery to retire material uncertainty before a large estimate.",
          "Require access to repositories, issue history, environments, and release evidence.",
          "Set performance, accessibility, security, and support expectations as acceptance criteria.",
          "Confirm who maintains the service after launch and how knowledge is transferred.",
        ],
      },
      {
        title: "Make IP, escrow, and exit terms explicit.",
        copy: [
          "The contract should state which project-specific materials are assigned to the client, which pre-existing components remain with a supplier, how open-source and commercial dependencies are handled, and when ownership transfers. The UAE Federal Copyright Law, Federal Decree-Law No. 38 of 2021, forms part of the legal context, but specific drafting and enforceability should be reviewed by UAE counsel.",
          "Operational independence also requires the practical assets: current source, build instructions, infrastructure definitions, credentials under client control, architecture records, test suites, a software bill of materials where appropriate, and data export procedures. Source-code escrow or step-in provisions may reduce continuity risk when the application is critical and immediate repository access alone is insufficient.",
        ],
        points: [
          "Identify background IP and project IP before delivery begins.",
          "Record every material third-party service, licence, and renewal obligation.",
          "Define exit assistance, documentation quality, and knowledge-transfer hours.",
          "Test that a separate team can build and deploy the application before final acceptance.",
        ],
      },
      {
        title: "Price the route to production, not only engineering days.",
        copy: [
          "Local day rates vary by role, seniority, engagement model, and assurance requirement. A practical planning range for experienced product, design, engineering, data, and security specialists can be roughly AED 2,000–5,500 per day, but a blended rate hides whether senior expertise is actually present at the critical moments. Compare proposals against team composition, assumptions, and accepted outcomes.",
          "A short discovery or validation phase may run two to four weeks. A focused application release often takes eight to sixteen weeks, while multi-role platforms and legacy modernization should be staged over longer periods. Budget should include product discovery, experience design, architecture, engineering, testing, security, cloud services, rollout, analytics, support, and contingency for dependencies outside the delivery team's control.",
        ],
      },
      {
        title: "Design for UAE operation from the first release.",
        copy: [
          "Production design should account for Arabic and English experiences where required, right-to-left layout, accessibility, mobile conditions, identity integration, local support expectations, and the location and sensitivity of data. Hosting in a UAE cloud region may support residency objectives, but the full data path, including backups, analytics, logs, support access, and third-party APIs, must be reviewed.",
          "Where personal data is processed, teams should map purpose, fields, access, retention, deletion, and transfers so the organization can assess the UAE Personal Data Protection Law and any sector or free-zone obligations. Technical controls support that assessment; they do not replace qualified legal advice.",
        ],
      },
    ],
    faqs: [
      {
        question: "What types of applications do you develop?",
        answer: "We build secure web, mobile, internal, customer, partner, and AI-enabled applications, as well as focused modernization layers around existing systems. We recommend custom development only when it serves a clear operating or strategic need.",
      },
      {
        question: "How much does application development cost in the UAE?",
        answer: "Cost depends on product uncertainty, team composition, integrations, data quality, assurance, and support. Experienced specialist roles may be planned around roughly AED 2,000–5,500 per day, but we prefer milestone estimates that show the complete route to an accepted production outcome.",
      },
      {
        question: "How long does it take to build a business application?",
        answer: "A two-to-four-week discovery can frame the decision. A focused production release often takes eight to sixteen weeks. Complex platforms, regulated workflows, legacy modernization, and multi-system dependencies should be delivered in phases.",
      },
      {
        question: "Will our organization own the source code and application?",
        answer: "Ownership, licensing, third-party components, repositories, credentials, documentation, and transition obligations should be explicit in the agreement. We support a handover model that gives the client practical control; legal terms should be reviewed by UAE counsel.",
      },
    ],
  },
  {
    slug: "ai-experts-on-demand",
    name: "AI experts on demand",
    eyebrow: "AI talent in the UAE",
    headline: "AI experts on demand, for the exact capability gap.",
    title: "We want to implement AI, but we don't have the internal expertise.",
    description:
      "AI talent in the UAE from a curated network of 50+ vetted AI and IT specialists for project, fractional, embedded, and full-team delivery.",
    summary:
      "OneBonsai Gulf connects a defined business and delivery need to a curated network of more than 50 vetted AI and IT specialists, local and international. Engage one fractional advisor, an expert embedded with your team, or a multidisciplinary delivery unit, and change the capacity as the work evolves.",
    image: "/media/uae-ai-boardroom-v1.jpg",
    imageAlt: "AI specialists planning an enterprise delivery program in Abu Dhabi",
    primaryKeyword: "AI talent UAE",
    relatedKeywords: ["AI staff augmentation UAE", "hire AI engineers Dubai", "AI specialists Abu Dhabi", "fractional AI team"],
    outcomes: [
      "The exact skills and seniority required for the next delivery stage",
      "One accountable operating model across local and international specialists",
      "Technical project management alongside recruitment and deployment",
      "Capacity that can increase, reduce, or change as the work matures",
    ],
    capabilities: [
      {
        title: "Strategy",
        copy: "AI transformation leaders, AI advisors, and AI governance specialists help frame decisions, prioritise the portfolio, establish responsible operating boundaries, and keep delivery tied to the intended business outcome.",
      },
      {
        title: "Build",
        copy: "AI and machine-learning engineers, LLM and generative AI developers, and AI agent developers turn a bounded requirement into working software, integrations, evaluations, and maintainable production components.",
      },
      {
        title: "Data",
        copy: "Data scientists, data engineers, and MLOps specialists prepare the information and operating pipelines required to train, retrieve, evaluate, monitor, and improve AI-enabled systems.",
      },
      {
        title: "Specialist",
        copy: "Computer vision, natural-language processing, and predictive-analytics specialists join when the use case requires deeper capability than a general delivery team should claim to provide.",
      },
      {
        title: "Integrate",
        copy: "Enterprise architects, automation specialists, and cloud and AI integration experts connect models and applications to existing systems, data, security, approvals, and operational workflows.",
      },
      {
        title: "Enable",
        copy: "AI trainers, change specialists, and responsible-AI subject-matter experts help leaders and teams adopt new systems, understand their limits, and operate them with clear human accountability.",
      },
    ],
    process: [
      {
        title: "Define",
        copy: "Identify the exact skills, seniority, scope, engagement shape, and expected outcome. This prevents a broad AI brief from becoming a vague search for people with overlapping titles.",
      },
      {
        title: "Match",
        copy: "Select the specialist or multidisciplinary team from the network against the defined work, required experience, working model, and relationship with the client's existing team.",
      },
      {
        title: "Deploy",
        copy: "Experts advise, build, integrate, train, or embed with the client's team. The assignment has a visible outcome and a clear place inside the wider delivery plan.",
      },
      {
        title: "Operate",
        copy: "OneBonsai Gulf handles recruitment, deployment, and technical project management so specialist contributions remain coordinated rather than becoming a collection of disconnected placements.",
      },
      {
        title: "Scale",
        copy: "Increase, reduce, or change specialist capacity as the project evolves. A team can begin with five advisors and scale down to two as the work matures and responsibilities transfer.",
      },
    ],
    guidance: [
      {
        title: "Choose the engagement shape from the work.",
        copy: [
          "A project-based specialist is useful when the outcome and boundary are already clear. A fractional expert can provide senior judgement without creating a full-time role. An embedded specialist works inside the client's team, while a full delivery team combines the roles required to advise, build, integrate, and enable the change.",
          "The first decision is therefore not how many people to hire. It is which capability gap prevents the organisation from moving, what that gap must produce, and how the specialist will work with the people who already own the systems and process.",
        ],
        points: [
          "Use one specialist when the gap is narrow and ownership already exists.",
          "Use a multidisciplinary team when strategy, data, engineering, integration, and adoption must move together.",
          "Use an embedded model when internal capability and transfer matter alongside delivery.",
          "Use fractional leadership when senior direction is needed at defined decision points.",
        ],
      },
      {
        title: "Plan for capacity to move in both directions.",
        copy: [
          "AI delivery rarely needs the same mix from start to finish. Early work may require advisors, governance specialists, architects, and data expertise. Build and integration then become more prominent. Training and change capability matter as the system reaches users. The team shape should follow those stages rather than remain fixed for administrative convenience.",
          "Capacity can also reduce. A group of five advisors may scale down to two as decisions settle and the client's team takes greater ownership. Operating the engagement through one technical delivery model makes that change explicit: responsibilities, remaining outcomes, handover, and knowledge transfer can move with the team size.",
        ],
        points: [
          "Define the evidence required before adding another specialist.",
          "Review role overlap as delivery moves from advice into build and operation.",
          "Reduce capacity deliberately when work matures rather than extending placements by default.",
          "Keep technical project management continuous while individual roles change.",
        ],
      },
    ],
    faqs: [
      {
        question: "We want to implement AI but don't have the internal expertise. Where do we start?",
        answer: "Start by defining the business outcome, current workflow, systems involved, constraints, and the first decision that needs specialist support. We use that definition to identify the required skill, seniority, and engagement shape. The answer may be one fractional advisor, an embedded engineer, or a multidisciplinary team. Recruitment, deployment, and technical project management then sit inside one delivery model rather than beginning with a generic search for AI roles.",
      },
      {
        question: "Can we hire one specialist rather than a whole team?",
        answer: "Yes. A single specialist can work project-by-project, fractionally, or embedded with your existing team when the capability gap is specific and the surrounding ownership already exists. Available roles cover strategy, build, data, specialist AI disciplines, integration, and enablement. If the work later requires additional capability, the assignment can expand without forcing you to commit to a full team at the beginning.",
      },
      {
        question: "Do your experts work on site in the UAE or remotely?",
        answer: "Both models are available through a curated network of more than 50 vetted local and international AI and IT specialists. The working arrangement follows the project, the required access, and how closely the expert must collaborate with operational or technical teams. We define on-site, remote, or combined expectations during matching so the delivery model is clear before deployment.",
      },
      {
        question: "What happens when the project scales down?",
        answer: "Capacity can reduce as well as increase. For example, a team may start with five advisors and move down to two as the work matures. We review which outcomes remain, which responsibilities transfer to your team, and which expertise is still needed. Technical project management continues through the change so handover and accountability do not disappear when individual assignments end.",
      },
      {
        question: "How is this different from a recruitment agency?",
        answer: "The service is built around delivery, not placement alone. OneBonsai Gulf helps define the capability gap, matches the specialist or team, handles recruitment and deployment, and provides technical project management across the engagement. Experts have a stated role inside the outcome, and the capacity can change as the work moves from advice to build, integration, operation, or transfer.",
      },
      {
        question: "Can experts embed with our existing team?",
        answer: "Yes. Embedded delivery is one of the available engagement shapes. A specialist can work alongside your product, engineering, data, operations, governance, or change team while retaining a defined scope and expected outcome. This works well when the organisation wants delivery and internal capability to develop together. We agree responsibilities and technical project management before deployment so embedded work does not create unclear ownership.",
      },
    ],
  },
  {
    slug: "digital-twins-simulation",
    name: "Digital twins & simulation",
    eyebrow: "Digital twin technology in the UAE",
    headline: "Digital twins and industrial simulation for UAE operations.",
    title: "Test the next operational decision before changing the physical system.",
    description:
      "Digital twin technology and industrial simulation in the UAE for testing assets, workflows and capacity changes before committing to live operations.",
    summary:
      "A digital twin connects a physical asset, workflow, or facility to a virtual replica that teams can inspect and test. It can expose the next constraint in an industrial process, make complex maintenance repeatable, and reduce dependence on the availability of the live asset.",
    image: "/media/digital-platform.avif",
    imageAlt: "Operational data connecting a physical asset to its digital twin",
    primaryKeyword: "digital twin UAE",
    relatedKeywords: ["digital twin technology", "industrial simulation UAE", "what is a digital twin", "predictive maintenance simulation"],
    outcomes: [
      "Operational changes tested before capital is committed",
      "Repeatable procedure training without live asset risk",
      "Earlier visibility of capacity constraints and dependencies",
      "Consistent assessment without waiting for asset availability",
    ],
    capabilities: [
      {
        title: "Physical-to-virtual modelling",
        copy: "Represent the parts of an asset, workflow, or facility that matter to the decision, then connect the operational data and behaviour required to make the virtual replica useful.",
      },
      {
        title: "Industrial capacity simulation",
        copy: "Model proposed equipment and process changes to find where the next constraint appears. The result helps a team examine the wider system before committing capital to one component.",
      },
      {
        title: "Maintenance rehearsal",
        copy: "Recreate a complex procedure so technicians can practise its sequence, spatial relationships, decisions, and errors without tying up the live aircraft, equipment, or facility.",
      },
      {
        title: "Training and assessment",
        copy: "Turn the model into repeatable practice with consistent instructions, observable actions, and assessment standards across learners, teams, and locations.",
      },
      {
        title: "Tested operational change",
        copy: "Compare configurations in the virtual replica, understand their downstream effect, and return tested changes to the physical operation through an accountable decision process.",
      },
    ],
    process: [
      {
        title: "Define the decision",
        copy: "State the operational question, asset or workflow boundary, current constraint, and evidence needed. The model includes what the decision requires, not every physical detail available.",
      },
      {
        title: "Map the physical system",
        copy: "Identify the relevant equipment, people, steps, capacities, dependencies, source data, expected behaviour, and failure conditions that the virtual replica must represent.",
      },
      {
        title: "Build and validate the replica",
        copy: "Model the defined system and review its behaviour with the people who know the live asset or procedure. Resolve material gaps before using it to compare changes or assess learners.",
      },
      {
        title: "Test, decide, and update",
        copy: "Run the required scenarios, compare constraints or performance, document the evidence, and feed the approved change back into operations. Update the model when the relevant system changes.",
      },
    ],
    guidance: [
      {
        title: "Find the next constraint before funding the first change.",
        copy: [
          "Consider an offshore rig where a team is examining worker effectiveness and an equipment upgrade. Raising pump capacity from 1,000 litres per hour to 3,000 litres per hour appears to solve the immediate limit. A simulation can show whether storage then becomes the new bottleneck. The value is not the visual model; it is seeing the next system constraint before spending on the first upgrade.",
          "The useful boundary follows the decision. It may include equipment capacities, storage, handoffs, timing, worker actions, and failure states, while excluding physical detail that does not affect the question. Source data and assumptions should remain visible so decision-makers know what the result represents and where judgement is still required.",
        ],
        points: [
          "Define the capital or operating decision before choosing the modelling detail.",
          "Include downstream dependencies that can become the new limiting factor.",
          "Separate observed operating data from assumptions used in a scenario.",
          "Record which tested change was approved for the physical operation.",
        ],
      },
      {
        title: "Train on the asset without taking it out of service.",
        copy: [
          "Aviation maintenance illustrates the operating case. Technicians can rehearse a complex procedure such as replacing the front wheel on a wide-body aircraft inside a virtual environment. Physical training otherwise requires the aircraft to be available, ties up expensive equipment, and introduces operational risk. Simulation allows the sequence and decisions to be repeated without those three conditions.",
          "The financial exposure also matters: damage during a complex procedure can exceed €1,000,000 per incident. The simulation should therefore represent the steps, spatial relationships, tools, errors, and assessment points that affect competence. It supports repeatable preparation and consistent standards before supervised work on the live asset.",
        ],
        points: [
          "Use simulation when live asset availability limits training windows.",
          "Make critical sequence, positioning, and error states observable.",
          "Apply one assessment standard across teams and locations.",
          "Retain supervised live practice where the competence requires it.",
        ],
      },
    ],
    faqs: [
      {
        question: "What is a digital twin?",
        answer: "A digital twin is a virtual replica of a physical asset, workflow, or facility used to test changes before making them in the real world. It represents the relevant data, behaviour, capacities, and dependencies behind a defined decision. Teams can use it to compare configurations, find constraints, rehearse procedures, or assess performance without interrupting the live operation.",
      },
      {
        question: "How is a digital twin different from a 3D model or a VR simulation?",
        answer: "A 3D model describes appearance and spatial form. A VR simulation creates an interactive experience. A digital twin is defined by the operating relationship: it represents a physical asset, workflow, or facility so data can inform the virtual replica and tested changes can inform the real system. A digital twin may use 3D or VR, but neither alone creates that two-way operational purpose.",
      },
      {
        question: "What data does a digital twin need to be useful?",
        answer: "It needs the information required by the decision being tested. That can include equipment capacities, process timing, worker actions, storage limits, dependencies, sequence, operating conditions, and defined failure states. The model should distinguish observed data from assumptions. More data is not automatically better; each element should materially affect the scenario, constraint, procedure, or outcome under examination.",
      },
      {
        question: "How long does it take to build one?",
        answer: "[VERIFY: typical timeline] The duration depends on the decision boundary, the physical detail required, data availability, number of interacting systems, procedure complexity, validation access, and whether the output includes training or assessment. We first define the decision and evidence, then estimate the model, data connection, validation, scenarios, and deployment as visible stages rather than assigning one duration to every digital twin.",
      },
      {
        question: "Where do digital twins deliver the most value?",
        answer: "They are useful where a physical change is costly, the next system constraint is hard to see, asset availability limits training, or live practice introduces risk. Industrial capacity planning and complex aviation maintenance are two examples. The strongest case begins with a material operational or capital decision, then models only the physical behaviour, workflow, data, and dependencies needed to improve that decision.",
      },
    ],
  },
  {
    slug: "uae-market-entry",
    name: "UAE market entry",
    eyebrow: "UAE and GCC market entry",
    headline: "Enter the GCC market from Abu Dhabi.",
    title: "Sometimes the problem is not technology. It is access.",
    description:
      "UAE market entry from Abu Dhabi: entity setup, licensing, visas, partner introductions, representation, and a team that can also build the technology.",
    summary:
      "OneBonsai Gulf is a strategic partner of Masdar City Free Zone in Abu Dhabi. We provide international technology companies entering the GCC, and regional companies expanding through the OneBonsai group's European network, with a combined technical, operational, and administrative launchpad.",
    image: "/media/uae-port-ai-v1.jpg",
    imageAlt: "Abu Dhabi gateway connecting businesses into the GCC and international markets",
    primaryKeyword: "UAE market entry",
    relatedKeywords: ["business setup Abu Dhabi", "GCC market entry", "Masdar City free zone", "company formation UAE"],
    outcomes: [
      "A defined route through entity setup, licensing, and visa proceedings",
      "Local partner introductions and market representation from Abu Dhabi",
      "One launch plan across administrative, operational, and technical work",
      "A two-way route into the GCC or outward through the group's European network",
    ],
    capabilities: [
      {
        title: "Legal entity setup",
        copy: "Coordinate the practical steps required to establish the agreed UAE entity through the Abu Dhabi launch path, keeping the company setup tied to the operating plan it is meant to support.",
      },
      {
        title: "Licensing and visas",
        copy: "Support licensing and visa proceedings as part of one market-entry workstream, with dependencies, responsibilities, and next actions visible to the company entering the region.",
      },
      {
        title: "Local partner introductions",
        copy: "Connect an international technology company to relevant local relationships where introductions are required to understand the market, shape the route, or begin operating in the GCC.",
      },
      {
        title: "Market representation",
        copy: "Provide an Abu Dhabi base for the conversations and regional coordination required before an incoming company has established its own complete local operating capacity.",
      },
      {
        title: "Technology delivery after setup",
        copy: "Keep company establishment connected to execution. The same team can advise, build, integrate, and run the required technology once the entity exists rather than ending at formation paperwork.",
      },
    ],
    process: [
      {
        title: "Define the direction",
        copy: "Confirm whether the company is entering the GCC through Abu Dhabi or expanding outward through the OneBonsai group's European network, and state the intended operating outcome.",
      },
      {
        title: "Frame the launch",
        copy: "Identify the required entity, licence, visa proceedings, local relationships, representation, and technical work so the administrative route supports the actual business model.",
      },
      {
        title: "Coordinate establishment",
        copy: "Manage the agreed entity-setup, licensing, and visa workstreams through the Masdar City Free Zone partnership while keeping responsibilities and unresolved items visible.",
      },
      {
        title: "Open the market path",
        copy: "Make relevant local partner introductions and provide market representation from Abu Dhabi as the company builds its own relationships and regional operating presence.",
      },
      {
        title: "Build and operate",
        copy: "Move from setup into the technology, integration, delivery, or specialist capacity required to operate. The launchpad remains connected to execution after the legal entity exists.",
      },
    ],
    guidance: [
      {
        title: "Treat company setup as one part of market entry.",
        copy: [
          "An entity and licence create the administrative basis for operating; they do not by themselves create market access or delivery capacity. A useful entry plan connects legal entity setup, licensing, visa proceedings, local partner introductions, market representation, and the technology work the company expects to perform once established.",
          "That is the distinction between this service and a company-formation agent. OneBonsai Gulf provides a bundled technical, operational, and administrative launchpad. The same team can continue into advice, software, AI, integration, or specialist delivery instead of handing the company a completed setup process with no route into execution.",
        ],
        points: [
          "State the operating model before selecting the setup path.",
          "Keep licensing, visas, relationships, and technical delivery in one dependency view.",
          "Define what local representation must accomplish before internal capacity is established.",
          "Plan the first operating workstream alongside entity establishment.",
        ],
      },
      {
        title: "Use Abu Dhabi as a two-direction gateway.",
        copy: [
          "For international technology companies, the path runs into the GCC: establish through Abu Dhabi, coordinate the required proceedings, develop local relationships, and connect the technical offer to regional operation. OneBonsai Gulf's strategic partnership with Masdar City Free Zone provides the approved establishment path inside that broader launch model.",
          "The direction also runs outward. GCC companies can use the wider OneBonsai group's European network when expanding internationally. In both directions, the value comes from connecting access to operational and technical execution, with a regional team accountable for the launch rather than treating geography as a paperwork exercise.",
        ],
        points: [
          "Into the GCC: combine Abu Dhabi setup, local relationships, and regional execution.",
          "Out to the world: connect a GCC company to the group's European network.",
          "Use market representation as a bridge, not a substitute for a durable operating team.",
          "Measure progress by operating capability as well as administrative completion.",
        ],
      },
    ],
    faqs: [
      {
        question: "What does the Masdar City Free Zone partnership give us?",
        answer: "OneBonsai Gulf is a strategic partner of Masdar City Free Zone in Abu Dhabi. The partnership supports the entity-setup path inside a wider market-entry service. We connect that administrative route to licensing, visa proceedings, local partner introductions, representation, and the technical work required after establishment. The objective is an operating launchpad, not a completed formation process with no execution plan.",
      },
      {
        question: "Can you handle licensing and visas?",
        answer: "Yes. Licensing and visa proceedings are part of the service, alongside legal entity setup. We first frame the intended operating model and then coordinate the agreed workstreams with their dependencies and responsibilities visible. This keeps the administrative process connected to the people, relationships, and technology the company will need once it begins operating from Abu Dhabi.",
      },
      {
        question: "We are a technology company entering the GCC. Where do we start?",
        answer: "Start with the operating outcome: what the company intends to offer, which regional relationships matter, which people need to be based locally, and what technical work must begin after establishment. We then frame the entity, licensing, visas, partner introductions, representation, and delivery capacity as one launch plan through Abu Dhabi rather than treating formation as the complete market-entry strategy.",
      },
      {
        question: "Do you only work with technology companies?",
        answer: "The service is positioned around a technical, operational, and administrative launchpad. International technology companies entering the GCC are a direct fit because the same team can continue into software, AI, integration, and specialist delivery after setup. For another organisation, we first examine whether that combined model matches the intended operation rather than presenting formation as a standalone service.",
      },
      {
        question: "What does setup cost?",
        answer: "[VERIFY: fee structure] The complete cost depends on the agreed entity-setup path, licensing, visa proceedings, representation, introductions, and any technical or operational delivery included in the launch. We separate those workstreams in the scope so a company can see which fees relate to establishment and which relate to market access or execution, rather than presenting one unexplained formation figure.",
      },
    ],
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
