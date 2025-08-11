import api from '../axiosInstance';

const login = async (loginData: { email: string; password: string }) => {
  const response = await api.post('/auth/login', loginData);
  return response.data;
};

export default login;
