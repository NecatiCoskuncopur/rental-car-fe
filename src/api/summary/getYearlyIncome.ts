import api from '../axiosInstance';

const getYearlyIncome = async () => {
  const response = await api.get('/summary/yearlyIncome');
  return response.data;
};

export default getYearlyIncome;
