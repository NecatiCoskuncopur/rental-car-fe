import { useState } from 'react';

import { AxiosError } from 'axios';

interface MutationState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

const useUpdateData = <T = unknown, V = unknown>(requestFn: (variables: V) => Promise<T>) => {
  const [state, setState] = useState<MutationState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const mutate = async (variables: V) => {
    setState({ data: null, loading: true, error: null });

    try {
      const result = await requestFn(variables);
      setState({ data: result, loading: false, error: null });
      return result;
    } catch (error) {
      let message = 'Something went wrong';

      if ((error as AxiosError).isAxiosError) {
        const axiosError = error as AxiosError<{ message?: string }>;
        message = axiosError.response?.data?.message || axiosError.message;
      } else if (error instanceof Error) {
        message = error.message;
      }

      setState({ data: null, loading: false, error: message });
      throw error;
    }
  };

  return { ...state, mutate };
};

export default useUpdateData;
