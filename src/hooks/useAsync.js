import { useCallback, useState } from 'react';

function useAsync(asyncFunc) {
  const [pending, setPending] = useState(false);
  const [err, setErr] = useState(null);

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
    [asyncFunc]
  );

  return [pending, err, wrappedFunc];
}

export default useAsync;
