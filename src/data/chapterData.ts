import { Domain, EventItem, ProjectItem, GalleryItem } from '../types';

export const CHAPTER_INFO = {
  name: "VISTAS ACM",
  fullName: "VISTAS ACM Student Chapter",
  organization: "Association for Computing Machinery (ACM)",
  institution: "Vels Institute of Science, Technology and Advanced Studies (VISTAS)",
  location: "Pallavaram, Chennai, Tamil Nadu 600117, India",
  charterDate: "May 19, 2025",
  chapterId: "VISTAS-ACM-STUDENT",
  headline: "ENGINEERING THE FUTURE. INNOVATING TOGETHER.",
  subheadline: "Explore technology, build solutions, collaborate with innovators and shape the future through VISTAS ACM.",
  lead: "A community for curious minds, practical ideas, and better things built together. Chartered under the world's largest educational and scientific computing society.",
  instagramUrl: "https://www.instagram.com/vistas_acm/",
  instagramHandle: "@vistas_acm",
  facultyCoordinatorEmail: "nudayakumar.se@vistas.ac.in",
  logoUrl: "/assets/vistas-acm-blue-logo.jpg",
  introVideoUrl: "/assets/vistas-intro-loader.mp4"
};

export const DOMAINS_DATA: Domain[] = [
  {
    id: "ai-ml",
    code: "DOM-01",
    title: "Artificial Intelligence & ML",
    highlight: "Autonomous Cognition",
    category: "INTELLIGENT SYSTEMS",
    symbol: "✳",
    description: "Architecting neural network pipelines, deep predictive computation, computer vision telemetry, and agentic LLM systems designed to solve real-world engineering bottlenecks.",
    tags: ["Machine Learning", "Neural Architectures", "Computer Vision", "Agentic AI", "NLP"],
    specs: [
      { label: "Core Focus", value: "Neural Inference & Agents" },
      { label: "Hardware Stack", value: "CUDA / Tensor Cores" },
      { label: "Lab Status", value: "Active Telemetry" }
    ],
    hologramColor: "cerulean"
  },
  {
    id: "web-systems",
    code: "DOM-02",
    title: "Web & Full-Stack Systems",
    highlight: "Distributed Interfaces",
    category: "DIGITAL EXPERIENCES",
    symbol: "</>",
    description: "Developing scalable, high-concurrency cloud-native web architectures, reactive micro-frontends, and cinematic WebGL interfaces that elevate user experiences.",
    tags: ["React / Next.js", "TypeScript", "Three.js", "Cloud Backends", "Distributed APIs"],
    specs: [
      { label: "Latency Benchmark", value: "< 25ms" },
      { label: "Architecture", value: "Micro-Frontend Edge" },
      { label: "Lab Status", value: "Deploying V2" }
    ],
    hologramColor: "rose"
  },
  {
    id: "cybersecurity",
    code: "DOM-03",
    title: "Cybersecurity & Defense",
    highlight: "Cryptographic Shield",
    category: "SYSTEMS SECURITY",
    symbol: "⌁",
    description: "Investigating zero-trust security topologies, protocol verification, defensive vulnerability research, and ethical red/blue team defensive exercises.",
    tags: ["Network Forensics", "Cryptography", "Penetration Auditing", "Zero-Trust", "Reverse Engineering"],
    specs: [
      { label: "Threat Level", value: "Zero-Day Monitoring" },
      { label: "Encryption", value: "Post-Quantum Standards" },
      { label: "Lab Status", value: "Shield Active" }
    ],
    hologramColor: "cerulean"
  },
  {
    id: "data-cloud",
    code: "DOM-04",
    title: "Data Science & Cloud",
    highlight: "Planetary Scale",
    category: "INFORMATION SYSTEMS",
    symbol: "▥",
    description: "Transforming high-throughput unstructured data lakes into actionable computational intelligence through scalable container orchestration and distributed streaming pipelines.",
    tags: ["Data Pipelines", "Kubernetes", "Snowflake / BigQuery", "Vector Stores", "Cloud Ops"],
    specs: [
      { label: "Data Throughput", value: "Real-Time Streaming" },
      { label: "Fault Tolerance", value: "99.99% Multi-Region" },
      { label: "Lab Status", value: "Syncing Nodes" }
    ],
    hologramColor: "cerulean"
  },
  {
    id: "robotics-iot",
    code: "DOM-05",
    title: "Robotics & Hardware Labs",
    highlight: "Physical Computing",
    category: "AUTONOMOUS MACHINES",
    symbol: "⚙",
    description: "Bridging code with physical hardware through kinematic robotic arm kinematics, embedded microcontroller programming, edge micro-sensors, and autonomous rovers.",
    tags: ["ROS 2", "Kinematic Servos", "ESP32 / ARM Cortex", "Lidar SLAM", "Embedded C++"],
    specs: [
      { label: "Control Loop", value: "1000 Hz Real-Time" },
      { label: "Sensory Array", value: "Lidar + IMU + Vision" },
      { label: "Lab Status", value: "Servos Calibrated" }
    ],
    hologramColor: "rose"
  },
  {
    id: "mobile-ecosystem",
    code: "DOM-06",
    title: "App & Edge Ecosystems",
    highlight: "Ubiquitous Access",
    category: "MOBILE INTELLIGENCE",
    symbol: "📱",
    description: "Designing performant mobile applications engineered with offline-first synchronization, low battery telemetry, native device hardware utilization, and adaptive UI.",
    tags: ["Flutter / React Native", "Kotlin", "Swift", "Offline First", "BLE Sensors"],
    specs: [
      { label: "Frame Rate", value: "120 FPS Fluidity" },
      { label: "Footprint", value: "Optimized Binary" },
      { label: "Lab Status", value: "Live Builds" }
    ],
    hologramColor: "cerulean"
  },
  {
    id: "iot-embedded",
    code: "DOM-07",
    title: "IoT & Smart Telemetry",
    highlight: "Connected Sensors",
    category: "EDGE TELEMETRY",
    symbol: "📡",
    description: "Building resilient wireless mesh networks, low-power industrial sensor arrays, and remote environmental monitoring frameworks powered by MQTT and LoRa protocols.",
    tags: ["LoRaWAN", "MQTT Broker", "Edge Computing", "Hardware PCB", "Sensor Meshes"],
    specs: [
      { label: "Range Coverage", value: "Campus-Wide Mesh" },
      { label: "Power Efficiency", value: "Ultra-Low Sleep" },
      { label: "Lab Status", value: "Telemetry Online" }
    ],
    hologramColor: "cerulean"
  },
  {
    id: "research-innovation",
    code: "DOM-08",
    title: "Research & Innovation",
    highlight: "Frontier Computing",
    category: "THEORY & SCHOLARSHIP",
    symbol: "⌘",
    description: "Fostering academic paper publication, algorithmic optimization, quantum computing simulations, and patenting novel computational paradigms through ACM Digital Library.",
    tags: ["ACM Digital Library", "Algorithmic Rigor", "Quantum Simulation", "Peer Review", "Tech Papers"],
    specs: [
      { label: "Academic Peer", value: "ACM India Council" },
      { label: "Focus", value: "Next-Gen Computing" },
      { label: "Lab Status", value: "Papers In Review" }
    ],
    hologramColor: "rose"
  }
];

