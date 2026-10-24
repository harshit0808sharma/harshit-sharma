'use client';

import React from 'react';
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiFramer,
  SiNodedotjs,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiDocker,
  SiGithub,
  SiGit,
  SiFigma,
  SiPython,
  SiGraphql,
  SiVercel,
  SiPrisma,
  SiSupabase,
  SiKubernetes,
  SiStripe,
  SiFastapi,
  SiHtml5,
  SiCss,
  SiPostman,
  SiLinux,
  SiVuedotjs,
  SiAngular,
  SiSvelte,
  SiRedux,
  SiVite,
  SiExpress,
  SiDjango,
  SiNestjs,
  SiGooglecloud,
  SiGitlab,
  SiTerraform,
  SiMysql,
  SiFirebase,
  SiJest,
  SiCypress,
  SiSwagger,
  SiInsomnia,
  SiDbeaver,
  SiIntellijidea,
  SiVim,
  SiNeovim,
  SiNetlify,
  SiCloudflare,
  SiGo,
  SiRust,
  SiSketch,
} from 'react-icons/si';
import { FaAws, FaCode, FaWrench, FaTerminal, FaDatabase } from 'react-icons/fa6';
import { TbBrandVscode } from 'react-icons/tb';
import { HiCodeBracket } from 'react-icons/hi2';

export const ICON_MAP: Record<string, React.ElementType> = {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiFramer,
  SiNodedotjs,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiDocker,
  FaAws,
  SiGithub,
  SiGit,
  SiFigma,
  SiPython,
  SiGraphql,
  SiVercel,
  SiPrisma,
  SiSupabase,
  SiKubernetes,
  SiStripe,
  SiFastapi,
  SiHtml5,
  SiCss,
  TbBrandVscode,
  SiPostman,
  SiLinux,
  SiVuedotjs,
  SiAngular,
  SiSvelte,
  SiRedux,
  SiVite,
  SiExpress,
  SiDjango,
  SiNestjs,
  SiGooglecloud,
  SiGitlab,
  SiTerraform,
  SiMysql,
  SiFirebase,
  SiJest,
  SiCypress,
  SiSwagger,
  SiInsomnia,
  SiDbeaver,
  SiIntellijidea,
  SiVim,
  SiNeovim,
  SiNetlify,
  SiCloudflare,
  SiGo,
  SiRust,
  SiSketch,
  FaTerminal,
  FaDatabase,
  FaCode,
  FaWrench,
};

interface DynamicIconProps {
  iconKey: string;
  className?: string;
  style?: React.CSSProperties;
}

export function DynamicIcon({ iconKey, className, style }: DynamicIconProps) {
  const IconComponent = ICON_MAP[iconKey] || HiCodeBracket;
  return <IconComponent className={className} style={style} />;
}

export const AVAILABLE_ICONS = Object.keys(ICON_MAP);

export interface SkillPreset {
  name: string;
  category: 'Frontend' | 'Backend' | 'Cloud & DevOps' | 'Database' | 'Tools' | 'Design' | 'Other';
  color: string;
  icon: React.ElementType;
}

export interface ToolPreset {
  name: string;
  role: string;
  category: 'Code Editors & IDEs' | 'DevOps & Cloud' | 'Testing & APIs' | 'Databases' | 'Design & Creative' | 'Terminal & Systems';
  description: string;
  color: string;
  icon: React.ElementType;
}

