import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Portfolio } from '@/models/Portfolio';

const initialSeedData = {
  hero: {
    greeting: 'Hello World!',
    name: 'Harshit Sharma',
    title: 'Full-Stack Software Engineer & Distributed Systems Developer',
    bio: 'I build high-performance web applications, scalable backend microservices, and resilient cloud architectures with Next.js, TypeScript, Node.js, and modern databases.',
    avatarUrl: '/assets/hero-image.png',
    availabilityStatus: 'Available for Full-time Roles & Engineering Contracts',
    resumeUrl: '#about',
    logoUrl: '',
    logoText: 'Harshit Sharma',
    faviconUrl: '',
    ctaHireMeText: 'Hire Me',
    ctaHireMeLink: '#contact',
    ctaPortfolioText: 'View My Portfolio',
    ctaPortfolioLink: '#projects',
    ctaContactText: 'Contact Me',
    ctaContactLink: '#contact',
    phone: '',
    stats: [
      { label: 'Projects Shipped', value: '50+' },
      { label: 'Uptime Reliability', value: '99.9%' },
      { label: 'Years of Experience', value: '4+' },
    ],
    socialLinks: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      email: 'harshit0808sharma@gmail.com',
    },
  },
  services: [
    {
      id: 'fullstack-dev',
      title: 'Full-Stack Web Development',
      description:
        'Building end-to-end, ultra-fast web applications using Next.js 16, React 19, TypeScript, and clean component architectures optimized for performance and SEO.',
      number: '01',
    },
    {
      id: 'backend-api',
      title: 'Backend Systems & REST/GraphQL APIs',
      description:
        'Engineering resilient microservices, high-throughput event queues, secure JWT/OAuth workflows, and scalable API gateways with Node.js and Express.',
      number: '02',
    },
    {
      id: 'cloud-devops',
      title: 'Cloud Architecture & DevOps',
      description:
        'Containerizing services with Docker, setting up automated CI/CD pipelines, deploying scalable infrastructure on AWS Cloud, and optimizing database performance.',
      number: '03',
    },
  ],
  about: {
    heading: 'Who is Harshit Sharma?',
    description:
      'A passionate Full-Stack Software Engineer dedicated to crafting robust digital solutions, scalable architectures, and clean maintainable codebases. Experienced in designing low-latency distributed systems, modern frontend experiences, and reliable cloud deployments.',
    experienceYears: '4+',
    stats: [
      { label: 'Projects Completed', value: '50+' },
      { label: 'Code Commits', value: '1.2K+' },
      { label: 'Years of Experience', value: '4+' },
    ],
    signature: 'Harshit Sharma',
    avatarUrl: '/assets/hero-image.png',
    fannedPills: [
      { label: 'Full-Stack Dev', bg: 'bg-[#FFB800]', text: 'text-[#181818]', rotate: '-12deg', top: '55%', left: '18%' },
      { label: 'Next.js 16 & React 19', bg: 'bg-[#1E3A2B]', text: 'text-white border border-white/25', rotate: '-5deg', top: '65%', left: '6%' },
      { label: 'Node.js & Express', bg: 'bg-[#FFB800]', text: 'text-[#181818]', rotate: '4deg', top: '68%', left: '44%' },
      { label: 'REST & GraphQL APIs', bg: 'bg-[#FFB800]', text: 'text-[#181818]', rotate: '-4deg', top: '78%', left: '10%' },
      { label: 'Docker & Microservices', bg: 'bg-[#1E3A2B]', text: 'text-white border border-white/25', rotate: '2deg', top: '80%', left: '38%' },
      { label: 'PostgreSQL & MongoDB', bg: 'bg-[#1E3A2B]', text: 'text-white border border-white/25', rotate: '8deg', top: '76%', left: '60%' },
      { label: 'System Design', bg: 'bg-[#FFB800]', text: 'text-[#181818]', rotate: '-2deg', top: '90%', left: '30%' },
    ],
  },
  projects: [
    {
      id: 'p-1',
      title: 'Fintech Real-Time Crypto & Wealth Trading Engine',
      category: 'Full-Stack / Systems',
      description:
        'High-throughput financial orchestration platform with real-time WebSocket order books, low-latency trade execution, Kafka streaming, and modular Next.js dashboard.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
      tags: ['Next.js 16', 'TypeScript', 'Node.js', 'WebSockets', 'PostgreSQL', 'Docker'],
      metrics: '50K+ Events/sec Handled',
      year: '2024',
      liveUrl: 'https://example.com/fintech',
      githubUrl: 'https://github.com',
    },
    {
      id: 'p-2',
      title: 'Cloud-Native E-Commerce & Microservices Architecture',
      category: 'Backend / Cloud',
      description:
        'Scalable headless commerce backend with isolated microservices, Redis caching layer, Stripe payment webhooks, and distributed transaction handling.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80',
      tags: ['Node.js', 'Express', 'MongoDB', 'Redis', 'Docker', 'AWS'],
      metrics: '99.99% Service Uptime',
      year: '2024',
      liveUrl: 'https://example.com/ecommerce',
      githubUrl: 'https://github.com',
    },
    {
      id: 'p-3',
      title: 'DevPulse: Real-Time Collaborative Code Editor & Sandbox',
      category: 'Web Systems',
      description:
        'Browser-based IDE featuring real-time peer-to-peer CRDT state synchronization, integrated Docker sandbox code execution, and terminal runner.',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80',
      tags: ['React 19', 'WebSockets', 'Docker', 'Tailwind CSS', 'WebRTC'],
      metrics: '<25ms Sync Latency',
      year: '2023',
      liveUrl: 'https://example.com/devpulse',
      githubUrl: 'https://github.com',
    },
    {
      id: 'p-4',
      title: 'AI-Powered Automated Observability & Log Analyzer',
      category: 'DevOps & AI',
      description:
        'Distributed log ingestion pipeline with vector similarity indexing, anomaly detection, real-time alerting, and automated root-cause summaries.',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=80',
      tags: ['Python', 'FastAPI', 'OpenAI API', 'Elasticsearch', 'Next.js'],
      metrics: '60% Faster Incident Resolution',
      year: '2023',
      liveUrl: 'https://example.com/observability',
      githubUrl: 'https://github.com',
    },
  ],
  skills: [
    { name: 'TypeScript', category: 'Frontend', color: '#3178C6', rotate: '-6deg', iconType: 'typescript' },
    { name: 'JavaScript', category: 'Frontend', color: '#F7DF1E', rotate: '4deg', iconType: 'javascript' },
    { name: 'React 19', category: 'Frontend', color: '#61DAFB', rotate: '-8deg', iconType: 'react' },
    { name: 'Next.js 16', category: 'Frontend', color: '#000000', rotate: '8deg', iconType: 'nextjs' },
    { name: 'Tailwind CSS', category: 'Frontend', color: '#06B6D4', rotate: '-4deg', iconType: 'tailwind' },
    { name: 'Node.js', category: 'Backend', color: '#339933', rotate: '10deg', iconType: 'nodejs' },
    { name: 'Python', category: 'Backend', color: '#3776AB', rotate: '-8deg', iconType: 'python' },
    { name: 'GraphQL', category: 'Backend', color: '#E10098', rotate: '6deg', iconType: 'graphql' },
    { name: 'MongoDB', category: 'Database', color: '#47A248', rotate: '-7deg', iconType: 'mongodb' },
    { name: 'PostgreSQL', category: 'Database', color: '#4169E1', rotate: '10deg', iconType: 'postgresql' },
    { name: 'Redis', category: 'Database', color: '#DC382D', rotate: '5deg', iconType: 'redis' },
    { name: 'AWS Cloud', category: 'Cloud & DevOps', color: '#FF9900', rotate: '-12deg', iconType: 'aws' },
    { name: 'Docker', category: 'Cloud & DevOps', color: '#2496ED', rotate: '8deg', iconType: 'docker' },
    { name: 'Git & GitHub', category: 'Cloud & DevOps', color: '#F05032', rotate: '-6deg', iconType: 'git' },
  ],
  experiences: [
    {
      period: '2023 — Present',
      current: true,
      role: 'Lead Full-Stack Software Engineer',
      company: 'Zenith Tech Systems',
      location: 'Remote / Bengaluru',
      description:
        'Architected and deployed cloud-native web applications and microservices serving 500,000+ monthly active users. Reduced API response latency by 45% using Redis caching and message queues.',
    },
    {
      period: '2021 — 2023',
      current: false,
      role: 'Software Developer',
      company: 'Pulse Digital Solutions',
      location: 'New Delhi / Hybrid',
      description:
        'Engineered responsive web applications using Next.js, React, and TypeScript. Implemented secure JWT authentication and automated CI/CD deployment pipelines on AWS.',
    },
  ],
  educations: [
    {
      period: '2017 — 2021',
      current: false,
      degree: 'B.Tech in Computer Science & Engineering',
      institution: 'Technical University',
      location: 'India',
      description:
        'Specialized in Data Structures & Algorithms, Distributed Computing, Database Management Systems, and Object-Oriented Software Architecture.',
    },
    {
      period: '2022',
      current: false,
      degree: 'AWS Certified Solutions Architect',
      institution: 'Amazon Web Services',
      location: 'Online',
      description:
        'Mastered cloud-native scalable infrastructure, Docker container orchestration, VPC networking, and serverless architectures.',
    },
  ],
  tools: [
    {
      name: 'VS Code',
      role: 'IDE & Debugging',
      description: 'Primary workspace for full-stack TypeScript, containerized debugging, and intelligent AST refactoring.',
      iconType: 'vscode',
    },
    {
      name: 'Docker',
      role: 'Containerization',
      description: 'Building isolated microservices, multi-stage build images, and reproducible container runtime environments.',
      iconType: 'docker',
    },
    {
      name: 'Git & GitHub',
      role: 'Version Control & CI/CD',
      description: 'Branch orchestration, semantic pull requests, automated GitHub Actions pipelines, and code reviews.',
      iconType: 'git',
    },
    {
      name: 'Postman',
      role: 'API Engineering & Testing',
      description: 'Comprehensive REST and GraphQL endpoint verification, automated test suites, and mock server workflows.',
      iconType: 'postman',
    },
    {
      name: 'PostgreSQL & Mongo',
      role: 'Database Architecture',
      description: 'Relational ACID schemas, NoSQL document modeling, indexing strategies, and query performance tuning.',
      iconType: 'database',
    },
    {
      name: 'Linux & Terminal',
      role: 'DevOps & Systems',
      description: 'Bash automation, remote server SSH administration, process monitoring, and cloud CLI tooling.',
      iconType: 'terminal',
    },
  ],
  tickerItems: [
    'Full-Stack Development',
    'Microservices Architecture',
    'Distributed Systems',
    'REST & GraphQL APIs',
    'Cloud & DevOps',
    'Database Optimization',
  ],
  theme: {
    primary: '#1E3A2B',
    accent: '#FFB800',
    dark: '#181818',
    light: '#FFFFFF',
  },
};

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const url = new URL(req.url);
    const force = url.searchParams.get('force') === 'true';

    const existing = await Portfolio.findOne();
    if (existing && !force) {
      return NextResponse.json({
        success: true,
        message: 'Portfolio already exists in MongoDB portfolio_db. Use ?force=true to overwrite.',
        data: existing,
      });
    }

    const seededPortfolio = await Portfolio.findOneAndUpdate(
      {},
      initialSeedData,
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    return NextResponse.json({
      success: true,
      message: 'Successfully seeded Software Engineer portfolio data into MongoDB portfolio_db!',
      data: seededPortfolio,
    });
  } catch (error: any) {
    console.error('Error seeding portfolio:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to seed portfolio' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  return POST(req);
}
