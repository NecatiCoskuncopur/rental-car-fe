import { useState } from 'react';

import { AxiosError, AxiosResponse } from 'axios';

interface CreateState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const useCreateData = <T = unknown, V = unknown>(requestFn: (payload: V) => Promise<AxiosResponse<T>>, defaultPayload?: V) => {
  const [state, setState] = useState<CreateState<T>>({
    data: null,
    loading: false,
    error: null,
    success: false,
  });

  const createItem = async (payload?: V) => {
    setState({ data: null, loading: true, error: null, success: false });

    try {
      const response = await requestFn((payload ?? defaultPayload)!);
      setState({ data: response.data, loading: false, error: null, success: true });
      return response.data;
    } catch (error) {
      let message = 'Something went wrong';

      if ((error as AxiosError).isAxiosError) {
        const axiosError = error as AxiosError<{ message?: string }>;
        message = axiosError.response?.data?.message || axiosError.message;
      } else if (error instanceof Error) {
        message = error.message;
      }

      setState({ data: null, loading: false, error: message, success: false });
      throw error;
    }
  };

  return { ...state, createItem };
};

export default useCreateData;
