import { useEffect, useState } from 'react';

import { AxiosError } from 'axios';

import { getCurrentUser } from '@/api';

interface UseCurrentUserResult {
  user: IUser | null;
  loading: boolean;
  error: AxiosError | null;
}

const useCurrentUser = (): UseCurrentUserResult => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AxiosError | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchUser = async () => {
      try {
        const data = await getCurrentUser();
        if (isMounted) setUser(data);
      } catch (err) {
        if (err instanceof AxiosError) {
          if (err.response?.status === 401) {
            if (isMounted) setUser(null);
          } else {
            if (isMounted) setError(err);
          }
        } else {
          console.error('Unexpected Error', err);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchUser();

    return () => {
      isMounted = false;
    };
  }, []);

  return { user, loading, error };
};

export default useCurrentUser;