export const EVENTS_DATA: EventItem[] = [
  {
    id: "evt-01",
    title: "VISTAS ACM HACK-VORTEX: 24-Hour Innovation Hackathon",
    slug: "hack-vortex-2026",
    description: "Flagship 24-hour non-stop rapid prototyping marathon bringing together multi-disciplinary student engineers to build solutions for real-world civic, AI, and sustainability challenges.",
    event_date: "2026-12-18T09:00:00Z",
    venue: "Main Innovation Center & Computing Labs, VISTAS Campus",
    category: "Hackathon",
    status: "upcoming",
    attendeesEstimate: "250+ Innovators",
    featured: true,
    registration_url: "https://www.instagram.com/vistas_acm/"
  },
  {
    id: "evt-02",
    title: "Autonomous Agents & LLM Fine-Tuning Bootcamp",
    slug: "autonomous-agents-bootcamp",
    description: "Hands-on technical workshop dissecting modern tool-calling agent architectures, local model quantization on edge hardware, and autonomous decision pipelines.",
    event_date: "2026-11-28T10:00:00Z",
    venue: "School of Engineering Lab 402, VISTAS",
    category: "Workshop",
    status: "upcoming",
    attendeesEstimate: "80 Engineers",
    featured: false,
    registration_url: "https://www.instagram.com/vistas_acm/"
  },
  {
    id: "evt-03",
    title: "Cyber Defense: Defensive Architecture & Threat Hunting",
    slug: "cyber-defense-symposium",
    description: "Deep dive into incident response telemetry, packet level inspection, post-quantum ciphers, and simulated penetration testing scenarios.",
    event_date: "2026-10-14T11:00:00Z",
    venue: "VISTAS Auditorium Hall B",
    category: "Seminar",
    status: "completed",
    attendeesEstimate: "140 Students",
    featured: false,
    registration_url: "https://www.instagram.com/vistas_acm/"
  },
  {
    id: "evt-04",
    title: "Robotics Hardware Interfacing & ROS2 Hands-on",
    slug: "ros2-robotics-hands-on",
    description: "Physical computing workshop covering micro-ROS telemetry, motor encoder calibration, and multi-sensor fusion for robotic exploration rovers.",
    event_date: "2026-09-22T09:30:00Z",
    venue: "Mechatronics & Robotics Lab, VISTAS",
    category: "Workshop",
    status: "completed",
    attendeesEstimate: "65 Attendees",
    featured: false,
    registration_url: "https://www.instagram.com/vistas_acm/"
  },
  {
    id: "evt-05",
    title: "ACM Chapter Inaugural Symposium: Horizons of Computing",
    slug: "chapter-inaugural-symposium",
    description: "Official inaugural assembly celebrating the charter of the VISTAS ACM Student Chapter with keynote addresses from industry architects and senior ACM leaders.",
    event_date: "2025-05-19T10:00:00Z",
    venue: "VISTAS Central Auditorium",
    category: "Tech Talk",
    status: "completed",
    attendeesEstimate: "300+ Students & Faculty",
    featured: false,
    registration_url: "https://www.instagram.com/vistas_acm/"
  }
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "proj-01",
    title: "Aegis-Vision: Real-Time Edge Video Telemetry",
    category: "Artificial Intelligence",
    description: "Compact neural inference engine performing multi-object spatial classification and hazard alerts directly on low-power ARM microcomputers without cloud latency.",
    tags: ["YOLOv8", "TensorRT", "C++", "Edge AI", "OpenCV"],
    status: "Active",
    metrics: [
      { label: "Inference Latency", value: "14 ms" },
      { label: "FPS on Edge", value: "58 FPS" },
      { label: "Accuracy", value: "96.4% mAP" }
    ],
    github_url: "https://github.com",
    project_url: "#",
    featured: true
  },
  {
    id: "proj-02",
    title: "Campus-Pulse: LoRa Distributed Sensor Mesh",
    category: "IoT & Hardware",
    description: "Decentralized mesh of solar-powered environmental sensor pods collecting humidity, temperature, air quality, and acoustic indices across the VISTAS campus.",
    tags: ["LoRaWAN", "ESP32", "InFluxDB", "Grafana", "Hardware PCB"],
    status: "Active",
    metrics: [
      { label: "Active Nodes", value: "24 Pods" },
      { label: "Battery Life", value: "480 Days" },
      { label: "Packet Drop", value: "< 0.2%" }
    ],
    github_url: "https://github.com",
    project_url: "#",
    featured: true
  },
  {
    id: "proj-03",
    title: "Neural-Synth: JARVIS Holographic Voice Core",
    category: "Speech & Audio AI",
    description: "Client-side Web Audio synthesis and semantic natural language routing interface providing automated command center telemetry for student innovators.",
    tags: ["Web Audio API", "WebAssembly", "TypeScript", "LLM Integration"],
    status: "Research Prototype",
    metrics: [
      { label: "Speech Latency", value: "32 ms" },
      { label: "Offline Mode", value: "100% Client" }
    ],
    github_url: "https://github.com",
    project_url: "#",
    featured: false
  },
  {
    id: "proj-04",
    title: "Sentinel-Zero: Microservice Security Scanner",
    category: "Cybersecurity",
    description: "Automated container security scanner inspecting Docker layers and Kubernetes ingress configurations for privilege escalations and insecure ports.",
    tags: ["Go", "Docker API", "eBPF", "Kubernetes", "Linux Security"],
    status: "Completed",
    metrics: [
      { label: "Scan Velocity", value: "4.2s / Image" },
      { label: "CVE Coverage", value: "99.8%" }
    ],
    github_url: "https://github.com",
    project_url: "#",
    featured: false
  }
];

