import { useState } from 'react';

import { AxiosError, AxiosResponse } from 'axios';

interface CreateState<T> {
  data: T | null;
  loading: boolean;
  error: GenericErrors | null;
  success: boolean;
}

interface AxiosErrorResponse {
  errors?: GenericErrors;
  message?: string | string[];
}

const useCreateData = <T = unknown, V = unknown>(requestFn: (payload: V) => Promise<AxiosResponse<T, AxiosErrorResponse>>, defaultPayload?: V) => {
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
      let parsedError: GenericErrors = { general: 'Something went wrong' };

      if ((error as AxiosError<AxiosErrorResponse>).isAxiosError) {
        const axiosError = error as AxiosError<AxiosErrorResponse>;
        const data = axiosError.response?.data;

        if (data) {
          if (data.errors) {
            parsedError = data.errors;
          } else if (data.message) {
            parsedError = { general: Array.isArray(data.message) ? data.message.join(', ') : data.message };
          }
        } else {
          parsedError = { general: axiosError.message };
        }
      } else if (error instanceof Error) {
        parsedError = { general: error.message };
      }

      setState({ data: null, loading: false, error: parsedError, success: false });
      throw error;
    }
  };

  return { ...state, createItem };
};

export default useCreateData;
