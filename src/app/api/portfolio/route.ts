import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Portfolio } from '@/models/Portfolio';
import { authenticateRequest } from '@/lib/auth';

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    const url = new URL(req.url);
    const all = url.searchParams.get('all') === 'true';
    const id = url.searchParams.get('id');

    // Return list of all portfolio documents for Admin settings/switcher
    if (all) {
      const portfolios = await Portfolio.find().sort({ createdAt: -1 }).lean();
      const activePortfolio = portfolios.find((p) => p.isActive) || portfolios[0] || null;
      return NextResponse.json({
        success: true,
        activeId: activePortfolio?._id || null,
        portfolios,
      });
    }

    // Return specific portfolio by ID
    if (id) {
      const portfolioDoc = await Portfolio.findById(id).lean();
      if (!portfolioDoc) {
        return NextResponse.json({ success: false, error: 'Portfolio not found', data: null }, { status: 404 });
      }
      return NextResponse.json({ success: true, data: portfolioDoc });
    }

    // Default: Return the active portfolio for the public website
    let portfolioDoc = await Portfolio.findOne({ isActive: true }).lean();
    if (!portfolioDoc) {
      // Fallback: If no document marked active, use the latest document and mark it active
      portfolioDoc = await Portfolio.findOne().sort({ createdAt: -1 }).lean();
      if (portfolioDoc) {
        await Portfolio.findByIdAndUpdate(portfolioDoc._id, { $set: { isActive: true } });
        portfolioDoc.isActive = true;
      }
    }

    return NextResponse.json({
      success: true,
      data: portfolioDoc || null,
    });
  } catch (error: any) {
    console.error('Error fetching portfolio from MongoDB:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch portfolio data', data: null },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const authUser = await authenticateRequest(req);
    if (!authUser) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Valid JWT session required' },
        { status: 401 }
      );
    }

    await connectToDatabase();
    const body = await req.json();

    // ACTION: Create brand new, blank portfolio profile
    if (body.action === 'create_new') {
      const count = await Portfolio.countDocuments();
      const profileName = body.profileName?.trim() || `Portfolio Profile #${count + 1}`;

      const newDoc = await Portfolio.create({
        profileName,
        isActive: count === 0, // active if it's the very first one, otherwise inactive
        hero: {
          greeting: '',
          name: '',
          title: '',
          bio: '',
          avatarUrl: '',
          availabilityStatus: '',
          resumeUrl: '',
          logoUrl: '',
          logoText: '',
          faviconUrl: '',
          ctaHireMeText: 'Hire Me',
          ctaHireMeLink: '#contact',
          ctaPortfolioText: 'View Portfolio',
          ctaPortfolioLink: '#projects',
          ctaContactText: 'Contact Me',
          ctaContactLink: '#contact',
          phone: '',
          stats: [],
          socialLinks: {
            github: '',
            linkedin: '',
            twitter: '',
            email: '',
            instagram: '',
            dribbble: '',
            youtube: '',
            website: '',
          },
        },
        services: [],
        about: {
          heading: '',
          description: '',
          experienceYears: '',
          stats: [],
          signature: '',
          avatarUrl: '',
          fannedPills: [],
        },
        projects: [],
        skills: [],
        experiences: [],
        educations: [],
        tools: [],
        tickerItems: [],
        theme: {
          primary: '#1E3A2B',
          accent: '#FFB800',
          dark: '#181818',
          light: '#FAF9F5',
          headingFont: 'Space Grotesk',
          bodyFont: 'Inter',
          font: 'Space Grotesk',
        },
      });

      return NextResponse.json({
        success: true,
        message: `New blank portfolio "${profileName}" created successfully!`,
        data: newDoc,
      });
    }

    // ACTION: Set a specific portfolio as active on the public website
    if (body.action === 'set_active') {
      const targetId = body.targetId;
      if (!targetId) {
        return NextResponse.json({ success: false, error: 'targetId is required' }, { status: 400 });
      }

      // Mark all portfolios inactive
      await Portfolio.updateMany({}, { $set: { isActive: false } });

      // Mark target portfolio active
      const activatedDoc = await Portfolio.findByIdAndUpdate(
        targetId,
        { $set: { isActive: true } },
        { new: true }
      ).lean();

      if (!activatedDoc) {
        return NextResponse.json({ success: false, error: 'Portfolio document not found' }, { status: 404 });
      }

      return NextResponse.json({
        success: true,
        message: `Portfolio "${activatedDoc.profileName || targetId}" is now LIVE on your public website!`,
        data: activatedDoc,
      });
    }

    // ACTION: Delete an inactive portfolio profile
    if (body.action === 'delete') {
      const targetId = body.targetId;
      if (!targetId) {
        return NextResponse.json({ success: false, error: 'targetId is required' }, { status: 400 });
      }

      const targetDoc = await Portfolio.findById(targetId);
      if (!targetDoc) {
        return NextResponse.json({ success: false, error: 'Portfolio document not found' }, { status: 404 });
      }

      if (targetDoc.isActive) {
        return NextResponse.json(
          {
            success: false,
            error: 'Cannot delete the currently active portfolio profile. Please activate another profile first.',
          },
          { status: 400 }
        );
      }

      await Portfolio.findByIdAndDelete(targetId);

      return NextResponse.json({
        success: true,
        message: `Portfolio profile deleted successfully`,
      });
    }

    // DEFAULT ACTION: Save changes to the target portfolio
    const targetId = body._id;
    let updatedPortfolio;

    if (targetId) {
      const { _id, createdAt, updatedAt, __v, ...updateFields } = body;
      updatedPortfolio = await Portfolio.findByIdAndUpdate(
        targetId,
        { $set: updateFields },
        { new: true }
      ).lean();
    } else {
      updatedPortfolio = await Portfolio.findOneAndUpdate(
        { isActive: true },
        { $set: body },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      ).lean();
    }

    return NextResponse.json({
      success: true,
      message: 'Portfolio data updated successfully',
      data: updatedPortfolio,
    });
  } catch (error: any) {
    console.error('Error updating portfolio in MongoDB:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update portfolio data' },
      { status: 500 }
    );
  }
}
