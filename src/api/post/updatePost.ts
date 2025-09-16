import api from '../axiosInstance';

const updatePost = async ({ postId, ...rest }: IUpdatePostPayload) => {
  const response = await api.patch(`/post/updatePost/${postId}`, rest);
  return response.data;
};

export default updatePost;
