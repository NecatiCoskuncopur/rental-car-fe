import api from '../axiosInstance';

const getSlugs = async () => {
  const response = await api.get('/post/getSlugs');
  return response.data;
};

export default getSlugs;
