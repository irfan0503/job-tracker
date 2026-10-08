function notFoundMiddleware(req, res, next) {
  const error = new Error(`Route not found: ${req.method} ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
}

function errorMiddleware(error, req, res, next) {
  let statusCode = error.statusCode || 500;
  let message = statusCode === 500 ? 'An unexpected server error occurred.' : error.message;

  if (error.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(error.errors).map((item) => item.message).join(' ');
  } else if (error.name === 'CastError' || error.name === 'BSONError') {
    statusCode = 400;
    message = 'Invalid resource ID or field value.';
  } else if (error.code === 11000) {
    statusCode = 400;
    message = 'A record with that value already exists.';
  } else if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
    statusCode = 400;
    message = 'Request body contains invalid JSON.';
  }

  if (statusCode >= 500) {
    console.error('Request failed:', error.name || 'Error');
  }

  res.status(statusCode).json({ success: false, message });
}

module.exports = { notFoundMiddleware, errorMiddleware };
