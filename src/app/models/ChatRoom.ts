import mongoose, { Schema, Document, Types } from 'mongoose';

export type MemberRole = 'admin' | 'editor' | 'viewer';

interface ChatMember {
  user: Types.ObjectId;
  role: MemberRole;
  isOnline: boolean;
}

export interface IChatRoom extends Document {
  trip: Types.ObjectId; // 1:1 relationship with trip
  members: ChatMember[];
  lastMessage?: {
    messageId: Types.ObjectId;
    textPreview: string;
    sentAt: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}

const memberSchema = new Schema<ChatMember>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    role: { type: String, enum: ['admin', 'editor', 'viewer'], required: true },
    isOnline: { type: Boolean, default: false },
  },
  { _id: false }
);

const chatRoomSchema = new Schema<IChatRoom>(
  {
    trip: { type: Schema.Types.ObjectId, ref: 'Trip', unique: true, required: true },
    members: [memberSchema],
    lastMessage: {
      messageId: { type: Schema.Types.ObjectId, ref: 'Message' },
      textPreview: String,
      sentAt: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.models.ChatRoom ||
  mongoose.model<IChatRoom>('ChatRoom', chatRoomSchema);
