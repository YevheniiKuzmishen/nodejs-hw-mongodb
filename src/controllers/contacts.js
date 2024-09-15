import {
  createContact,
  deleteContact,
  getContacts,
  getContactById,
  uptadeContact,
} from '../services/contacts.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { sortFields } from '../db/models/Contact.js';
import { parseContactsFiltersParams } from '../utils/filters/parseContactsFiltersParams.js';

export const getAllContactsController = async (req, res) => {
  const { perPage, page } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams({ ...req.query, sortFields });
  const filter = parseContactsFiltersParams(req.query);

  const data = await getContacts({ perPage, page, sortBy, sortOrder, filter });

  res.json({
    status: 200,
    message: 'Successfully found contacts',
    data,
  });
};

export const getContactByIdController = async (req, res, next) => {
  const { id } = req.params;
  const data = await getContactById(id);

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
  const data = await createContact(req.body);
  res.status(201).json({
    status: 201,
    message: 'Contact add successfully',
    data,
  });
};

export const upsertContactController = async (req, res) => {
  const { id } = req.params;
  const { isNew, data } = await uptadeContact({ _id: id }, req.body, {
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
  const result = await uptadeContact({ _id: id }, req.body);

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
  const data = await deleteContact({ _id: id });

  if (!data) {
    throw createHttpError(404, `Contact with ID ${id} not found`);
  }

  res.status(204).send();
};