export const SKILL_PRESETS: SkillPreset[] = [
  // Frontend
  { name: 'Next.js 16', category: 'Frontend', color: '#000000', icon: SiNextdotjs },
  { name: 'React 19', category: 'Frontend', color: '#61DAFB', icon: SiReact },
  { name: 'TypeScript', category: 'Frontend', color: '#3178C6', icon: SiTypescript },
  { name: 'JavaScript', category: 'Frontend', color: '#F7DF1E', icon: SiJavascript },
  { name: 'Tailwind CSS', category: 'Frontend', color: '#06B6D4', icon: SiTailwindcss },
  { name: 'Vue.js', category: 'Frontend', color: '#4FC08D', icon: SiVuedotjs },
  { name: 'Angular', category: 'Frontend', color: '#DD0031', icon: SiAngular },
  { name: 'Svelte', category: 'Frontend', color: '#FF3E00', icon: SiSvelte },
  { name: 'HTML5', category: 'Frontend', color: '#E34F26', icon: SiHtml5 },
  { name: 'CSS3', category: 'Frontend', color: '#1572B6', icon: SiCss },
  { name: 'Redux Toolkit', category: 'Frontend', color: '#764ABC', icon: SiRedux },
  { name: 'Framer Motion', category: 'Frontend', color: '#0055FF', icon: SiFramer },
  { name: 'Vite', category: 'Frontend', color: '#646CFF', icon: SiVite },

  // Backend
  { name: 'Node.js', category: 'Backend', color: '#5FA04E', icon: SiNodedotjs },
  { name: 'Express.js', category: 'Backend', color: '#000000', icon: SiExpress },
  { name: 'Python', category: 'Backend', color: '#3776AB', icon: SiPython },
  { name: 'Django', category: 'Backend', color: '#092E20', icon: SiDjango },
  { name: 'FastAPI', category: 'Backend', color: '#009688', icon: SiFastapi },
  { name: 'NestJS', category: 'Backend', color: '#E0234E', icon: SiNestjs },
  { name: 'Go (Golang)', category: 'Backend', color: '#00ADD8', icon: SiGo },
  { name: 'Rust', category: 'Backend', color: '#000000', icon: SiRust },
  { name: 'GraphQL', category: 'Backend', color: '#E10098', icon: SiGraphql },

  // Cloud & DevOps
  { name: 'AWS Cloud', category: 'Cloud & DevOps', color: '#FF9900', icon: FaAws },
  { name: 'Google Cloud (GCP)', category: 'Cloud & DevOps', color: '#4285F4', icon: SiGooglecloud },
  { name: 'Docker', category: 'Cloud & DevOps', color: '#2496ED', icon: SiDocker },
  { name: 'Kubernetes', category: 'Cloud & DevOps', color: '#326CE5', icon: SiKubernetes },
  { name: 'Git & GitHub', category: 'Cloud & DevOps', color: '#181717', icon: SiGithub },
  { name: 'GitLab', category: 'Cloud & DevOps', color: '#FC6D26', icon: SiGitlab },
  { name: 'Terraform', category: 'Cloud & DevOps', color: '#7B42BC', icon: SiTerraform },
  { name: 'Linux', category: 'Cloud & DevOps', color: '#FCC624', icon: SiLinux },

  // Databases
  { name: 'PostgreSQL', category: 'Database', color: '#4169E1', icon: SiPostgresql },
  { name: 'MongoDB', category: 'Database', color: '#47A248', icon: SiMongodb },
  { name: 'MySQL', category: 'Database', color: '#4479A1', icon: SiMysql },
  { name: 'Redis', category: 'Database', color: '#DC382D', icon: SiRedis },
  { name: 'Prisma ORM', category: 'Database', color: '#2D3748', icon: SiPrisma },
  { name: 'Supabase', category: 'Database', color: '#3ECF8E', icon: SiSupabase },
  { name: 'Firebase', category: 'Database', color: '#FFCA28', icon: SiFirebase },

  // Design & UI
  { name: 'Figma', category: 'Design', color: '#F24E1E', icon: SiFigma },
  { name: 'Sketch', category: 'Design', color: '#F7B500', icon: SiSketch },
];

