import mongoose, { Schema, Document, Model } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  image?: string;
  roles: ('admin' | 'editor' | 'viewer')[];
  provider?: 'credentials' | 'google' | 'github';
  comparePassword(candidatePassword: string): Promise<boolean>;
  settlementsSent: mongoose.Types.ObjectId[];
  settlementsReceived: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: function () {
        return this.provider === 'credentials';
      },
      minlength: 6,
    },

    image: {
      type: String,
    },

    roles: {
      type: [String],
      enum: ['admin', 'editor', 'viewer'],
      default: ['viewer'],
    },

    provider: {
      type: String,
      enum: ['credentials', 'google', 'github'],
      default: 'credentials',
    },

    settlementsSent: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Settlement',
      },
    ],

    settlementsReceived: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Settlement',
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to hash password
UserSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password!, salt);
    next();
  } catch (err) {
    next(err as Error);
  }
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password!);
};

// Prevent model overwrite error in dev
export const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);


