import { useState } from 'react';

import { AxiosError } from 'axios';

interface DeleteState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

const useDeleteData = <T = unknown>(deleteFn: () => Promise<T>) => {
  const [state, setState] = useState<DeleteState>({
    loading: false,
    error: null,
    success: false,
  });

  const deleteItem = async () => {
    setState({ loading: true, error: null, success: false });

    try {
      await deleteFn();
      setState({ loading: false, error: null, success: true });
    } catch (error) {
      let message = 'Something went wrong';

      if ((error as AxiosError).isAxiosError) {
        const axiosError = error as AxiosError<{ message?: string }>;
        message = axiosError.response?.data?.message || axiosError.message;
      } else if (error instanceof Error) {
        message = error.message;
      }

      setState({ loading: false, error: message, success: false });
    }
  };

  return { state, deleteItem };
};

export default useDeleteData;
