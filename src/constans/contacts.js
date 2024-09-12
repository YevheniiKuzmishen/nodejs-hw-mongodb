import Joi from 'joi';

export const contactTypeEnum = ['work', 'home', 'personal'];
export const stringValidation = Joi.string().min(3).max(30);
