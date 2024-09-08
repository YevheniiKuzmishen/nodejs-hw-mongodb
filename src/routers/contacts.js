import { Router } from 'express';

import {
  getAllContactsController,
  getContactByIdController,
  addContactController,
  upsertContactController,
  patchContactController,
  deleteContactController,
} from '../controllers/contacts.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';

export const contactsRouter = Router();

contactsRouter.get('/contacts', ctrlWrapper(getAllContactsController));

contactsRouter.get('/contacts/:id', ctrlWrapper(getContactByIdController));

contactsRouter.post('/contacts', ctrlWrapper(addContactController));

contactsRouter.put('/contacts/:id', ctrlWrapper(upsertContactController));

contactsRouter.patch('/contacts/:id', ctrlWrapper(patchContactController));

contactsRouter.delete('/contacts/:id', ctrlWrapper(deleteContactController));
