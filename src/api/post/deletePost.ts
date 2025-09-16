import api from '../axiosInstance';

const deletePost = async (id: string) => {
  const response = await api.delete(`/post/deletePost/${id}`);
  return response.data;
};

export default deletePost;
