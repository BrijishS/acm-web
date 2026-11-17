export interface TeamMember {
  id: string;
  name: string;
  designation: string;
  domain: string;
  bio?: string;
  image_url: string;
  linkedin_url?: string | null;
  github_url?: string | null;
  instagram_url?: string | null;
  display_order: number;
}

export const ACTUAL_TEAM_MEMBERS: TeamMember[] = [
  {
    id: "ca02dc27-9081-4115-b78c-0e09e0c535af",
    name: "BRIJISH.S",
    designation: "PRESIDENT",
    domain: "EXECUTIVE COUNCIL",
    bio: "B.Tech Computer Science and Engineering student at VISTAS with deep focus in Cybersecurity, Ethical Hacking, and Distributed Systems. As ACM Student Chapter President, spearheading chapter innovation, technical operations, and cross-chapter initiatives.",
    image_url: "https://zwxjuhologbhmicfzrvx.supabase.co/storage/v1/object/public/vistas-media/team/d9e9e807-e97e-45b6-aac7-b105069b64f8.png",
    linkedin_url: "https://www.linkedin.com/in/s-brijish-5223b93b7",
    instagram_url: "https://www.instagram.com/_itz_jerr.y_?mdxt=Z2psbXNuZTF0MXlq",
    github_url: "https://github.com/BrijishS/BrijishS",
    display_order: 1
  },
  {
    id: "4c33591d-fe54-480d-89bf-2559649cc69f",
    name: "KEERTHANA.V",
    designation: "VICE PRESIDENT",
    domain: "EXECUTIVE COUNCIL",
    bio: "Executive Council Vice President driving strategic chapter planning, student outreach programs, and coordinating technical hackathons across departments.",
    image_url: "https://zwxjuhologbhmicfzrvx.supabase.co/storage/v1/object/public/vistas-media/team/93e261f2-55b2-4f68-acf7-e667f2584912.png",
    linkedin_url: null,
    instagram_url: null,
    github_url: null,
    display_order: 2
  },
  {
    id: "2b5a30f3-a9a6-403c-aa27-e0d9551e0243",
    name: "NISHA S",
    designation: "STUDENT SECRETARY",
    domain: "EXECUTIVE COUNCIL",
    bio: "Managing formal chapter communications, ACM India Council correspondence, documentation, and operational workflows.",
    image_url: "https://zwxjuhologbhmicfzrvx.supabase.co/storage/v1/object/public/vistas-media/team/f051ed27-22a2-45ad-8ad9-5a7ab1eec07d.png",
    linkedin_url: null,
    instagram_url: null,
    github_url: null,
    display_order: 3
  },
  {
    id: "4c0b7881-a811-49d2-ac79-dc81f51e2a5c",
    name: "JAWAHAR SAM SOLOMON.E.J",
    designation: "TREASURER",
    domain: "EXECUTIVE COUNCIL",
    bio: "Overseeing financial telemetry, event budgeting, sponsor allocations, and chapter resource management.",
    image_url: "https://zwxjuhologbhmicfzrvx.supabase.co/storage/v1/object/public/vistas-media/team/0de5b8bc-3c3e-46fe-b5be-1fc4b0640ee5.png",
    linkedin_url: null,
    instagram_url: null,
    github_url: null,
    display_order: 4
  },
  {
    id: "1dae78a5-a5b9-49a1-bcdd-b590a7e93170",
    name: "MADHUMITHA.R",
    designation: "TECHNICAL HEAD",
    domain: "CYBER SECURITY",
    bio: "B.Tech Computer Science and Engineering student focused on cybersecurity, ethical hacking, Python and Java. Leading chapter defensive workshops and CTF competitions.",
    image_url: "https://zwxjuhologbhmicfzrvx.supabase.co/storage/v1/object/public/vistas-media/team/e35aebe5-d487-4846-a03c-1aa6b81219b9.png",
    linkedin_url: "https://www.linkedin.com/in/madhumitha-r-24a325397?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    instagram_url: "https://www.instagram.com/mrithika.shri/?hl=en",
    github_url: "https://github.com/madhumrithika-hub",
    display_order: 7
  },
  {
    id: "d7efdcfb-76d0-4574-82f2-13566e2b1249",
    name: "SRI CHAHANA SNIGDHA.S",
    designation: "RESEARCH AND INNOVATION HEAD",
    domain: "RESEARCH & INNOVATION",
    bio: "Fostering academic publications, algorithmic investigation, and novel research prototypes across AI and frontier computing.",
    image_url: "https://zwxjuhologbhmicfzrvx.supabase.co/storage/v1/object/public/vistas-media/team/19e8fece-a319-40ab-9b88-75bbcb9cd625.png",
    linkedin_url: null,
    instagram_url: null,
    github_url: null,
    display_order: 10
  },
  {
    id: "fca9ed79-1eb6-41c0-9529-307b9d527723",
    name: "ADIYA.A.R",
    designation: "SPONSORSHIP HEAD",
    domain: "CORPORATE RELATIONS",
    bio: "Driving corporate engagement, external hackathon sponsorships, and strategic tech industry collaborations.",
    image_url: "https://zwxjuhologbhmicfzrvx.supabase.co/storage/v1/object/public/vistas-media/team/eaa606ed-95b5-45d8-9d10-eb116ead201a.png",
    linkedin_url: null,
    instagram_url: null,
    github_url: null,
    display_order: 11
  },
  {
    id: "cb7ad818-4ee8-43fc-8fe5-e10695ab8731",
    name: "SAMITHA.N",
    designation: "INDUSTRIAL RELATIONSHIP HEAD",
    domain: "CORPORATE RELATIONS",
    bio: "Connecting students with industry professionals, organizing guest tech talks, and opening internship pathways.",
    image_url: "https://zwxjuhologbhmicfzrvx.supabase.co/storage/v1/object/public/vistas-media/team/0054015a-c683-4f5e-8236-3778064033ff.png",
    linkedin_url: "https://www.linkedin.com/in/samitha-nambirajan-38919b391?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    instagram_url: "https://www.instagram.com/samitha._.24?psln=MXFrdWV0MHZlZmI1Nw==",
    github_url: "https://github.com/Samitha-24",
    display_order: 13
  },
  {
    id: "7b0a095b-4214-445f-a988-5344231e38c3",
    name: "SHARAN.N",
    designation: "TRAINING AND DEVELOPMENT",
    domain: "TECHNICAL & DEVELOPMENT",
    bio: "Mentoring junior peers, organizing technical hands-on bootcamps, and curriculum structuring for chapter learning sprints.",
    image_url: "https://zwxjuhologbhmicfzrvx.supabase.co/storage/v1/object/public/vistas-media/team/dbb05d5f-df9c-44a9-9d0e-28cdfb01dee5.png",
    linkedin_url: null,
    instagram_url: null,
    github_url: null,
    display_order: 14
  },
  {
    id: "60f5b679-736c-4701-a3c1-f940805cd368",
    name: "JAYA SHREE.D",
    designation: "DESIGN HEAD",
    domain: "MEDIA & CREATIVE",
    bio: "Leading chapter visual aesthetics, UI/UX systems, event motion graphics, and digital branding identity.",
    image_url: "https://zwxjuhologbhmicfzrvx.supabase.co/storage/v1/object/public/vistas-media/team/f5c822cd-88e5-4621-b34d-fd173cbe1a0f.png",
    linkedin_url: null,
    instagram_url: null,
    github_url: null,
    display_order: 15
  }
];
