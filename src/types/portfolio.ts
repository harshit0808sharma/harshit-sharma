export interface StatItem {
  label: string;
  value: string;
}

export interface SocialLinks {
  github: string;
  linkedin: string;
  twitter: string;
  email: string;
  instagram?: string;
}

export interface HeroData {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  avatarUrl: string;
  availabilityStatus: string;
  isAvailable: boolean;
  resumeUrl: string;
  stats: StatItem[];
  socialLinks: SocialLinks;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription?: string;
  category: string;
  coverImage: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  order: number;
}

export interface Skill {
  id: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'DevOps & Cloud' | 'Tools & Design';
  iconKey: string;
  level: number; // 0 to 100
  color: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  current: boolean;
  description: string[];
  skills: string[];
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  budget?: string;
  createdAt: string;
  read: boolean;
}

export interface ThemeConfig {
  accentColor: string; // 'violet' | 'cyan' | 'emerald' | 'rose' | 'amber'
  hex: string;
  rgb: string;
  glow: string;
}

export interface PortfolioData {
  hero: HeroData;
  projects: Project[];
  skills: Skill[];
  experience: Experience[];
  inquiries: Inquiry[];
  theme: ThemeConfig;
}
