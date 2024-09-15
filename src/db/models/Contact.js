import { Schema, model } from 'mongoose';
import { handleSaveError, setUpdateOptions } from './hooks.js';
import { contactTypeEnum } from '../../constans/contacts.js';

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'name must be exist'],
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: String,
    isFavourite: {
      type: Boolean,
      default: false,
      required: true,
    },
    contactType: {
      type: String,
      enum: contactTypeEnum,
      required: true,
      default: 'personal',
    },
  },
  { timestamps: true, versionKey: false },
);

contactSchema.post('save', handleSaveError);

contactSchema.pre('findOneAndUpdate', setUpdateOptions);

contactSchema.post('findOneAndUpdate', handleSaveError);

export const sortFields = [
  'name',
  'phoneNumber',
  'email',
  'isFavourite',
  'contactType',
  'createdAt',
  'updatedAt',
];

export const ContactCollection = model('contacts', contactSchema);
