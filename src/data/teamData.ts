export interface TeamMember {
  id: string;
  name: string;
  designation: string;
  domain: string;
  bio?: string;
  responsibilities: string;
  image_url: string;
  linkedin_url?: string | null;
  github_url?: string | null;
  instagram_url?: string | null;
  display_order: number;
  isFaculty?: boolean;
}

// ============================================================================
// OFFICIAL VISTAS ACM LEADERSHIP (16 Members)
// Faculty Advisor + 15 Student Office Bearers
// ============================================================================
export const ACTUAL_TEAM_MEMBERS: TeamMember[] = [
  {
    id: "gov-01",
    name: "Mr. N. Udayakumar",
    designation: "FACULTY ADVISOR",
    domain: "FACULTY ADVISORY",
    bio: "Assistant Professor, Department of Computer Science and Engineering, School of Engineering, Vels Institute of Science, Technology and Advanced Studies (VISTAS).",
    responsibilities: "Provides overall guidance and mentoring, coordinates with the department and ACM, reviews chapter activities, and monitors documentation and progress.",
    image_url: "/assets/vistas-acm-blue-logo.jpg",
    linkedin_url: null,
    instagram_url: null,
    github_url: null,
    display_order: 1,
    isFaculty: true
  },
  {
    id: "gov-02",
    name: "Mr. Brijish S",
    designation: "STUDENT CHAIRPERSON",
    domain: "EXECUTIVE COUNCIL",
    bio: "Student Chairperson leading chapter operations and activity coordination under Faculty Advisor guidance.",
    responsibilities: "Leads the student chapter, coordinates the leadership team, and oversees the planning and execution of chapter activities.",
    image_url: "https://zwxjuhologbhmicfzrvx.supabase.co/storage/v1/object/public/vistas-media/team/d9e9e807-e97e-45b6-aac7-b105069b64f8.png",
    linkedin_url: "https://www.linkedin.com/in/s-brijish-5223b93b7",
    instagram_url: "https://www.instagram.com/_itz_jerr.y_?mdxt=Z2psbXNuZTF0MXlq",
    github_url: "https://github.com/BrijishS/BrijishS",
    display_order: 2
  },
  {
    id: "gov-03",
    name: "Ms. Keerthana V",
    designation: "STUDENT VICE CHAIRPERSON",
    domain: "EXECUTIVE COUNCIL",
    bio: "Student Vice Chairperson assisting in chapter leadership and committee coordination.",
    responsibilities: "Supports the Chairperson, assists in committee coordination, and takes responsibility for assigned activities.",
    image_url: "https://zwxjuhologbhmicfzrvx.supabase.co/storage/v1/object/public/vistas-media/team/93e261f2-55b2-4f68-acf7-e667f2584912.png",
    linkedin_url: null,
    instagram_url: null,
    github_url: null,
    display_order: 3
  },
  {
    id: "gov-04",
    name: "Ms. Nisha S",
    designation: "STUDENT SECRETARY",
    domain: "EXECUTIVE COUNCIL",
    bio: "Student Secretary managing documentation, correspondence, and activity records.",
    responsibilities: "Maintains meeting minutes, official communication, activity reports, attendance records, and chapter documentation.",
    image_url: "https://zwxjuhologbhmicfzrvx.supabase.co/storage/v1/object/public/vistas-media/team/f051ed27-22a2-45ad-8ad9-5a7ab1eec07d.png",
    linkedin_url: null,
    instagram_url: null,
    github_url: null,
    display_order: 4
  },
  {
    id: "gov-05",
    name: "Mr. Jawahar Sam Solomon E J",
    designation: "STUDENT TREASURER",
    domain: "EXECUTIVE COUNCIL",
    bio: "Student Treasurer overseeing chapter finances and expenditure records.",
    responsibilities: "Maintains financial records, monitors expenditure, and prepares financial statements for review.",
    image_url: "https://zwxjuhologbhmicfzrvx.supabase.co/storage/v1/object/public/vistas-media/team/0de5b8bc-3c3e-46fe-b5be-1fc4b0640ee5.png",
    linkedin_url: null,
    instagram_url: null,
    github_url: null,
    display_order: 5
  },
  {
    id: "gov-06",
    name: "Ms. Priyadharshini R",
    designation: "WEBMASTER",
    domain: "DIGITAL & PLATFORMS",
    bio: "Webmaster managing digital platforms and chapter online communication.",
    responsibilities: "Manages chapter-related digital platforms, website updates, and online communication.",
    image_url: "/assets/vistas-acm-blue-logo.jpg",
    linkedin_url: null,
    instagram_url: null,
    github_url: null,
    display_order: 6
  },
  {
    id: "gov-07",
    name: "Ms. Vinayakalakshmi T",
    designation: "MEMBERSHIP CHAIR",
    domain: "MEMBERSHIP & OUTREACH",
    bio: "Membership Chair coordinating student membership and engagement initiatives.",
    responsibilities: "Promotes student membership, coordinates membership-related activities, and maintains membership records.",
    image_url: "/assets/vistas-acm-blue-logo.jpg",
    linkedin_url: null,
    instagram_url: null,
    github_url: null,
    display_order: 7
  },
  {
    id: "gov-08",
    name: "Ms. Madhumita R",
    designation: "TECHNICAL HEAD",
    domain: "TECHNICAL & SESSIONS",
    bio: "Technical Head coordinating hands-on coding, workshops, and technical competitions.",
    responsibilities: "Plans and coordinates technical sessions, coding activities, workshops, technical competitions, and technology-focused events.",
    image_url: "https://zwxjuhologbhmicfzrvx.supabase.co/storage/v1/object/public/vistas-media/team/e35aebe5-d487-4846-a03c-1aa6b81219b9.png",
    linkedin_url: "https://www.linkedin.com/in/madhumitha-r-24a325397?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    instagram_url: "https://www.instagram.com/mrithika.shri/?hl=en",
    github_url: "https://github.com/madhumrithika-hub",
    display_order: 8
  },
  {
    id: "gov-09",
    name: "Ms. Samitha N",
    designation: "INDUSTRIAL RELATIONS HEAD",
    domain: "CORPORATE & INDUSTRY",
    bio: "Industrial Relations Head facilitating industry interactions and expert sessions.",
    responsibilities: "Coordinates industry interactions, industry expert sessions, professional networking, and industry-oriented activities.",
    image_url: "https://zwxjuhologbhmicfzrvx.supabase.co/storage/v1/object/public/vistas-media/team/0054015a-c683-4f5e-8236-3778064033ff.png",
    linkedin_url: "https://www.linkedin.com/in/samitha-nambirajan-38919b391?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    instagram_url: "https://www.instagram.com/samitha._.24?psln=MXFrdWV0MHZlZmI1Nw==",
    github_url: "https://github.com/Samitha-24",
    display_order: 9
  },
  {
    id: "gov-10",
    name: "Ms. Sharviny P",
    designation: "EVENT HEAD",
    domain: "EVENTS & OPERATIONS",
    bio: "Event Head scheduling and coordinating chapter technical and co-curricular events.",
    responsibilities: "Plans, schedules, and coordinates chapter events, ensuring effective organization and execution.",
    image_url: "/assets/vistas-acm-blue-logo.jpg",
    linkedin_url: null,
    instagram_url: null,
    github_url: null,
    display_order: 10
  },
  {
    id: "gov-11",
    name: "Ms. Sri Chahana Snigdha S",
    designation: "RESEARCH AND INNOVATION HEAD",
    domain: "RESEARCH & INNOVATION",
    bio: "Research and Innovation Head fostering student paper presentations and project research.",
    responsibilities: "Encourages research activities, innovation, paper presentations, project ideas, and research-oriented student participation.",
    image_url: "https://zwxjuhologbhmicfzrvx.supabase.co/storage/v1/object/public/vistas-media/team/19e8fece-a319-40ab-9b88-75bbcb9cd625.png",
    linkedin_url: null,
    instagram_url: null,
    github_url: null,
    display_order: 11
  },
  {
    id: "gov-12",
    name: "Mr. Shantanav K",
    designation: "PR AND MEDIA HEAD",
    domain: "PUBLICITY & MEDIA",
    bio: "PR and Media Head overseeing chapter event publicity, announcements, and media outreach.",
    responsibilities: "Handles publicity, event announcements, media communication, social media updates, and dissemination of chapter achievements.",
    image_url: "/assets/vistas-acm-blue-logo.jpg",
    linkedin_url: null,
    instagram_url: null,
    github_url: null,
    display_order: 12
  },
  {
    id: "gov-13",
    name: "Ms. Jaya Shree D",
    designation: "DESIGN HEAD",
    domain: "CREATIVE & DESIGN",
    bio: "Design Head creating visual materials, posters, and digital creatives for chapter activities.",
    responsibilities: "Prepares posters, banners, certificates, digital creatives, and other visual materials for chapter activities.",
    image_url: "https://zwxjuhologbhmicfzrvx.supabase.co/storage/v1/object/public/vistas-media/team/f5c822cd-88e5-4621-b34d-fd173cbe1a0f.png",
    linkedin_url: null,
    instagram_url: null,
    github_url: null,
    display_order: 13
  },
  {
    id: "gov-14",
    name: "Ms. Adiya AR",
    designation: "SPONSORSHIP HEAD",
    domain: "SPONSORSHIP & RESOURCE",
    bio: "Sponsorship Head managing proposals and resource mobilization for chapter initiatives.",
    responsibilities: "Coordinates sponsorship proposals, communicates with potential sponsors, and supports resource mobilization for chapter events.",
    image_url: "https://zwxjuhologbhmicfzrvx.supabase.co/storage/v1/object/public/vistas-media/team/eaa606ed-95b5-45d8-9d10-eb116ead201a.png",
    linkedin_url: null,
    instagram_url: null,
    github_url: null,
    display_order: 14
  },
  {
    id: "gov-15",
    name: "Mr. Sharan N",
    designation: "TRAINING AND DEVELOPMENT HEAD",
    domain: "TRAINING & DEVELOPMENT",
    bio: "Training and Development Head organizing student technical learning sessions.",
    responsibilities: "Identifies student skill-development needs and coordinates training sessions, technical learning programmes, and professional development activities.",
    image_url: "https://zwxjuhologbhmicfzrvx.supabase.co/storage/v1/object/public/vistas-media/team/dbb05d5f-df9c-44a9-9d0e-28cdfb01dee5.png",
    linkedin_url: null,
    instagram_url: null,
    github_url: null,
    display_order: 15
  },
  {
    id: "gov-16",
    name: "Mr. Kaviarasan K",
    designation: "PROJECT DEVELOPMENT HEAD",
    domain: "PROJECTS & DEVELOPMENT",
    bio: "Project Development Head supporting innovative solutions and student demonstrations.",
    responsibilities: "Encourages student project development, coordinates project-based activities, and supports the development and demonstration of innovative solutions.",
    image_url: "/assets/vistas-acm-blue-logo.jpg",
    linkedin_url: null,
    instagram_url: null,
    github_url: null,
    display_order: 16
  }
];
