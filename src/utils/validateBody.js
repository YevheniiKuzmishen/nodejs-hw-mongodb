import createHttpError from 'http-errors';

export const validateBody = (contactAddSchema) => {
  const foo = async (req, res, next) => {
    try {
      await contactAddSchema.validateAsync(req.body, { abortEarly: false });
      next();
    } catch (error) {
      const validateError = createHttpError(400, error.message);
      next(validateError);
    }
  };

  return foo;
};
