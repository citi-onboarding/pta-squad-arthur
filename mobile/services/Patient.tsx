import api from "./api";

export interface patient {
    name: string;
    tutorName: string;
    species: string;
};

export const getSpeciesByPatientId = async (patientId: string): Promise<string> => {
    try {
        const response = await api.get(`/patient/${patientId}`);
        return response.data.species;
    } catch (error) {
        console.error("Erro ao buscar espécie do paciente:", error);
        throw error;
    }
}