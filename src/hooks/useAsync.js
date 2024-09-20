import { useCallback } from 'react';
import { useSetError } from '../contexts/ErrorContext.jsx';
import { useSetPending } from '../contexts/PendingContext.jsx';

function useAsync(asyncFunc) {
  const setPending = useSetPending();
  const setErr = useSetError();

  const wrappedFunc = useCallback(
    async (...params) => {
      try {
        setPending(true);
        setErr(null);
        return await asyncFunc(...params);
      } catch (error) {
        console.error(error);
        setErr(error);
        return;
      } finally {
        setPending(false);
      }
    },
    [asyncFunc, setPending, setErr]
  );

  return wrappedFunc;
}

export default useAsync;
