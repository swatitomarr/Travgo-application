// models/Expense.ts

import mongoose, { Schema, Document } from 'mongoose';

export type ExpenseCategory = 'Flight' | 'Hotel' | 'Food' | 'Transport' | 'Activity' | 'Other';

interface SplitEntry {
  user: mongoose.Types.ObjectId;
  amount: number;
}

export interface ExpenseDocument extends Document {
  title: string;
  description?: string;
  trip: mongoose.Types.ObjectId;
  date: Date;
  amount: number;
  category: ExpenseCategory;
  paidBy: mongoose.Types.ObjectId;
  splitBetween: mongoose.Types.ObjectId[];
  splits: SplitEntry[];
  isSettled?: boolean;
  settledAt?: Date;
  settlementId?: mongoose.Types.ObjectId; // New field added
  attachments?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const splitEntrySchema = new Schema<SplitEntry>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
  },
  { _id: false }
);

const expenseSchema = new Schema<ExpenseDocument>(
  {
    title: { type: String, required: true },
    description: { type: String },
    trip: { type: Schema.Types.ObjectId, ref: 'Trip', required: true },
    date: { type: Date, required: true },
    amount: { type: Number, required: true },
    category: {
      type: String,
      enum: ['Flight', 'Hotel', 'Food', 'Transport', 'Activity', 'Other'],
      required: true,
    },
    paidBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    splitBetween: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
    splits: { type: [splitEntrySchema], required: true },
    isSettled: { type: Boolean, default: false },
    settledAt: { type: Date },

    //Newly added: Link to Settlement model
    settlementId: { type: Schema.Types.ObjectId, ref: 'Settlement' },

    attachments: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model<ExpenseDocument>('Expense', expenseSchema);


