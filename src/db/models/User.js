import { Schema, model } from 'mongoose';
import { handleSaveError, setUpdateOptions } from './hooks.js';
import { emailRegexp } from '../../constans/users.js';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: emailRegexp,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);

userSchema.post('save', handleSaveError);

userSchema.pre('findOneAndUpdate', setUpdateOptions);

userSchema.post('findOneAndUpdate', handleSaveError);

export const UserCollection = model('user', userSchema);
