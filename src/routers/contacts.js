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
import { validateBody } from '../utils/validateBody.js';
import {
  contactAddSchema,
  contactPatchSchema,
} from '../validation/contacts.js';

export const contactsRouter = Router();

contactsRouter.get('/contacts', ctrlWrapper(getAllContactsController));

contactsRouter.get('/contacts/:id', ctrlWrapper(getContactByIdController));

contactsRouter.post(
  '/contacts',
  validateBody(contactAddSchema),
  ctrlWrapper(addContactController),
);

contactsRouter.put(
  '/contacts/:id',
  validateBody(contactAddSchema),
  ctrlWrapper(upsertContactController),
);

contactsRouter.patch(
  '/contacts/:id',
  validateBody(contactPatchSchema),
  ctrlWrapper(patchContactController),
);

contactsRouter.delete('/contacts/:id', ctrlWrapper(deleteContactController));
