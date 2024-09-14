import { useState } from 'react';

function useAsync(asyncFunc) {
	const [pending, setPending] = useState(false);
	const [error, setError] = useState(null);

	const wrappedAsyncFunc = async (...args) => {
		try {
			setError(null);
			setPending(true);
			return await asyncFunc(...args);
		} catch (err) {
			setError(err);
			return; // undefined
		} finally {
			setPending(false);
		}
	}

	return [pending, error, wrappedAsyncFunc, setError];
}

export default useAsync;
