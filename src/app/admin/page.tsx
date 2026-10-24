'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaLock,
  FaCheck,
  FaArrowUpRightFromSquare,
  FaPlus,
  FaTrash,
  FaPenToSquare,
  FaEnvelope,
  FaUpload,
  FaSpinner,
  FaBriefcase,
  FaGraduationCap,
  FaWrench,
  FaCode,
  FaRotateLeft,
  FaArrowRight,
  FaArrowRightFromBracket,
  FaCircleCheck,
  FaEye,
  FaEyeSlash,
  FaCopy,
  FaFont,
  FaUser,
  FaNewspaper,
  FaImage,
  FaPalette,
} from 'react-icons/fa6';
import {
  TbDeviceMobile,
  TbBrowser,
  TbSparkles,
  TbLayoutGrid,
  TbUserCircle,
  TbSettings,
  TbMenu2,
  TbX,
  TbChevronDown,
  TbChevronUp,
  TbSearch,
} from 'react-icons/tb';
import { PortfolioState } from '@/context/PortfolioContext';
import { AVAILABLE_GOOGLE_FONTS, getGoogleFontsUrl } from '@/components/DynamicThemeStyle';
import { getBrandIconComponent, SKILL_PRESETS, TOOL_PRESETS } from '@/components/DynamicIcon';

