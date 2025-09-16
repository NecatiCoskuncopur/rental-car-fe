import api from '../axiosInstance';

type UserStatsRange = 'day' | 'week' | 'month' | 'year';

const getNewUserStats = async (range: UserStatsRange = 'day') => {
  const response = await api.get(`/summary/newUsers?range=${range}`);
  return response.data;
};

export default getNewUserStats;
