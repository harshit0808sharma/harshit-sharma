import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IInquiry extends Document {
  name: string;
  email: string;
  subject?: string;
  message: string;
  budget?: string;
  read: boolean;
  createdAt: Date;
}

const InquirySchema = new Schema<IInquiry>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, default: 'Direct Contact Inquiry' },
    message: { type: String, required: true },
    budget: { type: String, default: 'Custom' },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Inquiry: Model<IInquiry> =
  mongoose.models.Inquiry || mongoose.model<IInquiry>('Inquiry', InquirySchema);
