import api from '../axiosInstance';

const getCurrentUser = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};

export default getCurrentUser;
