import api from '../axiosInstance';

const register = async (userData: { name: string; surname: string; dateOfBirth: string; email: string; password: string }) => {
  return api.post('/auth/register', userData);
};

export default register;
