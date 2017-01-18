export const extractError = (transaction) => {
  const error = transaction.getError();
  const errorInfo = (error && error.source) ? error.source.errors[0].info : null;
  return errorInfo;
};
