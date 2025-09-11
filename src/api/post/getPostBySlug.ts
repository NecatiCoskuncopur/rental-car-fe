import api from '../axiosInstance';

const getPostBySlug = async (slug: string) => {
  const response = await api.get(`/post/getPost/${slug}`);
  return response.data;
};

export default getPostBySlug;