export const TOOL_PRESETS: ToolPreset[] = [
  // Code Editors & IDEs
  {
    name: 'VS Code',
    role: 'Primary IDE',
    category: 'Code Editors & IDEs',
    description: 'Primary code editor for TypeScript, Next.js, and systems development.',
    color: '#007ACC',
    icon: TbBrandVscode,
  },
  {
    name: 'IntelliJ IDEA',
    role: 'Full-Featured IDE',
    category: 'Code Editors & IDEs',
    description: 'Enterprise IDE for robust backend, Java, and polyglot architecture.',
    color: '#FE315D',
    icon: SiIntellijidea,
  },
  {
    name: 'Neovim',
    role: 'Terminal Editor',
    category: 'Code Editors & IDEs',
    description: 'Hyperextensible terminal-based text editor for high-speed coding.',
    color: '#57A143',
    icon: SiNeovim,
  },
  {
    name: 'Vim',
    role: 'Systems Editor',
    category: 'Code Editors & IDEs',
    description: 'Fast terminal editing on remote Linux servers and cloud VMs.',
    color: '#019733',
    icon: SiVim,
  },

  // DevOps & Cloud
  {
    name: 'Docker',
    role: 'Containerization',
    category: 'DevOps & Cloud',
    description: 'Containerizing microservices, dependencies, and reproducible builds.',
    color: '#2496ED',
    icon: SiDocker,
  },
  {
    name: 'Kubernetes',
    role: 'Container Orchestration',
    category: 'DevOps & Cloud',
    description: 'Deploying and scaling distributed services across multi-node clusters.',
    color: '#326CE5',
    icon: SiKubernetes,
  },
  {
    name: 'Vercel',
    role: 'Edge Deployment',
    category: 'DevOps & Cloud',
    description: 'Zero-config global edge deployments for Next.js and frontend apps.',
    color: '#000000',
    icon: SiVercel,
  },
  {
    name: 'Netlify',
    role: 'Serverless Hosting',
    category: 'DevOps & Cloud',
    description: 'Automated CI/CD pipelines and static site distribution.',
    color: '#00C7B7',
    icon: SiNetlify,
  },
  {
    name: 'Cloudflare',
    role: 'CDN & Edge Workers',
    category: 'DevOps & Cloud',
    description: 'DDoS mitigation, DNS caching, and low-latency edge computing.',
    color: '#F38020',
    icon: SiCloudflare,
  },

  // Version Control
  {
    name: 'Git & GitHub',
    role: 'Version Control & CI/CD',
    category: 'DevOps & Cloud',
    description: 'Source control, code reviews, pull requests, and automated actions.',
    color: '#181717',
    icon: SiGithub,
  },
  {
    name: 'GitLab',
    role: 'DevOps Platform',
    category: 'DevOps & Cloud',
    description: 'Enterprise Git repository and self-hosted CI/CD automation.',
    color: '#FC6D26',
    icon: SiGitlab,
  },

  // Testing & APIs
  {
    name: 'Postman',
    role: 'API Testing & Docs',
    category: 'Testing & APIs',
    description: 'Testing RESTful APIs, mocking payloads, and team collection sharing.',
    color: '#FF6C37',
    icon: SiPostman,
  },
  {
    name: 'Insomnia',
    role: 'REST & GraphQL Client',
    category: 'Testing & APIs',
    description: 'Streamlined desktop API testing with instant GraphQL introspection.',
    color: '#5849BE',
    icon: SiInsomnia,
  },
  {
    name: 'Swagger (OpenAPI)',
    role: 'API Specifications',
    category: 'Testing & APIs',
    description: 'Documenting and validating API schemas according to OpenAPI specs.',
    color: '#85EA2D',
    icon: SiSwagger,
  },
  {
    name: 'Jest',
    role: 'Unit Testing',
    category: 'Testing & APIs',
    description: 'Delightful JavaScript and TypeScript test runner with instant snapshots.',
    color: '#C21325',
    icon: SiJest,
  },
  {
    name: 'Cypress',
    role: 'E2E Testing',
    category: 'Testing & APIs',
    description: 'End-to-end browser automation for verifying user critical flows.',
    color: '#17202C',
    icon: SiCypress,
  },

  // Databases & GUI
  {
    name: 'DBeaver',
    role: 'Universal Database GUI',
    category: 'Databases',
    description: 'Multi-platform database client for SQL query tuning and data inspection.',
    color: '#382923',
    icon: SiDbeaver,
  },
  {
    name: 'PostgreSQL & Mongo',
    role: 'Database Engines',
    category: 'Databases',
    description: 'Relational data modeling and flexible document storage architectures.',
    color: '#4169E1',
    icon: SiPostgresql,
  },
  {
    name: 'Redis',
    role: 'In-Memory Cache',
    category: 'Databases',
    description: 'High-throughput sub-millisecond caching and pub/sub message brokers.',
    color: '#DC382D',
    icon: SiRedis,
  },

  // Terminal & Systems
  {
    name: 'Linux & Terminal',
    role: 'Systems Environment',
    category: 'Terminal & Systems',
    description: 'Zsh shell scripting, server administration, and process management.',
    color: '#FCC624',
    icon: SiLinux,
  },

  // Design & Creative
  {
    name: 'Figma',
    role: 'UI/UX Interface Design',
    category: 'Design & Creative',
    description: 'Designing wireframes, interactive user prototypes, and design systems.',
    color: '#F24E1E',
    icon: SiFigma,
  },
  {
    name: 'Sketch',
    role: 'Vector Design Tool',
    category: 'Design & Creative',
    description: 'Vector-based digital product design for modern web and mobile apps.',
    color: '#F7B500',
    icon: SiSketch,
  },
];

