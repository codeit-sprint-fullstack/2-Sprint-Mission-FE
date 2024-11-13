import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useSetError } from '@contexts/ErrorProvider';
import { useSetPending } from '@contexts/PendingProvider';

/**
 * useQuery Wrapper Function
 *
 * @param {{ queryFn: Function; queryKey: string[]; onSuccess?: Function; enabled?: boolean; }}
 */
export default function useOwnQuery({ queryFn, queryKey, onSuccess, enabled = true }) {
  const isValidKey = Array.isArray(queryKey) && queryKey.every(key => key !== undefined && key !== null);

  const setPending = useSetPending();
  const setErr = useSetError();

  const query = useQuery({
    queryFn,
    queryKey: isValidKey ? queryKey : ['invalid-key'],
    enabled: enabled && isValidKey,
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (isValidKey) {
      setPending(query.isPending);
      if (query.isError) setErr(query.error);
      if (query.isSuccess && onSuccess) onSuccess(query.data);
    }
  }, [query.isError, query.isPending, query.isSuccess, query.data]);

  return query;
}
