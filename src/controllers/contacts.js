import {
  createContact,
  deleteContact,
  getContacts,
  getContact,
  uptadeContact,
} from '../services/contacts.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { sortFields } from '../db/models/Contact.js';
import { parseContactsFiltersParams } from '../utils/filters/parseContactsFiltersParams.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { env } from '../utils/env.js';

const enableClaudinary = env('ENABLE_CLOUDINARY');

export const getAllContactsController = async (req, res) => {
  const { perPage, page } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams({ ...req.query, sortFields });
  const filter = parseContactsFiltersParams(req.query);

  const { _id: userId } = req.user;

  const data = await getContacts({
    perPage,
    page,
    sortBy,
    sortOrder,
    filter: { ...filter, userId },
  });

  res.json({
    status: 200,
    message: 'Successfully found contacts',
    data,
  });
};

export const getContactByIdController = async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;
  const data = await getContact({ _id: id, userId });

  if (!data) {
    throw createHttpError(404, `Contact with ID ${id} not found`);
  }

  res.json({
    status: 200,
    message: `Successfully found contact by id ${id}!`,
    data,
  });
};

export const addContactController = async (req, res) => {
  let photo;

  if (req.file) {
    if (enableClaudinary === 'true') {
      photo = await saveFileToCloudinary(req.file, 'photos');
    } else {
      photo = await saveFileToUploadDir(req.file);
    }
  }

  const { _id: userId } = req.user;
  const data = await createContact({ ...req.body, userId, photo });
  res.status(201).json({
    status: 201,
    message: 'Contact added successfully',
    data,
  });
};

export const upsertContactController = async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;
  const { isNew, data } = await uptadeContact({ _id: id, userId }, req.body, {
    upsert: true,
  });

  const status = isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: 'Contact upsert successfully',
    data,
  });
};

export const patchContactController = async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;
  const result = await uptadeContact({ _id: id, userId }, req.body);

  if (!result) {
    throw createHttpError(404, `Contact with ID ${id} not found`);
  }

  res.json({
    status: 200,
    message: `Contact by id ${id} patched successfully!`,
    data: result.data,
  });
};

export const deleteContactController = async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;
  const data = await deleteContact({ _id: id, userId });

  if (!data) {
    throw createHttpError(404, `Contact with ID ${id} not found`);
  }

  res.status(204).send();
};
