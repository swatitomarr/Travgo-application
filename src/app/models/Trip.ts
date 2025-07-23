// models/Trip.ts

import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IDestination {
  city: string;
  country: string;
  arrivalDate: Date;
  departureDate: Date;
  status: 'voting' | 'confirmed';
  rating?: number;
  voteDeadline?: Date;
  membersVoted?: Types.ObjectId[];
  imageUrl?: string;
}

export interface ISuggestedDestination {
  city: string;
  country: string;
  countryCode: string;
  rating?: number;
  suggestedBy: Types.ObjectId;
  addedAt: Date;
  currencyCode?: string;
  currencySymbol?: string;
  imageUrl?: string;
  votes?: number;
  membersVoted?: Types.ObjectId[];
  promotedToDestination?: boolean;
}

export interface ITrip extends Document {
  title: string;
  description?: string;
  creator: Types.ObjectId;
  tripMembers: Types.ObjectId[];
  invitedMembers: {
    email?: string;
    user?: Types.ObjectId;
    invitedBy: Types.ObjectId;
    status: 'pending' | 'accepted' | 'declined';
    invitedAt: Date;
  }[];
  destinations: IDestination[];
  suggestedDestinations?: ISuggestedDestination[];
  startDate: Date;
  endDate: Date;
  budget: number;
  expenses: number;
  tasks: Types.ObjectId[];
  chatRoom: Types.ObjectId;
  itinerary: Types.ObjectId[];
  settlements: Types.ObjectId[]; // ✅ Added for tracking payments
  weatherForecast?: {
    destination: string;
    date: Date;
    summary: string;
    temperature: number;
    icon: string;
  }[];
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const destinationSchema = new Schema<IDestination>(
  {
    city: { type: String, required: true },
    country: { type: String, required: true },
    arrivalDate: { type: Date, required: true },
    departureDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ['voting', 'confirmed'],
      default: 'voting',
    },
    rating: { type: Number },
    voteDeadline: { type: Date },
    membersVoted: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    imageUrl: { type: String },
  },
  { _id: false }
);

const suggestedDestinationSchema = new Schema<ISuggestedDestination>(
  {
    city: { type: String, required: true },
    country: { type: String, required: true },
    countryCode: { type: String, required: true },
    rating: { type: Number, default: 0 },
    suggestedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    addedAt: { type: Date, default: Date.now },
    currencyCode: { type: String },
    currencySymbol: { type: String },
    imageUrl: { type: String },
    votes: { type: Number, default: 0 },
    membersVoted: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    promotedToDestination: { type: Boolean, default: false },
  },
  { _id: false }
);

const tripSchema = new Schema<ITrip>(
  {
    title: { type: String, required: true },
    description: { type: String },
    creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    tripMembers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    invitedMembers: [
      {
        email: { type: String },
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        invitedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        status: {
          type: String,
          enum: ['pending', 'accepted', 'declined'],
          default: 'pending',
        },
        invitedAt: { type: Date, default: Date.now },
      },
    ],
    destinations: [destinationSchema],
    suggestedDestinations: [suggestedDestinationSchema],
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    budget: { type: Number, default: 0 },
    expenses: { type: Number, default: 0 },
    tasks: [{ type: Schema.Types.ObjectId, ref: 'TripTask' }],
    chatRoom: { type: Schema.Types.ObjectId, ref: 'ChatRoom' },
    itinerary: [{ type: Schema.Types.ObjectId, ref: 'ItineraryItem' }],
    settlements: [{ type: Schema.Types.ObjectId, ref: 'Settlement' }], // ✅ NEW
    weatherForecast: [
      {
        destination: { type: String },
        date: { type: Date },
        summary: { type: String },
        temperature: { type: Number },
        icon: { type: String },
      },
    ],
    imageUrl: { type: String },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Trip || mongoose.model<ITrip>('Trip', tripSchema);







