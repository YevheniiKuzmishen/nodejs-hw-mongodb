import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { env } from './utils/env.js';
import { contactsRouter } from './routers/contacts.js';
// import * as contactServices from './services/contacts.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

export const setupServer = () => {
  const app = express();

  const logger = pino({
    transport: {
      target: 'pino-pretty',
    },
  });

  app.use(logger);
  app.use(cors());
  app.use(express.json());

  app.use(contactsRouter);

  // app.get('/contacts', async (req, res) => {
  //   const data = await contactServices.getAllContacts();

  //   res.json({
  //     status: 200,
  //     message: 'Successfully found contacts',
  //     data,
  //   });
  // });

  // app.get('/contacts/:id', async (req, res) => {
  //   const { id } = req.params;
  //   const data = await contactServices.getContactById(id);

  //   if (!data) {
  //     return res.status(404).json({
  //       message: `Contact with ID ${id} not found`,
  //     });
  //   }

  //   res.json({
  //     status: 200,
  //     message: `Contact with ${id} successfully find`,
  //     data,
  //   });
  // });

  app.use('*', notFoundHandler);

  app.use(errorHandler);

  // app.use((req, res) => {
  //   res.status(404).json({
  //     message: `${req.url} not found`,
  //   });
  // });

  // app.use((error, req, res, next) => {
  //   res.status(500).json({
  //     message: error.message,
  //   });
  // });

  const port = Number(env('PORT', 3000));

  app.listen(port, () => console.log(`'Server is running on port ${port}'`));
};
