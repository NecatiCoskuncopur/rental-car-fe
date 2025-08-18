import { useEffect, useState } from 'react';

import { AxiosError } from 'axios';

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

const useFetchData = <T = unknown>(requestFn: () => Promise<T>) => {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const fetchData = async () => {
    setState({ data: null, loading: true, error: null });

    try {
      const result = await requestFn();
      setState({ data: result, loading: false, error: null });
    } catch (error) {
      let message = 'Something went wrong';

      if ((error as AxiosError).isAxiosError) {
        const axiosError = error as AxiosError<{ message?: string }>;
        message = axiosError.response?.data?.message || axiosError.message;
      } else if (error instanceof Error) {
        message = error.message;
      }

      setState({ data: null, loading: false, error: message });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { ...state, refetch: fetchData };
};

export default useFetchData;