/**
 * Resolves a skill or tool name to its official React Icon component from react-icons.
 */
export function getBrandIconComponent(name: string): { component: React.ElementType; color?: string } {
  const clean = (name || '').trim().toLowerCase();

  // Direct match from presets first
  const skillMatch = SKILL_PRESETS.find((s) => s.name.toLowerCase() === clean);
  if (skillMatch) {
    return { component: skillMatch.icon, color: skillMatch.color };
  }

  const toolMatch = TOOL_PRESETS.find((t) => t.name.toLowerCase() === clean);
  if (toolMatch) {
    return { component: toolMatch.icon, color: toolMatch.color };
  }

  // Substring matches
  if (clean.includes('vs code') || clean.includes('visual studio code') || clean === 'vscode') {
    return { component: TbBrandVscode, color: '#007ACC' };
  }
  if (clean.includes('docker')) {
    return { component: SiDocker, color: '#2496ED' };
  }
  if (clean.includes('git') && clean.includes('hub')) {
    return { component: SiGithub, color: '#181717' };
  }
  if (clean === 'git') {
    return { component: SiGit, color: '#F05032' };
  }
  if (clean.includes('gitlab')) {
    return { component: SiGitlab, color: '#FC6D26' };
  }
  if (clean.includes('postman')) {
    return { component: SiPostman, color: '#FF6C37' };
  }
  if (clean.includes('insomnia')) {
    return { component: SiInsomnia, color: '#5849BE' };
  }
  if (clean.includes('swagger') || clean.includes('openapi')) {
    return { component: SiSwagger, color: '#85EA2D' };
  }
  if (clean.includes('dbeaver')) {
    return { component: SiDbeaver, color: '#382923' };
  }
  if (clean.includes('intellij')) {
    return { component: SiIntellijidea, color: '#FE315D' };
  }
  if (clean.includes('neovim')) {
    return { component: SiNeovim, color: '#57A143' };
  }
  if (clean.includes('vim')) {
    return { component: SiVim, color: '#019733' };
  }
  if (clean.includes('postgre') && clean.includes('mongo')) {
    return { component: SiPostgresql, color: '#4169E1' };
  }
  if (clean.includes('postgre') || clean.includes('postgres')) {
    return { component: SiPostgresql, color: '#4169E1' };
  }
  if (clean.includes('mysql')) {
    return { component: SiMysql, color: '#4479A1' };
  }
  if (clean.includes('mongo')) {
    return { component: SiMongodb, color: '#47A248' };
  }
  if (clean.includes('redis')) {
    return { component: SiRedis, color: '#DC382D' };
  }
  if (clean.includes('linux') || clean.includes('terminal')) {
    return { component: SiLinux, color: '#FCC624' };
  }
  if (clean.includes('figma')) {
    return { component: SiFigma, color: '#F24E1E' };
  }
  if (clean.includes('sketch')) {
    return { component: SiSketch, color: '#F7B500' };
  }
  if (clean.includes('next')) {
    return { component: SiNextdotjs, color: '#000000' };
  }
  if (clean.includes('react')) {
    return { component: SiReact, color: '#61DAFB' };
  }
  if (clean.includes('vue')) {
    return { component: SiVuedotjs, color: '#4FC08D' };
  }
  if (clean.includes('angular')) {
    return { component: SiAngular, color: '#DD0031' };
  }
  if (clean.includes('svelte')) {
    return { component: SiSvelte, color: '#FF3E00' };
  }
  if (clean.includes('redux')) {
    return { component: SiRedux, color: '#764ABC' };
  }
  if (clean.includes('vite')) {
    return { component: SiVite, color: '#646CFF' };
  }
  if (clean.includes('express')) {
    return { component: SiExpress, color: '#000000' };
  }
  if (clean.includes('nest')) {
    return { component: SiNestjs, color: '#E0234E' };
  }
  if (clean.includes('django')) {
    return { component: SiDjango, color: '#092E20' };
  }
  if (clean.includes('golang') || clean === 'go') {
    return { component: SiGo, color: '#00ADD8' };
  }
  if (clean.includes('rust')) {
    return { component: SiRust, color: '#000000' };
  }
  if (clean.includes('type') || clean === 'ts') {
    return { component: SiTypescript, color: '#3178C6' };
  }
  if (clean.includes('java') || clean === 'js') {
    return { component: SiJavascript, color: '#F7DF1E' };
  }
  if (clean.includes('tailwind')) {
    return { component: SiTailwindcss, color: '#06B6D4' };
  }
  if (clean.includes('html')) {
    return { component: SiHtml5, color: '#E34F26' };
  }
  if (clean.includes('css')) {
    return { component: SiCss, color: '#1572B6' };
  }
  if (clean.includes('node')) {
    return { component: SiNodedotjs, color: '#5FA04E' };
  }
  if (clean.includes('python')) {
    return { component: SiPython, color: '#3776AB' };
  }
  if (clean.includes('graphql')) {
    return { component: SiGraphql, color: '#E10098' };
  }
  if (clean.includes('aws')) {
    return { component: FaAws, color: '#FF9900' };
  }
  if (clean.includes('google cloud') || clean.includes('gcp')) {
    return { component: SiGooglecloud, color: '#4285F4' };
  }
  if (clean.includes('kuber') || clean === 'k8s') {
    return { component: SiKubernetes, color: '#326CE5' };
  }
  if (clean.includes('terraform')) {
    return { component: SiTerraform, color: '#7B42BC' };
  }
  if (clean.includes('prisma')) {
    return { component: SiPrisma, color: '#2D3748' };
  }
  if (clean.includes('supabase')) {
    return { component: SiSupabase, color: '#3ECF8E' };
  }
  if (clean.includes('firebase')) {
    return { component: SiFirebase, color: '#FFCA28' };
  }
  if (clean.includes('fastapi')) {
    return { component: SiFastapi, color: '#009688' };
  }
  if (clean.includes('framer')) {
    return { component: SiFramer, color: '#0055FF' };
  }
  if (clean.includes('vercel')) {
    return { component: SiVercel, color: '#000000' };
  }
  if (clean.includes('netlify')) {
    return { component: SiNetlify, color: '#00C7B7' };
  }
  if (clean.includes('cloudflare')) {
    return { component: SiCloudflare, color: '#F38020' };
  }
  if (clean.includes('jest')) {
    return { component: SiJest, color: '#C21325' };
  }
  if (clean.includes('cypress')) {
    return { component: SiCypress, color: '#17202C' };
  }
  if (clean.includes('stripe')) {
    return { component: SiStripe, color: '#635BFF' };
  }

  return { component: FaCode, color: '#1E3A2B' };
}
