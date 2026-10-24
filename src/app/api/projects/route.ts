import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Portfolio } from '@/models/Portfolio';

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined;
    const id = searchParams.get('id');

    const portfolioDoc = await Portfolio.findOne().lean();

    if (!portfolioDoc || !portfolioDoc.projects || portfolioDoc.projects.length === 0) {
      return NextResponse.json({
        success: true,
        count: 0,
        data: [],
      });
    }

    let projects = portfolioDoc.projects;

    // Filter by single project ID if requested
    if (id) {
      const single = projects.find((p: any) => p.id === id);
      if (!single) {
        return NextResponse.json(
          { success: false, error: 'Project not found', data: null },
          { status: 404 }
        );
      }
      return NextResponse.json({
        success: true,
        data: single,
      });
    }

    // Filter by Category if specified
    if (category && category !== 'All') {
      projects = projects.filter(
        (p: any) =>
          p.category?.toLowerCase() === category.toLowerCase() ||
          p.tags?.some((t: string) => t.toLowerCase() === category.toLowerCase())
      );
    }

    // Apply limit if specified
    if (limit && limit > 0) {
      projects = projects.slice(0, limit);
    }

    return NextResponse.json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error: any) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch projects', data: [] },
      { status: 500 }
    );
  }
}
