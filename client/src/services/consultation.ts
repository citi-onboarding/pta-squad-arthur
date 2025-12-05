import { data } from "autoprefixer";
import api from "./api";
import { AxiosResponse } from "axios";
import type { Patient, Patients } from "./patient";
/*

model Consultation {
  id            String   @id @default(uuid())
  doctorName    String
  description   String
  type          String
  datetime      DateTime

  patientId     String

  patient       Patient  @relation(fields: [patientId], references: [id])
}


*/

export interface CreatingTheConsultationData {
  doctorName: string;
  description: string;
  type: string;
  datetime: string;
  patientId: string;
}

export interface Consultation {
  id: string;
  doctorName: string;
  description: string;
  type: string;
  datetime: string;
  patientId: string;
}

// interface utilizado na criação do registro da pagina principal de registro, acima é o utilizado no modal de NovaConsultaModal
export interface ConsultationData {
  id: string;
  doctorName: string;
  type: string;
  description: string;
  datetime: string;
  patientId: string;
  patient: Patients;
}

export interface ConsultationCreate {
  doctorName: string;
  type: string;
  description: string;
  datetime: string;
  patientId: string;
}

export const getAllConsultations = async (): Promise<ConsultationData[]> => {
  try {
    const response = await api.get<ConsultationData[]>("/consultation");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar consultas:", error);
    return [];
  }
};

export const createConsultation = async (data: ConsultationCreate) => {
  try {
    const response = await api.post("/consultation", data);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar consulta:", error);
    throw error;
  }
};

export const consultationServices = {
  getAllConsultations: getAllConsultations,
  create: createConsultation,
};

// abaixo é utilizado no modal de novaconsulta

// Função auxiliar para garantir que a data seja um objeto Date para comparação
const parseDate = (dateTime: string) => new Date(dateTime);

export const consultationService = {
  async createConsultation(data: CreatingTheConsultationData) {
    try {
      const res = await api.post("/consultation", data); // Aqui pegamos as rotas definidas no backend e passamos para a api
      return res.data;
    } catch (error) {
      console.log("Error trying to create consultation: ", error);
    }
  },

  async getConsultationById(ConsultationId: string): Promise<Consultation> {
    try {
      const res = await api.get(`/consultation/${ConsultationId}`);
      return res.data;
    } catch (error) {
      console.log("Error tryingto find consultation: ", error);
      throw error;
    }
  },

  async getAllConsulationsByPatientId(
    patientId: string
  ): Promise<Consultation[]> {
    try {
      const res = await api.get(`/consultation/patient/${patientId}`);
      return res.data.consultations;
    } catch (error) {
      console.log("Error trying find the patient consultations: ", error);
      throw error;
    }
  },

  async getPrevsConsultation(
    patientId: string,
    currentConsultation: Consultation
  ): Promise<Consultation[]> {
    try {
      const allConsultations: Consultation[] =
        await this.getAllConsulationsByPatientId(patientId);

      const curretentDatetime = parseDate(currentConsultation.datetime);

      const previousConsultations = allConsultations.filter((consultation) => {
        if (consultation.id === currentConsultation.id) {
          return false;
        }

        const consultationDateTime = parseDate(consultation.datetime);
        return consultationDateTime <= curretentDatetime;
      });

      const sortedPreviousConsultations = previousConsultations.sort((a, b) => {
        const dateA = parseDate(a.datetime);
        const dateB = parseDate(b.datetime);

        return dateB.getTime() - dateA.getTime();
      });

      const latestFourPrevs = sortedPreviousConsultations.slice(0, 4);

      return latestFourPrevs;
    } catch (error) {
      console.error("Error trying to get previous consultations:", error);
      return [];
    }
  },
};
