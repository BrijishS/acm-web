import { Domain, EventItem, ProjectItem, GalleryItem } from '../types';

// ============================================================================
// 1. OFFICIAL CHAPTER IDENTITY (Section 1 & 2)
// ============================================================================
export const CHAPTER_INFO = {
  name: "VISTAS ACM",
  fullName: "VISTAS ACM Student Chapter",
  organization: "Association for Computing Machinery (ACM)",
  institution: "Vels Institute of Science, Technology and Advanced Studies (VISTAS)",
  school: "School of Engineering",
  department: "Department of Computer Science and Engineering",
  professionalSociety: "Association for Computing Machinery (ACM)",
  groupId: "199704",
  academicYear: "2026–2027",
  chapterId: "199704",
  tagline: "Build. Lead. Create.",
  headline: "VISTAS ACM Student Chapter",
  subheadline: "VISTAS ACM · Ideas into impact",
  lead: "VISTAS ACM Student Chapter — a community for curious minds, practical ideas, and better things built together. Build. Lead. Create. School of Engineering · Department of Computer Science and Engineering · Academic Year 2026–2027 · ACM Chapter Group ID 199704.",
  intro: "VISTAS ACM is a place to connect with people who enjoy asking questions and building useful things. We make room for learning at every level and for ideas to grow through collaboration.",
  location: "Department of Computer Science and Engineering, School of Engineering, Vels Institute of Science, Technology and Advanced Studies (VISTAS), Pallavaram, Chennai, Tamil Nadu 600117, India",
  campusLocationStatus: "To be confirmed",
  email: "To be confirmed",
  facultyCoordinatorEmail: "nudayakumar.se@vistas.ac.in",
  instagramUrl: "https://www.instagram.com/vistas_acm/",
  instagramHandle: "@vistas_acm",
  facultyAdvisor: {
    name: "Mr. N. Udayakumar",
    designation: "Assistant Professor, Department of Computer Science and Engineering",
    responsibilities: "Provides overall guidance and mentoring, coordinates with the department and ACM, reviews chapter activities, and monitors documentation and progress."
  },
  logoUrl: "/assets/vistas-acm-blue-logo.jpg",
  introVideoUrl: "/assets/vistas-intro-loader.mp4"
};

// ============================================================================
// 2. PURPOSE AND OBJECTIVES (Section 5)
// Title: Bridging Academic Learning and Professional Computing Practice.
// ============================================================================
export const CHAPTER_OBJECTIVES = [
  "Promoting awareness of emerging technologies and developments in computing.",
  "Encouraging participation in technical workshops, seminars, hackathons and competitions.",
  "Providing opportunities for interaction with industry experts, researchers and academic professionals.",
  "Developing student leadership, teamwork, communication and organizational skills.",
  "Encouraging research, innovation and project-based learning.",
  "Promoting ACM membership and participation in professional computing communities.",
  "Supporting lifelong learning and continuous professional development."
];

// ============================================================================
// 3. MEMBERSHIP INFORMATION (Section 6 & 10)
// ============================================================================
export const MEMBERSHIP_DATA = {
  activeMembersInInterface: 1598,
  activeAcmMembers: 9,
  originalMembersInAdmin: 2935,
  status: "In good standing · confirmed by the ACM Chapter Program Manager, November 2026 · Status active as of 2 October 2026.",
  documentation: "The chapter maintains membership information, student office-bearer details, activity reports, participation records, photographs and feedback documentation."
};

// ============================================================================
// 4. VISION AND MISSION (Section 7 & 3)
// ============================================================================
export const VISION_MISSION = {
  visionTitle: "Competent, ethical, collaborative graduates.",
  visionText: "To nurture technically competent, ethical, collaborative and professionally responsible computing graduates through active engagement with a recognized professional society.",
  missionTitle: "Enrichment, networking and leadership.",
  missionText: "To provide students with opportunities for technical enrichment, professional networking, leadership, teamwork, communication and continuous learning through chapter activities."
};

