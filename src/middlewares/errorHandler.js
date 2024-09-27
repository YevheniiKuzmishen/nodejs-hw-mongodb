import { HttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  const status = err instanceof HttpError ? err.status : 500;
  const message = err.message || 'Internal Server Error';

  console.error('Error Stack:', err.stack);
  console.error('Full Error Details:', err);

  res.status(status).json({
    status,
    message: err.name || 'Error',
    stack: err.stack,
    error: err,
  });
};
