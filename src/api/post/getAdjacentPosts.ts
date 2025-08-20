import api from '../axiosInstance';

const getAdjacentPosts = async (slug: string) => {
  const response = await api.get(`/post/getAdjacentPosts/${slug}`);
  return response.data;
};

export default getAdjacentPosts;
