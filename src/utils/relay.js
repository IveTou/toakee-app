import { showToast } from '~/src/components/snackbar';
import { errorFromKey } from '~/src/utils/form';

export const extractError = (transaction) => {
  const error = transaction.getError();
  const errorInfo = (error && error.source) ? error.source.errors[0].message : null;
  return errorInfo;
};

export const toastTransactionError = (transaction) => {
  showToast(errorFromKey(extractError(transaction)));
};

export const toastErrorOr = onSuccess => ({
  onFailure: toastTransactionError,
  onSuccess,
});
