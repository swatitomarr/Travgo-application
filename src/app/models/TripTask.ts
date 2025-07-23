import mongoose, { Schema, Document } from 'mongoose';

export interface ITripTask extends Document {
  title: string;
  description?: string;
  dueDate?: Date;
  priority?: 'low' | 'medium' | 'high';
  isCompleted: boolean;
  assignedTo?: mongoose.Types.ObjectId[];
  createdBy: mongoose.Types.ObjectId;
  trip: mongoose.Types.ObjectId;
  taskType?: 'flight' | 'hotel' | 'activity' | 'document' | 'other';
  reminderDate?: Date;
  attachments?: { url: string; type: 'image' | 'pdf' | 'doc' | 'other' }[];
  checklist?: { item: string; checked: boolean }[];
  createdAt?: Date;
  updatedAt?: Date;
}

const tripTaskSchema = new Schema<ITripTask>(
  {
    title: { type: String, required: true },
    description: { type: String },

    dueDate: { type: Date },
    reminderDate: { type: Date },

    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium'
    },
    isCompleted: { type: Boolean, default: false },

    assignedTo: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    trip: { type: Schema.Types.ObjectId, ref: 'Trip', required: true },

    taskType: {
      type: String,
      enum: ['flight', 'hotel', 'activity', 'document', 'other'],
      default: 'other'
    },

    attachments: [
      {
        url: String,
        type: {
          type: String,
          enum: ['image', 'pdf', 'doc', 'other'],
          default: 'other'
        }
      }
    ],

    checklist: [
      {
        item: String,
        checked: { type: Boolean, default: false }
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.models.TripTask || mongoose.model<ITripTask>('TripTask', tripTaskSchema);


