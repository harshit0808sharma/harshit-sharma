import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Inquiry } from '@/models/Inquiry';
import { authenticateRequest } from '@/lib/auth';

// Public endpoint: Visitors submit inquiries
export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const { name, email, subject, message, budget } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and message are required fields.' },
        { status: 400 }
      );
    }

    const newInquiry = await Inquiry.create({
      name,
      email,
      subject: subject || 'Portfolio Contact Inquiry',
      message,
      budget: budget || 'Custom',
      read: false,
    });

    return NextResponse.json({
      success: true,
      message: 'Inquiry saved successfully to MongoDB!',
      data: newInquiry,
    });
  } catch (error: any) {
    console.error('Error saving inquiry:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to submit inquiry' },
      { status: 500 }
    );
  }
}

// Protected: Only authenticated admin can view inquiries
export async function GET(req: Request) {
  try {
    const authUser = await authenticateRequest(req);
    if (!authUser) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Valid JWT session required' },
        { status: 401 }
      );
    }

    await connectToDatabase();
    const inquiries = await Inquiry.find().sort({ createdAt: -1 }).lean();

    return NextResponse.json({
      success: true,
      data: inquiries,
    });
  } catch (error: any) {
    console.error('Error fetching inquiries:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch inquiries' },
      { status: 500 }
    );
  }
}

// Protected: Only authenticated admin can update inquiry status
export async function PATCH(req: Request) {
  try {
    const authUser = await authenticateRequest(req);
    if (!authUser) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Valid JWT session required' },
        { status: 401 }
      );
    }

    await connectToDatabase();
    const { id, read } = await req.json();

    const updated = await Inquiry.findByIdAndUpdate(
      id,
      { read },
      { new: true }
    );

    return NextResponse.json({
      success: true,
      data: updated,
    });
  } catch (error: any) {
    console.error('Error updating inquiry:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update inquiry' },
      { status: 500 }
    );
  }
}

// Protected: Only authenticated admin can delete an inquiry
export async function DELETE(req: Request) {
  try {
    const authUser = await authenticateRequest(req);
    if (!authUser) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Valid JWT session required' },
        { status: 401 }
      );
    }

    await connectToDatabase();
    const url = new URL(req.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Inquiry id is required' },
        { status: 400 }
      );
    }

    await Inquiry.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: 'Inquiry deleted successfully',
    });
  } catch (error: any) {
    console.error('Error deleting inquiry:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete inquiry' },
      { status: 500 }
    );
  }
}
