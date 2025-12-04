import api from "./api";
import { Consultation } from "./consultation";

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




export interface Patient{

    id: string,
    name: string,
    tutorName: string,
    age: number,
    species: string,
    consultations: Consultation[]

}

export interface PatientInformations{

    id: string,
    name: string,
    tutorName: string,
    age: number,
    species: string,

}


export const patientService = {

  async getPatientInfoById(patientId: string) : Promise< PatientInformations > {
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

}