// ============================================================================
// 5. ABOUT US (Curiosity makes. / Learn it. Make it real.)
// ============================================================================
export const ABOUT_DATA = {
  title: "Curiosity makes.",
  lead: "A student community where computing is explored through shared learning, ambitious ideas, and hands-on making.",
  subheading: "Learn it. Make it real.",
  pillars: [
    {
      id: "explore",
      title: "Explore",
      description: "Discover a new topic, ask a better question, and learn alongside your peers.",
      icon: "Compass"
    },
    {
      id: "make",
      title: "Make",
      description: "Turn a thought into a prototype, a project, or a shared experience.",
      icon: "Code"
    },
    {
      id: "share",
      title: "Share",
      description: "Exchange what you know and make the community stronger for the next person.",
      icon: "Share2"
    }
  ],
  ideasHeading: "Ideas into impact.",
  coreValues: ["Discover", "Experiment", "Collaborate", "Contribute"],
  mission: "Mission: Make learning active.",
  vision: "Vision: Make ideas matter.",
  tenet: "Build, Lead, Create and Connect."
};

// ============================================================================
// 6. TECHNICAL DOMAINS (Section 8 & 4)
// 5 Official Domains with Detailed Sub-Technologies and Activities
// ============================================================================
export const DOMAINS_DATA: Domain[] = [
  {
    id: "ai-ml",
    code: "DOM-01",
    title: "AI & Machine Learning",
    highlight: "Intelligent Systems",
    category: "INTELLIGENT SYSTEMS",
    symbol: "✳",
    description: "Intelligent systems and data-driven ideas.",
    tags: ["Machine Learning", "Generative AI", "Neural Networks"],
    technologies: ["Machine Learning", "Generative AI", "Neural Networks"],
    activities: [
      "Machine learning model design and predictive training",
      "Generative AI experimentation and prompt workflows",
      "Neural network exploration and deep learning workshops"
    ],
    specs: [
      { label: "Domain", value: "AI & Machine Learning" },
      { label: "Technologies", value: "Machine Learning, Generative AI, Neural Networks" },
      { label: "Focus", value: "Intelligent Systems & Data-Driven Ideas" }
    ],
    hologramColor: "cerulean"
  },
  {
    id: "web-app",
    code: "DOM-02",
    title: "Web & App Development",
    highlight: "Thoughtful Engineering",
    category: "SOFTWARE ENGINEERING",
    symbol: "</>",
    description: "Design, code and thoughtful engineering.",
    tags: ["Frontend", "Backend", "Mobile Apps"],
    technologies: ["Frontend", "Backend", "Mobile Apps"],
    activities: [
      "Modern reactive frontend interfaces and design systems",
      "Scalable backend architecture, REST APIs and microservices",
      "Native and cross-platform mobile application engineering"
    ],
    specs: [
      { label: "Domain", value: "Web & App Development" },
      { label: "Technologies", value: "Frontend, Backend, Mobile Apps" },
      { label: "Focus", value: "Design, Code & Thoughtful Engineering" }
    ],
    hologramColor: "rose"
  },
  {
    id: "cybersecurity",
    code: "DOM-03",
    title: "Cybersecurity",
    highlight: "Digital Trust",
    category: "SYSTEMS SECURITY",
    symbol: "⌁",
    description: "Digital trust and safer technology.",
    tags: ["Network Security", "Ethical Hacking", "Digital Forensics"],
    technologies: ["Network Security", "Ethical Hacking", "Digital Forensics"],
    activities: [
      "Defensive network security audits and protocol analysis",
      "Ethical hacking drills, capture-the-flag competitions and security review",
      "Digital forensics investigation and threat analysis"
    ],
    specs: [
      { label: "Domain", value: "Cybersecurity" },
      { label: "Technologies", value: "Network Security, Ethical Hacking, Digital Forensics" },
      { label: "Focus", value: "Digital Trust & Safer Technology" }
    ],
    hologramColor: "cerulean"
  },
  {
    id: "data-cloud",
    code: "DOM-04",
    title: "Data & Cloud",
    highlight: "Organised & Scaled",
    category: "INFORMATION SYSTEMS",
    symbol: "▥",
    description: "Information organised and scaled.",
    tags: ["Data Analytics", "Cloud Computing", "Databases"],
    technologies: ["Data Analytics", "Cloud Computing", "Databases"],
    activities: [
      "Data analytics pipelines and pattern visualisations",
      "Cloud computing deployment, containerization and DevOps",
      "Relational and distributed database architecture design"
    ],
    specs: [
      { label: "Domain", value: "Data & Cloud" },
      { label: "Technologies", value: "Data Analytics, Cloud Computing, Databases" },
      { label: "Focus", value: "Information Organised and Scaled" }
    ],
    hologramColor: "cerulean"
  },
  {
    id: "emerging-tech",
    code: "DOM-05",
    title: "Emerging Tech",
    highlight: "New Tools",
    category: "FRONTIER COMPUTING",
    symbol: "⌘",
    description: "New tools and where they lead.",
    tags: ["IoT", "AR/VR", "Blockchain"],
    technologies: ["IoT", "AR/VR", "Blockchain"],
    activities: [
      "Internet of Things (IoT) sensors and embedded hardware",
      "Immersive AR/VR spatial environments and user interaction",
      "Decentralized ledger protocols and blockchain concepts"
    ],
    specs: [
      { label: "Domain", value: "Emerging Tech" },
      { label: "Technologies", value: "IoT, AR/VR, Blockchain" },
      { label: "Focus", value: "New Tools & Where They Lead" }
    ],
    hologramColor: "rose"
  }
];

