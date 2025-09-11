import api from '../axiosInstance';

const getPosts = async (pagination?: IPaginationQueryParams) => {
  const params = new URLSearchParams();

  if (pagination) {
    Object.entries(pagination).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, value.toString());
      }
    });
  }

  const response = await api.get(`/post/getPosts?${params.toString()}`);
  return response.data;
};

export default getPosts;
