import api from "./api";
import { Consultation } from "./consultation";
import { PetSpecies } from "@/components/service/AppointmentCard";

/*
model Patient {
  id          String   @id @default(uuid())
  name        String
  tutorName   String
  age         Int
  species     String
  consultations Consultation[]
}
*/

export interface Patient {
  id: string;
  name: string;
  tutorName: string;
  age: number;
  species: string;
  consultations: Consultation[];
}

export interface PatientInformations {
  id: string;
  name: string;
  tutorName: string;
  age: number;
  species: string;
}
// os export abaixo são os utilizados na criação do registro do paciente na pagina principal dos cards e na pagina principal de registro
export interface PatientCreate {
  name: string;
  tutorName: string;
  age: number;
  species: PetSpecies;
}

export interface Patients {
  id: string;
  name: string;
  tutorName: string;
  age: number;
  species: PetSpecies;
}

export const patientsService = {
  async create(data: PatientCreate): Promise<Patient> {
    const res = await api.post("/patient", data);
    return res.data;
  },

  async getAll(): Promise<Patients[]> {
    const res = await api.get("/patient");
    return res.data;
  },
};

// ate aqui

export const patientService = {
  async getPatientInfoById(patientId: string): Promise<PatientInformations> {
    // 1. Faz a requisição para a API
    const res = await api.get(`/patient/${patientId}`);

    // Assume que res.data tem o formato Patient do Interface Patient;
    const patientData = res.data as Patient;

    // Desestrutura o objeto patientData
    // consultations' recebe o valor do array de consultas
    // 'restOfPatient'  recebe  o restante das propriedades do objeto original (id, name, tutorName, age, species)
    // => sendo restOfPatient um objeto!!
    const { consultations, ...restOfPatient } = patientData;

    return restOfPatient;
  },
};
