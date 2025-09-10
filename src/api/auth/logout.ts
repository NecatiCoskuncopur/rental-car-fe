import api from '../axiosInstance';

const logout = async () => {
  return api.get('/auth/logout');
};

export default logout;
