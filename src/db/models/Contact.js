import { Schema, model } from 'mongoose';

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

contactSchema.post('save', (error, doc, next) => {
  error.status = 400;
  next();
});

export const ContactCollection = model('contacts', contactSchema);
