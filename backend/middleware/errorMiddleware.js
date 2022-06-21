/**
 * Middleware function used to handle the error response from MongoDB.
 *
 *
 * @param {object} err The error itself
 * @param {object} req The request object.
 * @param {object} res The response object.
 * @param {*} next
 */
export default function errorHandler(err, req, res, next) {
  const statusCode = res?.statusCode || 500;

  res.status(statusCode);

  res.json({
    message: err?.message,
    stack: process.env.NODE_ENV === 'production' ? null : err?.stack,
  });
}
