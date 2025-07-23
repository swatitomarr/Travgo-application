// models/ItineraryItem.ts

import mongoose, { Schema, Document } from 'mongoose';

export type ActivityType = 
  | 'flight'
  | 'hotel'
  | 'meal'
  | 'sightseeing'
  | 'transport'
  | 'check-in'
  | 'custom';

export interface IItineraryItem extends Document {
  trip: mongoose.Types.ObjectId;
  day: number; // Day number within the trip
  type: ActivityType;
  title: string;
  description?: string;
  location?: {
    name?: string;
    address?: string;
    city?: string;
    country?: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  startTime: string; // HH:mm format
  durationInMinutes?: number;
  endTime?: string; // optional: calculated or manually entered
  cost?: number;
  isCompleted?: boolean;
  createdBy: mongoose.Types.ObjectId;
  order: number; // used for sorting within the day
  icon?: string; // optional, for future icon support
  tags?: string[]; // for smart filtering or future AI suggestions
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ItineraryItemSchema: Schema = new Schema<IItineraryItem>(
  {
    trip: { type: Schema.Types.ObjectId, ref: 'Trip', required: true },
    day: { type: Number, required: true },
    type: {
      type: String,
      enum: [
        'flight',
        'hotel',
        'meal',
        'sightseeing',
        'transport',
        'check-in',
        'custom'
      ],
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String },
    location: {
      name: { type: String },
      address: { type: String },
      city: { type: String },
      country: { type: String },
      coordinates: {
        lat: { type: Number },
        lng: { type: Number },
      },
    },
    startTime: { type: String, required: true }, // "08:00"
    durationInMinutes: { type: Number },
    endTime: { type: String }, // optionally entered or derived from start + duration
    cost: { type: Number, default: 0 },
    isCompleted: { type: Boolean, default: false },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    order: { type: Number, default: 0 },
    icon: { type: String }, // optional icon path
    tags: [{ type: String }],
    notes: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.ItineraryItem ||
  mongoose.model<IItineraryItem>('ItineraryItem', ItineraryItemSchema);
             
