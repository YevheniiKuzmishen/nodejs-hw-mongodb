import Joi from 'joi';
import { contactTypeEnum } from '../constans/contacts.js';
import { stringValidation } from '../constans/contacts.js';

export const contactAddSchema = Joi.object({
  name: stringValidation.required(),
  phoneNumber: stringValidation.required(),
  email: stringValidation.email(),
  isFavourite: Joi.boolean().required().default(false),
  contactType: stringValidation
    .valid(...contactTypeEnum)
    .required()
    .default('personal'),
});

export const contactPatchSchema = Joi.object({
  name: stringValidation,
  phoneNumber: stringValidation,
  email: stringValidation.email(),
  isFavourite: Joi.boolean().default(false),
  contactType: stringValidation.valid(...contactTypeEnum).default('personal'),
});