// ============================================================================
// 7. CHAPTER ACTIVITIES – WHAT WE DO (Section 9 & 5)
// The 8 official activities
// ============================================================================
export const CHAPTER_ACTIVITIES = [
  {
    id: "act-01",
    title: "Technical Workshops",
    description: "Technical workshops and hands-on training programmes."
  },
  {
    id: "act-02",
    title: "Guest Lectures",
    description: "Guest lectures and expert interaction sessions."
  },
  {
    id: "act-03",
    title: "Seminars",
    description: "Seminars on emerging computing technologies."
  },
  {
    id: "act-04",
    title: "Hackathons & Contests",
    description: "Hackathons and coding competitions."
  },
  {
    id: "act-05",
    title: "Research & Innovation",
    description: "Research and innovation activities."
  },
  {
    id: "act-06",
    title: "Projects & Demos",
    description: "Project development and technical demonstrations."
  },
  {
    id: "act-07",
    title: "Industry Interaction",
    description: "Industry interaction and career guidance programmes."
  },
  {
    id: "act-08",
    title: "Training",
    description: "Training and professional development initiatives."
  }
];

// ============================================================================
// 8. UPCOMING EVENTS (Section 10 & 6)
// The 6 events
// ============================================================================
export const EVENTS_DATA: EventItem[] = [
  {
    id: "evt-01",
    title: "Hack the Vel",
    slug: "hack-the-vel",
    description: "24-hour hackathon. Bring your ideas, form a team, and build working solutions overnight.",
    event_date: "2026-12-18T09:00:00Z",
    venue: "School of Engineering, VISTAS",
    category: "Hackathon",
    status: "upcoming",
    attendeesEstimate: "Chapter Hackathon",
    featured: true,
    registration_url: "https://www.instagram.com/vistas_acm/"
  },
  {
    id: "evt-02",
    title: "Cipher Quest",
    slug: "cipher-quest",
    description: "Cryptic hunt testing logic, problem-solving, and cryptographic puzzle solving.",
    event_date: "2026-11-20T10:00:00Z",
    venue: "Department of Computer Science and Engineering, VISTAS",
    category: "Competition",
    status: "upcoming",
    attendeesEstimate: "Cryptic Hunt",
    featured: false,
    registration_url: "https://www.instagram.com/vistas_acm/"
  },
  {
    id: "evt-03",
    title: "Byte Brawl",
    slug: "byte-brawl",
    description: "Competitive coding sprint with algorithmic problem solving under time pressure.",
    event_date: "2026-11-28T14:00:00Z",
    venue: "Department of Computer Science and Engineering, VISTAS",
    category: "Competition",
    status: "upcoming",
    attendeesEstimate: "Coding Contest",
    featured: false,
    registration_url: "https://www.instagram.com/vistas_acm/"
  },
  {
    id: "evt-04",
    title: "Neural Nights",
    slug: "neural-nights",
    description: "Hands-on AI workshop exploring model architecture, prompt engineering, and neural pipelines.",
    event_date: "2026-12-05T17:00:00Z",
    venue: "School of Engineering, VISTAS",
    category: "Workshop",
    status: "upcoming",
    attendeesEstimate: "AI Workshop",
    featured: false,
    registration_url: "https://www.instagram.com/vistas_acm/"
  },
  {
    id: "evt-05",
    title: "Pixel Forge",
    slug: "pixel-forge",
    description: "Design sprint and frontend development workshop on modern UI/UX and reactive web apps.",
    event_date: "2026-12-12T10:30:00Z",
    venue: "School of Engineering, VISTAS",
    category: "Workshop",
    status: "upcoming",
    attendeesEstimate: "Design Sprint",
    featured: false,
    registration_url: "https://www.instagram.com/vistas_acm/"
  },
  {
    id: "evt-06",
    title: "Orbit Outreach",
    slug: "orbit-outreach",
    description: "School and community programme introducing foundational computing, code, and digital tools.",
    event_date: "2026-12-22T09:00:00Z",
    venue: "School of Engineering, VISTAS",
    category: "Tech Talk",
    status: "upcoming",
    attendeesEstimate: "School Outreach",
    featured: false,
    registration_url: "https://www.instagram.com/vistas_acm/"
  }
];

