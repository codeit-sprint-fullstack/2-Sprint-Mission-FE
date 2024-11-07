import { useCallback } from 'react';
import { useSetError } from '@contexts/ErrorProvider';
import { useSetPending } from '@contexts/PendingProvider';

export default function useAsync(asyncFunc) {
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
        return null;
      } finally {
        setPending(false);
      }
    },
    [asyncFunc, setPending, setErr],
  );

  return wrappedFunc;
}
