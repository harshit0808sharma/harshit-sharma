'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export interface PortfolioState {
  _id?: string;
  profileName?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
  hero?: {
    greeting?: string;
    name?: string;
    title?: string;
    bio?: string;
    avatarUrl?: string;
    availabilityStatus?: string;
    resumeUrl?: string;
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
  };
  services?: {
    id: string;
    title: string;
    description: string;
    number?: string;
    icon?: string;
  }[];
  about?: {
    heading?: string;
    description?: string;
    experienceYears?: string;
    stats?: { label: string; value: string }[];
    signature?: string;
    avatarUrl?: string;
    fannedPills?: {
      label: string;
      bg: string;
      text: string;
      rotate: string;
      top: string;
      left: string;
    }[];
  };
  projects?: {
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
  }[];
  skills?: {
    name: string;
    category: string;
    color: string;
    rotate: string;
    iconType?: string;
    customIconUrl?: string;
  }[];
  experiences?: {
    period: string;
    current: boolean;
    role: string;
    company: string;
    location: string;
    description: string;
  }[];
  educations?: {
    period: string;
    current: boolean;
    degree: string;
    institution: string;
    location: string;
    description: string;
  }[];
  tools?: {
    name: string;
    role: string;
    description: string;
    iconType?: string;
    customIconUrl?: string;
  }[];
  tickerItems?: string[];
  theme?: {
    primary: string;
    accent: string;
    dark: string;
    light: string;
    headingFont?: string;
    bodyFont?: string;
    font?: string;
  };
}

interface PortfolioContextType {
  data: PortfolioState | null;
  isLoading: boolean;
  refetch: () => Promise<void>;
  saveData: (nextData: PortfolioState) => Promise<void>;
  updateHero: (heroUpdates: Partial<PortfolioState['hero']>) => Promise<void>;
  submitInquiry: (inquiry: {
    name: string;
    email: string;
    subject?: string;
    message: string;
    budget?: string;
  }) => Promise<{ success: boolean; message?: string }>;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({
  children,
  initialData = null,
}: {
  children: React.ReactNode;
  initialData?: PortfolioState | null;
}) {
  const [data, setData] = useState<PortfolioState | null>(initialData);
  const [isLoading, setIsLoading] = useState(!initialData);

  const fetchPortfolioData = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/portfolio');
      if (!res.ok) {
        if (!initialData) setData(null);
        return;
      }
      const json = await res.json();
      if (json.success && json.data) {
        setData(json.data);
      } else {
        // Enforcing user rule: data na aane par kuch mat show karna
        setData(null);
      }
    } catch (err) {
      console.error('Failed to fetch portfolio data from MongoDB:', err);
      if (!initialData) setData(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!initialData) {
      fetchPortfolioData();
    }
  }, []);

  const saveData = async (nextData: PortfolioState) => {
    setData(nextData);
    try {
      await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nextData),
      });
    } catch (err) {
      console.error('Failed to save portfolio state to MongoDB:', err);
    }
  };

  const updateHero = async (heroUpdates: Partial<PortfolioState['hero']>) => {
    if (!data) return;
    const nextData = {
      ...data,
      hero: { ...data.hero, ...heroUpdates },
    };
    await saveData(nextData);
  };

  const submitInquiry = async (inquiryData: {
    name: string;
    email: string;
    subject?: string;
    message: string;
    budget?: string;
  }) => {
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inquiryData),
      });
      return await res.json();
    } catch (err) {
      console.error('Error submitting inquiry to MongoDB:', err);
      return { success: false, message: 'Submission failed' };
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        isLoading,
        refetch: fetchPortfolioData,
        saveData,
        updateHero,
        submitInquiry,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}