// ============================================================================
// 9. STUDENT PROJECTS / BUILDS (Section 11 & 7)
// Title: What We've Built / Made to matter.
// ============================================================================
export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "payload-01",
    title: "PAYLOAD-01: Campus Companion",
    category: "Web & App Development",
    description: "Timetables, notes and club updates for VISTAS in one app.",
    tags: ["Campus App", "Timetables", "Club Updates", "VISTAS"],
    status: "Active",
    metrics: [
      { label: "Target", value: "VISTAS Students" },
      { label: "Utility", value: "Campus Companion" },
      { label: "Status", value: "Operational" }
    ],
    featured: true
  },
  {
    id: "payload-02",
    title: "PAYLOAD-02: Exam Vault",
    category: "Data & Cloud",
    description: "A student-built archive of past papers with smart search.",
    tags: ["Archive", "Smart Search", "Past Papers"],
    status: "Active",
    metrics: [
      { label: "Target", value: "VISTAS Students" },
      { label: "Utility", value: "Exam Vault" },
      { label: "Status", value: "Operational" }
    ],
    featured: true
  },
  {
    id: "payload-03",
    title: "PAYLOAD-03: Rural Learn Kit",
    category: "Emerging Tech",
    description: "Offline-friendly learning tools for low-resource classrooms.",
    tags: ["Offline-Friendly", "Learning Tools", "Low-Resource"],
    status: "Active",
    metrics: [
      { label: "Target", value: "Low-Resource Classrooms" },
      { label: "Utility", value: "Rural Learn Kit" },
      { label: "Status", value: "Operational" }
    ],
    featured: false
  }
];

// ============================================================================
// 10. FUNCTIONS OF THE STUDENT COMMITTEE (Section 13 & 9)
// 7 Responsibilities
// ============================================================================
export const COMMITTEE_RESPONSIBILITIES = [
  "Promote awareness of professional practices, emerging computing technologies and developments in the discipline.",
  "Encourage students to participate in technical seminars, workshops, conferences and competitions.",
  "Strengthen programming, problem-solving, design, research and innovation skills.",
  "Provide opportunities to practise communication, teamwork, leadership and event-management skills.",
  "Facilitate interaction with academicians, researchers, alumni and industry professionals.",
  "Encourage ethical conduct, responsible computing and lifelong learning.",
  "Create a platform for students to share knowledge and collaborate on technical initiatives."
];

