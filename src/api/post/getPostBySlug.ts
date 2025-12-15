import api from '../axiosInstance';

const getPostBySlug = async (slug: string) => {
  try {
    const response = await api.get(`/post/getPost/${slug}`);
    return response.data;
  } catch (error) {
    console.error(`getPostBySlug failed for slug: ${slug}`, error);
    return null;
  }
};

export default getPostBySlug;
