import mongoose, { Schema, Document, Model } from 'mongoose';

export type BlogType = 'image_only' | 'content';

export interface IBlog extends Document {
  type: BlogType;
  title: string;
  description?: string;
  imageUrl?: string;
  imageAspectRatio?: string; // 'auto' | '1/1' | '16/9' | '4/5' | '3/4' | '9/16'
  gradient?: string; // custom gradient CSS, e.g. 'linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 100%)'
  textColor?: 'dark' | 'light';
  buttonText?: string;
  buttonUrl?: string;
  category?: string;
  badge?: string;
  order: number;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema = new Schema<IBlog>(
  {
    type: {
      type: String,
      enum: ['image_only', 'content'],
      default: 'content',
      required: true,
    },
    title: {
      type: String,
      required: false,
      default: '',
      trim: true,
    },
    description: {
      type: String,
      default: '',
      trim: true,
    },
    imageUrl: {
      type: String,
      default: '',
    },
    imageAspectRatio: {
      type: String,
      default: 'auto',
    },
    gradient: {
      type: String,
      default: 'linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 100%)',
    },
    textColor: {
      type: String,
      enum: ['dark', 'light'],
      default: 'dark',
    },
    buttonText: {
      type: String,
      default: '',
    },
    buttonUrl: {
      type: String,
      default: '',
    },
    category: {
      type: String,
      default: 'General',
    },
    badge: {
      type: String,
      default: '',
    },
    order: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

if (mongoose.models.Blog) {
  delete (mongoose.models as any).Blog;
}
export const Blog: Model<IBlog> = mongoose.model<IBlog>('Blog', BlogSchema);
