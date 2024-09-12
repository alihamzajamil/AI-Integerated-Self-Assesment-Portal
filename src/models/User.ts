import { Schema, Document, model, models } from 'mongoose';

export interface IUser extends Document {
  fullName: string;
  userName: string;
  email: string;
  password: string;
  refreshToken?: string;
  educationLevel: string;
  role: 'user' | 'admin';
}

const userSchema: Schema<IUser> = new Schema<IUser>({
  fullName: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  refreshToken: {
    type: String,
    default: null
  },
  educationLevel: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
 
}, {
  timestamps: true
});

export const User = models.User || model<IUser>('User', userSchema);
