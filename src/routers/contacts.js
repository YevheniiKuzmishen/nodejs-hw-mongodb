import { Router } from 'express';

import {
  getAllContactsController,
  getContactByIdController,
  addContactController,
  upsertContactController,
} from '../controllers/contacts.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';

export const contactsRouter = Router();

contactsRouter.get('/contacts', ctrlWrapper(getAllContactsController));

contactsRouter.get('/contacts/:id', ctrlWrapper(getContactByIdController));

contactsRouter.post('/contacts', ctrlWrapper(addContactController));

contactsRouter.put('/contacts/:id', ctrlWrapper(upsertContactController));
