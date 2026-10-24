import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { TickerStrip } from '@/components/TickerStrip';
import { ServicesSection } from '@/components/ServicesSection';
import { AboutSection } from '@/components/AboutSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { SkillsSection } from '@/components/SkillsSection';
import { ExperienceSection } from '@/components/ExperienceSection';
import { ToolsSection } from '@/components/ToolsSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#FAF9F5] text-[#181818] selection:bg-[#FFB800] selection:text-[#1E3A2B]">
      {/* 1. Floating Dark Green Pill Navigation */}
      <Navbar />

      {/* 2. Hero Section: Hello World, Harshit Sharma, CTA buttons, Yellow Freeform Shape & Character */}
      <Hero />

      {/* 3. Yellow Marquee Ticker Strip: App Design, Website Design, Dashboard, Wireframe */}
      <TickerStrip />

      {/* 4. Services Section: Services I Provide with 3 Cards */}
      <ServicesSection />

      {/* 5. About Me Section: Dark Forest Green Container, Fanned Skill Pills, Stats & Cursive Signature */}
      <AboutSection />

      {/* 6. Projects Section: Featured Projects with Category Filters & Case Studies */}
      <ProjectsSection />

      {/* 7. Skills Section: Core Competencies with 4 Bento Skill Categories & Meters */}
      <SkillsSection />

      {/* 8. Education & Experience Section: Timeline Milestones & Credentials */}
      <ExperienceSection />

      {/* 9. My Favorite Tools: Exploring the Tools Behind My Designs */}
      <ToolsSection />

      {/* 10. Contact & Inquiry Section: Deep Forest Green Card & Interactive Form */}
      <ContactSection />

      {/* 11. Footer: Brand Monogram, Live Studio Clock, Legal & Back to Top */}
      <Footer />
    </main>
  );
}
