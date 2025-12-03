import api from "./api";

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

export interface Consultation {

    consultationId: string,
    doctorName: string,
    description: string,
    type: string,
    datetime: string,
    patientId: string

  
}


interface Patient{

    patientId: string,
    name: string,
    tutorName: string,
    age: number,
    species: string,
    consultations: Consultation[]

}

interface PatientInformations{

    patientId: string,
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