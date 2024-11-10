import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useSetError } from '@contexts/ErrorProvider';
import { useSetPending } from '@contexts/PendingProvider';

/**
 * useMutation Wrapper Function
 *
 * @param {{ mutationFn: Function; invalidQueryKey?: string[]; onSuccess?: Function; }}
 */
export default function useOwnMutation({ mutationFn, invalidQueryKey, onSuccess }) {
  const queryClient = useQueryClient();
  const setPending = useSetPending();
  const setErr = useSetError();

  const mutation = useMutation({
    mutationFn,
    onError: error => setErr(error),
    onSuccess: (data, variables, context) => {
      onSuccess && onSuccess(data, variables, context);
      invalidQueryKey && queryClient.invalidateQueries(invalidQueryKey);
    },
  });

  useEffect(() => setPending(mutation.isPending), [mutation.isPending]);

  return mutation;
}
