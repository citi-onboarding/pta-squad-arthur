import api from './api';

export interface ConsultationData {
  id: string;
  doctorName: string;
  description: string;
  type: string;
  datetime: string; 
  patientId: string;
  
  patient?: {
    name: string;
    tutorName: string;
    species: string;
  };
}

export const getAllConsultations = async (): Promise<ConsultationData[]> => {
  try {
    const response = await api.get('/consultation');
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar consultas:", error);
    throw error;
  }
};