export const GALLERY_DATA: GalleryItem[] = [
  {
    id: "gal-01",
    title: "Chapter Chartering & Presidential Keynote",
    event_name: "ACM Inauguration",
    description: "Official charter ceremony establishing the VISTAS ACM Student Chapter at Vels Institute of Science, Technology and Advanced Studies.",
    media_url: "/assets/vistas-acm-blue-logo.jpg",
    category: "Charter"
  },
  {
    id: "gal-02",
    title: "Collaborative Code Sprint & Architecture Ideation",
    event_name: "Hack-Vortex Labs",
    description: "Student teams prototyping distributed algorithms under mentorship from chapter leads.",
    media_url: "/assets/vistas-acm-blue-logo.jpg",
    category: "Hackathon"
  },
  {
    id: "gal-03",
    title: "Hardware Robotics Testing & Sensor Calibration",
    event_name: "Hardware Lab Session",
    description: "Calibrating autonomous rover telemetry and servo kinematics in the VISTAS computing labs.",
    media_url: "/assets/vistas-acm-blue-logo.jpg",
    category: "Robotics"
  },
  {
    id: "gal-04",
    title: "Cyber Defense Workshop & Live Network Capture",
    event_name: "Defensive Security",
    description: "Analyzing packet telemetry and defending servers in a controlled sandbox environment.",
    media_url: "/assets/vistas-acm-blue-logo.jpg",
    category: "Workshops"
  }
];

