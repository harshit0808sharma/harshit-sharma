import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IHero {
  greeting: string;
  name: string;
  title: string;
  bio: string;
  avatarUrl: string;
  availabilityStatus: string;
  resumeUrl: string;
  logoUrl?: string;
  logoText?: string;
  faviconUrl?: string;
  ctaHireMeText?: string;
  ctaHireMeLink?: string;
  ctaPortfolioText?: string;
  ctaPortfolioLink?: string;
  ctaContactText?: string;
  ctaContactLink?: string;
  phone?: string;
  stats?: { label: string; value: string }[];
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    email?: string;
    instagram?: string;
    dribbble?: string;
    youtube?: string;
    website?: string;
  };
}

export interface IService {
  id: string;
  title: string;
  description: string;
  number?: string;
  icon?: string;
}

export interface IAbout {
  heading: string;
  description: string;
  experienceYears: string;
  stats: { label: string; value: string }[];
  signature: string;
  avatarUrl: string;
  fannedPills?: {
    label: string;
    bg: string;
    text: string;
    rotate: string;
    top: string;
    left: string;
  }[];
}

export interface IProject {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  metrics: string;
  year: string;
  liveUrl?: string;
  githubUrl?: string;
}

export interface ISkill {
  name: string;
  category: string;
  color: string;
  rotate: string;
  iconType?: string;
  customIconUrl?: string;
}

export interface IExperienceItem {
  period: string;
  current: boolean;
  role: string;
  company: string;
  location: string;
  description: string;
}

export interface IEducationItem {
  period: string;
  current: boolean;
  degree: string;
  institution: string;
  location: string;
  description: string;
}

export interface IToolItem {
  name: string;
  role: string;
  description: string;
  iconType?: string;
  customIconUrl?: string;
}

export interface ITheme {
  primary: string;
  accent: string;
  dark: string;
  light: string;
  headingFont?: string;
  bodyFont?: string;
  font?: string;
}

export interface IPortfolio extends Document {
  profileName?: string;
  isActive?: boolean;
  hero: IHero;
  services: IService[];
  about: IAbout;
  projects: IProject[];
  skills: ISkill[];
  experiences: IExperienceItem[];
  educations: IEducationItem[];
  tools: IToolItem[];
  tickerItems?: string[];
  theme?: ITheme;
  createdAt?: Date;
  updatedAt: Date;
}

const PortfolioSchema = new Schema<IPortfolio>(
  {
    profileName: { type: String, default: 'Main Portfolio' },
    isActive: { type: Boolean, default: true, index: true },
    hero: {
      greeting: { type: String, default: '' },
      name: { type: String, default: '' },
      title: { type: String, default: '' },
      bio: { type: String, default: '' },
      avatarUrl: { type: String, default: '' },
      availabilityStatus: { type: String, default: '' },
      resumeUrl: { type: String, default: '' },
      logoUrl: { type: String, default: '' },
      logoText: { type: String, default: '' },
      faviconUrl: { type: String, default: '' },
      ctaHireMeText: { type: String, default: 'Hire Me' },
      ctaHireMeLink: { type: String, default: '#contact' },
      ctaPortfolioText: { type: String, default: 'View My Portfolio' },
      ctaPortfolioLink: { type: String, default: '#projects' },
      ctaContactText: { type: String, default: 'Contact Me' },
      ctaContactLink: { type: String, default: '#contact' },
      phone: { type: String, default: '' },
      stats: [{ label: { type: String }, value: { type: String } }],
      socialLinks: {
        github: { type: String, default: '' },
        linkedin: { type: String, default: '' },
        twitter: { type: String, default: '' },
        email: { type: String, default: '' },
        instagram: { type: String, default: '' },
        dribbble: { type: String, default: '' },
        youtube: { type: String, default: '' },
        website: { type: String, default: '' },
      },
    },
    services: [
      {
        id: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        number: { type: String, default: '01' },
        icon: { type: String, default: '' },
      },
    ],
    about: {
      heading: { type: String, default: 'Who is Harshit Sharma?' },
      description: {
        type: String,
        default:
          'A dedicated Full-Stack Software Engineer with a deep passion for writing clean, maintainable code and architecting scalable digital products. Specialized in end-to-end web technologies, cloud infrastructure, and low-latency distributed systems.',
      },
      experienceYears: { type: String, default: '4+' },
      stats: [{ label: { type: String }, value: { type: String } }],
      signature: { type: String, default: 'Harshit Sharma' },
      avatarUrl: { type: String, default: '' },
      fannedPills: [
        {
          label: { type: String },
          bg: { type: String },
          text: { type: String },
          rotate: { type: String },
          top: { type: String },
          left: { type: String },
        },
      ],
    },
    projects: [
      {
        id: { type: String, required: true },
        title: { type: String, required: true },
        category: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String, required: true },
        tags: [{ type: String }],
        metrics: { type: String, default: '40% Impact Lift' },
        year: { type: String, default: '2024' },
        liveUrl: { type: String, default: '' },
        githubUrl: { type: String, default: '' },
      },
    ],
    skills: [
      {
        name: { type: String, required: true },
        category: { type: String, required: true },
        color: { type: String, default: '#FFB800' },
        rotate: { type: String, default: '0deg' },
        iconType: { type: String, default: '' },
        customIconUrl: { type: String, default: '' },
      },
    ],
    experiences: [
      {
        period: { type: String, required: true },
        current: { type: Boolean, default: false },
        role: { type: String, required: true },
        company: { type: String, required: true },
        location: { type: String, default: '' },
        description: { type: String, required: true },
      },
    ],
    educations: [
      {
        period: { type: String, required: true },
        current: { type: Boolean, default: false },
        degree: { type: String, required: true },
        institution: { type: String, required: true },
        location: { type: String, default: '' },
        description: { type: String, required: true },
      },
    ],
    tools: [
      {
        name: { type: String, required: true },
        role: { type: String, required: true },
        description: { type: String, required: true },
        iconType: { type: String, default: '' },
        customIconUrl: { type: String, default: '' },
      },
    ],
    tickerItems: [{ type: String }],
    theme: {
      primary: { type: String, default: '#1E3A2B' },
      accent: { type: String, default: '#FFB800' },
      dark: { type: String, default: '#181818' },
      light: { type: String, default: '#FFFFFF' },
      headingFont: { type: String, default: 'Space Grotesk' },
      bodyFont: { type: String, default: 'Inter' },
      font: { type: String, default: 'Space Grotesk' },
    },
  },
  { timestamps: true }
);

if (process.env.NODE_ENV !== 'production') {
  delete mongoose.models.Portfolio;
}

export const Portfolio: Model<IPortfolio> =
  mongoose.models.Portfolio || mongoose.model<IPortfolio>('Portfolio', PortfolioSchema);
