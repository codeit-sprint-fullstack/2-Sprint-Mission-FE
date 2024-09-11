import { useState, useEffect } from 'react';

export default function useQuery(asyncFunction) {
  const [data, setData] = useState(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    setPending(true);
    asyncFunction()
      .then((data) => {
        if (isMounted) setData(data);
      })
      .catch((err) => {
        if (isMounted) setError(err);
      })
      .finally(() => {
        if (isMounted) setPending(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return [data, pending, error];
}
