import { useState, useCallback } from 'react';

import Recipe from '../model/Recipe';

interface Config {
  url: string;
  method: string;
  headers: { 'Content-Type': string };
  body: string;
}

const useUploadData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requestConfig: Config) => {
    setIsLoading(true);
    setError(null);
    try {
      const postMethod = {
        method: requestConfig.method,
        headers: requestConfig.headers,
        body: JSON.stringify(requestConfig.body),
      };

      const response = await fetch(requestConfig.url, postMethod);

      if (!response.ok) throw new Error('Send request failed!');
      setIsLoading(false);
    } catch (err: any) {
      setError(err.message || 'Something went wrong!');
    }
  }, []);

  return { isLoading, error, sendRequest };
};

export default useUploadData;
