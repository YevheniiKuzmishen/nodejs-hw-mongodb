import { Schema, model } from 'mongoose';

import { contactTypeEnum } from '../../constans/contacts.js';

const contactShema = new Schema(
  {
    name: {
      type: String,
      required: true,
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

export const ContactCollection = model('contacts', contactShema);