export const ASSISTANT_KNOWLEDGE = [
  {
    triggers: ["who are you", "what is this", "what is jarvis", "assistant"],
    response: "I am the ACM INTELLIGENCE SYSTEM — your holographic guide to the VISTAS ACM Future Innovation Command Center. I can navigate sections, brief you on technical domains, upcoming hackathons, and explain how to join our chapter.",
    suggestions: ["Explore Domains", "Check Events", "How to Join", "About ACM"]
  },
  {
    triggers: ["join", "membership", "how to join", "participate", "register"],
    response: "Joining VISTAS ACM connects you with an elite community of student builders, hackathons, technical domains, and international ACM resources. Navigate to our Connect Terminal or click 'Join Chapter' to submit your details.",
    suggestions: ["Go to Contact Terminal", "View Domains", "Follow Instagram"]
  },
  {
    triggers: ["domains", "technology", "divisions", "what do you do", "topics"],
    response: "VISTAS ACM operates across 8 specialized technology divisions: Artificial Intelligence & ML, Web & Full-Stack Systems, Cybersecurity, Data & Cloud, Robotics & Hardware, Mobile Ecosystems, IoT Telemetry, and Computing Research.",
    suggestions: ["Explore Domains Section", "AI & ML", "Robotics Lab"]
  },
  {
    triggers: ["events", "hackathon", "workshops", "when is the next event"],
    response: "Our event command center features upcoming technical workshops, hackathons, and guest seminars. Up next: HACK-VORTEX (24-Hour Innovation Marathon) and our Autonomous Agents Bootcamp. Check the Events section for full schedules.",
    suggestions: ["Open Events Section", "Register on Instagram"]
  },
  {
    triggers: ["team", "who is the team", "members", "leads"],
    response: "TEAM PROFILES // COMING SOON. VISTAS ACM is an innovation-driven community. Our complete holographic crew roster and leadership profiles will be announced soon. Stay tuned to our official transmission feeds.",
    suggestions: ["View Team Command", "Follow @vistas_acm"]
  },
  {
    triggers: ["vistas", "vels", "where is", "location"],
    response: "VISTAS ACM is based at Vels Institute of Science, Technology and Advanced Studies (VISTAS) in Pallavaram, Chennai, Tamil Nadu, India. Chartered on May 19, 2025 under ACM India.",
    suggestions: ["About Chapter", "Contact Terminal"]
  }
];
