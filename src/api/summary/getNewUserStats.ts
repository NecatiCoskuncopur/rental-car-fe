import api from '../axiosInstance';

type UserStatsRange = 'day' | 'week' | 'month';

const getNewUserStats = async (range: UserStatsRange = 'day'): Promise<INewUserStatsResponse> => {
  const response = await api.get(`/summary/newUsers?range=${range}`);
  return response.data;
};

export default getNewUserStats;
