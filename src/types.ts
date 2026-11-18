export interface Domain {
  id: string;
  code: string;
  title: string;
  highlight: string;
  category: string;
  symbol: string;
  description: string;
  tags: string[];
  technologies: string[];
  activities: string[];
  specs: { label: string; value: string }[];
  hologramColor?: 'cerulean' | 'rose';
}

export interface EventItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  event_date: string;
  venue: string;
  image_url?: string;
  registration_url?: string;
  status: 'upcoming' | 'completed' | 'ongoing';
  category: 'Workshop' | 'Hackathon' | 'Tech Talk' | 'Seminar' | 'Competition';
  attendeesEstimate?: string;
  featured?: boolean;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  project_url?: string;
  github_url?: string;
  image_url?: string;
  status: 'Active' | 'Completed' | 'Research Prototype';
  metrics?: { label: string; value: string }[];
  featured?: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  event_name?: string;
  media_url: string;
  category?: string;
  date?: string;
}

export interface AssistantMessage {
  id: string;
  sender: 'jarvis' | 'user';
  text: string;
  timestamp: string;
  suggestions?: string[];
  actionTarget?: string;
}
