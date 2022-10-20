import { useState, useCallback } from 'react';

const useSearchQuery = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | string>(null);

  const fetchData = useCallback(async (url: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(url);

      if (!response.ok) throw new Error('Request failed!');

      const data = await response.json();

      setIsLoading(false);

      return data;
    } catch (err: any) {
      setIsLoading(false);
      setError(err.message || 'Something went wrong!');
    }
  }, []);

  return { isLoading, error, fetchData };
};

export default useSearchQuery;