// ============================================================================
// 11. DETAILED COMMITTEE FUNCTIONS (Section 14 & 9)
// 10 Functions
// ============================================================================
export const DETAILED_COMMITTEE_FUNCTIONS = [
  {
    number: "01",
    title: "Annual Activity Planning",
    description: "Prepare and coordinate the annual activity plan, identifying relevant technical, professional, research and co-curricular activities for students."
  },
  {
    number: "02",
    title: "Technical and Professional Activities",
    description: "Organize technical workshops, guest lectures, seminars, hackathons, coding competitions and other professional development programmes."
  },
  {
    number: "03",
    title: "ACM Membership and Engagement",
    description: "Encourage students to become members of ACM and actively participate in ACM-sponsored programmes, professional networking opportunities and technical initiatives."
  },
  {
    number: "04",
    title: "Industry and Academic Interaction",
    description: "Coordinate with industry experts, resource persons, researchers and academic professionals to facilitate knowledge sharing and industry–academia interaction."
  },
  {
    number: "05",
    title: "Research and Innovation",
    description: "Promote research activities, innovative project development, technical presentations, paper writing and participation in research-oriented events."
  },
  {
    number: "06",
    title: "Student Skill Development",
    description: "Facilitate training programmes, technical learning sessions, project-based activities and initiatives that enhance technical, communication, leadership and teamwork skills."
  },
  {
    number: "07",
    title: "Event Documentation",
    description: "Maintain attendance records, event reports, photographs, feedback forms, participation details and other supporting documents for every chapter activity."
  },
  {
    number: "08",
    title: "Committee Meetings and Coordination",
    description: "Conduct student committee meetings, assign responsibilities, review activity progress and maintain records of meeting discussions and decisions."
  },
  {
    number: "09",
    title: "Publicity and Communication",
    description: "Promote chapter activities through announcements, posters, digital platforms, social media and other communication channels."
  },
  {
    number: "10",
    title: "Participation Monitoring and Improvement",
    description: "Review student participation, collect feedback, assess activity effectiveness and identify opportunities for improving future chapter activities."
  }
];

// ============================================================================
// 12. GOVERNANCE AND REVIEW (Section 15 & 9)
// 7 Stages
// ============================================================================
export const GOVERNANCE_STAGES = [
  {
    stage: 1,
    title: "Activity Plan Review",
    description: "The Faculty Advisor reviews the proposed annual activity plan and provides guidance on the relevance and implementation of planned activities."
  },
  {
    stage: 2,
    title: "Role-Based Coordination",
    description: "The Student Chairperson, Vice Chairperson, Secretary, Treasurer and functional heads coordinate activities according to their assigned responsibilities."
  },
  {
    stage: 3,
    title: "Periodic Progress Monitoring",
    description: "The Faculty Advisor periodically reviews the progress of planned activities, student participation and the functioning of the student committee."
  },
  {
    stage: 4,
    title: "Documentation and Record Maintenance",
    description: "The Secretary and respective activity coordinators maintain meeting minutes, attendance records, event reports, photographs, feedback and other relevant evidence."
  },
  {
    stage: 5,
    title: "Feedback and Evaluation",
    description: "Feedback from participating students and resource persons is reviewed to identify strengths, limitations and areas requiring improvement."
  },
  {
    stage: 6,
    title: "Continuous Improvement",
    description: "Observations from activity reviews and feedback are considered while preparing subsequent activity plans to improve student engagement and effectiveness."
  },
  {
    stage: 7,
    title: "Departmental Review",
    description: "Relevant chapter records, activity reports and supporting evidence are submitted for departmental review and institutional documentation."
  }
];

