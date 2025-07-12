import api from './index';

export const getPatient = async (patientId) => {
  const response = await api.get(`/patients`);
  return response.data;
};