const defaultFallbackData: PortfolioState = {
  hero: {
    greeting: 'Hello World!',
    name: 'Harshit Sharma',
    title: 'Full-Stack Software Engineer & Distributed Systems Developer',
    bio: 'I build high-performance web applications, scalable backend microservices, and resilient cloud architectures with Next.js, TypeScript, Node.js, and modern databases.',
    avatarUrl: '/assets/hero-image.png',
    availabilityStatus: 'Available for Full-time Roles & Engineering Contracts',
    resumeUrl: '#about',
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
      description: 'Building end-to-end web applications with Next.js 16, React 19, TypeScript, and high-performance component architectures.',
      number: '01',
    },
    {
      id: 'backend-api',
      title: 'Backend Systems & APIs',
      description: 'Designing scalable REST & GraphQL microservices, message queues, and secure authentication systems with Node.js.',
      number: '02',
    },
    {
      id: 'cloud-devops',
      title: 'Cloud & DevOps Architecture',
      description: 'Containerization with Docker, CI/CD pipeline automation, and cloud deployments on AWS with database optimization.',
      number: '03',
    },
  ],
  about: {
    heading: 'Who is Harshit Sharma?',
    description: 'A dedicated Full-Stack Software Engineer with a deep passion for writing clean, maintainable code and architecting scalable digital products. Specialized in end-to-end web technologies, cloud infrastructure, and low-latency distributed systems.',
    experienceYears: '4+',
    stats: [
      { label: 'Projects Completed', value: '50+' },
      { label: 'Code Commits', value: '1.2K+' },
      { label: 'Years of Experience', value: '4+' },
    ],
    signature: 'Harshit Sharma',
    avatarUrl: '/assets/hero-image.png',
  },
  projects: [
    {
      id: 'p-1',
      title: 'Fintech Wealth & Crypto Trading Platform',
      category: 'App Design',
      description: 'A comprehensive mobile and web trading experience with real-time portfolio orchestration, low latency order-books, and modular dashboards.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
      tags: ['Figma', 'Design System', 'Mobile App', 'Fintech'],
      metrics: '40% Increase in Activation',
      year: '2024',
      liveUrl: 'https://example.com',
    },
  ],
  skills: [
    { name: 'HTML5', category: 'Frontend', color: '#E34F26', rotate: '-8deg' },
    { name: 'React 19', category: 'Frontend', color: '#61DAFB', rotate: '-6deg' },
    { name: 'Next.js 16', category: 'Frontend', color: '#000000', rotate: '8deg' },
    { name: 'Node.js', category: 'Backend', color: '#339933', rotate: '10deg' },
    { name: 'AWS Cloud', category: 'Cloud & DevOps', color: '#FF9900', rotate: '-12deg' },
    { name: 'MongoDB', category: 'Database', color: '#47A248', rotate: '-7deg' },
  ],
  experiences: [
    {
      period: '2022 — Present',
      current: true,
      role: 'Lead Product Designer',
      company: 'Mudrex Corp',
      location: 'San Francisco, CA (Remote)',
      description: 'Spearheaded end-to-end design for the mobile crypto & wealth app, driving a 40% boost in 30-day user activation.',
    },
  ],
  educations: [
    {
      period: '2010 — 2014',
      current: false,
      degree: 'B.S. in Human-Computer Interaction',
      institution: 'Stanford University',
      location: 'Palo Alto, CA',
      description: 'Graduated Magna Cum Laude. Focused on cognitive ergonomics, user psychology, and interface architecture.',
    },
  ],
  tools: [
    {
      name: 'Figma',
      role: 'UI/UX & Prototyping',
      description: 'Primary workspace for end-to-end interface architecture, design systems, and clickable prototypes.',
    },
    {
      name: 'Photoshop',
      role: 'Raster & Retouching',
      description: 'High-resolution photo editing, realistic product mockups, visual compositing, and raster optimization.',
    },
  ],
  tickerItems: [
    'App Design',
    'Website Design',
    'Dashboard',
    'Wireframe',
  ],
  theme: {
    primary: '#1E3A2B',
    accent: '#FFB800',
    dark: '#181818',
    light: '#FAF9F5',
    headingFont: 'Space Grotesk',
    bodyFont: 'Inter',
  },
};

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [authError, setAuthError] = useState('');
  const [currentUser, setCurrentUser] = useState<{ id?: string; email: string; name?: string; role?: string } | null>(null);
  const [sessionExpiresAt, setSessionExpiresAt] = useState<string | null>(null);

  // Portfolio & Inquiries State with safe default
  const [portfolio, setPortfolio] = useState<PortfolioState>(defaultFallbackData);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Multi-Portfolio Profiles State
  const [allPortfolios, setAllPortfolios] = useState<PortfolioState[]>([]);
  const [activePortfolioId, setActivePortfolioId] = useState<string | null>(null);
  const [isCreatingProfile, setIsCreatingProfile] = useState(false);
  const [newProfileName, setNewProfileName] = useState('');
  const [copiedActiveId, setCopiedActiveId] = useState(false);
  const [settingsSubTab, setSettingsSubTab] = useState<'theme' | 'profiles' | 'security'>('theme');

  // Active Tab & Mobile Drawer Navigation
  const [activeTab, setActiveTab] = useState<
    'hero' | 'services' | 'about' | 'projects' | 'blogs' | 'skills' | 'timeline' | 'tools' | 'inquiries' | 'settings'
  >('hero');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  // Blogs & Bento Visual Cards State
  const [blogs, setBlogs] = useState<any[]>([]);
  const [blogModal, setBlogModal] = useState<{
    isOpen: boolean;
    isEditing: boolean;
    data: {
      _id?: string;
      type: 'image_only' | 'content';
      title: string;
      description: string;
      imageUrl: string;
      imageAspectRatio: string;
      gradient: string;
      textColor: 'dark' | 'light';
      buttonText: string;
      buttonUrl: string;
      category: string;
      badge: string;
      order: number;
      isPublished: boolean;
    };
  }>({
    isOpen: false,
    isEditing: false,
    data: {
      type: 'content',
      title: '',
      description: '',
      imageUrl: '',
      imageAspectRatio: 'auto',
      gradient: 'linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 100%)',
      textColor: 'dark',
      buttonText: 'Read More',
      buttonUrl: '',
      category: 'General',
      badge: '',
      order: 1,
      isPublished: true,
    },
  });

  // Modals
  const [projectModal, setProjectModal] = useState<{ isOpen: boolean; isEditing: boolean; data: any }>({
    isOpen: false,
    isEditing: false,
    data: { id: '', title: '', category: 'UI/UX Design', description: '', image: '', tags: [], metrics: '40% Impact Lift', year: '2024', liveUrl: '' },
  });

  const [serviceModal, setServiceModal] = useState<{ isOpen: boolean; isEditing: boolean; data: any }>({
    isOpen: false,
    isEditing: false,
    data: { id: '', title: '', description: '', number: '01' },
  });

  const [expModal, setExpModal] = useState<{ isOpen: boolean; type: 'experience' | 'education'; data: any }>({
    isOpen: false,
    type: 'experience',
    data: { period: '', current: false, role: '', company: '', location: '', description: '', degree: '', institution: '' },
  });

  const [skillModal, setSkillModal] = useState<{
    isOpen: boolean;
    isEditing: boolean;
    editIndex: number;
    data: {
      name: string;
      category: string;
      color: string;
      rotate: string;
      customIconUrl?: string;
    };
  }>({
    isOpen: false,
    isEditing: false,
    editIndex: -1,
    data: { name: '', category: 'Frontend', color: '#1E3A2B', rotate: '0deg', customIconUrl: '' },
  });

  const [toolModal, setToolModal] = useState<{
    isOpen: boolean;
    isEditing: boolean;
    editIndex: number;
    data: {
      name: string;
      role: string;
      description: string;
      customIconUrl?: string;
    };
  }>({
    isOpen: false,
    isEditing: false,
    editIndex: -1,
    data: { name: '', role: '', description: '', customIconUrl: '' },
  });

  // Skill & Tool Preset dropdown states with React Icons
  const [skillDropdownOpen, setSkillDropdownOpen] = useState(false);
  const [isCustomSkillMode, setIsCustomSkillMode] = useState(false);
  const [skillPresetSearch, setSkillPresetSearch] = useState('');
  const [skillCategoryFilter, setSkillCategoryFilter] = useState('All');

  const [toolDropdownOpen, setToolDropdownOpen] = useState(false);
  const [isCustomToolMode, setIsCustomToolMode] = useState(false);
  const [toolPresetSearch, setToolPresetSearch] = useState('');
  const [toolCategoryFilter, setToolCategoryFilter] = useState('All');

  const filteredSkillPresets = SKILL_PRESETS.filter((preset) => {
    const q = skillPresetSearch.toLowerCase().trim();
    const matchesSearch =
      !q ||
      preset.name.toLowerCase().includes(q) ||
      preset.category.toLowerCase().includes(q);
    const matchesCategory = skillCategoryFilter === 'All' || preset.category === skillCategoryFilter;
    return matchesSearch && matchesCategory;
  });

  const selectedSkillPreset = SKILL_PRESETS.find(
    (p) => p.name.toLowerCase() === (skillModal.data.name || '').trim().toLowerCase()
  );

  const filteredToolPresets = TOOL_PRESETS.filter((preset) => {
    const q = toolPresetSearch.toLowerCase().trim();
    const matchesSearch =
      !q ||
      preset.name.toLowerCase().includes(q) ||
      preset.role.toLowerCase().includes(q) ||
      preset.description.toLowerCase().includes(q) ||
      preset.category.toLowerCase().includes(q);
    const matchesCategory = toolCategoryFilter === 'All' || preset.category === toolCategoryFilter;
    return matchesSearch && matchesCategory;
  });

  const selectedToolPreset = TOOL_PRESETS.find(
    (p) => p.name.toLowerCase() === (toolModal.data.name || '').trim().toLowerCase()
  );

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Dynamically load Google Font in Admin for live preview box
  useEffect(() => {
    const selectedFont = portfolio.theme?.font || portfolio.theme?.headingFont || 'Space Grotesk';
    const fontUrl = getGoogleFontsUrl(selectedFont);
    let link = document.getElementById('admin-google-fonts') as HTMLLinkElement | null;
    if (fontUrl) {
      if (!link) {
        link = document.createElement('link');
        link.id = 'admin-google-fonts';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
      }
      link.href = fontUrl;
    }
  }, [portfolio.theme?.font, portfolio.theme?.headingFont]);

  // Fetch data safely from MongoDB
  const fetchAdminData = async () => {
    try {
      setIsLoading(true);
      const [resPort, resInq, resBlogs] = await Promise.all([
        fetch('/api/portfolio?all=true'),
        fetch('/api/inquiries'),
        fetch('/api/blogs?all=true'),
      ]);

      if (resPort.ok) {
        const portJson = await resPort.json();
        if (portJson.success && portJson.portfolios) {
          setAllPortfolios(portJson.portfolios);
          setActivePortfolioId(portJson.activeId || null);

          // Find which portfolio to load into the workspace editor
          const activeOrFirst =
            portJson.portfolios.find((p: any) => p._id === portJson.activeId) ||
            portJson.portfolios[0];

          if (activeOrFirst) {
            setPortfolio(activeOrFirst);
          }
        }
      }

      if (resInq.ok) {
        const inqJson = await resInq.json();
        if (inqJson.success && inqJson.data) {
          setInquiries(inqJson.data);
        }
      }

      if (resBlogs && resBlogs.ok) {
        const blogsJson = await resBlogs.json();
        if (blogsJson.success && Array.isArray(blogsJson.data)) {
          setBlogs(blogsJson.data);
        }
      }
    } catch (err) {
      console.error('Error loading admin data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveBlog = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (blogModal.data.type === 'content' && !blogModal.data.title?.trim() && !blogModal.data.description?.trim()) {
      showToast('Please enter a heading or description for the banner');
      return;
    }
    if (blogModal.data.type === 'image_only' && !blogModal.data.imageUrl?.trim() && !blogModal.data.title?.trim()) {
      showToast('Please upload an image or provide an image URL');
      return;
    }
    try {
      setIsLoading(true);
      const method = blogModal.isEditing ? 'PUT' : 'POST';
      const payload: any = { ...blogModal.data };
      if (!blogModal.isEditing) {
        delete payload._id;
      }

      const savedToken = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null;
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (savedToken) {
        headers['Authorization'] = `Bearer ${savedToken}`;
      }

      const res = await fetch('/api/blogs', {
        method,
        headers,
        credentials: 'include',
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (json.success) {
        showToast(blogModal.isEditing ? 'Blog card updated!' : 'Blog card created!');
        setBlogModal((prev) => ({ ...prev, isOpen: false }));
        // Refresh blogs
        const refreshed = await fetch('/api/blogs?all=true', { credentials: 'include', headers });
        const rJson = await refreshed.json();
        if (rJson.success && Array.isArray(rJson.data)) {
          setBlogs(rJson.data);
        }
      } else {
        showToast(json.error || 'Failed to save blog card');
      }
    } catch {
      showToast('Error saving blog card');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteBlog = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog card?')) return;
    try {
      const savedToken = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null;
      const headers: Record<string, string> = {};
      if (savedToken) {
        headers['Authorization'] = `Bearer ${savedToken}`;
      }
      const res = await fetch(`/api/blogs?id=${id}`, {
        method: 'DELETE',
        headers,
        credentials: 'include',
      });
      const json = await res.json();
      if (json.success) {
        showToast('Blog card deleted!');
        setBlogs((prev) => prev.filter((b) => b._id !== id));
      } else {
        showToast(json.error || 'Failed to delete blog card');
      }
    } catch {
      showToast('Error deleting blog card');
    }
  };

  // Check active JWT session on page mount
  useEffect(() => {
    const verifySession = async () => {
      try {
        setIsAuthChecking(true);
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated && data.user) {
            setIsAuthenticated(true);
            setCurrentUser(data.user);
            setSessionExpiresAt(data.expiresAt || null);
          } else {
            setIsAuthenticated(false);
          }
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.error('Session verification error:', err);
        setIsAuthenticated(false);
      } finally {
        setIsAuthChecking(false);
      }
    };

    verifySession();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchAdminData();
    }
  }, [isAuthenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !passwordInput) {
      setAuthError('Please enter both email and password.');
      return;
    }

    try {
      setAuthLoading(true);
      setAuthError('');

      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: emailInput,
          password: passwordInput,
          rememberMe,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setIsAuthenticated(true);
        setCurrentUser(data.user);
        setSessionExpiresAt(data.expiresAt || null);
        if (data.token) {
          try {
            localStorage.setItem('admin_token', data.token);
          } catch {}
        }
        setAuthError('');
        showToast(`Welcome back, ${data.user?.name || data.user?.email}!`);
      } else {
        setAuthError(data.error || 'Login failed. Check your email & password.');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setAuthError('Network error during login. Please try again.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      try {
        localStorage.removeItem('admin_token');
      } catch {}
      setIsAuthenticated(false);
      setCurrentUser(null);
      setSessionExpiresAt(null);
      setPasswordInput('');
      showToast('Logged out of Studio Executive Admin');
    }
  };

  const handleSaveToMongoDB = async (stateToSave?: PortfolioState) => {
    const payload = stateToSave || portfolio;
    setIsSaving(true);
    try {
      const res = await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, _id: portfolio._id }),
      });

      const json = await res.json();
      if (json.success && json.data) {
        setPortfolio(json.data);
        setAllPortfolios((prev) =>
          prev.map((item) => (item._id === json.data._id ? json.data : item))
        );
        showToast('Changes saved successfully!');
      } else {
        showToast('Save failed: ' + (json.error || 'Server error'));
      }
    } catch (err) {
      console.error('Save error:', err);
      showToast('Network error while saving');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCreateNewProfile = async (profileName: string) => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'create_new', profileName }),
      });
      const json = await res.json();
      if (json.success && json.data) {
        setAllPortfolios([json.data, ...allPortfolios]);
        setPortfolio(json.data);
        showToast(`New blank portfolio "${json.data.profileName}" created and loaded!`);
      } else {
        showToast(json.error || 'Failed to create profile');
      }
    } catch {
      showToast('Error creating new portfolio profile');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSetActive = async (targetId: string) => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'set_active', targetId }),
      });
      const json = await res.json();
      if (json.success) {
        setActivePortfolioId(targetId);
        setAllPortfolios((prev) =>
          prev.map((p) => ({ ...p, isActive: p._id === targetId }))
        );
        if (portfolio._id === targetId) {
          setPortfolio((prev) => ({ ...prev, isActive: true }));
        }
        showToast('Portfolio is now LIVE on your public website!');
      } else {
        showToast(json.error || 'Failed to activate portfolio');
      }
    } catch {
      showToast('Error activating portfolio');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSwitchProfile = (targetId: string) => {
    const target = allPortfolios.find((p) => p._id === targetId);
    if (target) {
      setPortfolio(target);
      showToast(`Switched editor to: "${target.profileName || 'Selected Profile'}"`);
    }
  };

  const handleDeleteProfile = async (targetId: string) => {
    if (!confirm('Permanently delete this inactive portfolio draft?')) return;
    setIsSaving(true);
    try {
      const res = await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', targetId }),
      });
      const json = await res.json();
      if (json.success) {
        const remaining = allPortfolios.filter((p) => p._id !== targetId);
        setAllPortfolios(remaining);
        if (portfolio._id === targetId && remaining.length > 0) {
          setPortfolio(remaining[0]);
        }
        showToast('Portfolio draft deleted');
      } else {
        showToast(json.error || 'Failed to delete');
      }
    } catch {
      showToast('Error deleting portfolio draft');
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, onSuccess: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    showToast('Uploading photo...');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const json = await res.json();
      if (json.success && json.url) {
        onSuccess(json.url);
        showToast('Photo uploaded successfully!');
      } else {
        showToast(json.error || 'Upload failed');
      }
    } catch {
      showToast('Error uploading file');
    } finally {
      setIsUploading(false);
    }
  };

  const toggleInquiryRead = async (id: string, currentRead: boolean) => {
    try {
      const res = await fetch('/api/inquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, read: !currentRead }),
      });
      if (res.ok) {
        setInquiries(inquiries.map((inq) => (inq._id === id ? { ...inq, read: !currentRead } : inq)));
        showToast(currentRead ? 'Marked as unread' : 'Marked as read');
      }
    } catch {
      showToast('Error updating status');
    }
  };

  const deleteInquiry = async (id: string) => {
    if (!confirm('Permanently delete this inquiry from database?')) return;
    try {
      const res = await fetch(`/api/inquiries?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setInquiries(inquiries.filter((inq) => inq._id !== id));
        showToast('Inquiry deleted from database');
      }
    } catch {
      showToast('Failed to delete inquiry');
    }
  };

  // Safe references
  const hero = portfolio.hero || defaultFallbackData.hero!;
  const about = portfolio.about || defaultFallbackData.about!;
  const services = portfolio.services || defaultFallbackData.services!;
  const projects = portfolio.projects || defaultFallbackData.projects!;
  const skills = portfolio.skills || defaultFallbackData.skills!;
  const experiences = portfolio.experiences || defaultFallbackData.experiences!;
  const educations = portfolio.educations || defaultFallbackData.educations!;
  const tools = portfolio.tools || defaultFallbackData.tools!;
  const unreadCount = inquiries.filter((inq) => !inq.read).length;

  /* -------------------------------------------------------------
     LOGIN VIEW: LUXURY ATELIER ENTRY
  ------------------------------------------------------------- */
  if (isAuthChecking) {
    return (
      <main className="min-h-screen bg-neutral-950 text-white flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3">
          <FaSpinner className="w-6 h-6 animate-spin text-white" />
          <span className="text-xs text-neutral-400">Loading...</span>
        </div>
      </main>
    );
  }

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-neutral-950 text-white flex items-center justify-center p-4 selection:bg-neutral-800 selection:text-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="w-full max-w-sm bg-white text-neutral-900 rounded-2xl p-7 sm:p-8 shadow-2xl border border-neutral-200 relative overflow-hidden"
        >
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-12 h-12 rounded-xl bg-neutral-900 text-white flex items-center justify-center mb-3 shadow-sm border border-neutral-800">
              <FaLock className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-neutral-900 tracking-tight">
              Admin Login
            </h1>
            <p className="text-xs text-neutral-500 mt-1">
              Enter your credentials to access the dashboard
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-medium text-neutral-700 mb-1">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white border border-neutral-200 text-neutral-900 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                  autoFocus
                />
                <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400" />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-medium text-neutral-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full pl-9 pr-10 py-2.5 rounded-xl bg-white border border-neutral-200 text-neutral-900 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                />
                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 transition-colors p-1"
                  tabIndex={-1}
                >
                  {showPassword ? <FaEyeSlash className="w-3.5 h-3.5" /> : <FaEye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center text-xs text-neutral-600 pt-0.5">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-black focus:ring-black accent-black cursor-pointer"
                />
                <span>Remember me</span>
              </label>
            </div>

            {/* Error Message */}
            {authError && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-medium text-center"
              >
                {authError}
              </motion.div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-2.5 rounded-xl text-sm font-semibold bg-black text-white hover:bg-neutral-800 transition-all shadow-sm active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {authLoading ? (
                <>
                  <FaSpinner className="w-3.5 h-3.5 animate-spin text-white" />
                  <span>Signing in...</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </button>
          </form>
        </motion.div>
      </main>
    );
  }

  /* -------------------------------------------------------------
     EXECUTIVE STUDIO DASHBOARD: LUXURY 2-COLUMN LAYOUT
  ------------------------------------------------------------- */
  return (
    <div className="min-h-screen bg-neutral-100 text-neutral-900 font-sans flex flex-col lg:flex-row">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 right-6 z-50 px-5 py-3 rounded-2xl bg-neutral-900 text-white text-xs sm:text-sm font-bold flex items-center gap-3 shadow-2xl border border-neutral-700"
          >
            <FaCircleCheck className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================================
          LEFT SIDEBAR: FIXED ON DESKTOP (BLACK & WHITE)
      ========================================================= */}
      <aside className="hidden lg:flex lg:w-64 lg:fixed lg:top-0 lg:left-0 lg:bottom-0 lg:h-screen bg-neutral-950 text-white p-4 flex-col justify-between shrink-0 border-r border-neutral-800 z-30 overflow-y-auto lg:overflow-hidden [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
        <div>
          {/* Brand Logo Stamp */}
          <div className="flex items-center gap-2.5 mb-3 pb-3 border-b border-neutral-800">
            <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-black text-sm shadow-xs shrink-0">
              {hero?.name ? hero.name.charAt(0) : 'H'}
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold tracking-tight leading-tight truncate max-w-[170px]">
                {hero?.name || 'Harshit Sharma'}
              </div>
              <div className="text-[10px] text-neutral-400 font-mono">
                Studio Admin CMS
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-0.5">
            {[
              { id: 'hero', label: 'Hero & Identity', icon: <TbSparkles className="w-3.5 h-3.5 shrink-0" /> },
              { id: 'services', label: 'Services', icon: <TbDeviceMobile className="w-3.5 h-3.5 shrink-0" /> },
              { id: 'about', label: 'About Me', icon: <TbUserCircle className="w-3.5 h-3.5 shrink-0" /> },
              { id: 'projects', label: 'Projects Showcase', icon: <TbBrowser className="w-3.5 h-3.5 shrink-0" /> },
              { id: 'blogs', label: 'Blog & Bento Cards', icon: <FaNewspaper className="w-3.5 h-3.5 shrink-0" />, badge: blogs.length > 0 ? blogs.length : undefined },
              { id: 'skills', label: 'Skills & Tech', icon: <FaCode className="w-3 h-3 shrink-0" /> },
              { id: 'timeline', label: 'Career Timeline', icon: <FaGraduationCap className="w-3.5 h-3.5 shrink-0" /> },
              { id: 'tools', label: 'Design Tools', icon: <FaWrench className="w-3.5 h-3.5 shrink-0" /> },
              {
                id: 'inquiries',
                label: 'Client Messages',
                icon: <FaEnvelope className="w-3.5 h-3.5 shrink-0" />,
                badge: unreadCount > 0 ? unreadCount : undefined,
              },
              { id: 'settings', label: 'Settings & Profiles', icon: <TbSettings className="w-3.5 h-3.5 shrink-0" /> },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white text-black font-bold shadow-xs'
                      : 'text-neutral-400 hover:bg-neutral-900 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={isActive ? 'text-black' : 'text-neutral-400'}>
                      {tab.icon}
                    </span>
                    <span>{tab.label}</span>
                  </div>
                  {tab.badge && (
                    <span
                      className={`w-4 h-4 rounded-full text-[9px] font-black flex items-center justify-center ${
                        isActive ? 'bg-black text-white' : 'bg-neutral-800 text-neutral-300'
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="pt-3 border-t border-neutral-800 mt-auto">
          <button
            type="button"
            onClick={handleLogout}
            className="w-full py-2 px-3 rounded-xl border border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-900 text-xs font-medium flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <FaArrowRightFromBracket className="w-3 h-3" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* =========================================================
          MOBILE SLIDE-OUT DRAWER OVERLAY (< 1024px)
      ========================================================= */}
      <AnimatePresence>
        {isMobileNavOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMobileNavOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 lg:hidden"
            />

            {/* Slide-out Sidebar */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 260 }}
              className="fixed inset-y-0 left-0 w-64 max-w-[82vw] bg-neutral-950 text-white p-4 flex flex-col justify-between z-50 border-r border-neutral-800 shadow-2xl lg:hidden overflow-y-auto"
            >
              <div>
                {/* Header with Close Button */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-800">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-black text-sm shadow-xs">
                      {hero?.name ? hero.name.charAt(0) : 'H'}
                    </div>
                    <div>
                      <div className="text-xs font-bold tracking-tight leading-tight truncate max-w-[130px]">
                        {hero?.name || 'Harshit Sharma'}
                      </div>
                      <div className="text-[10px] text-neutral-400 font-mono">
                        Studio Admin CMS
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsMobileNavOpen(false)}
                    className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors cursor-pointer"
                    aria-label="Close navigation"
                  >
                    <TbX className="w-4 h-4" />
                  </button>
                </div>

                {/* Mobile Navigation Links */}
                <nav className="space-y-0.5">
                  {[
                    { id: 'hero', label: 'Hero & Identity', icon: <TbSparkles className="w-3.5 h-3.5 shrink-0" /> },
                    { id: 'services', label: 'Services', icon: <TbDeviceMobile className="w-3.5 h-3.5 shrink-0" /> },
                    { id: 'about', label: 'About Me', icon: <TbUserCircle className="w-3.5 h-3.5 shrink-0" /> },
                    { id: 'projects', label: 'Projects Showcase', icon: <TbBrowser className="w-3.5 h-3.5 shrink-0" /> },
                    { id: 'blogs', label: 'Blog & Bento Cards', icon: <FaNewspaper className="w-3.5 h-3.5 shrink-0" />, badge: blogs.length > 0 ? blogs.length : undefined },
                    { id: 'skills', label: 'Skills & Tech', icon: <FaCode className="w-3 h-3 shrink-0" /> },
                    { id: 'timeline', label: 'Career Timeline', icon: <FaGraduationCap className="w-3.5 h-3.5 shrink-0" /> },
                    { id: 'tools', label: 'Design Tools', icon: <FaWrench className="w-3.5 h-3.5 shrink-0" /> },
                    {
                      id: 'inquiries',
                      label: 'Client Messages',
                      icon: <FaEnvelope className="w-3.5 h-3.5 shrink-0" />,
                      badge: unreadCount > 0 ? unreadCount : undefined,
                    },
                    { id: 'settings', label: 'Settings & Profiles', icon: <TbSettings className="w-3.5 h-3.5 shrink-0" /> },
                  ].map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => {
                          setActiveTab(tab.id as any);
                          setIsMobileNavOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                          isActive
                            ? 'bg-white text-black font-bold shadow-xs'
                            : 'text-neutral-400 hover:bg-neutral-900 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className={isActive ? 'text-black' : 'text-neutral-400'}>
                            {tab.icon}
                          </span>
                          <span>{tab.label}</span>
                        </div>
                        {tab.badge && (
                          <span
                            className={`w-4 h-4 rounded-full text-[9px] font-black flex items-center justify-center ${
                              isActive ? 'bg-black text-white' : 'bg-neutral-800 text-neutral-300'
                            }`}
                          >
                            {tab.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Mobile Drawer Footer */}
              <div className="pt-3 border-t border-neutral-800 mt-auto">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full py-2 px-3 rounded-xl border border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-900 text-xs font-medium flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <FaArrowRightFromBracket className="w-3 h-3" />
                  <span>Sign Out</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* =========================================================
          MAIN CANVAS AREA (OFFSET BY FIXED SIDEBAR ON DESKTOP)
      ========================================================= */}
      <main className="flex-1 lg:ml-64 flex flex-col min-w-0 min-h-screen">
        
        {/* TOP BAR */}
        <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-neutral-200">
          <div className="h-14 px-3 sm:px-6 flex items-center justify-between gap-2.5">
            {/* Left: Mobile Menu Toggle & Title */}
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <button
                type="button"
                onClick={() => setIsMobileNavOpen(true)}
                className="lg:hidden p-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-800 transition-colors shrink-0 cursor-pointer"
                aria-label="Open Navigation Menu"
              >
                <TbMenu2 className="w-5 h-5" />
              </button>

              <div className="min-w-0 flex items-center gap-1.5">
                <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider hidden sm:inline">
                  Admin /
                </span>
                <h1 className="text-sm sm:text-base font-bold text-neutral-900 tracking-tight capitalize truncate">
                  {activeTab === 'hero' && 'Hero & Personal Identity'}
                  {activeTab === 'services' && 'Services'}
                  {activeTab === 'about' && 'About Me'}
                  {activeTab === 'projects' && 'Projects Showcase'}
                  {activeTab === 'blogs' && 'Blog & Bento Visual Cards'}
                  {activeTab === 'skills' && 'Skills & Tech'}
                  {activeTab === 'timeline' && 'Career Timeline'}
                  {activeTab === 'tools' && 'Design Tools'}
                  {activeTab === 'inquiries' && 'Client Inquiries'}
                  {activeTab === 'settings' && 'Studio Settings'}
                </h1>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
              {/* Active Portfolio Profile Switcher / Indicator */}
              <button
                type="button"
                onClick={() => setActiveTab('settings')}
                className="px-2.5 py-1 rounded-lg bg-neutral-100 border border-neutral-300 hover:border-black text-[11px] font-medium flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
                title="Manage and switch portfolio profiles in Settings"
              >
                <span className="hidden md:inline font-mono text-neutral-500 uppercase text-[10px]">Profile:</span>
                <span className="font-bold text-neutral-900 truncate max-w-[70px] sm:max-w-[120px]">
                  {portfolio.profileName || 'Active'}
                </span>
                {portfolio.isActive || portfolio._id === activePortfolioId ? (
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[9px] font-black uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    LIVE
                  </span>
                ) : (
                  <span className="px-1.5 py-0.5 rounded-full bg-neutral-200 text-neutral-700 text-[9px] font-bold uppercase tracking-wider">
                    DRAFT
                  </span>
                )}
              </button>

              {/* View Live Portfolio */}
              <Link
                href="/"
                target="_blank"
                className="px-2.5 py-1 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold transition-all flex items-center gap-1 border border-neutral-300"
                title="View live portfolio website"
              >
                <span className="hidden sm:inline">View Site</span>
                <FaArrowUpRightFromSquare className="w-3 h-3 text-neutral-600" />
              </Link>

              {/* Save Changes Button (Visible always) */}
              <button
                type="button"
                onClick={() => handleSaveToMongoDB()}
                disabled={isSaving}
                className="px-3 sm:px-4 py-1.5 rounded-lg bg-black text-white hover:bg-neutral-800 text-xs font-bold shadow-xs transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer disabled:opacity-50"
              >
                {isSaving ? (
                  <>
                    <FaSpinner className="w-3 h-3 animate-spin text-white" />
                    <span className="hidden sm:inline">Saving...</span>
                  </>
                ) : (
                  <>
                    <FaCheck className="w-3 h-3 text-white" />
                    <span className="hidden sm:inline">Save Changes</span>
                    <span className="sm:hidden">Save</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </header>

        {/* CONTENT CANVAS */}
        <div className="p-3 sm:p-5 lg:p-6 w-full max-w-6xl mx-auto space-y-4 sm:space-y-5 pb-12">

          {/* =====================================================
              TAB 1: HERO & IDENTITY
          ===================================================== */}
          {activeTab === 'hero' && (
            <div className="space-y-4 sm:space-y-5">
              {/* Brand Logo & Favicon Card */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-neutral-200/90 shadow-2xs space-y-4">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-neutral-900 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-black inline-block" />
                    Site Logo &amp; Favicon (Browser Icon)
                  </h3>
                  <p className="text-[11px] text-neutral-500 mt-0.5">
                    Upload your custom brand logo displayed on Navbar &amp; Footer, plus the favicon site icon shown on browser tabs.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5 sm:gap-4">
                  {/* Brand Logo Section */}
                  <div className="p-3.5 sm:p-4 rounded-xl bg-neutral-50/70 border border-neutral-200/80 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold uppercase text-neutral-700">Navbar / Footer Logo</span>
                      {hero.logoUrl && (
                        <button
                          type="button"
                          onClick={() => setPortfolio({ ...portfolio, hero: { ...hero, logoUrl: '' } })}
                          className="text-[11px] text-red-600 hover:underline cursor-pointer"
                        >
                          Remove Image
                        </button>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-white border border-neutral-200 p-1.5 flex items-center justify-center shrink-0 overflow-hidden shadow-2xs">
                        {hero.logoUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={hero.logoUrl} alt="Logo" className="w-full h-full object-contain" />
                        ) : (
                          <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center font-bold text-xs">
                            {hero.logoText ? hero.logoText.charAt(0) : (hero.name ? hero.name.charAt(0) : 'H')}
                          </div>
                        )}
                      </div>

                      <div className="flex-1 space-y-1">
                        <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black hover:bg-neutral-800 text-white text-xs font-semibold cursor-pointer shadow-xs transition-all">
                          <FaUpload className="w-2.5 h-2.5 text-neutral-300" />
                          <span>{isUploading ? 'Uploading...' : 'Upload Logo'}</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) =>
                              handleImageUpload(e, (url) => {
                                setPortfolio({
                                  ...portfolio,
                                  hero: { ...hero, logoUrl: url },
                                });
                              })
                            }
                          />
                        </label>
                        <p className="text-[10px] text-neutral-400">PNG, SVG, or JPG</p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-neutral-500 mb-1 uppercase">Logo Image URL</label>
                      <input
                        type="text"
                        placeholder="https://.../logo.png"
                        value={hero.logoUrl || ''}
                        onChange={(e) =>
                          setPortfolio({
                            ...portfolio,
                            hero: { ...hero, logoUrl: e.target.value },
                          })
                        }
                        className="w-full px-3 py-1.5 rounded-lg bg-white border border-neutral-200 text-xs font-mono focus:outline-none focus:border-black"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-neutral-500 mb-1 uppercase">Logo Brand Text (Fallback)</label>
                      <input
                        type="text"
                        placeholder="e.g. Harshit Sharma"
                        value={hero.logoText || ''}
                        onChange={(e) =>
                          setPortfolio({
                            ...portfolio,
                            hero: { ...hero, logoText: e.target.value },
                          })
                        }
                        className="w-full px-3 py-1.5 rounded-lg bg-white border border-neutral-200 text-xs font-medium focus:outline-none focus:border-black"
                      />
                    </div>
                  </div>

                  {/* Favicon Section */}
                  <div className="p-3.5 sm:p-4 rounded-xl bg-neutral-50/70 border border-neutral-200/80 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold uppercase text-neutral-700">Site Favicon (Tab Icon)</span>
                      {hero.faviconUrl && (
                        <button
                          type="button"
                          onClick={() => setPortfolio({ ...portfolio, hero: { ...hero, faviconUrl: '' } })}
                          className="text-[11px] text-red-600 hover:underline cursor-pointer"
                        >
                          Remove Favicon
                        </button>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-white border border-neutral-200 p-1.5 flex items-center justify-center shrink-0 overflow-hidden shadow-2xs">
                        {hero.faviconUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={hero.faviconUrl} alt="Favicon" className="w-6 h-6 object-contain" />
                        ) : (
                          <div className="w-6 h-6 rounded-md bg-neutral-900 text-white flex items-center justify-center font-bold text-[10px] font-mono">
                            ICO
                          </div>
                        )}
                      </div>

                      <div className="flex-1 space-y-1">
                        <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black hover:bg-neutral-800 text-white text-xs font-semibold cursor-pointer shadow-xs transition-all">
                          <FaUpload className="w-2.5 h-2.5 text-neutral-300" />
                          <span>{isUploading ? 'Uploading...' : 'Upload Favicon'}</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) =>
                              handleImageUpload(e, (url) => {
                                setPortfolio({
                                  ...portfolio,
                                  hero: { ...hero, faviconUrl: url },
                                });
                              })
                            }
                          />
                        </label>
                        <p className="text-[10px] text-neutral-400">32x32 or 64x64 PNG / ICO</p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-neutral-500 mb-1 uppercase">Favicon Image URL</label>
                      <input
                        type="text"
                        placeholder="https://.../favicon.png"
                        value={hero.faviconUrl || ''}
                        onChange={(e) =>
                          setPortfolio({
                            ...portfolio,
                            hero: { ...hero, faviconUrl: e.target.value },
                          })
                        }
                        className="w-full px-3 py-1.5 rounded-lg bg-white border border-neutral-200 text-xs font-mono focus:outline-none focus:border-black"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Profile Photo Card */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-neutral-200/90 shadow-2xs space-y-3">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-neutral-900">Hero Avatar &amp; Visual Identity</h3>
                  <p className="text-[11px] text-neutral-500">Update profile portrait photo displayed on homepage.</p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                  {/* Avatar Circular Preview */}
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-neutral-100 border-2 border-neutral-300 p-1 shadow-xs overflow-hidden shrink-0 flex items-end justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={hero.avatarUrl || '/assets/hero-image.png'}
                      alt="Avatar Preview"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  <div className="flex-1 w-full space-y-2">
                    <label className="block text-[11px] font-mono text-neutral-600 uppercase">
                      Avatar URL
                    </label>
                    <input
                      type="text"
                      value={hero.avatarUrl || ''}
                      onChange={(e) =>
                        setPortfolio({
                          ...portfolio,
                          hero: { ...hero, avatarUrl: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-neutral-50/70 border border-neutral-200 text-xs font-mono focus:outline-none focus:border-black"
                    />

                    <label className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-black hover:bg-neutral-800 text-white text-xs font-semibold cursor-pointer shadow-xs transition-all">
                      <FaUpload className="w-2.5 h-2.5 text-neutral-300" />
                      <span>{isUploading ? 'Uploading...' : 'Upload Photo'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                          handleImageUpload(e, (url) => {
                            setPortfolio({
                              ...portfolio,
                              hero: { ...hero, avatarUrl: url },
                            });
                          })
                        }
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* 4-Color Theme System Card */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-neutral-200/90 shadow-2xs space-y-3">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-neutral-900 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-black inline-block" />
                    Studio 4-Color Theme System
                  </h3>
                  <p className="text-[11px] text-neutral-500 mt-0.5">
                    Portfolio color palette: Primary &amp; Accent brand colors plus Dark &amp; Light surfaces.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                  {/* Primary Color */}
                  <div className="p-3 rounded-xl bg-neutral-50/70 border border-neutral-200/80 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-neutral-600 uppercase">Primary</span>
                      <span className="w-3.5 h-3.5 rounded-full shadow-2xs border border-white" style={{ backgroundColor: portfolio.theme?.primary || '#1E3A2B' }} />
                    </div>
                    <input
                      type="text"
                      value={portfolio.theme?.primary || '#1E3A2B'}
                      onChange={(e) =>
                        setPortfolio({
                          ...portfolio,
                          theme: {
                            primary: e.target.value,
                            accent: portfolio.theme?.accent || '#FFB800',
                            dark: portfolio.theme?.dark || '#181818',
                            light: portfolio.theme?.light || '#FAF9F5',
                          },
                        })
                      }
                      className="w-full px-2.5 py-1 rounded-lg bg-white border border-neutral-200 text-xs font-mono font-bold text-neutral-900 focus:outline-none focus:border-black"
                    />
                    <span className="text-[9px] text-neutral-400 block font-medium">Dark Forest Green</span>
                  </div>

                  {/* Accent Color */}
                  <div className="p-3 rounded-xl bg-neutral-50/70 border border-neutral-200/80 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-neutral-600 uppercase">Accent</span>
                      <span className="w-3.5 h-3.5 rounded-full shadow-2xs border border-neutral-200" style={{ backgroundColor: portfolio.theme?.accent || '#FFB800' }} />
                    </div>
                    <input
                      type="text"
                      value={portfolio.theme?.accent || '#FFB800'}
                      onChange={(e) =>
                        setPortfolio({
                          ...portfolio,
                          theme: {
                            primary: portfolio.theme?.primary || '#1E3A2B',
                            accent: e.target.value,
                            dark: portfolio.theme?.dark || '#181818',
                            light: portfolio.theme?.light || '#FAF9F5',
                          },
                        })
                      }
                      className="w-full px-2.5 py-1 rounded-lg bg-white border border-neutral-200 text-xs font-mono font-bold text-neutral-900 focus:outline-none focus:border-black"
                    />
                    <span className="text-[9px] text-neutral-400 block font-medium">Electric Yellow</span>
                  </div>

                  {/* Dark Color */}
                  <div className="p-3 rounded-xl bg-neutral-50/70 border border-neutral-200/80 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-neutral-600 uppercase">Dark (Text)</span>
                      <span className="w-3.5 h-3.5 rounded-full shadow-2xs border border-white" style={{ backgroundColor: portfolio.theme?.dark || '#181818' }} />
                    </div>
                    <input
                      type="text"
                      value={portfolio.theme?.dark || '#181818'}
                      onChange={(e) =>
                        setPortfolio({
                          ...portfolio,
                          theme: {
                            primary: portfolio.theme?.primary || '#1E3A2B',
                            accent: portfolio.theme?.accent || '#FFB800',
                            dark: e.target.value,
                            light: portfolio.theme?.light || '#FAF9F5',
                          },
                        })
                      }
                      className="w-full px-2.5 py-1 rounded-lg bg-white border border-neutral-200 text-xs font-mono font-bold text-neutral-900 focus:outline-none focus:border-black"
                    />
                    <span className="text-[9px] text-neutral-400 block font-medium">Charcoal Black</span>
                  </div>

                  {/* Light Color */}
                  <div className="p-3 rounded-xl bg-neutral-50/70 border border-neutral-200/80 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-neutral-600 uppercase">Light (Surface)</span>
                      <span className="w-3.5 h-3.5 rounded-full shadow-2xs border border-neutral-200" style={{ backgroundColor: portfolio.theme?.light || '#FFFFFF' }} />
                    </div>
                    <input
                      type="text"
                      value={portfolio.theme?.light || '#FFFFFF'}
                      onChange={(e) =>
                        setPortfolio({
                          ...portfolio,
                          theme: {
                            primary: portfolio.theme?.primary || '#1E3A2B',
                            accent: portfolio.theme?.accent || '#FFB800',
                            dark: portfolio.theme?.dark || '#181818',
                            light: e.target.value,
                          },
                        })
                      }
                      className="w-full px-2.5 py-1 rounded-lg bg-white border border-neutral-200 text-xs font-mono font-bold text-neutral-900 focus:outline-none focus:border-black"
                    />
                    <span className="text-[9px] text-neutral-400 block font-medium">Pure / Warm White</span>
                  </div>
                </div>
              </div>

              {/* Text Fields: Headline & Bio */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-neutral-200/90 shadow-2xs space-y-4">
                <h3 className="text-sm sm:text-base font-bold text-neutral-900">Headline &amp; Bio Information</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[11px] font-mono font-semibold text-neutral-600 mb-1 uppercase">
                      Top Greeting
                    </label>
                    <input
                      type="text"
                      value={hero.greeting || ''}
                      onChange={(e) =>
                        setPortfolio({
                          ...portfolio,
                          hero: { ...hero, greeting: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-neutral-50/70 border border-neutral-200 text-xs sm:text-sm focus:outline-none focus:border-black"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono font-semibold text-neutral-600 mb-1 uppercase">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={hero.name || ''}
                      onChange={(e) =>
                        setPortfolio({
                          ...portfolio,
                          hero: { ...hero, name: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-neutral-50/70 border border-neutral-200 text-xs sm:text-sm focus:outline-none focus:border-black"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-mono font-semibold text-neutral-600 mb-1 uppercase">
                      Main Title
                    </label>
                    <input
                      type="text"
                      value={hero.title || ''}
                      onChange={(e) =>
                        setPortfolio({
                          ...portfolio,
                          hero: { ...hero, title: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-neutral-50/70 border border-neutral-200 text-xs sm:text-sm focus:outline-none focus:border-black"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-mono font-semibold text-neutral-600 mb-1 uppercase">
                      Hero Bio Description
                    </label>
                    <textarea
                      rows={3}
                      value={hero.bio || ''}
                      onChange={(e) =>
                        setPortfolio({
                          ...portfolio,
                          hero: { ...hero, bio: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-neutral-50/70 border border-neutral-200 text-xs sm:text-sm focus:outline-none focus:border-black resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Call-to-Action (CTA) Buttons Configuration */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-neutral-200/90 shadow-2xs space-y-3.5">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-neutral-900 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-black inline-block" />
                    Call-to-Action (CTA) Buttons &amp; Links
                  </h3>
                  <p className="text-[11px] text-neutral-500 mt-0.5">
                    Customize labels and destination URLs for primary action buttons across the site.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  {/* Hire Me CTA */}
                  <div className="p-3 rounded-xl bg-neutral-50/70 border border-neutral-200/80 space-y-2">
                    <span className="text-[11px] font-mono font-bold uppercase text-neutral-700 block">Hire Me Button</span>
                    <div>
                      <label className="block text-[10px] font-mono text-neutral-500 mb-0.5">Button Label</label>
                      <input
                        type="text"
                        placeholder="Hire Me"
                        value={hero.ctaHireMeText || ''}
                        onChange={(e) =>
                          setPortfolio({
                            ...portfolio,
                            hero: { ...hero, ctaHireMeText: e.target.value },
                          })
                        }
                        className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-neutral-200 text-xs font-semibold focus:outline-none focus:border-black"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-neutral-500 mb-0.5">Target Link</label>
                      <input
                        type="text"
                        placeholder="#contact"
                        value={hero.ctaHireMeLink || ''}
                        onChange={(e) =>
                          setPortfolio({
                            ...portfolio,
                            hero: { ...hero, ctaHireMeLink: e.target.value },
                          })
                        }
                        className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-neutral-200 text-xs font-mono focus:outline-none focus:border-black"
                      />
                    </div>
                  </div>

                  {/* View Portfolio CTA */}
                  <div className="p-3 rounded-xl bg-neutral-50/70 border border-neutral-200/80 space-y-2">
                    <span className="text-[11px] font-mono font-bold uppercase text-neutral-700 block">Portfolio Button</span>
                    <div>
                      <label className="block text-[10px] font-mono text-neutral-500 mb-0.5">Button Label</label>
                      <input
                        type="text"
                        placeholder="View My Portfolio"
                        value={hero.ctaPortfolioText || ''}
                        onChange={(e) =>
                          setPortfolio({
                            ...portfolio,
                            hero: { ...hero, ctaPortfolioText: e.target.value },
                          })
                        }
                        className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-neutral-200 text-xs font-semibold focus:outline-none focus:border-black"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-neutral-500 mb-0.5">Target Link</label>
                      <input
                        type="text"
                        placeholder="#projects"
                        value={hero.ctaPortfolioLink || ''}
                        onChange={(e) =>
                          setPortfolio({
                            ...portfolio,
                            hero: { ...hero, ctaPortfolioLink: e.target.value },
                          })
                        }
                        className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-neutral-200 text-xs font-mono focus:outline-none focus:border-black"
                      />
                    </div>
                  </div>

                  {/* Navbar Contact CTA */}
                  <div className="p-3 rounded-xl bg-neutral-50/70 border border-neutral-200/80 space-y-2">
                    <span className="text-[11px] font-mono font-bold uppercase text-neutral-700 block">Navbar Contact CTA</span>
                    <div>
                      <label className="block text-[10px] font-mono text-neutral-500 mb-0.5">Button Label</label>
                      <input
                        type="text"
                        placeholder="Contact Me"
                        value={hero.ctaContactText || ''}
                        onChange={(e) =>
                          setPortfolio({
                            ...portfolio,
                            hero: { ...hero, ctaContactText: e.target.value },
                          })
                        }
                        className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-neutral-200 text-xs font-semibold focus:outline-none focus:border-black"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-neutral-500 mb-0.5">Target Link</label>
                      <input
                        type="text"
                        placeholder="#contact"
                        value={hero.ctaContactLink || ''}
                        onChange={(e) =>
                          setPortfolio({
                            ...portfolio,
                            hero: { ...hero, ctaContactLink: e.target.value },
                          })
                        }
                        className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-neutral-200 text-xs font-mono focus:outline-none focus:border-black"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Channels & Contact Coordinates */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-neutral-200/90 shadow-2xs space-y-3.5">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-neutral-900">Social Channels &amp; Direct Contact</h3>
                  <p className="text-[11px] text-neutral-500 mt-0.5">
                    Icons only appear on your live site if filled in; empty links remain hidden.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono text-neutral-600 mb-0.5">Direct Email</label>
                    <input
                      type="email"
                      placeholder="e.g. yourname@example.com"
                      value={hero.socialLinks?.email || ''}
                      onChange={(e) =>
                        setPortfolio({
                          ...portfolio,
                          hero: {
                            ...hero,
                            socialLinks: { ...hero.socialLinks, email: e.target.value },
                          },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-neutral-50/70 border border-neutral-200 text-xs font-mono focus:outline-none focus:border-black"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-neutral-600 mb-0.5">Phone / WhatsApp</label>
                    <input
                      type="text"
                      placeholder="e.g. +91 9876543210"
                      value={hero.phone || ''}
                      onChange={(e) =>
                        setPortfolio({
                          ...portfolio,
                          hero: { ...hero, phone: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-neutral-50/70 border border-neutral-200 text-xs font-mono focus:outline-none focus:border-black"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-neutral-600 mb-0.5">LinkedIn Profile</label>
                    <input
                      type="text"
                      placeholder="https://linkedin.com/in/username"
                      value={hero.socialLinks?.linkedin || ''}
                      onChange={(e) =>
                        setPortfolio({
                          ...portfolio,
                          hero: {
                            ...hero,
                            socialLinks: { ...hero.socialLinks, linkedin: e.target.value },
                          },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-neutral-50/70 border border-neutral-200 text-xs font-mono focus:outline-none focus:border-black"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-neutral-600 mb-0.5">GitHub Profile</label>
                    <input
                      type="text"
                      placeholder="https://github.com/username"
                      value={hero.socialLinks?.github || ''}
                      onChange={(e) =>
                        setPortfolio({
                          ...portfolio,
                          hero: {
                            ...hero,
                            socialLinks: { ...hero.socialLinks, github: e.target.value },
                          },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-neutral-50/70 border border-neutral-200 text-xs font-mono focus:outline-none focus:border-black"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-neutral-600 mb-0.5">Twitter / X Profile</label>
                    <input
                      type="text"
                      placeholder="https://x.com/username"
                      value={hero.socialLinks?.twitter || ''}
                      onChange={(e) =>
                        setPortfolio({
                          ...portfolio,
                          hero: {
                            ...hero,
                            socialLinks: { ...hero.socialLinks, twitter: e.target.value },
                          },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-neutral-50/70 border border-neutral-200 text-xs font-mono focus:outline-none focus:border-black"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-neutral-600 mb-0.5">Instagram Profile</label>
                    <input
                      type="text"
                      placeholder="https://instagram.com/username"
                      value={hero.socialLinks?.instagram || ''}
                      onChange={(e) =>
                        setPortfolio({
                          ...portfolio,
                          hero: {
                            ...hero,
                            socialLinks: { ...hero.socialLinks, instagram: e.target.value },
                          },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-neutral-50/70 border border-neutral-200 text-xs font-mono focus:outline-none focus:border-black"
                    />
                  </div>
                </div>
              </div>

              {/* Yellow Marquee Ribbon (Under Hero Section) */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-neutral-200/90 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-neutral-900 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FFB800] inline-block" />
                      Yellow Marquee Ribbon (Under Hero Section)
                    </h3>
                    <p className="text-[11px] text-neutral-500 mt-0.5">
                      Manage rotating keywords displayed on the yellow ticker strip under the hero section.
                    </p>
                  </div>
                </div>

                <div className="space-y-3 pt-1">
                  {/* Current Keywords List */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    {(portfolio.tickerItems && portfolio.tickerItems.length > 0) ? (
                      portfolio.tickerItems.map((item, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFB800] text-[#181818] text-xs font-extrabold shadow-2xs uppercase tracking-wide font-sans"
                        >
                          <span>{item}</span>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = (portfolio.tickerItems || []).filter((_, i) => i !== idx);
                              setPortfolio({ ...portfolio, tickerItems: updated });
                            }}
                            className="w-3.5 h-3.5 rounded-full bg-black/15 hover:bg-black/30 text-[#181818] flex items-center justify-center text-xs font-bold transition-all cursor-pointer"
                            title="Remove keyword"
                          >
                            &times;
                          </button>
                        </span>
                      ))
                    ) : (
                      <p className="text-xs text-neutral-400 italic">
                        No keywords currently. The yellow ribbon is hidden on the website.
                      </p>
                    )}
                  </div>

                  {/* Add New Keyword Input */}
                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="text"
                      id="new-ticker-keyword-input"
                      placeholder="Type a skill or role (e.g. App Design, Dashboard, Wireframe)..."
                      className="flex-1 px-3 py-1.5 rounded-xl bg-neutral-50/70 border border-neutral-200 text-xs focus:outline-none focus:border-black"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          const val = e.currentTarget.value.trim();
                          if (val) {
                            const cur = portfolio.tickerItems || [];
                            setPortfolio({ ...portfolio, tickerItems: [...cur, val] });
                            e.currentTarget.value = '';
                          }
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const input = document.getElementById('new-ticker-keyword-input') as HTMLInputElement | null;
                        if (input && input.value.trim()) {
                          const cur = portfolio.tickerItems || [];
                          setPortfolio({ ...portfolio, tickerItems: [...cur, input.value.trim()] });
                          input.value = '';
                        }
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-black text-white hover:bg-neutral-800 text-xs font-semibold cursor-pointer transition-all shadow-xs"
                    >
                      Add Keyword
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =====================================================
              TAB 2: SERVICES
          ===================================================== */}
          {activeTab === 'services' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-neutral-900">Services Cards ({services.length})</h3>
                  <p className="text-[11px] text-neutral-500">Edit or add offerings displayed in the Services section.</p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setServiceModal({
                      isOpen: true,
                      isEditing: false,
                      data: { id: `srv-${Date.now()}`, title: '', description: '', number: `0${services.length + 1}` },
                    })
                  }
                  className="px-3.5 py-1.5 rounded-lg bg-black text-white hover:bg-neutral-800 text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <FaPlus className="w-2.5 h-2.5 text-neutral-300" />
                  <span>Add Service</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {services.map((srv, idx) => (
                  <div
                    key={srv.id || idx}
                    className="bg-white rounded-2xl p-4 border border-neutral-200/90 shadow-2xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-800">
                          {srv.number || `0${idx + 1}`}
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => setServiceModal({ isOpen: true, isEditing: true, data: { ...srv } })}
                            className="p-1 rounded-md text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition-colors cursor-pointer"
                          >
                            <FaPenToSquare className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = services.filter((s) => s.id !== srv.id);
                              setPortfolio({ ...portfolio, services: updated });
                              showToast('Service removed (Click Save to persist)');
                            }}
                            className="p-1 rounded-md text-neutral-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                          >
                            <FaTrash className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      <h4 className="text-sm font-bold text-neutral-900 mb-1">{srv.title}</h4>
                      <p className="text-xs text-neutral-500 leading-relaxed">{srv.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =====================================================
              TAB 3: ABOUT ME
          ===================================================== */}
          {activeTab === 'about' && (
            <div className="space-y-4">
              {/* About Section Portrait Photo Card */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-neutral-200/90 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-neutral-900 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FFB800] inline-block" />
                      About Section Circular Portrait Photo
                    </h3>
                    <p className="text-[11px] text-neutral-500 mt-0.5">
                      Upload a dedicated portrait photo for the circular badge in the About section.
                    </p>
                  </div>
                  {about.avatarUrl && (
                    <button
                      type="button"
                      onClick={() => setPortfolio({ ...portfolio, about: { ...about, avatarUrl: '' } })}
                      className="text-[11px] text-red-600 hover:underline cursor-pointer"
                    >
                      Revert to Hero Avatar
                    </button>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 pt-1">
                  {/* Portrait Circular Preview with Yellow ring */}
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#FFB800] p-1 shadow-xs overflow-hidden shrink-0 flex items-end justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={about.avatarUrl || hero.avatarUrl || '/assets/hero-image.png'}
                      alt="About Preview"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  <div className="flex-1 w-full space-y-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full ${
                          about.avatarUrl
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : 'bg-amber-50 text-amber-800 border border-amber-200'
                        }`}
                      >
                        {about.avatarUrl ? '✓ Custom About Photo Uploaded' : 'ℹ Using Hero Avatar (Backup Mode)'}
                      </span>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-neutral-500 mb-0.5 uppercase">About Avatar URL</label>
                      <input
                        type="text"
                        placeholder="Leave blank to backup to Hero photo..."
                        value={about.avatarUrl || ''}
                        onChange={(e) =>
                          setPortfolio({
                            ...portfolio,
                            about: { ...about, avatarUrl: e.target.value },
                          })
                        }
                        className="w-full px-3 py-1.5 rounded-xl bg-neutral-50/70 border border-neutral-200 text-xs font-mono focus:outline-none focus:border-black"
                      />
                    </div>

                    <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black hover:bg-neutral-800 text-white text-xs font-semibold cursor-pointer shadow-xs transition-all">
                      <FaUpload className="w-2.5 h-2.5 text-neutral-300" />
                      <span>{isUploading ? 'Uploading...' : 'Upload About Photo'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                          handleImageUpload(e, (url) => {
                            setPortfolio({
                              ...portfolio,
                              about: { ...about, avatarUrl: url },
                            });
                          })
                        }
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* About Narrative & Stats */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-neutral-200/90 shadow-2xs space-y-4">
                <h3 className="text-sm sm:text-base font-bold text-neutral-900">About Narrative &amp; Stats</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[11px] font-mono font-semibold text-neutral-600 mb-1 uppercase">
                      Section Heading
                    </label>
                    <input
                      type="text"
                      value={about.heading || ''}
                      onChange={(e) =>
                        setPortfolio({
                          ...portfolio,
                          about: { ...about, heading: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-neutral-50/70 border border-neutral-200 text-xs sm:text-sm focus:outline-none focus:border-black"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono font-semibold text-neutral-600 mb-1 uppercase">
                      Cursive Signature Text
                    </label>
                    <input
                      type="text"
                      value={about.signature || ''}
                      onChange={(e) =>
                        setPortfolio({
                          ...portfolio,
                          about: { ...about, signature: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-neutral-50/70 border border-neutral-200 text-xs sm:text-sm focus:outline-none focus:border-black"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-mono font-semibold text-neutral-600 mb-1 uppercase">
                      About Narrative Paragraph
                    </label>
                    <textarea
                      rows={3}
                      value={about.description || ''}
                      onChange={(e) =>
                        setPortfolio({
                          ...portfolio,
                          about: { ...about, description: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-neutral-50/70 border border-neutral-200 text-xs sm:text-sm focus:outline-none focus:border-black resize-none"
                    />
                  </div>

                  {/* Stat Counters */}
                  <div className="sm:col-span-2 pt-3 border-t border-neutral-200/80">
                    <label className="block text-[11px] font-mono font-semibold text-neutral-600 mb-2 uppercase">
                      3 Highlight Stat Counters
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {(about.stats || []).map((stat, sIdx) => (
                        <div key={sIdx} className="p-3 rounded-xl bg-neutral-50/70 border border-neutral-200/80">
                          <label className="block text-[10px] font-mono text-neutral-500 mb-0.5">
                            {stat.label}
                          </label>
                          <input
                            type="text"
                            value={stat.value}
                            onChange={(e) => {
                              const updated = [...(about.stats || [])];
                              updated[sIdx] = { ...stat, value: e.target.value };
                              setPortfolio({
                                ...portfolio,
                                about: { ...about, stats: updated },
                              });
                            }}
                            className="w-full px-2.5 py-1 rounded-lg bg-white border border-neutral-200 text-xs font-bold text-neutral-900 focus:outline-none focus:border-black"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =====================================================
              TAB 4: PROJECTS SHOWCASE
          ===================================================== */}
          {/* =====================================================
              TAB 4: PROJECTS SHOWCASE
          ===================================================== */}
          {activeTab === 'projects' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-neutral-900">Featured Projects ({projects.length})</h3>
                  <p className="text-[11px] text-neutral-500">Add or edit showcase works displayed on the live website.</p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setProjectModal({
                      isOpen: true,
                      isEditing: false,
                      data: {
                        id: `p-${Date.now()}`,
                        title: '',
                        category: 'App Design',
                        description: '',
                        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
                        tags: ['Figma', 'UI/UX'],
                        metrics: '40% Impact Lift',
                        year: '2024',
                        liveUrl: '',
                      },
                    })
                  }
                  className="px-3.5 py-1.5 rounded-lg bg-black text-white hover:bg-neutral-800 text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs self-start sm:self-auto transition-all"
                >
                  <FaPlus className="w-2.5 h-2.5 text-neutral-300" />
                  <span>Add Project</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
                {projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="bg-white rounded-2xl p-3.5 sm:p-4 border border-neutral-200/90 shadow-2xs hover:border-black/30 flex flex-col justify-between transition-all"
                  >
                    <div>
                      <div className="aspect-[16/10] w-full rounded-xl overflow-hidden bg-neutral-100 relative mb-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={proj.image} alt={proj.title} className="w-full h-full object-cover" />
                        <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-black/80 backdrop-blur-xs text-white text-[9px] font-bold">
                          {proj.category}
                        </div>
                        {proj.metrics && (
                          <div className="absolute bottom-2 right-2 bg-[#FFB800] text-black px-2 py-0.5 rounded-full text-[9px] font-black">
                            {proj.metrics}
                          </div>
                        )}
                      </div>

                      <h4 className="text-xs sm:text-sm font-bold text-neutral-900 mb-1 truncate">{proj.title}</h4>
                      <p className="text-[11px] text-neutral-500 line-clamp-2 leading-relaxed mb-3">{proj.description}</p>
                    </div>

                    <div className="pt-2.5 border-t border-neutral-200/80 flex items-center justify-between">
                      <span className="text-[11px] font-mono text-neutral-400">{proj.year || '2024'}</span>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => setProjectModal({ isOpen: true, isEditing: true, data: { ...proj } })}
                          className="p-1.5 rounded-lg text-neutral-400 hover:text-black hover:bg-neutral-100 transition-colors cursor-pointer"
                          title="Edit Project"
                        >
                          <FaPenToSquare className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = projects.filter((p) => p.id !== proj.id);
                            setPortfolio({ ...portfolio, projects: updated });
                            showToast('Project removed (Click Save Changes to apply)');
                          }}
                          className="p-1.5 rounded-lg text-neutral-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                          title="Delete Project"
                        >
                          <FaTrash className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =====================================================
              TAB 4.5: BLOG & BENTO VISUAL CARDS
          ===================================================== */}
          {activeTab === 'blogs' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-neutral-900 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-black inline-block" />
                    Blog &amp; Bento Cards ({blogs.length})
                  </h3>
                  <p className="text-[11px] text-neutral-500">
                    Manage visual cards displayed on /blog. Supports Image-only cards with custom aspect ratios and Gradient Content banners with buttons.
                  </p>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <Link
                    href="/blog"
                    target="_blank"
                    className="px-3 py-1.5 rounded-lg border border-neutral-300 hover:border-black text-xs font-semibold flex items-center gap-1.5 bg-white transition-all shadow-2xs"
                  >
                    <FaArrowUpRightFromSquare className="w-2.5 h-2.5" />
                    <span>View Live /blog</span>
                  </Link>

                  <button
                    type="button"
                    onClick={() =>
                      setBlogModal({
                        isOpen: true,
                        isEditing: false,
                        data: {
                          type: 'content',
                          title: '',
                          description: '',
                          imageUrl: '',
                          imageAspectRatio: 'auto',
                          gradient: 'linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 100%)',
                          textColor: 'dark',
                          buttonText: 'Read More',
                          buttonUrl: '',
                          category: 'General',
                          badge: 'NEW',
                          order: blogs.length + 1,
                          isPublished: true,
                        },
                      })
                    }
                    className="px-3.5 py-1.5 rounded-lg bg-black text-white hover:bg-neutral-800 text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs transition-all"
                  >
                    <FaPlus className="w-2.5 h-2.5 text-neutral-300" />
                    <span>Add Blog Card</span>
                  </button>
                </div>
              </div>

              {/* Cards Grid */}
              {blogs.length === 0 ? (
                <div className="bg-white rounded-2xl p-8 border border-neutral-200 text-center space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-neutral-100 flex items-center justify-center mx-auto text-neutral-400">
                    <FaNewspaper className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-neutral-900">No Blog Cards Yet</h4>
                  <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                    Create your first Image Only or Gradient Content card to showcase on the blog page.
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      setBlogModal({
                        isOpen: true,
                        isEditing: false,
                        data: {
                          type: 'content',
                          title: '',
                          description: '',
                          imageUrl: '',
                          imageAspectRatio: 'auto',
                          gradient: 'linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 100%)',
                          textColor: 'dark',
                          buttonText: 'Read More',
                          buttonUrl: '',
                          category: 'General',
                          badge: 'NEW',
                          order: 1,
                          isPublished: true,
                        },
                      })
                    }
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-black text-white hover:bg-neutral-800 text-xs font-bold cursor-pointer transition-all shadow-xs"
                  >
                    <FaPlus className="w-3 h-3 text-neutral-300" />
                    <span>Create Your First Card</span>
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
                  {blogs.map((b) => (
                    <div
                      key={b._id}
                      className="bg-white rounded-xl p-3 sm:p-3.5 border border-neutral-200 hover:border-black/40 flex flex-col justify-between transition-colors"
                    >
                      <div>
                        {/* Mini Visual Preview of the Card */}
                        {b.type === 'image_only' ? (
                          <div className="aspect-[16/10] w-full rounded-xl overflow-hidden bg-neutral-100 relative mb-3 border border-neutral-100">
                            {b.imageUrl ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={b.imageUrl} alt={b.title} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-neutral-400 text-xs">
                                No image
                              </div>
                            )}
                            <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/80 text-white text-[9px] font-bold">
                              Image ({b.imageAspectRatio || 'auto'})
                            </div>
                            {!b.isPublished && (
                              <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-amber-500 text-black text-[9px] font-bold">
                                Draft
                              </div>
                            )}
                          </div>
                        ) : (
                          <div
                            style={{ background: b.gradient || 'linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 100%)' }}
                            className={`aspect-[16/10] w-full rounded-xl p-3 relative mb-3 border border-black/5 flex flex-col justify-between overflow-hidden ${
                              b.textColor === 'light' ? 'text-white' : 'text-neutral-900'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-1">
                              <span className="px-2 py-0.5 rounded-full bg-black/10 text-[9px] font-bold uppercase tracking-wider">
                                {b.badge || 'Banner'}
                              </span>
                              {!b.isPublished && (
                                <span className="px-2 py-0.5 rounded-full bg-amber-500 text-black text-[9px] font-bold">
                                  Draft
                                </span>
                              )}
                            </div>
                            <div>
                              <div className="text-xs font-black truncate">{b.title}</div>
                              <div className="text-[10px] opacity-80 line-clamp-1">{b.description}</div>
                            </div>
                            {b.buttonText && (
                              <div className="text-[9px] font-bold underline truncate">
                                Button: {b.buttonText}
                              </div>
                            )}
                          </div>
                        )}

                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-700 text-[10px] font-mono">
                            {b.type === 'image_only' ? '🖼 Image Card' : '🎨 Gradient Card'}
                          </span>
                          {b.category && (
                            <span className="text-[10px] text-neutral-400 font-mono">#{b.category}</span>
                          )}
                        </div>

                        <h4 className="text-xs sm:text-sm font-bold text-neutral-900 mb-1 truncate">{b.title || 'Untitled Visual Pin'}</h4>
                        {b.description && (
                          <p className="text-[11px] text-neutral-500 line-clamp-2 leading-relaxed mb-3">
                            {b.description}
                          </p>
                        )}
                      </div>

                      <div className="pt-2.5 border-t border-neutral-200/80 flex items-center justify-between">
                        <span className="text-[10px] font-mono text-neutral-400">Order #{b.order || 0}</span>
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() =>
                              setBlogModal({
                                isOpen: true,
                                isEditing: true,
                                data: { ...b },
                              })
                            }
                            className="p-1.5 rounded-lg hover:bg-neutral-100 text-neutral-600 hover:text-black transition-colors"
                            title="Edit Card"
                          >
                            <FaPenToSquare className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteBlog(b._id)}
                            className="p-1.5 rounded-lg hover:bg-red-50 text-neutral-400 hover:text-red-600 transition-colors"
                            title="Delete Card"
                          >
                            <FaTrash className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* =====================================================
              TAB 5: SKILLS
          ===================================================== */}
          {activeTab === 'skills' && (
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-neutral-200/90 shadow-2xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-neutral-900 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-black inline-block" />
                    Technical &amp; Design Skills ({skills.length})
                  </h3>
                  <p className="text-[11px] text-neutral-500 mt-0.5">
                    Manage core skills. Select preset suggestions or upload custom tool icons.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSkillDropdownOpen(false);
                    setIsCustomSkillMode(false);
                    setSkillPresetSearch('');
                    setSkillCategoryFilter('All');
                    setSkillModal({
                      isOpen: true,
                      isEditing: false,
                      editIndex: -1,
                      data: {
                        name: '',
                        category: 'Frontend',
                        color: '#FFB800',
                        rotate: '0deg',
                        customIconUrl: '',
                      },
                    });
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-black text-white hover:bg-neutral-800 text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs shrink-0 self-start sm:self-auto transition-all"
                >
                  <FaPlus className="w-2.5 h-2.5 text-neutral-300" />
                  <span>Add Skill</span>
                </button>
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3">
                {skills.map((sk, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 sm:p-3 rounded-xl bg-neutral-50/70 border border-neutral-200/80 hover:border-black/30 flex items-center justify-between gap-2.5 shadow-2xs transition-all"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-white border border-neutral-200 flex items-center justify-center shrink-0 p-1 shadow-2xs overflow-hidden">
                        {sk.customIconUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={sk.customIconUrl} alt={sk.name} className="w-full h-full object-contain" />
                        ) : (
                          (() => {
                            const { component: IconComp, color } = getBrandIconComponent(sk.name);
                            return <IconComp className="w-4 h-4" style={{ color: color || '#181818' }} />;
                          })()
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-neutral-900 truncate">{sk.name}</div>
                        <div className="text-[9px] font-mono text-neutral-400 uppercase tracking-wider">
                          {sk.category}
                          {sk.customIconUrl && <span className="ml-1 text-emerald-700 font-semibold">• Custom</span>}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-0.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          setSkillDropdownOpen(false);
                          const isPreset = SKILL_PRESETS.some((p) => p.name.toLowerCase() === (sk.name || '').toLowerCase());
                          setIsCustomSkillMode(!isPreset && !!sk.name);
                          setSkillPresetSearch('');
                          setSkillCategoryFilter('All');
                          setSkillModal({
                            isOpen: true,
                            isEditing: true,
                            editIndex: idx,
                            data: { ...sk },
                          });
                        }}
                        className="p-1 rounded-md text-neutral-400 hover:text-black hover:bg-neutral-200/60 transition-colors cursor-pointer"
                        title="Edit skill"
                      >
                        <FaPenToSquare className="w-2.5 h-2.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = skills.filter((_, i) => i !== idx);
                          setPortfolio({ ...portfolio, skills: updated });
                          showToast('Skill removed');
                        }}
                        className="p-1 rounded-md text-neutral-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                        title="Delete skill"
                      >
                        <FaTrash className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =====================================================
              TAB 6: CAREER TIMELINE (RESPONSIVE DUAL-COLUMN GRID)
          ===================================================== */}
          {activeTab === 'timeline' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
              {/* Work Experience Column */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-neutral-200/90 shadow-2xs space-y-3.5">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm sm:text-base font-bold text-neutral-900 flex items-center gap-2">
                    <FaBriefcase className="w-3.5 h-3.5 text-neutral-700" />
                    <span>Work Experience ({experiences.length})</span>
                  </h3>
                  <button
                    type="button"
                    onClick={() =>
                      setExpModal({
                        isOpen: true,
                        type: 'experience',
                        data: { period: '2024 — Present', current: true, role: '', company: '', location: '', description: '' },
                      })
                    }
                    className="px-3 py-1.5 rounded-lg bg-black text-white hover:bg-neutral-800 text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs transition-all"
                  >
                    <FaPlus className="w-2.5 h-2.5 text-neutral-300" />
                    <span>Add</span>
                  </button>
                </div>

                <div className="space-y-2.5">
                  {experiences.map((exp, idx) => (
                    <div key={idx} className="p-3 sm:p-3.5 rounded-xl bg-neutral-50/70 border border-neutral-200/80 flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-neutral-900 text-white">
                            {exp.period}
                          </span>
                          <span className="text-[11px] font-mono text-neutral-400">{exp.location}</span>
                        </div>
                        <h4 className="text-xs sm:text-sm font-bold text-neutral-900 mt-1">{exp.role}</h4>
                        <p className="text-xs font-semibold text-neutral-600">{exp.company}</p>
                        <p className="text-[11px] text-neutral-500 mt-1 leading-relaxed">{exp.description}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = experiences.filter((_, i) => i !== idx);
                          setPortfolio({ ...portfolio, experiences: updated });
                          showToast('Experience removed');
                        }}
                        className="p-1.5 rounded-md text-neutral-400 hover:text-red-600 transition-colors shrink-0"
                        title="Delete experience"
                      >
                        <FaTrash className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education Column */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-neutral-200/90 shadow-2xs space-y-3.5">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm sm:text-base font-bold text-neutral-900 flex items-center gap-2">
                    <FaGraduationCap className="w-3.5 h-3.5 text-neutral-700" />
                    <span>Education &amp; Credentials ({educations.length})</span>
                  </h3>
                  <button
                    type="button"
                    onClick={() =>
                      setExpModal({
                        isOpen: true,
                        type: 'education',
                        data: { period: '2020', current: false, degree: '', institution: '', location: '', description: '' },
                      })
                    }
                    className="px-3 py-1.5 rounded-lg bg-black text-white hover:bg-neutral-800 text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs transition-all"
                  >
                    <FaPlus className="w-2.5 h-2.5 text-neutral-300" />
                    <span>Add</span>
                  </button>
                </div>

                <div className="space-y-2.5">
                  {educations.map((edu, idx) => (
                    <div key={idx} className="p-3 sm:p-3.5 rounded-xl bg-neutral-50/70 border border-neutral-200/80 flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-neutral-900 text-white">
                            {edu.period}
                          </span>
                          <span className="text-[11px] font-mono text-neutral-400">{edu.location}</span>
                        </div>
                        <h4 className="text-xs sm:text-sm font-bold text-neutral-900 mt-1">{edu.degree}</h4>
                        <p className="text-xs font-semibold text-neutral-600">{edu.institution}</p>
                        <p className="text-[11px] text-neutral-500 mt-1 leading-relaxed">{edu.description}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = educations.filter((_, i) => i !== idx);
                          setPortfolio({ ...portfolio, educations: updated });
                          showToast('Education removed');
                        }}
                        className="p-1.5 rounded-md text-neutral-400 hover:text-red-600 transition-colors shrink-0"
                        title="Delete education"
                      >
                        <FaTrash className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* =====================================================
              TAB 7: TOOLS
          ===================================================== */}
          {activeTab === 'tools' && (
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-neutral-200/90 shadow-2xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-neutral-900 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-black inline-block" />
                    Tools Behind My Code &amp; Architecture ({tools.length})
                  </h3>
                  <p className="text-[11px] text-neutral-500 mt-0.5">
                    Manage development and engineering tools displayed on the site.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setToolDropdownOpen(false);
                    setIsCustomToolMode(false);
                    setToolPresetSearch('');
                    setToolCategoryFilter('All');
                    setToolModal({
                      isOpen: true,
                      isEditing: false,
                      editIndex: -1,
                      data: {
                        name: '',
                        role: '',
                        description: '',
                        customIconUrl: '',
                      },
                    });
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-black text-white hover:bg-neutral-800 text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs shrink-0 self-start sm:self-auto transition-all"
                >
                  <FaPlus className="w-2.5 h-2.5 text-neutral-300" />
                  <span>Add Tool</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {tools.map((tool, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-neutral-50/70 border border-neutral-200/80 hover:border-black/30 flex flex-col justify-between shadow-2xs transition-all"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="w-9 h-9 rounded-lg bg-white border border-neutral-200 p-1.5 flex items-center justify-center shrink-0 overflow-hidden shadow-2xs">
                          {tool.customIconUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={tool.customIconUrl} alt={tool.name} className="w-full h-full object-contain" />
                          ) : (
                            (() => {
                              const { component: IconComp, color } = getBrandIconComponent(tool.name);
                              return <IconComp className="w-5 h-5" style={{ color: color || '#181818' }} />;
                            })()
                          )}
                        </div>

                        <div className="flex items-center gap-0.5">
                          <button
                            type="button"
                            onClick={() => {
                              setToolDropdownOpen(false);
                              const isPreset = TOOL_PRESETS.some((p) => p.name.toLowerCase() === (tool.name || '').toLowerCase());
                              setIsCustomToolMode(!isPreset && !!tool.name);
                              setToolPresetSearch('');
                              setToolCategoryFilter('All');
                              setToolModal({
                                isOpen: true,
                                isEditing: true,
                                editIndex: idx,
                                data: { ...tool },
                              });
                            }}
                            className="p-1 rounded-md text-neutral-400 hover:text-black hover:bg-neutral-200/60 transition-colors cursor-pointer"
                            title="Edit tool"
                          >
                            <FaPenToSquare className="w-2.5 h-2.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = tools.filter((_, i) => i !== idx);
                              setPortfolio({ ...portfolio, tools: updated });
                              showToast('Tool removed');
                            }}
                            className="p-1 rounded-md text-neutral-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                            title="Delete tool"
                          >
                            <FaTrash className="w-2.5 h-2.5" />
                          </button>
                        </div>
                      </div>

                      <h4 className="text-xs font-bold text-neutral-900 mb-0.5 truncate">{tool.name}</h4>
                      <span className="inline-block text-[9px] font-mono font-semibold text-neutral-700 uppercase tracking-wider bg-white px-2 py-0.5 rounded-md border border-neutral-200 mb-1.5">
                        {tool.role}
                      </span>
                      <p className="text-[11px] text-neutral-500 leading-relaxed line-clamp-2">
                        {tool.description}
                      </p>
                    </div>

                    {tool.customIconUrl && (
                      <div className="pt-2 mt-2 border-t border-neutral-200/70 text-[9px] text-emerald-800 font-semibold flex items-center gap-1">
                        <span>✓ Custom Icon</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =====================================================
              TAB 8: CLIENT INQUIRIES (INBOX)
          ===================================================== */}
          {activeTab === 'inquiries' && (
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-neutral-200/90 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-neutral-900">Inbox Messages ({inquiries.length})</h3>
                  <p className="text-[11px] text-neutral-500">Live inquiries received through the contact form.</p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-black text-white text-[11px] font-mono font-bold">
                  {unreadCount} Unread
                </span>
              </div>

              {inquiries.length === 0 ? (
                <div className="py-12 text-center text-neutral-400 text-xs">
                  No messages received yet. Form submissions will appear here instantly.
                </div>
              ) : (
                <div className="space-y-3">
                  {inquiries.map((inq) => (
                    <div
                      key={inq._id}
                      className={`p-3.5 sm:p-4 rounded-xl border transition-all ${
                        inq.read
                          ? 'bg-neutral-50/70 border-neutral-200/80'
                          : 'bg-white border-neutral-900 shadow-xs ring-1 ring-black/5'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <span
                            className={`w-2 h-2 rounded-full shrink-0 ${
                              inq.read ? 'bg-neutral-300' : 'bg-amber-500 animate-pulse'
                            }`}
                          />
                          <h4 className="text-xs sm:text-sm font-bold text-neutral-900 truncate">{inq.name}</h4>
                          <a
                            href={`mailto:${inq.email}`}
                            className="text-xs text-neutral-600 hover:text-black hover:underline font-mono truncate"
                          >
                            &lt;{inq.email}&gt;
                          </a>
                        </div>
                        <div className="text-[10px] font-mono text-neutral-400 shrink-0">
                          {new Date(inq.createdAt).toLocaleString()}
                        </div>
                      </div>

                      <p className="text-xs text-neutral-700 leading-relaxed bg-white/90 p-3 rounded-lg border border-neutral-200/70 mb-2.5">
                        {inq.message}
                      </p>

                      <div className="flex items-center justify-end gap-3">
                        <button
                          type="button"
                          onClick={() => toggleInquiryRead(inq._id, inq.read)}
                          className="text-xs font-semibold text-neutral-700 hover:text-black hover:underline cursor-pointer"
                        >
                          {inq.read ? 'Mark as Unread' : 'Mark as Read'}
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteInquiry(inq._id)}
                          className="p-1 rounded-md text-neutral-400 hover:text-red-600 transition-colors cursor-pointer"
                          title="Delete message"
                        >
                          <FaTrash className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* =====================================================
              TAB 9: STUDIO SETTINGS & PORTFOLIO PROFILES
          ===================================================== */}
          {activeTab === 'settings' && (
            <div className="space-y-4">
              {/* TOP HEADER & SUB-TABS */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-neutral-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                      Control Center
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Live: {allPortfolios.find((p) => p._id === activePortfolioId || p.isActive)?.profileName || portfolio.profileName || 'Active Profile'}
                    </span>
                  </div>
                  <h2 className="text-base sm:text-lg font-bold text-neutral-900 tracking-tight">
                    Studio Settings
                  </h2>
                </div>

                {/* Sub-Tabs Selector */}
                <div className="flex items-center gap-1 p-1 bg-neutral-100 border border-neutral-200 rounded-xl self-start sm:self-auto max-w-full overflow-x-auto no-scrollbar">
                  {[
                    { id: 'theme', label: 'Website Font', icon: <FaFont className="w-3 h-3 shrink-0" /> },
                    { id: 'profiles', label: 'Portfolio Profiles', icon: <FaUser className="w-3 h-3 shrink-0" /> },
                    { id: 'security', label: 'Admin Security', icon: <FaLock className="w-3 h-3 shrink-0" /> },
                  ].map((sub) => {
                    const isSubActive = settingsSubTab === sub.id;
                    return (
                      <button
                        key={sub.id}
                        type="button"
                        onClick={() => setSettingsSubTab(sub.id as any)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 shrink-0 whitespace-nowrap cursor-pointer ${
                          isSubActive
                            ? 'bg-black text-white shadow-xs'
                            : 'text-neutral-600 hover:text-black hover:bg-white'
                        }`}
                      >
                        {sub.icon}
                        <span>{sub.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* --------------------------------------------------
                  SUBTAB 1: WEBSITE FONT (FORCEFULLY APPLIED ACROSS PORTFOLIO)
              -------------------------------------------------- */}
              {settingsSubTab === 'theme' && (
                <div className="space-y-4">
                  <div className="bg-white rounded-2xl p-4 sm:p-5 border border-neutral-200/90 shadow-2xs space-y-4">
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-neutral-900 flex items-center gap-2">
                        <FaFont className="w-3.5 h-3.5 text-neutral-800" />
                        <span>Website Typography Font</span>
                      </h3>
                      <p className="text-[11px] text-neutral-500 mt-0.5">
                        Select a font below. It is forcefully applied across the entire portfolio (headings, bio, body, navigation, buttons, and cards).
                      </p>
                    </div>

                    <div className="space-y-3.5 max-w-xl">
                      <div>
                        <label className="block text-[11px] font-mono font-bold uppercase text-neutral-600 mb-1">
                          Select Font (Google Fonts)
                        </label>
                        <select
                          value={portfolio.theme?.font || portfolio.theme?.headingFont || 'Space Grotesk'}
                          onChange={(e) => {
                            const val = e.target.value;
                            setPortfolio({
                              ...portfolio,
                              theme: {
                                primary: portfolio.theme?.primary || '#1E3A2B',
                                accent: portfolio.theme?.accent || '#FFB800',
                                dark: '#181818',
                                light: '#FAF9F5',
                                font: val,
                                headingFont: val,
                                bodyFont: val,
                              },
                            });
                          }}
                          className="w-full px-3 py-2 rounded-xl bg-neutral-50/70 border border-neutral-300 text-xs sm:text-sm font-semibold text-neutral-900 focus:outline-none focus:border-black cursor-pointer shadow-2xs"
                        >
                          {AVAILABLE_GOOGLE_FONTS.map((font) => (
                            <option key={font.name} value={font.name}>
                              {font.name} {font.desc ? `— ${font.desc}` : ''}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Live Font Preview Box */}
                      <div className="p-4 bg-neutral-50/70 rounded-xl border border-neutral-200 space-y-1.5">
                        <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                          Active Font Preview: <strong className="text-neutral-900 font-bold">{portfolio.theme?.font || portfolio.theme?.headingFont || 'Space Grotesk'}</strong>
                        </div>
                        <div
                          style={{ fontFamily: `'${portfolio.theme?.font || portfolio.theme?.headingFont || 'Space Grotesk'}', sans-serif` }}
                          className="text-lg sm:text-xl font-bold text-neutral-900 leading-tight"
                        >
                          Harshit Sharma &bull; Full-Stack Software Engineer
                        </div>
                        <div
                          style={{ fontFamily: `'${portfolio.theme?.font || portfolio.theme?.headingFont || 'Space Grotesk'}', sans-serif` }}
                          className="text-xs text-neutral-600 leading-relaxed"
                        >
                          Crafting high-performance web applications, scalable backend microservices, and resilient cloud architectures with Next.js 16 and TypeScript.
                        </div>
                      </div>

                      <div className="pt-1 flex items-center justify-start">
                        <button
                          type="button"
                          onClick={() => handleSaveToMongoDB()}
                          disabled={isSaving}
                          className="px-4 py-2 rounded-lg bg-black text-white hover:bg-neutral-800 text-xs font-bold shadow-xs transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                        >
                          {isSaving ? <FaSpinner className="w-3 h-3 animate-spin text-white" /> : <FaCheck className="w-3 h-3 text-white" />}
                          <span>Save Font to Portfolio</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* --------------------------------------------------
                  SUBTAB 2: PORTFOLIO PROFILES & SWITCHER
              -------------------------------------------------- */}
              {settingsSubTab === 'profiles' && (
                <div className="space-y-4">
                  {/* Active Website Status Banner */}
                  <div className="relative overflow-hidden rounded-2xl bg-neutral-900 text-white p-4 sm:p-5 shadow-xs border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          LIVE ON WEBSITE
                        </span>
                        <span className="text-[11px] text-neutral-400 font-mono">Public URL: /</span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-white">
                        {allPortfolios.find((p) => p._id === activePortfolioId || p.isActive)?.profileName || portfolio.profileName || 'Active Portfolio'}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-neutral-300 font-mono">
                        <span className="text-[11px] text-neutral-400">ID:</span>
                        <span className="text-white bg-black/60 px-2 py-0.5 rounded-md border border-neutral-700 text-[11px]">
                          {activePortfolioId || portfolio._id || 'Pending'}
                        </span>
                        {activePortfolioId && (
                          <button
                            type="button"
                            onClick={() => {
                              navigator.clipboard.writeText(activePortfolioId);
                              setCopiedActiveId(true);
                              setTimeout(() => setCopiedActiveId(false), 2000);
                              showToast('Copied active ID!');
                            }}
                            className="p-1 hover:text-white transition-colors cursor-pointer"
                            title="Copy ID"
                          >
                            {copiedActiveId ? <FaCheck className="w-3 h-3 text-emerald-400" /> : <FaCopy className="w-3 h-3" />}
                          </button>
                        )}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsCreatingProfile(true)}
                      className="px-4 py-2 rounded-lg bg-white text-black hover:bg-neutral-100 text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs shrink-0 cursor-pointer self-start sm:self-auto"
                    >
                      <FaPlus className="w-3 h-3" />
                      <span>Create New Blank Profile</span>
                    </button>
                  </div>

                  {/* Current Profile Rename */}
                  <div className="bg-white rounded-2xl p-4 sm:p-5 border border-neutral-200/90 shadow-2xs space-y-2.5">
                    <h3 className="text-sm sm:text-base font-bold text-neutral-900">Current Profile Name</h3>
                    <p className="text-[11px] text-neutral-500">
                      Give the currently editing profile a recognizable label.
                    </p>
                    <div className="max-w-md flex gap-2">
                      <input
                        type="text"
                        value={portfolio.profileName || ''}
                        onChange={(e) => setPortfolio({ ...portfolio, profileName: e.target.value })}
                        placeholder="e.g. Harshit Sharma - Full-Stack Engineer"
                        className="flex-1 px-3 py-2 rounded-xl bg-neutral-50/70 border border-neutral-300 text-xs sm:text-sm font-semibold focus:outline-none focus:border-black"
                      />
                      <button
                        type="button"
                        onClick={() => handleSaveToMongoDB()}
                        disabled={isSaving}
                        className="px-3.5 py-2 rounded-xl bg-black text-white hover:bg-neutral-800 text-xs font-bold transition-all cursor-pointer"
                      >
                        Save
                      </button>
                    </div>
                  </div>

                  {/* All Profiles Cards */}
                  <div className="bg-white rounded-2xl p-4 sm:p-5 border border-neutral-200/90 shadow-2xs space-y-3">
                    <h3 className="text-sm sm:text-base font-bold text-neutral-900">All Profiles in Database ({allPortfolios.length})</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {allPortfolios.map((p) => {
                        const isLiveActive = p._id === activePortfolioId || p.isActive;
                        const isCurrentlyEditing = p._id === portfolio._id;

                        return (
                          <div
                            key={p._id}
                            className={`p-3.5 rounded-xl border transition-all flex flex-col justify-between gap-2.5 ${
                              isCurrentlyEditing
                                ? 'bg-neutral-50/70 border-black ring-1 ring-black/10 shadow-2xs'
                                : 'bg-white border-neutral-200/90'
                            }`}
                          >
                            <div>
                              <div className="flex items-center gap-1.5 flex-wrap mb-1">
                                <h4 className="text-xs sm:text-sm font-bold text-neutral-900">
                                  {p.profileName || 'Untitled Profile'}
                                </h4>
                                {isLiveActive && (
                                  <span className="px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[9px] font-black uppercase">
                                    LIVE
                                  </span>
                                )}
                                {isCurrentlyEditing && (
                                  <span className="px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[9px] font-black uppercase">
                                    EDITING NOW
                                  </span>
                                )}
                              </div>
                              <div className="text-[10px] font-mono text-neutral-400">ID: {p._id}</div>
                            </div>

                            <div className="flex items-center justify-between gap-2 pt-2.5 border-t border-neutral-200/80">
                              <div className="flex items-center gap-2">
                                {!isCurrentlyEditing && (
                                  <button
                                    type="button"
                                    onClick={() => handleSwitchProfile(p._id!)}
                                    className="px-2.5 py-1 rounded-lg bg-black text-white hover:bg-neutral-800 text-xs font-semibold cursor-pointer"
                                  >
                                    Edit in Studio
                                  </button>
                                )}
                                {!isLiveActive ? (
                                  <button
                                    type="button"
                                    onClick={() => handleSetActive(p._id!)}
                                    className="px-2.5 py-1 rounded-lg border border-emerald-600 text-emerald-700 hover:bg-emerald-50 text-xs font-semibold cursor-pointer"
                                  >
                                    Set as Live
                                  </button>
                                ) : (
                                  <span className="text-xs font-bold text-emerald-700">✓ Live on Site</span>
                                )}
                              </div>

                              {!isLiveActive && allPortfolios.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => handleDeleteProfile(p._id!)}
                                  className="p-1 rounded-md text-neutral-400 hover:text-red-600 hover:bg-red-50 cursor-pointer"
                                  title="Delete Draft"
                                >
                                  <FaTrash className="w-3 h-3" />
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* --------------------------------------------------
                  SUBTAB 3: ADMIN SECURITY & SESSION
              -------------------------------------------------- */}
              {settingsSubTab === 'security' && (
                <div className="bg-white rounded-2xl p-4 sm:p-5 border border-neutral-200/90 shadow-2xs space-y-3">
                  <h3 className="text-sm sm:text-base font-bold text-neutral-900">Security &amp; Admin Session</h3>
                  <div className="p-3.5 sm:p-4 rounded-xl bg-neutral-50/70 border border-neutral-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="text-[10px] font-mono text-neutral-400 uppercase">Logged In Email</div>
                      <div className="text-xs sm:text-sm font-bold text-neutral-900 font-mono">{currentUser?.email || 'harshit0808sharma@gmail.com'}</div>
                      <div className="text-xs text-emerald-700 font-semibold flex items-center gap-1.5 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Secure JWT Cookie Active
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="px-3.5 py-1.5 rounded-lg border border-neutral-300 text-neutral-700 hover:text-red-700 hover:border-red-300 hover:bg-red-50 text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 self-start sm:self-auto"
                    >
                      <FaArrowRightFromBracket className="w-3 h-3" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </main>

      {/* =========================================================
          MODALS FOR EDITING
      ========================================================= */}
      {/* =========================================================
          MODALS FOR EDITING (COMPACT & RESPONSIVE)
      ========================================================= */}
      {/* Project Modal */}
      <AnimatePresence>
        {projectModal.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-white rounded-2xl p-4 sm:p-5 border border-neutral-200 shadow-2xl max-h-[92vh] overflow-y-auto"
            >
              <h3 className="text-sm sm:text-base font-bold text-neutral-900 mb-3">
                {projectModal.isEditing ? 'Edit Project' : 'Add New Project'}
              </h3>

              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-mono font-semibold text-neutral-700 mb-0.5">Title</label>
                  <input
                    type="text"
                    value={projectModal.data.title}
                    onChange={(e) =>
                      setProjectModal({
                        ...projectModal,
                        data: { ...projectModal.data, title: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-neutral-50/70 border border-neutral-200 text-xs sm:text-sm focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-semibold text-neutral-700 mb-0.5">Category</label>
                  <select
                    value={
                      [
                        'UI/UX Design',
                        'App Design',
                        'Website Design',
                        'Full Stack',
                        'Product Design',
                        'AI & Next.js',
                        'Full-Stack / Systems',
                        'Backend / Cloud',
                      ].includes(projectModal.data.category)
                        ? projectModal.data.category
                        : '__custom__'
                    }
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === '__custom__') {
                        setProjectModal({
                          ...projectModal,
                          data: { ...projectModal.data, category: '' },
                        });
                      } else {
                        setProjectModal({
                          ...projectModal,
                          data: { ...projectModal.data, category: val },
                        });
                      }
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-50/70 border border-neutral-200 text-xs sm:text-sm focus:outline-none focus:border-black cursor-pointer font-medium"
                  >
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="App Design">App Design</option>
                    <option value="Website Design">Website Design</option>
                    <option value="Full Stack">Full Stack</option>
                    <option value="Product Design">Product Design</option>
                    <option value="AI & Next.js">AI & Next.js</option>
                    <option value="Full-Stack / Systems">Full-Stack / Systems</option>
                    <option value="Backend / Cloud">Backend / Cloud</option>
                    <option value="__custom__">+ Custom Category (Type manually)</option>
                  </select>

                  {![
                    'UI/UX Design',
                    'App Design',
                    'Website Design',
                    'Full Stack',
                    'Product Design',
                    'AI & Next.js',
                    'Full-Stack / Systems',
                    'Backend / Cloud',
                  ].includes(projectModal.data.category) && (
                    <input
                      type="text"
                      placeholder="Type custom category name..."
                      value={projectModal.data.category}
                      onChange={(e) =>
                        setProjectModal({
                          ...projectModal,
                          data: { ...projectModal.data, category: e.target.value },
                        })
                      }
                      className="mt-2 w-full px-3 py-2 rounded-xl bg-neutral-50/70 border border-neutral-200 text-xs sm:text-sm focus:outline-none focus:border-black font-medium"
                      autoFocus
                    />
                  )}
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-semibold text-neutral-700 mb-0.5">Cover Image URL</label>
                  <div className="space-y-1.5">
                    <input
                      type="text"
                      placeholder="Image URL"
                      value={projectModal.data.image}
                      onChange={(e) =>
                        setProjectModal({
                          ...projectModal,
                          data: { ...projectModal.data, image: e.target.value },
                        })
                      }
                      className="w-full px-3 py-1.5 rounded-xl bg-neutral-50/70 border border-neutral-200 text-xs font-mono focus:outline-none focus:border-black"
                    />
                    <label className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black text-white text-xs font-semibold cursor-pointer hover:bg-neutral-800 transition-all shadow-xs">
                      <FaUpload className="w-2.5 h-2.5 text-neutral-300" />
                      <span>{isUploading ? 'Uploading...' : 'Upload Cover Photo'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                          handleImageUpload(e, (url) => {
                            setProjectModal({
                              ...projectModal,
                              data: { ...projectModal.data, image: url },
                            });
                          })
                        }
                      />
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-semibold text-neutral-700 mb-0.5">Description</label>
                  <textarea
                    rows={2}
                    value={projectModal.data.description}
                    onChange={(e) =>
                      setProjectModal({
                        ...projectModal,
                        data: { ...projectModal.data, description: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-neutral-50/70 border border-neutral-200 text-xs sm:text-sm focus:outline-none focus:border-black resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[11px] font-mono font-semibold text-neutral-700 mb-0.5">Metrics Badge</label>
                    <input
                      type="text"
                      value={projectModal.data.metrics}
                      onChange={(e) =>
                        setProjectModal({
                          ...projectModal,
                          data: { ...projectModal.data, metrics: e.target.value },
                        })
                      }
                      className="w-full px-3 py-1.5 rounded-xl bg-neutral-50/70 border border-neutral-200 text-xs focus:outline-none focus:border-black"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono font-semibold text-neutral-700 mb-0.5">Year</label>
                    <input
                      type="text"
                      value={projectModal.data.year}
                      onChange={(e) =>
                        setProjectModal({
                          ...projectModal,
                          data: { ...projectModal.data, year: e.target.value },
                        })
                      }
                      className="w-full px-3 py-1.5 rounded-xl bg-neutral-50/70 border border-neutral-200 text-xs focus:outline-none focus:border-black"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-200 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setProjectModal({ ...projectModal, isOpen: false })}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-neutral-600 hover:text-black cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    let updated;
                    if (projectModal.isEditing) {
                      updated = projects.map((p) =>
                        p.id === projectModal.data.id ? projectModal.data : p
                      );
                    } else {
                      updated = [projectModal.data, ...projects];
                    }
                    setPortfolio({ ...portfolio, projects: updated });
                    setProjectModal({ ...projectModal, isOpen: false });
                    showToast('Project updated (Click Save Changes to apply)');
                  }}
                  className="px-4 py-1.5 rounded-lg bg-black text-white hover:bg-neutral-800 text-xs font-bold cursor-pointer transition-all shadow-xs"
                >
                  Save Project
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Blog & Bento Card Modal */}
      <AnimatePresence>
        {blogModal.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-xl bg-white rounded-2xl p-4 sm:p-6 border border-neutral-200 shadow-2xl max-h-[92vh] overflow-y-auto space-y-4"
            >
              <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
                <h3 className="text-sm sm:text-base font-bold text-neutral-900">
                  {blogModal.isEditing ? 'Edit Blog / Bento Card' : 'Create New Blog / Bento Card'}
                </h3>
                <span className="text-[10px] font-mono text-neutral-400 uppercase">
                  {blogModal.data.type === 'image_only' ? 'Image Only' : 'Gradient Banner'}
                </span>
              </div>

              {/* 1. Card Presentation Type Selector */}
              <div>
                <label className="block text-[11px] font-mono font-semibold text-neutral-700 mb-1.5">
                  Card Presentation Type
                </label>
                <div className="grid grid-cols-2 gap-2 bg-neutral-100 p-1 rounded-xl">
                  <button
                    type="button"
                    onClick={() =>
                      setBlogModal({
                        ...blogModal,
                        data: { ...blogModal.data, type: 'content' },
                      })
                    }
                    className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      blogModal.data.type === 'content'
                        ? 'bg-white text-black shadow-xs'
                        : 'text-neutral-500 hover:text-black'
                    }`}
                  >
                    <FaPalette className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Gradient &amp; Content Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setBlogModal({
                        ...blogModal,
                        data: { ...blogModal.data, type: 'image_only' },
                      })
                    }
                    className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      blogModal.data.type === 'image_only'
                        ? 'bg-white text-black shadow-xs'
                        : 'text-neutral-500 hover:text-black'
                    }`}
                  >
                    <FaImage className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Image Only Card</span>
                  </button>
                </div>
              </div>

              {/* 2. Dynamic Form Fields */}
              {blogModal.data.type === 'image_only' ? (
                /* ----------------- IMAGE ONLY FORM ----------------- */
                <div className="space-y-3 pt-1">
                  <div>
                    <label className="block text-[11px] font-mono font-semibold text-neutral-700 mb-0.5">
                      Card Title / Caption (Optional for pure image pins)
                    </label>
                    <input
                      type="text"
                      placeholder="Optional caption (leave blank for pure image pin)"
                      value={blogModal.data.title}
                      onChange={(e) =>
                        setBlogModal({
                          ...blogModal,
                          data: { ...blogModal.data, title: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-neutral-50/70 border border-neutral-200 text-xs sm:text-sm focus:outline-none focus:border-black font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono font-semibold text-neutral-700 mb-0.5">
                      Image URL &amp; File Upload
                    </label>
                    <div className="space-y-1.5">
                      <input
                        type="text"
                        placeholder="Image URL or upload below"
                        value={blogModal.data.imageUrl}
                        onChange={(e) =>
                          setBlogModal({
                            ...blogModal,
                            data: { ...blogModal.data, imageUrl: e.target.value },
                          })
                        }
                        className="w-full px-3 py-1.5 rounded-xl bg-neutral-50/70 border border-neutral-200 text-xs font-mono focus:outline-none focus:border-black"
                      />
                      <label className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black text-white text-xs font-semibold cursor-pointer hover:bg-neutral-800 transition-all shadow-xs">
                        <FaUpload className="w-2.5 h-2.5 text-neutral-300" />
                        <span>{isUploading ? 'Uploading...' : 'Upload Image File'}</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            handleImageUpload(e, (url) => {
                              setBlogModal({
                                ...blogModal,
                                data: { ...blogModal.data, imageUrl: url },
                              });
                            })
                          }
                        />
                      </label>
                    </div>
                  </div>

                  {/* Aspect Ratio Selector */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] font-mono font-semibold text-neutral-700 mb-0.5">
                        Image Aspect Ratio
                      </label>
                      <select
                        value={blogModal.data.imageAspectRatio || 'auto'}
                        onChange={(e) =>
                          setBlogModal({
                            ...blogModal,
                            data: { ...blogModal.data, imageAspectRatio: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl bg-neutral-50/70 border border-neutral-200 text-xs focus:outline-none focus:border-black cursor-pointer font-medium"
                      >
                        <option value="auto">Natural / Auto Height</option>
                        <option value="4/5">Portrait (4:5) - Tall Bento</option>
                        <option value="1/1">Square (1:1)</option>
                        <option value="16/9">Landscape (16:9)</option>
                        <option value="9/16">Stories / Full Tall (9:16)</option>
                        <option value="3/4">Classic (3:4)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono font-semibold text-neutral-700 mb-0.5">
                        Badge / Kicker (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. COMMUNITY, PHOTO"
                        value={blogModal.data.badge || ''}
                        onChange={(e) =>
                          setBlogModal({
                            ...blogModal,
                            data: { ...blogModal.data, badge: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl bg-neutral-50/70 border border-neutral-200 text-xs focus:outline-none focus:border-black"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono font-semibold text-neutral-700 mb-0.5">
                      Short Description / Overlay Text (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Optional text shown on hover or bottom overlay"
                      value={blogModal.data.description || ''}
                      onChange={(e) =>
                        setBlogModal({
                          ...blogModal,
                          data: { ...blogModal.data, description: e.target.value },
                        })
                      }
                      className="w-full px-3 py-1.5 rounded-xl bg-neutral-50/70 border border-neutral-200 text-xs focus:outline-none focus:border-black resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] font-mono font-semibold text-neutral-700 mb-0.5">
                        Button Text (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. View Story"
                        value={blogModal.data.buttonText || ''}
                        onChange={(e) =>
                          setBlogModal({
                            ...blogModal,
                            data: { ...blogModal.data, buttonText: e.target.value },
                          })
                        }
                        className="w-full px-3 py-1.5 rounded-xl bg-neutral-50/70 border border-neutral-200 text-xs focus:outline-none focus:border-black"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono font-semibold text-neutral-700 mb-0.5">
                        Target Link (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. https://... or #contact"
                        value={blogModal.data.buttonUrl || ''}
                        onChange={(e) =>
                          setBlogModal({
                            ...blogModal,
                            data: { ...blogModal.data, buttonUrl: e.target.value },
                          })
                        }
                        className="w-full px-3 py-1.5 rounded-xl bg-neutral-50/70 border border-neutral-200 text-xs focus:outline-none focus:border-black"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                /* ----------------- GRADIENT & CONTENT CARD FORM ----------------- */
                <div className="space-y-3 pt-1">
                  <div>
                    <label className="block text-[11px] font-mono font-semibold text-neutral-700 mb-0.5">
                      Heading / Title
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Easy subscriptions"
                      value={blogModal.data.title}
                      onChange={(e) =>
                        setBlogModal({
                          ...blogModal,
                          data: { ...blogModal.data, title: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-neutral-50/70 border border-neutral-200 text-xs sm:text-sm focus:outline-none focus:border-black font-extrabold"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono font-semibold text-neutral-700 mb-0.5">
                      Paragraph / Description
                    </label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Make it effortless for fans to support you. Subscriptions take just a click, giving you reliable income without the hassle."
                      value={blogModal.data.description || ''}
                      onChange={(e) =>
                        setBlogModal({
                          ...blogModal,
                          data: { ...blogModal.data, description: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-neutral-50/70 border border-neutral-200 text-xs sm:text-sm focus:outline-none focus:border-black resize-none leading-relaxed"
                    />
                  </div>

                  {/* Solid Color & Gradient Background Presets */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-[11px] font-mono font-semibold text-neutral-700">
                        Banner Background (Solid Color or Gradient)
                      </label>
                      <span className="text-[10px] text-neutral-400">Single color or gradient</span>
                    </div>

                    {/* Quick Swatches: Solid Colors & Gradients */}
                    <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5 mb-2">
                      {[
                        // Solid Colors
                        { name: 'Pure White', value: '#FFFFFF', text: 'dark' },
                        { name: 'Warm Cream', value: '#FAF9F5', text: 'dark' },
                        { name: 'Soft Gray', value: '#F3F4F6', text: 'dark' },
                        { name: 'Forest Green', value: '#1E3A2B', text: 'light' },
                        { name: 'Obsidian Black', value: '#181818', text: 'light' },
                        { name: 'Golden Amber', value: '#FEF3C7', text: 'dark' },
                        { name: 'Soft Sky', value: '#E0F2FE', text: 'dark' },
                        { name: 'Lavender', value: '#F3E8FF', text: 'dark' },
                        // Gradients
                        { name: 'Sky Gradient', value: 'linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 100%)', text: 'dark' },
                        { name: 'Lavender Gradient', value: 'linear-gradient(135deg, #F3E8FF 0%, #E9D5FF 100%)', text: 'dark' },
                        { name: 'Peach Gradient', value: 'linear-gradient(135deg, #FFEDD5 0%, #FED7AA 100%)', text: 'dark' },
                        { name: 'Mint Gradient', value: 'linear-gradient(135deg, #DCFCE7 0%, #BBF7D0 100%)', text: 'dark' },
                        { name: 'Rose Gradient', value: 'linear-gradient(135deg, #FFE4E6 0%, #FECDD3 100%)', text: 'dark' },
                        { name: 'Forest Gradient', value: 'linear-gradient(135deg, #1E3A2B 0%, #162D21 100%)', text: 'light' },
                        { name: 'Dark Gradient', value: 'linear-gradient(135deg, #181818 0%, #2A2A2A 100%)', text: 'light' },
                        { name: 'Amber Gradient', value: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)', text: 'dark' },
                      ].map((preset) => {
                        const isSelected = blogModal.data.gradient === preset.value;
                        return (
                          <button
                            key={preset.name}
                            type="button"
                            onClick={() =>
                              setBlogModal({
                                ...blogModal,
                                data: {
                                  ...blogModal.data,
                                  gradient: preset.value,
                                  textColor: preset.text as 'dark' | 'light',
                                },
                              })
                            }
                            style={{ background: preset.value }}
                            className={`h-7 rounded-lg border transition-all cursor-pointer flex items-center justify-center text-[9px] font-bold ${
                              isSelected ? 'ring-2 ring-black scale-105 shadow-xs' : 'border-black/10 hover:border-black/30'
                            }`}
                            title={preset.name}
                          >
                            {isSelected && (preset.text === 'light' ? '✓' : '✓')}
                          </button>
                        );
                      })}
                    </div>

                    <input
                      type="text"
                      placeholder="Type solid hex (#1E3A2B, #FFFFFF) or linear-gradient(...)"
                      value={blogModal.data.gradient || ''}
                      onChange={(e) =>
                        setBlogModal({
                          ...blogModal,
                          data: { ...blogModal.data, gradient: e.target.value },
                        })
                      }
                      className="w-full px-3 py-1.5 rounded-xl bg-neutral-50/70 border border-neutral-200 text-xs font-mono focus:outline-none focus:border-black"
                    />
                  </div>

                  {/* Text Color Contrast Mode */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] font-mono font-semibold text-neutral-700 mb-0.5">
                        Text Contrast Mode
                      </label>
                      <div className="grid grid-cols-2 gap-1.5 bg-neutral-100 p-1 rounded-xl">
                        <button
                          type="button"
                          onClick={() =>
                            setBlogModal({
                              ...blogModal,
                              data: { ...blogModal.data, textColor: 'dark' },
                            })
                          }
                          className={`py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            blogModal.data.textColor === 'dark'
                              ? 'bg-white text-black shadow-xs'
                              : 'text-neutral-500'
                          }`}
                        >
                          Dark Text
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setBlogModal({
                              ...blogModal,
                              data: { ...blogModal.data, textColor: 'light' },
                            })
                          }
                          className={`py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            blogModal.data.textColor === 'light'
                              ? 'bg-black text-white shadow-xs'
                              : 'text-neutral-500'
                          }`}
                        >
                          Light Text
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono font-semibold text-neutral-700 mb-0.5">
                        Badge / Kicker
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. BENEFITS, GUIDE"
                        value={blogModal.data.badge || ''}
                        onChange={(e) =>
                          setBlogModal({
                            ...blogModal,
                            data: { ...blogModal.data, badge: e.target.value },
                          })
                        }
                        className="w-full px-3 py-1.5 rounded-xl bg-neutral-50/70 border border-neutral-200 text-xs focus:outline-none focus:border-black"
                      />
                    </div>
                  </div>

                  {/* Button Text & Button Link (Simple button) */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] font-mono font-semibold text-neutral-700 mb-0.5">
                        Button Text
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Read Story, Get Started"
                        value={blogModal.data.buttonText || ''}
                        onChange={(e) =>
                          setBlogModal({
                            ...blogModal,
                            data: { ...blogModal.data, buttonText: e.target.value },
                          })
                        }
                        className="w-full px-3 py-1.5 rounded-xl bg-neutral-50/70 border border-neutral-200 text-xs focus:outline-none focus:border-black"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono font-semibold text-neutral-700 mb-0.5">
                        Button Link
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. /projects or #contact or https://"
                        value={blogModal.data.buttonUrl || ''}
                        onChange={(e) =>
                          setBlogModal({
                            ...blogModal,
                            data: { ...blogModal.data, buttonUrl: e.target.value },
                          })
                        }
                        className="w-full px-3 py-1.5 rounded-xl bg-neutral-50/70 border border-neutral-200 text-xs focus:outline-none focus:border-black"
                      />
                    </div>
                  </div>

                  {/* Optional Inside Graphic / Sticker Image */}
                  <div>
                    <label className="block text-[11px] font-mono font-semibold text-neutral-700 mb-0.5">
                      Optional Inside Illustration / Graphic Image
                    </label>
                    <div className="space-y-1.5">
                      <input
                        type="text"
                        placeholder="Image URL for mockup, sticker or chart inside banner"
                        value={blogModal.data.imageUrl || ''}
                        onChange={(e) =>
                          setBlogModal({
                            ...blogModal,
                            data: { ...blogModal.data, imageUrl: e.target.value },
                          })
                        }
                        className="w-full px-3 py-1.5 rounded-xl bg-neutral-50/70 border border-neutral-200 text-xs font-mono focus:outline-none focus:border-black"
                      />
                      <label className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black text-white text-xs font-semibold cursor-pointer hover:bg-neutral-800 transition-all shadow-xs">
                        <FaUpload className="w-2.5 h-2.5 text-neutral-300" />
                        <span>{isUploading ? 'Uploading...' : 'Upload Graphic / Sticker'}</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            handleImageUpload(e, (url) => {
                              setBlogModal({
                                ...blogModal,
                                data: { ...blogModal.data, imageUrl: url },
                              });
                            })
                          }
                        />
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Common: Category & Order & Publish */}
              <div className="grid grid-cols-3 gap-2.5 pt-1">
                <div>
                  <label className="block text-[11px] font-mono font-semibold text-neutral-700 mb-0.5">
                    Category Tag
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Monetization, Tech"
                    value={blogModal.data.category || ''}
                    onChange={(e) =>
                      setBlogModal({
                        ...blogModal,
                        data: { ...blogModal.data, category: e.target.value },
                      })
                    }
                    className="w-full px-3 py-1.5 rounded-xl bg-neutral-50/70 border border-neutral-200 text-xs focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-semibold text-neutral-700 mb-0.5">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={blogModal.data.order || 1}
                    onChange={(e) =>
                      setBlogModal({
                        ...blogModal,
                        data: { ...blogModal.data, order: parseInt(e.target.value) || 1 },
                      })
                    }
                    className="w-full px-3 py-1.5 rounded-xl bg-neutral-50/70 border border-neutral-200 text-xs focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-semibold text-neutral-700 mb-0.5">
                    Status
                  </label>
                  <label className="flex items-center gap-2 mt-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={blogModal.data.isPublished}
                      onChange={(e) =>
                        setBlogModal({
                          ...blogModal,
                          data: { ...blogModal.data, isPublished: e.target.checked },
                        })
                      }
                      className="rounded border-neutral-300 text-black focus:ring-black w-4 h-4 cursor-pointer"
                    />
                    <span className="text-xs font-bold text-neutral-800">Published</span>
                  </label>
                </div>
              </div>

              {/* Real-time Visual Preview Box */}
              <div className="pt-2">
                <label className="block text-[10px] font-mono uppercase tracking-wider text-neutral-400 mb-1">
                  Card Live Preview
                </label>
                {blogModal.data.type === 'image_only' ? (
                  <div className="rounded-2xl overflow-hidden border border-neutral-200 bg-neutral-100 aspect-[16/10] relative">
                    {blogModal.data.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={blogModal.data.imageUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-neutral-400">
                        Upload or paste image URL above to preview
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4 text-white">
                      <div className="font-extrabold text-sm">{blogModal.data.title || 'Untitled Card'}</div>
                      {blogModal.data.description && (
                        <div className="text-[11px] text-stone-200 line-clamp-1">{blogModal.data.description}</div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div
                    style={{ background: blogModal.data.gradient || 'linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 100%)' }}
                    className={`rounded-2xl p-4 border border-black/5 flex flex-col justify-between min-h-[140px] ${
                      blogModal.data.textColor === 'light' ? 'text-white' : 'text-neutral-900'
                    }`}
                  >
                    <div>
                      {blogModal.data.badge && (
                        <span className="inline-block px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider bg-black/10 mb-1.5">
                          {blogModal.data.badge}
                        </span>
                      )}
                      <h4 className="text-base font-extrabold leading-snug">
                        {blogModal.data.title || 'Untitled Heading'}
                      </h4>
                      <p className="text-xs opacity-85 mt-1 line-clamp-2">
                        {blogModal.data.description || 'Description paragraph will appear here...'}
                      </p>
                    </div>
                    {blogModal.data.buttonText && (
                      <div className="mt-3">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold ${
                            blogModal.data.textColor === 'light'
                              ? 'bg-white text-black'
                              : 'bg-black text-white'
                          }`}
                        >
                          <span>{blogModal.data.buttonText}</span>
                          <FaArrowRight className="w-2.5 h-2.5" />
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Bottom Actions */}
              <div className="mt-4 pt-3 border-t border-neutral-200 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setBlogModal({ ...blogModal, isOpen: false })}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-neutral-600 hover:text-black cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveBlog}
                  className="px-4 py-1.5 rounded-lg bg-black text-white hover:bg-neutral-800 text-xs font-bold cursor-pointer transition-all shadow-xs"
                >
                  {blogModal.isEditing ? 'Save Changes' : 'Create Blog Card'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Service Modal */}
      <AnimatePresence>
        {serviceModal.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-white rounded-2xl p-4 sm:p-5 border border-neutral-200 shadow-2xl"
            >
              <h3 className="text-sm sm:text-base font-bold text-neutral-900 mb-3">
                {serviceModal.isEditing ? 'Edit Service' : 'Add Service'}
              </h3>

              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-mono font-semibold text-neutral-700 mb-0.5">Title</label>
                  <input
                    type="text"
                    value={serviceModal.data.title}
                    onChange={(e) =>
                      setServiceModal({
                        ...serviceModal,
                        data: { ...serviceModal.data, title: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-neutral-50/70 border border-neutral-200 text-xs sm:text-sm focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-semibold text-neutral-700 mb-0.5">Number (e.g. 01, 02)</label>
                  <input
                    type="text"
                    value={serviceModal.data.number}
                    onChange={(e) =>
                      setServiceModal({
                        ...serviceModal,
                        data: { ...serviceModal.data, number: e.target.value },
                      })
                    }
                    className="w-full px-3 py-1.5 rounded-xl bg-neutral-50/70 border border-neutral-200 text-xs focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-semibold text-neutral-700 mb-0.5">Description</label>
                  <textarea
                    rows={3}
                    value={serviceModal.data.description}
                    onChange={(e) =>
                      setServiceModal({
                        ...serviceModal,
                        data: { ...serviceModal.data, description: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-neutral-50/70 border border-neutral-200 text-xs sm:text-sm focus:outline-none focus:border-black resize-none"
                  />
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-200 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setServiceModal({ ...serviceModal, isOpen: false })}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-neutral-600 hover:text-black cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    let updated;
                    if (serviceModal.isEditing) {
                      updated = services.map((s) =>
                        s.id === serviceModal.data.id ? serviceModal.data : s
                      );
                    } else {
                      updated = [...services, serviceModal.data];
                    }
                    setPortfolio({ ...portfolio, services: updated });
                    setServiceModal({ ...serviceModal, isOpen: false });
                    showToast('Service updated (Click Save Changes to apply)');
                  }}
                  className="px-4 py-1.5 rounded-lg bg-black text-white hover:bg-neutral-800 text-xs font-bold cursor-pointer transition-all shadow-xs"
                >
                  Save Service
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Career Timeline Modal */}
      <AnimatePresence>
        {expModal.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-white rounded-2xl p-4 sm:p-5 border border-neutral-200 shadow-2xl"
            >
              <h3 className="text-sm sm:text-base font-bold text-neutral-900 mb-3">
                {expModal.type === 'experience' ? 'Add Work Experience' : 'Add Education'}
              </h3>

              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-mono font-semibold text-neutral-700 mb-0.5">
                    {expModal.type === 'experience' ? 'Role Title' : 'Degree / Program'}
                  </label>
                  <input
                    type="text"
                    value={expModal.type === 'experience' ? expModal.data.role : expModal.data.degree}
                    onChange={(e) =>
                      setExpModal({
                        ...expModal,
                        data: {
                          ...expModal.data,
                          [expModal.type === 'experience' ? 'role' : 'degree']: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-neutral-50/70 border border-neutral-200 text-xs sm:text-sm focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-semibold text-neutral-700 mb-0.5">
                    {expModal.type === 'experience' ? 'Company' : 'Institution / University'}
                  </label>
                  <input
                    type="text"
                    value={expModal.type === 'experience' ? expModal.data.company : expModal.data.institution}
                    onChange={(e) =>
                      setExpModal({
                        ...expModal,
                        data: {
                          ...expModal.data,
                          [expModal.type === 'experience' ? 'company' : 'institution']: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-neutral-50/70 border border-neutral-200 text-xs sm:text-sm focus:outline-none focus:border-black"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[11px] font-mono font-semibold text-neutral-700 mb-0.5">Period</label>
                    <input
                      type="text"
                      placeholder="e.g. 2022 — Present"
                      value={expModal.data.period}
                      onChange={(e) =>
                        setExpModal({
                          ...expModal,
                          data: { ...expModal.data, period: e.target.value },
                        })
                      }
                      className="w-full px-3 py-1.5 rounded-xl bg-neutral-50/70 border border-neutral-200 text-xs focus:outline-none focus:border-black"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono font-semibold text-neutral-700 mb-0.5">Location</label>
                    <input
                      type="text"
                      placeholder="e.g. Remote"
                      value={expModal.data.location}
                      onChange={(e) =>
                        setExpModal({
                          ...expModal,
                          data: { ...expModal.data, location: e.target.value },
                        })
                      }
                      className="w-full px-3 py-1.5 rounded-xl bg-neutral-50/70 border border-neutral-200 text-xs focus:outline-none focus:border-black"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-semibold text-neutral-700 mb-0.5">Description</label>
                  <textarea
                    rows={2.5}
                    value={expModal.data.description}
                    onChange={(e) =>
                      setExpModal({
                        ...expModal,
                        data: { ...expModal.data, description: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-neutral-50/70 border border-neutral-200 text-xs sm:text-sm focus:outline-none focus:border-black resize-none"
                  />
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-200 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setExpModal({ ...expModal, isOpen: false })}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-neutral-600 hover:text-black cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (expModal.type === 'experience') {
                      setPortfolio({
                        ...portfolio,
                        experiences: [...experiences, expModal.data],
                      });
                    } else {
                      setPortfolio({
                        ...portfolio,
                        educations: [...educations, expModal.data],
                      });
                    }
                    setExpModal({ ...expModal, isOpen: false });
                    showToast('Timeline updated (Click Save Changes to apply)');
                  }}
                  className="px-4 py-1.5 rounded-lg bg-black text-white hover:bg-neutral-800 text-xs font-bold cursor-pointer transition-all shadow-xs"
                >
                  Add Milestone
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Skill Modal with Suggestions & Custom Icon Upload */}
      <AnimatePresence>
        {skillModal.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-white rounded-2xl p-4 sm:p-5 border border-neutral-200 shadow-2xl max-h-[92vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm sm:text-base font-bold text-neutral-900">
                  {skillModal.isEditing ? 'Edit Skill' : 'Add New Skill'}
                </h3>
                <span className="text-[10px] text-neutral-400 font-mono">Custom Icon &amp; Presets</span>
              </div>

              <div className="space-y-3">
                {/* Unified Skill Dropdown with React Icons */}
                <div className="relative">
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-[11px] font-mono font-semibold text-neutral-700">
                      Skill &amp; Technology
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setIsCustomSkillMode(!isCustomSkillMode);
                        setSkillDropdownOpen(false);
                      }}
                      className="text-[10px] text-neutral-500 hover:text-black underline cursor-pointer"
                    >
                      {isCustomSkillMode ? '← Choose from Preset Icons' : '+ Type Custom Skill'}
                    </button>
                  </div>

                  {!isCustomSkillMode ? (
                    <div className="relative">
                      {/* Dropdown Input Trigger */}
                      <button
                        type="button"
                        onClick={() => setSkillDropdownOpen(!skillDropdownOpen)}
                        className="w-full px-3 py-2 rounded-xl bg-neutral-50/80 border border-neutral-200 hover:border-black/50 text-xs sm:text-sm font-semibold flex items-center justify-between gap-2 cursor-pointer transition-all focus:outline-none focus:border-black shadow-2xs text-left"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-6 h-6 rounded-md bg-white border border-neutral-200 flex items-center justify-center shrink-0 shadow-2xs">
                            {selectedSkillPreset ? (
                              (() => {
                                const IconComp = selectedSkillPreset.icon;
                                return <IconComp className="w-3.5 h-3.5" style={{ color: selectedSkillPreset.color }} />;
                              })()
                            ) : skillModal.data.name ? (
                              (() => {
                                const { component: IconComp, color } = getBrandIconComponent(skillModal.data.name);
                                return <IconComp className="w-3.5 h-3.5" style={{ color: color || '#181818' }} />;
                              })()
                            ) : (
                              <FaCode className="w-3 h-3 text-neutral-400" />
                            )}
                          </div>
                          <span
                            className={`truncate ${
                              skillModal.data.name ? 'text-neutral-900 font-bold' : 'text-neutral-400 font-normal'
                            }`}
                          >
                            {skillModal.data.name || 'Click to select a skill (React, Next.js, Docker, Python...)'}
                          </span>
                          {selectedSkillPreset && (
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-semibold bg-neutral-100 text-neutral-600 shrink-0">
                              {selectedSkillPreset.category}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0 text-neutral-400">
                          <span className="text-[10px] font-mono hidden sm:inline">{SKILL_PRESETS.length} icons</span>
                          {skillDropdownOpen ? (
                            <TbChevronUp className="w-4 h-4 text-neutral-700" />
                          ) : (
                            <TbChevronDown className="w-4 h-4 text-neutral-700" />
                          )}
                        </div>
                      </button>

                      {/* Dropdown Popover */}
                      {skillDropdownOpen && (
                        <div className="absolute left-0 right-0 top-full mt-1.5 z-50 bg-white rounded-xl border border-neutral-200 shadow-2xl p-2.5 space-y-2 max-h-72 overflow-hidden flex flex-col">
                          {/* Search */}
                          <div className="relative shrink-0">
                            <TbSearch className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400 pointer-events-none" />
                            <input
                              type="text"
                              placeholder="Search skills (React, Python, AWS, PostgreSQL...)"
                              value={skillPresetSearch}
                              onChange={(e) => setSkillPresetSearch(e.target.value)}
                              className="w-full pl-8 pr-12 py-1.5 rounded-lg bg-neutral-50 border border-neutral-200 text-xs font-medium focus:outline-none focus:border-black"
                              autoFocus
                            />
                            {skillPresetSearch && (
                              <button
                                type="button"
                                onClick={() => setSkillPresetSearch('')}
                                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono text-neutral-400 hover:text-black cursor-pointer"
                              >
                                Clear
                              </button>
                            )}
                          </div>

                          {/* Category Filter Tabs */}
                          <div className="flex flex-wrap gap-1 shrink-0">
                            {['All', 'Frontend', 'Backend', 'Cloud & DevOps', 'Database', 'Design'].map((cat) => (
                              <button
                                type="button"
                                key={cat}
                                onClick={() => setSkillCategoryFilter(cat)}
                                className={`px-2 py-0.5 rounded-md text-[10px] font-semibold transition-all cursor-pointer ${
                                  skillCategoryFilter === cat
                                    ? 'bg-black text-white'
                                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                                }`}
                              >
                                {cat}
                              </button>
                            ))}
                          </div>

                          {/* Options List */}
                          <div className="overflow-y-auto flex-1 pr-1 space-y-0.5">
                            {filteredSkillPresets.map((preset) => {
                              const IconComp = preset.icon;
                              const isSelected = skillModal.data.name.toLowerCase() === preset.name.toLowerCase();
                              return (
                                <button
                                  type="button"
                                  key={preset.name}
                                  onClick={() => {
                                    setSkillModal({
                                      ...skillModal,
                                      data: {
                                        ...skillModal.data,
                                        name: preset.name,
                                        category: preset.category,
                                        color: preset.color,
                                        customIconUrl: '',
                                      },
                                    });
                                    setSkillDropdownOpen(false);
                                  }}
                                  className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-colors cursor-pointer ${
                                    isSelected ? 'bg-neutral-100 font-bold' : 'hover:bg-neutral-50'
                                  }`}
                                >
                                  <div className="flex items-center gap-2.5 min-w-0">
                                    <div className="w-6 h-6 rounded-md bg-white border border-neutral-200 flex items-center justify-center shrink-0 shadow-2xs">
                                      <IconComp className="w-3.5 h-3.5" style={{ color: preset.color }} />
                                    </div>
                                    <span className="text-xs text-neutral-900 truncate">{preset.name}</span>
                                    <span className="text-[9px] font-mono text-neutral-400 px-1 py-0.2 rounded bg-neutral-100">
                                      {preset.category}
                                    </span>
                                  </div>
                                  {isSelected && <FaCheck className="w-3 h-3 text-emerald-600 shrink-0" />}
                                </button>
                              );
                            })}

                            {filteredSkillPresets.length === 0 && (
                              <div className="py-4 text-center text-xs text-neutral-400">
                                No skill found matching &quot;{skillPresetSearch}&quot;.
                              </div>
                            )}

                            {/* Option to type custom skill */}
                            <button
                              type="button"
                              onClick={() => {
                                setIsCustomSkillMode(true);
                                setSkillDropdownOpen(false);
                              }}
                              className="w-full flex items-center gap-2 p-2 rounded-lg text-left text-neutral-700 hover:bg-neutral-50 hover:text-black transition-colors cursor-pointer pt-2 border-t border-neutral-100 mt-1"
                            >
                              <div className="w-6 h-6 rounded-md bg-neutral-100 border border-neutral-200 flex items-center justify-center shrink-0 text-neutral-500">
                                <FaPenToSquare className="w-3 h-3" />
                              </div>
                              <div className="min-w-0">
                                <div className="text-xs font-semibold text-neutral-900">+ Type Custom Skill Name</div>
                                <div className="text-[10px] text-neutral-400">Add any technology not in this list</div>
                              </div>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    /* Custom Skill Text Input */
                    <div className="space-y-1">
                      <input
                        type="text"
                        placeholder="e.g. Solidity, GraphQL Federation, Kafka..."
                        value={skillModal.data.name}
                        onChange={(e) =>
                          setSkillModal({
                            ...skillModal,
                            data: { ...skillModal.data, name: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl bg-neutral-50/70 border border-neutral-200 text-xs sm:text-sm font-semibold focus:outline-none focus:border-black"
                        autoFocus
                      />
                      <p className="text-[10px] text-neutral-400">
                        Type custom skill name. An official React icon will be matched automatically or you can upload a logo below.
                      </p>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[11px] font-mono font-semibold text-neutral-700 mb-0.5">Category</label>
                    <select
                      value={skillModal.data.category}
                      onChange={(e) =>
                        setSkillModal({
                          ...skillModal,
                          data: { ...skillModal.data, category: e.target.value },
                        })
                      }
                      className="w-full px-3 py-1.5 rounded-xl bg-neutral-50/70 border border-neutral-200 text-xs font-semibold focus:outline-none focus:border-black cursor-pointer"
                    >
                      <option value="Frontend">Frontend</option>
                      <option value="Backend">Backend</option>
                      <option value="Cloud & DevOps">Cloud &amp; DevOps</option>
                      <option value="Database">Database</option>
                      <option value="Tools">Tools</option>
                      <option value="Design">Design</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono font-semibold text-neutral-700 mb-0.5">Color Hex</label>
                    <input
                      type="text"
                      placeholder="#FFB800"
                      value={skillModal.data.color}
                      onChange={(e) =>
                        setSkillModal({
                          ...skillModal,
                          data: { ...skillModal.data, color: e.target.value },
                        })
                      }
                      className="w-full px-3 py-1.5 rounded-xl bg-neutral-50/70 border border-neutral-200 text-xs font-mono focus:outline-none focus:border-black"
                    />
                  </div>
                </div>

                {/* Custom Icon Image Upload */}
                <div className="p-3 rounded-xl bg-neutral-50/70 border border-neutral-200 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold uppercase text-neutral-700">Custom Icon Image</span>
                    {skillModal.data.customIconUrl && (
                      <button
                        type="button"
                        onClick={() =>
                          setSkillModal({
                            ...skillModal,
                            data: { ...skillModal.data, customIconUrl: '' },
                          })
                        }
                        className="text-[10px] text-red-600 hover:underline cursor-pointer"
                      >
                        Clear Custom Icon
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white border border-neutral-200 p-1 flex items-center justify-center shrink-0 overflow-hidden shadow-2xs">
                      {skillModal.data.customIconUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={skillModal.data.customIconUrl} alt="Icon" className="w-full h-full object-contain" />
                      ) : (
                        (() => {
                          const { component: IconComp, color } = getBrandIconComponent(skillModal.data.name || 'Code');
                          return <IconComp className="w-5 h-5" style={{ color: color || '#181818' }} />;
                        })()
                      )}
                    </div>

                    <div className="flex-1 space-y-1">
                      <label className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black text-white text-xs font-semibold cursor-pointer hover:bg-neutral-800 transition-all shadow-xs">
                        <FaUpload className="w-2.5 h-2.5 text-neutral-300" />
                        <span>{isUploading ? 'Uploading...' : 'Upload Icon'}</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            handleImageUpload(e, (url) => {
                              setSkillModal({
                                ...skillModal,
                                data: { ...skillModal.data, customIconUrl: url },
                              });
                            })
                          }
                        />
                      </label>
                      <p className="text-[10px] text-neutral-400">
                        Upload custom SVG/PNG or leave blank for preset icon.
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[9px] font-mono text-neutral-500 mb-0.5 uppercase">Or Icon URL</label>
                    <input
                      type="text"
                      placeholder="https://.../icon.svg"
                      value={skillModal.data.customIconUrl || ''}
                      onChange={(e) =>
                        setSkillModal({
                          ...skillModal,
                          data: { ...skillModal.data, customIconUrl: e.target.value },
                        })
                      }
                      className="w-full px-2.5 py-1 rounded-lg bg-white border border-neutral-200 text-xs font-mono focus:outline-none focus:border-black"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-200 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setSkillModal({ ...skillModal, isOpen: false })}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-neutral-600 hover:text-black cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={!skillModal.data.name.trim()}
                  onClick={() => {
                    let updated: any[];
                    if (skillModal.isEditing && skillModal.editIndex >= 0) {
                      updated = [...skills];
                      updated[skillModal.editIndex] = skillModal.data;
                    } else {
                      updated = [...skills, skillModal.data];
                    }
                    setPortfolio({ ...portfolio, skills: updated });
                    setSkillModal({ ...skillModal, isOpen: false });
                    showToast('Skill saved (Click Save Changes to apply)');
                  }}
                  className="px-4 py-1.5 rounded-lg bg-black text-white hover:bg-neutral-800 text-xs font-bold cursor-pointer transition-all shadow-xs disabled:opacity-50"
                >
                  Save Skill
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Tool Modal with Suggestions & Custom Icon Upload */}
      <AnimatePresence>
        {toolModal.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-white rounded-2xl p-4 sm:p-5 border border-neutral-200 shadow-2xl max-h-[92vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm sm:text-base font-bold text-neutral-900">
                  {toolModal.isEditing ? 'Edit Tool' : 'Add New Tool'}
                </h3>
                <span className="text-[10px] text-neutral-400 font-mono">Custom Icon &amp; Presets</span>
              </div>

              <div className="space-y-3">
                {/* Unified Tool Dropdown with React Icons */}
                <div className="relative">
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-[11px] font-mono font-semibold text-neutral-700">
                      Development / Engineering Tool
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setIsCustomToolMode(!isCustomToolMode);
                        setToolDropdownOpen(false);
                      }}
                      className="text-[10px] text-neutral-500 hover:text-black underline cursor-pointer"
                    >
                      {isCustomToolMode ? '← Choose from Preset Tools' : '+ Type Custom Tool'}
                    </button>
                  </div>

                  {!isCustomToolMode ? (
                    <div className="relative">
                      {/* Dropdown Input Trigger */}
                      <button
                        type="button"
                        onClick={() => setToolDropdownOpen(!toolDropdownOpen)}
                        className="w-full px-3 py-2 rounded-xl bg-neutral-50/80 border border-neutral-200 hover:border-black/50 text-xs sm:text-sm font-semibold flex items-center justify-between gap-2 cursor-pointer transition-all focus:outline-none focus:border-black shadow-2xs text-left"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-6 h-6 rounded-md bg-white border border-neutral-200 flex items-center justify-center shrink-0 shadow-2xs">
                            {selectedToolPreset ? (
                              (() => {
                                const IconComp = selectedToolPreset.icon;
                                return <IconComp className="w-3.5 h-3.5" style={{ color: selectedToolPreset.color }} />;
                              })()
                            ) : toolModal.data.name ? (
                              (() => {
                                const { component: IconComp, color } = getBrandIconComponent(toolModal.data.name);
                                return <IconComp className="w-3.5 h-3.5" style={{ color: color || '#181818' }} />;
                              })()
                            ) : (
                              <FaWrench className="w-3 h-3 text-neutral-400" />
                            )}
                          </div>
                          <span
                            className={`truncate ${
                              toolModal.data.name ? 'text-neutral-900 font-bold' : 'text-neutral-400 font-normal'
                            }`}
                          >
                            {toolModal.data.name || 'Click to select a tool (VS Code, Docker, Postman...)'}
                          </span>
                          {selectedToolPreset && (
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-semibold bg-neutral-100 text-neutral-600 shrink-0">
                              {selectedToolPreset.role}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0 text-neutral-400">
                          <span className="text-[10px] font-mono hidden sm:inline">{TOOL_PRESETS.length} tools</span>
                          {toolDropdownOpen ? (
                            <TbChevronUp className="w-4 h-4 text-neutral-700" />
                          ) : (
                            <TbChevronDown className="w-4 h-4 text-neutral-700" />
                          )}
                        </div>
                      </button>

                      {/* Dropdown Popover */}
                      {toolDropdownOpen && (
                        <div className="absolute left-0 right-0 top-full mt-1.5 z-50 bg-white rounded-xl border border-neutral-200 shadow-2xl p-2.5 space-y-2 max-h-72 overflow-hidden flex flex-col">
                          {/* Search */}
                          <div className="relative shrink-0">
                            <TbSearch className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400 pointer-events-none" />
                            <input
                              type="text"
                              placeholder="Search tools (VS Code, Docker, Postman...)"
                              value={toolPresetSearch}
                              onChange={(e) => setToolPresetSearch(e.target.value)}
                              className="w-full pl-8 pr-12 py-1.5 rounded-lg bg-neutral-50 border border-neutral-200 text-xs font-medium focus:outline-none focus:border-black"
                              autoFocus
                            />
                            {toolPresetSearch && (
                              <button
                                type="button"
                                onClick={() => setToolPresetSearch('')}
                                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono text-neutral-400 hover:text-black cursor-pointer"
                              >
                                Clear
                              </button>
                            )}
                          </div>

                          {/* Category Filter Tabs */}
                          <div className="flex flex-wrap gap-1 shrink-0">
                            {[
                              'All',
                              'Code Editors & IDEs',
                              'DevOps & Cloud',
                              'Testing & APIs',
                              'Databases',
                              'Design & Creative',
                              'Terminal & Systems',
                            ].map((cat) => (
                              <button
                                type="button"
                                key={cat}
                                onClick={() => setToolCategoryFilter(cat)}
                                className={`px-2 py-0.5 rounded-md text-[10px] font-semibold transition-all cursor-pointer ${
                                  toolCategoryFilter === cat
                                    ? 'bg-black text-white'
                                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                                }`}
                              >
                                {cat}
                              </button>
                            ))}
                          </div>

                          {/* Options List */}
                          <div className="overflow-y-auto flex-1 pr-1 space-y-0.5">
                            {filteredToolPresets.map((preset) => {
                              const IconComp = preset.icon;
                              const isSelected = toolModal.data.name.toLowerCase() === preset.name.toLowerCase();
                              return (
                                <button
                                  type="button"
                                  key={preset.name}
                                  onClick={() => {
                                    setToolModal({
                                      ...toolModal,
                                      data: {
                                        ...toolModal.data,
                                        name: preset.name,
                                        role: preset.role,
                                        description: preset.description,
                                        customIconUrl: '',
                                      },
                                    });
                                    setToolDropdownOpen(false);
                                  }}
                                  className={`w-full flex items-start gap-2.5 p-2 rounded-lg text-left transition-colors cursor-pointer ${
                                    isSelected ? 'bg-neutral-100 font-bold' : 'hover:bg-neutral-50'
                                  }`}
                                >
                                  <div className="w-6 h-6 rounded-md bg-white border border-neutral-200 flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
                                    <IconComp className="w-3.5 h-3.5" style={{ color: preset.color }} />
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <div className="flex items-center justify-between">
                                      <span className="text-xs text-neutral-900 font-semibold">{preset.name}</span>
                                      <div className="flex items-center gap-1.5">
                                        <span className="text-[9px] font-mono text-neutral-500 px-1 py-0.2 rounded bg-neutral-100">
                                          {preset.role}
                                        </span>
                                        {isSelected && <FaCheck className="w-2.5 h-2.5 text-emerald-600 shrink-0" />}
                                      </div>
                                    </div>
                                    <p className="text-[10px] text-neutral-500 truncate mt-0.5">{preset.description}</p>
                                  </div>
                                </button>
                              );
                            })}

                            {filteredToolPresets.length === 0 && (
                              <div className="py-4 text-center text-xs text-neutral-400">
                                No tool found matching &quot;{toolPresetSearch}&quot;.
                              </div>
                            )}

                            {/* Option to type custom tool */}
                            <button
                              type="button"
                              onClick={() => {
                                setIsCustomToolMode(true);
                                setToolDropdownOpen(false);
                              }}
                              className="w-full flex items-center gap-2 p-2 rounded-lg text-left text-neutral-700 hover:bg-neutral-50 hover:text-black transition-colors cursor-pointer pt-2 border-t border-neutral-100 mt-1"
                            >
                              <div className="w-6 h-6 rounded-md bg-neutral-100 border border-neutral-200 flex items-center justify-center shrink-0 text-neutral-500">
                                <FaPenToSquare className="w-3 h-3" />
                              </div>
                              <div className="min-w-0">
                                <div className="text-xs font-semibold text-neutral-900">+ Type Custom Tool Name</div>
                                <div className="text-[10px] text-neutral-400">Add any custom tool or software</div>
                              </div>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    /* Custom Tool Text Input */
                    <div className="space-y-1">
                      <input
                        type="text"
                        placeholder="e.g. Wireshark, Blender, Unity..."
                        value={toolModal.data.name}
                        onChange={(e) =>
                          setToolModal({
                            ...toolModal,
                            data: { ...toolModal.data, name: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl bg-neutral-50/70 border border-neutral-200 text-xs sm:text-sm font-semibold focus:outline-none focus:border-black"
                        autoFocus
                      />
                      <p className="text-[10px] text-neutral-400">
                        Type custom tool name. You can upload a custom icon below.
                      </p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-semibold text-neutral-700 mb-0.5">Role Tag</label>
                  <input
                    type="text"
                    placeholder="e.g. Primary IDE, Containerization, API Testing"
                    value={toolModal.data.role}
                    onChange={(e) =>
                      setToolModal({
                        ...toolModal,
                        data: { ...toolModal.data, role: e.target.value },
                      })
                    }
                    className="w-full px-3 py-1.5 rounded-xl bg-neutral-50/70 border border-neutral-200 text-xs font-mono text-neutral-900 font-semibold focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-semibold text-neutral-700 mb-0.5">Description (1-Line)</label>
                  <textarea
                    rows={2}
                    placeholder="Short 1-line description of how you use this tool..."
                    value={toolModal.data.description}
                    onChange={(e) =>
                      setToolModal({
                        ...toolModal,
                        data: { ...toolModal.data, description: e.target.value },
                      })
                    }
                    className="w-full px-3 py-1.5 rounded-xl bg-neutral-50/70 border border-neutral-200 text-xs text-neutral-700 focus:outline-none focus:border-black resize-none"
                  />
                </div>

                {/* Custom Tool Icon Upload */}
                <div className="p-3 rounded-xl bg-neutral-50/70 border border-neutral-200 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold uppercase text-neutral-700">Custom Tool Icon</span>
                    {toolModal.data.customIconUrl && (
                      <button
                        type="button"
                        onClick={() =>
                          setToolModal({
                            ...toolModal,
                            data: { ...toolModal.data, customIconUrl: '' },
                          })
                        }
                        className="text-[10px] text-red-600 hover:underline cursor-pointer"
                      >
                        Clear Custom Icon
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white border border-neutral-200 p-1 flex items-center justify-center shrink-0 overflow-hidden shadow-2xs">
                      {toolModal.data.customIconUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={toolModal.data.customIconUrl} alt="Tool Icon" className="w-full h-full object-contain" />
                      ) : (
                        (() => {
                          const { component: IconComp, color } = getBrandIconComponent(toolModal.data.name || 'Wrench');
                          return <IconComp className="w-5 h-5" style={{ color: color || '#181818' }} />;
                        })()
                      )}
                    </div>

                    <div className="flex-1 space-y-1">
                      <label className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black text-white text-xs font-semibold cursor-pointer hover:bg-neutral-800 transition-all shadow-xs">
                        <FaUpload className="w-2.5 h-2.5 text-neutral-300" />
                        <span>{isUploading ? 'Uploading...' : 'Upload Icon'}</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            handleImageUpload(e, (url) => {
                              setToolModal({
                                ...toolModal,
                                data: { ...toolModal.data, customIconUrl: url },
                              });
                            })
                          }
                        />
                      </label>
                      <p className="text-[10px] text-neutral-400">
                        Upload custom SVG/PNG logo, or leave blank for preset.
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[9px] font-mono text-neutral-500 mb-0.5 uppercase">Or Icon URL</label>
                    <input
                      type="text"
                      placeholder="https://.../tool-logo.svg"
                      value={toolModal.data.customIconUrl || ''}
                      onChange={(e) =>
                        setToolModal({
                          ...toolModal,
                          data: { ...toolModal.data, customIconUrl: e.target.value },
                        })
                      }
                      className="w-full px-2.5 py-1 rounded-lg bg-white border border-neutral-200 text-xs font-mono focus:outline-none focus:border-black"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-200 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setToolModal({ ...toolModal, isOpen: false })}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-neutral-600 hover:text-black cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={!toolModal.data.name.trim()}
                  onClick={() => {
                    let updated: any[];
                    if (toolModal.isEditing && toolModal.editIndex >= 0) {
                      updated = [...tools];
                      updated[toolModal.editIndex] = toolModal.data;
                    } else {
                      updated = [...tools, toolModal.data];
                    }
                    setPortfolio({ ...portfolio, tools: updated });
                    setToolModal({ ...toolModal, isOpen: false });
                    showToast('Tool saved (Click Save Changes to apply)');
                  }}
                  className="px-4 py-1.5 rounded-lg bg-black text-white hover:bg-neutral-800 text-xs font-bold cursor-pointer transition-all shadow-xs disabled:opacity-50"
                >
                  Save Tool
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Create New Profile Modal */}
      <AnimatePresence>
        {isCreatingProfile && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-white rounded-2xl p-4 sm:p-5 border border-neutral-200 shadow-2xl"
            >
              <h3 className="text-sm sm:text-base font-bold text-neutral-900 mb-1">
                Create New Portfolio Profile
              </h3>
              <p className="text-[11px] text-neutral-500 mb-4 leading-relaxed">
                Creates a new, blank portfolio document in MongoDB. You can customize all sections gradually and activate it whenever you are ready.
              </p>

              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-mono font-semibold text-neutral-700 mb-0.5">
                    Profile Name / Label
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Software Engineer (2026 Profile)"
                    value={newProfileName}
                    onChange={(e) => setNewProfileName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-50/70 border border-neutral-200 text-xs sm:text-sm font-semibold focus:outline-none focus:border-black"
                    autoFocus
                  />
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-200 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreatingProfile(false);
                    setNewProfileName('');
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-neutral-600 hover:text-black cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={!newProfileName.trim() || isSaving}
                  onClick={async () => {
                    await handleCreateNewProfile(newProfileName.trim());
                    setIsCreatingProfile(false);
                    setNewProfileName('');
                  }}
                  className="px-4 py-1.5 rounded-lg bg-black text-white hover:bg-neutral-800 text-xs font-bold transition-all cursor-pointer shadow-xs disabled:opacity-50"
                >
                  Create Blank Profile
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
