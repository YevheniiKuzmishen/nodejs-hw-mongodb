import Joi from 'joi';
import { contactTypeEnum } from '../constans/contacts.js';

export const contactAddShema = Joi.object({
  name: Joi.string().required(),
  phoneNumber: Joi.string().required(),
  emmail: Joi.string(),
  isFavourite: Joi.boolean().required(),
  contactType: Joi.string()
    .valid(...contactTypeEnum)
    .required(),
});
