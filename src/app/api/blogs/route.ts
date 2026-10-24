import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Blog } from '@/models/Blog';
import { authenticateRequest } from '@/lib/auth';

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const all = searchParams.get('all') === 'true';
    const category = searchParams.get('category');
    const type = searchParams.get('type');

    // Strict rule: NO default blogs are automatically created.
    // If the admin deletes blogs, the database stays empty until the admin adds new cards.

    const query: any = {};
    if (!all) {
      query.isPublished = true;
    }
    if (category && category !== 'All') {
      query.category = { $regex: new RegExp(`^${category}$`, 'i') };
    }
    if (type && (type === 'image_only' || type === 'content')) {
      query.type = type;
    }

    const blogs = await Blog.find(query).sort({ order: 1, createdAt: -1 }).lean();

    return NextResponse.json({
      success: true,
      count: blogs.length,
      data: blogs,
    });
  } catch (error: any) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch blogs', data: [] },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const authUser = await authenticateRequest(req);
    if (!authUser) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Admin authentication required' },
        { status: 401 }
      );
    }

    await connectToDatabase();
    const body = await req.json();

    const type = body.type === 'image_only' ? 'image_only' : 'content';

    // Flexible validation:
    // Image cards require an image or a title
    if (type === 'image_only' && !body.imageUrl?.trim() && !body.title?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Please provide an image or title for this image card' },
        { status: 400 }
      );
    }

    // Content cards require a title or description
    if (type === 'content' && !body.title?.trim() && !body.description?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Please provide a title or description for the banner card' },
        { status: 400 }
      );
    }

    const count = await Blog.countDocuments();
    const orderNum = typeof body.order === 'number' ? body.order : parseInt(body.order, 10);
    const order = !isNaN(orderNum) ? orderNum : count + 1;

    const newBlog = await Blog.create({
      type,
      title: body.title ? body.title.trim() : (type === 'image_only' ? '' : 'Untitled Note'),
      description: body.description ? body.description.trim() : '',
      imageUrl: body.imageUrl ? body.imageUrl.trim() : '',
      imageAspectRatio: body.imageAspectRatio || 'auto',
      gradient: body.gradient || 'linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 100%)',
      textColor: body.textColor === 'light' ? 'light' : 'dark',
      buttonText: body.buttonText ? body.buttonText.trim() : '',
      buttonUrl: body.buttonUrl ? body.buttonUrl.trim() : '',
      category: body.category ? body.category.trim() : 'General',
      badge: body.badge ? body.badge.trim() : '',
      order,
      isPublished: body.isPublished !== undefined ? Boolean(body.isPublished) : true,
    });

    return NextResponse.json({
      success: true,
      message: 'Blog post created successfully',
      data: newBlog,
    });
  } catch (error: any) {
    console.error('Error creating blog:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create blog' },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const authUser = await authenticateRequest(req);
    if (!authUser) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Admin authentication required' },
        { status: 401 }
      );
    }

    await connectToDatabase();
    const body = await req.json();
    const id = body._id || body.id;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Blog ID is required for updating' },
        { status: 400 }
      );
    }

    const type = body.type === 'image_only' ? 'image_only' : 'content';
    const orderNum = typeof body.order === 'number' ? body.order : parseInt(body.order, 10);

    const updateFields: any = {
      type,
      title: body.title !== undefined ? body.title.trim() : '',
      description: body.description !== undefined ? body.description.trim() : '',
      imageUrl: body.imageUrl !== undefined ? body.imageUrl.trim() : '',
      imageAspectRatio: body.imageAspectRatio || 'auto',
      gradient: body.gradient || 'linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 100%)',
      textColor: body.textColor === 'light' ? 'light' : 'dark',
      buttonText: body.buttonText !== undefined ? body.buttonText.trim() : '',
      buttonUrl: body.buttonUrl !== undefined ? body.buttonUrl.trim() : '',
      category: body.category !== undefined ? body.category.trim() : 'General',
      badge: body.badge !== undefined ? body.badge.trim() : '',
      isPublished: body.isPublished !== undefined ? Boolean(body.isPublished) : true,
    };

    if (!isNaN(orderNum)) {
      updateFields.order = orderNum;
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true }
    );

    if (!updatedBlog) {
      return NextResponse.json(
        { success: false, error: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Blog post updated successfully',
      data: updatedBlog,
    });
  } catch (error: any) {
    console.error('Error updating blog:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update blog' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const authUser = await authenticateRequest(req);
    if (!authUser) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Admin authentication required' },
        { status: 401 }
      );
    }

    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Blog ID query parameter is required' },
        { status: 400 }
      );
    }

    const deleted = await Blog.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, error: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Blog post deleted successfully',
      deletedId: id,
    });
  } catch (error: any) {
    console.error('Error deleting blog:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete blog' },
      { status: 500 }
    );
  }
}
