import { useCallback, useState } from 'react';

type TAsyncFunction = (...args: unknown[]) => Promise<unknown>;

function useAsync(asyncFunc: TAsyncFunction) {
	const [pending, setPending] = useState(false);
	const [error, setError] = useState<null | Error>(null);

	const wrappedAsyncFunc = useCallback(async (...args: unknown[]) => {
		try {
			setError(null);
			setPending(true);
			return await asyncFunc(...args);
		} catch (err: unknown) {
			console.error(err);
			if (err instanceof Error) {
				setError(err);
				return;
			}
		} finally {
			setPending(false);
		}
	}, [asyncFunc]);

	return [pending, error, wrappedAsyncFunc, setError];
}

export default useAsync;
