import mongoose, { Schema, Document, Types } from 'mongoose';

export type MessageType = 'text' | 'file' | 'location' | 'event' | 'expense' | 'system';

export interface IMessage extends Document {
  trip: Types.ObjectId; // Belongs to which trip
  sender?: Types.ObjectId; // Null if system message
  type: MessageType;
  content?: string;
  fileUrl?: string; // for file/image share
  fileName?: string;
  fileType?: string; // pdf, jpg, docx
  location?: {
    name?: string;
    lat: number;
    lng: number;
  };
  event?: {
    title: string;
    time: Date;
    details?: string;
  };
  expenseRef?: Types.ObjectId;
  readBy: Types.ObjectId[]; // userIds of those who read
  isSystem: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const locationSchema = new Schema(
  {
    name: String,
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  { _id: false }
);

const eventSchema = new Schema(
  {
    title: { type: String, required: true },
    time: { type: Date, required: true },
    details: String,
  },
  { _id: false }
);

const messageSchema = new Schema<IMessage>(
  {
    trip: { type: Schema.Types.ObjectId, ref: 'Trip', required: true },
    sender: { type: Schema.Types.ObjectId, ref: 'User' }, // optional for system messages
    type: {
      type: String,
      enum: ['text', 'file', 'location', 'event', 'expense', 'system'],
      required: true,
    },
    content: { type: String },
    fileUrl: String,
    fileName: String,
    fileType: String,
    location: locationSchema,
    event: eventSchema,
    expenseRef: { type: Schema.Types.ObjectId, ref: 'Expense' },
    readBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    isSystem: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Message ||
  mongoose.model<IMessage>('Message', messageSchema);
