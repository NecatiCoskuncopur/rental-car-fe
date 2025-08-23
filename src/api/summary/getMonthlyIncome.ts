import api from '../axiosInstance';

const getMonthlyIncome = async () => {
  const response = await api.get('/summary/montlyIncome');
  return response.data;
};

export default getMonthlyIncome;
