import api from '../axiosInstance';

const getPosts = async (pagination?: IPaginationData) => {
  const params = new URLSearchParams();

  if (pagination?.page) params.append('page', pagination.page);
  if (pagination?.limit) params.append('limit', pagination.limit);
  if (pagination?.order) params.append('order', pagination.order);

  const response = await api.get(`/post/getPosts?${params.toString()}`);
  return response.data;
};

export default getPosts;
