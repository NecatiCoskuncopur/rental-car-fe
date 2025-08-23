import api from '../axiosInstance';

const getTopUsers = async () => {
  const response = await api.get('/summary/topUsers');
  return response.data;
};

export default getTopUsers;
