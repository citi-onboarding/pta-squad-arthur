import api from "./api";
import { AxiosResponse } from "axios";
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

    doctorName: string,
    description: string,
    type: string,
    datetime: string,
    patientId: string

  
}

export interface Consultation {

    id: string,
    doctorName: string,
    description: string,
    type: string,
    datetime: string,
    patientId: string

}

// Função auxiliar para garantir que a data seja um objeto Date para comparação
const parseDate = (dateTime: string) => new Date(dateTime);


export const consultationService = {
    async createConsultation(data: CreatingTheConsultationData) {
    
        try{
            const res = await api.post("/consultation", data); // Aqui pegamos as rotas definidas no backend e passamos para a api
            return res.data;
        
        } catch(error){

            console.log("Error trying to create consultation: ", error )

        }
    },

    async getConsultationById(ConsultationId: string) {

        try{

            const res = await api.get(`/consultation/${ConsultationId}`)
            return res;

        } catch(error){

            console.log("Error tryingto find consultation: ", error )
            throw(error);

        }
    },

    async getAllConsulationsByPatientId(patientId: string): Promise<Consultation[]>{

        try{

            const res = await api.get(`/consultation/patient/${patientId}`)
            return res.data;

        } catch(error){

            console.log("Error trying find the patient consultations: ", error)
            throw(error);
        }
    },

    async getPrevsConsultation(patientId: string, currentConsultation: Consultation) : Promise<Consultation[]>{

        try{

            const allConsultationsReponse: Consultation[]= await this.getAllConsulationsByPatientId(patientId);

            const allConsultations = allConsultationsReponse;

            const curretentDatetime = parseDate(currentConsultation.datetime);

            const previousConsultations = allConsultations.filter(consultation => {

                if(consultation.id === currentConsultation.id){
                    return false;
                }

                const consultationDateTime = parseDate(consultation.datetime);
                return consultationDateTime < curretentDatetime;
            })

            const sortedPreviousConsultations = previousConsultations.sort((a, b) =>{
                const dateA = parseDate(a.datetime);
                const dateB = parseDate(b.datetime);

                return dateB.getTime() - dateA.getTime();

            });

            const latestFourPrevs = sortedPreviousConsultations.slice(0, 4);

            return latestFourPrevs;

        } catch(error){

            console.error("Error trying to get previous consultations:", error);
            return [];

        }

    }
}