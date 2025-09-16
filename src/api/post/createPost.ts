import api from '../axiosInstance';

const createPost = async (postData: { title: string; content: string; image: string }) => {
  return api.post('/post/createPost', postData);
};

export default createPost;
