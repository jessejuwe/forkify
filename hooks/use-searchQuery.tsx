import { useState, useCallback } from 'react';

import Recipe from '../model/Recipe';

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
      setError(err.message || 'Something went wrong!');
    }
  }, []);

  return { isLoading, error, fetchData };
};

export default useSearchQuery;
