import mongoose, { Schema, Document, Types } from 'mongoose';
import Expense from './Expense'; // Ensure Expense model exists and is correct

interface ISettlementDetail {
  payer: Types.ObjectId;
  receiver: Types.ObjectId;
  amount: number;
  status: 'pending' | 'settled';
  paidAt?: Date;
}

export interface ISettlement extends Document {
  trip: Types.ObjectId;
  createdBy: Types.ObjectId;
  title?: string;
  description?: string;
  involvedUsers: Types.ObjectId[];
  expenses: Types.ObjectId[];
  totalAmount: number;
  settlementDetails: ISettlementDetail[];
  attachments?: string[];
  method?: 'UPI' | 'Cash' | 'Bank Transfer' | 'Other';
  note?: string;
  date?: Date;
  isFullySettled?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const settlementDetailSchema = new Schema<ISettlementDetail>(
  {
    payer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    receiver: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'settled'], default: 'pending' },
    paidAt: { type: Date },
  },
  { _id: false }
);

const settlementSchema = new Schema<ISettlement>(
  {
    trip: { type: Schema.Types.ObjectId, ref: 'Trip', required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String },
    description: { type: String },
    involvedUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    expenses: [{ type: Schema.Types.ObjectId, ref: 'Expense' }],
    totalAmount: { type: Number, required: true },
    settlementDetails: [settlementDetailSchema],
    attachments: [{ type: String }],
    method: {
      type: String,
      enum: ['UPI', 'Cash', 'Bank Transfer', 'Other'],
      default: 'Other',
    },
    note: { type: String },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// ✅ Virtual: isFullySettled
settlementSchema.virtual('isFullySettled').get(function (this: ISettlement) {
  if (!this.settlementDetails || this.settlementDetails.length === 0) return false;
  return this.settlementDetails.every(detail => detail.status === 'settled');
});

// ✅ Include virtuals in JSON/API output
settlementSchema.set('toJSON', { virtuals: true });
settlementSchema.set('toObject', { virtuals: true });

// ✅ Auto-calculate totalAmount before save
settlementSchema.pre('save', async function (next) {
  try {
    const settlement = this as ISettlement;

    if (!settlement.expenses || settlement.expenses.length === 0) {
      settlement.totalAmount = 0;
      return next();
    }

    const expenses = await Expense.find(
      { _id: { $in: settlement.expenses } },
      'amount'
    ).lean();

    if (!expenses || expenses.length !== settlement.expenses.length) {
      return next(new Error('One or more expenses are invalid or missing.'));
    }

    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    settlement.totalAmount = total;

    next();
  } catch (error: unknown) {
    if (error instanceof Error) next(error);
    else next(new Error('Unknown error in pre-save middleware'));
  }
});

// ✅ Auto-calculate totalAmount before findOneAndUpdate
settlementSchema.pre('findOneAndUpdate', async function (next) {
  try {
    const update = this.getUpdate() as Partial<ISettlement>;

    if (!update.expenses || update.expenses.length === 0) return next();

    const expenses = await Expense.find(
      { _id: { $in: update.expenses } },
      'amount'
    ).lean();

    if (!expenses || expenses.length !== update.expenses.length) {
      return next(new Error('One or more expenses are invalid or missing.'));
    }

    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    this.setUpdate({ ...update, totalAmount: total });

    next();
  } catch (error: unknown) {
    if (error instanceof Error) next(error);
    else next(new Error('Unknown error in pre-update middleware'));
  }
});

export default mongoose.models.Settlement ||
  mongoose.model<ISettlement>('Settlement', settlementSchema);


