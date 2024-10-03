import { Router } from 'express';

import {
  getAllContactsController,
  getContactByIdController,
  addContactController,
  upsertContactController,
  patchContactController,
  deleteContactController,
} from '../controllers/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/uploads.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../utils/validateBody.js';
import {
  contactAddSchema,
  contactPatchSchema,
} from '../validation/contacts.js';

export const contactsRouter = Router();

contactsRouter.use(authenticate);

contactsRouter.get('/', ctrlWrapper(getAllContactsController));

contactsRouter.get('/:id', isValidId, ctrlWrapper(getContactByIdController));

contactsRouter.post(
  '/',
  upload.single('photo'),
  validateBody(contactAddSchema),
  ctrlWrapper(addContactController),
);

contactsRouter.put(
  '/:id',
  upload.single('photo'),
  isValidId,
  validateBody(contactAddSchema),
  ctrlWrapper(upsertContactController),
);

contactsRouter.patch(
  '/:id',
  upload.single('photo'),
  isValidId,
  validateBody(contactPatchSchema),
  ctrlWrapper(patchContactController),
);

contactsRouter.delete('/:id', isValidId, ctrlWrapper(deleteContactController));