// ============================================================================
// 13. GALLERY (Moments together.)
// ============================================================================
export const GALLERY_DATA: GalleryItem[] = [
  {
    id: "gal-01",
    title: "VISTAS ACM Student Chapter Badge",
    description: "Official insignia and emblem of the VISTAS ACM Student Chapter (Group ID 199704).",
    event_name: "Chapter Identity",
    media_url: "/assets/vistas-acm-blue-logo.jpg",
    category: "Identity",
    date: "2026–2027"
  },
  {
    id: "gal-02",
    title: "Department of Computer Science & Engineering",
    description: "School of Engineering, Vels Institute of Science, Technology and Advanced Studies (VISTAS).",
    event_name: "Institutional Foundation",
    media_url: "/assets/vistas-acm-blue-logo.jpg",
    category: "Institution",
    date: "2026–2027"
  },
  {
    id: "gal-03",
    title: "Student Leadership Council",
    description: "Executive council operatives and functional heads coordinating chapter activities.",
    event_name: "Leadership Roster",
    media_url: "https://zwxjuhologbhmicfzrvx.supabase.co/storage/v1/object/public/vistas-media/team/d9e9e807-e97e-45b6-aac7-b105069b64f8.png",
    category: "Crew",
    date: "2026–2027"
  },
  {
    id: "gal-04",
    title: "Innovation & Research Lab",
    description: "Platform for technical learning, peer interaction and collaborative making.",
    event_name: "Technical Exploration",
    media_url: "https://zwxjuhologbhmicfzrvx.supabase.co/storage/v1/object/public/vistas-media/team/93e261f2-55b2-4f68-acf7-e667f2584912.png",
    category: "Research",
    date: "2026–2027"
  }
];

// ============================================================================
// 14. ASSISTANT KNOWLEDGE BASE
// ============================================================================
export const ASSISTANT_KNOWLEDGE = [
  {
    triggers: ["who are you", "what is this", "what is jarvis", "assistant"],
    response: "I am the intelligence assistant for the VISTAS ACM Student Chapter (Group ID 199704), Department of Computer Science and Engineering, School of Engineering, Vels Institute of Science, Technology and Advanced Studies (VISTAS).",
    suggestions: ["Explore Domains", "Chapter Profile", "Meet Team", "Governance Structure"]
  },
  {
    triggers: ["join", "membership", "how to join", "participate", "register"],
    response: "VISTAS ACM welcomes students across the School of Engineering. Connect with us on Instagram @vistas_acm or send a message via our contact form.",
    suggestions: ["Join Chapter", "View Domains", "Follow @vistas_acm"]
  },
  {
    triggers: ["domains", "technology", "divisions", "what do you do", "topics"],
    response: "VISTAS ACM focuses on 5 official technical domains: AI & Machine Learning, Web & App Development, Cybersecurity, Data & Cloud, and Emerging Tech.",
    suggestions: ["Explore Domains", "AI & ML", "Cybersecurity", "What We Do"]
  },
  {
    triggers: ["events", "hackathon", "workshops", "when is the next event"],
    response: "Our activities include Hack the Vel (24-hour hackathon), Cipher Quest, Byte Brawl, Neural Nights, Pixel Forge, and Orbit Outreach. Check our launches section.",
    suggestions: ["View Events", "Follow @vistas_acm"]
  },
  {
    triggers: ["team", "chairperson", "advisor", "leads", "crew"],
    response: "Our chapter operates under Faculty Advisor Mr. N. Udayakumar (Assistant Professor, Dept. of CSE) and Student Chairperson Mr. Brijish S, alongside 15 student office bearers.",
    suggestions: ["Meet the Team", "View Crew Roster", "View Governance"]
  },
  {
    triggers: ["governance", "committee", "functions", "structure", "sponsor"],
    response: "The student committee operates under the Faculty Advisor with 7 core responsibilities, 10 detailed operational functions, and a 7-stage review process.",
    suggestions: ["View Governance", "View Functions", "Crew Roster"]
  },
  {
    triggers: ["vistas", "vels", "where is", "institution", "location"],
    response: "VISTAS ACM is based at the Department of Computer Science and Engineering, School of Engineering, Vels Institute of Science, Technology and Advanced Studies (VISTAS), Pallavaram, Chennai, Tamil Nadu, India. ACM Chapter Group ID 199704.",
    suggestions: ["Chapter Profile", "Contact"]
  }
];
