"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Sheep, Cat, Pig, Cow, Horse, Dog, SimpleArrowBack } from "@/assets";
import Image from "next/image";
import { NovaConsultaModal } from "@/components/details/NovaConsultaModal";
import { HistoryCard } from "@/components/details/HistoryCard";
import { consultationService, Consultation } from "@/services/consultation";
import { patientService, PatientInformations } from "@/services/patient";





const SPECIES_MAP: Record<string, string> = {
    DOG: Dog.src,
    CAT: Cat.src,
    COW: Cow.src,
    SHEEP: Sheep.src,
    PIG: Pig.src,
    HORSE: Horse.src,
};




//function to handle dateTime data coming in the international format
const formatDateTime = (dateTimeString: string) => {
    // Exemplo: "2025-08-09T00:00:00.000Z"
    const parts = dateTimeString.split("T");

    // partes[0] = "2025-01-10"
    let Rawdate = parts[0];
    let ArrayDate = Rawdate.split("-");
    let date;

    date = ArrayDate[2] + "/" + ArrayDate[1] + "/" + ArrayDate[0];

    // 00:00:00.000Z => precisamos apenas dos dois primeiros elementos do time_splited
    let time_splited = parts[1].split(":");

    let time = time_splited[0] + ":" + time_splited[1];
    
    return { date, time };
};





export default function Details() {


    const params = useParams();
    // equal to the folder's name
    const idConsulation = params.ConsultationId;
    const consultationIdString = Array.isArray(idConsulation) ? idConsulation[0] : idConsulation;

    const [patient, setPatient] = useState<PatientInformations | null>(null);
    const [consultation, setConsultation] = useState<Consultation[] | null>(null);
    const [prevsConsultations, setPrevsConsultations] = useState<Consultation[] | null>(null)

    useEffect(() => {
        

        if (consultationIdString) {

            const fetchConsultationAndPatient = async () => {

                try{

                    console.log("1. Buscando consulta atual por ID:", consultationIdString);

                    const response = await consultationService.getConsultationById(consultationIdString);

                    const currentConsultation : Consultation = response;

                    console.log("2. Consulta Atual (currentConsultation):", currentConsultation);

                    if (currentConsultation){

                        setConsultation([currentConsultation]);

                        const patientId = currentConsultation.patientId;

                        const patientResponse = await patientService.getPatientInfoById(patientId);
                        const foundPatient : PatientInformations = patientResponse;

                        setPatient(foundPatient);

                        console.log("3. Buscando histórico para o paciente:", patientId);

                        const prevsConsults = await consultationService.getPrevsConsultation(patientId, currentConsultation);

                        console.log("4. Consultas Anteriores Encontradas (prevsConsults):", prevsConsults);

                        setPrevsConsultations(prevsConsults)
                        
                    } else {

                        setConsultation([]);
                        setPatient(null);
                        setPrevsConsultations([]);
                    }

                } catch(error){
                    console.log("Error trying to search datas: ", error);

                    setConsultation([]);
                    setPatient(null);
                    setPrevsConsultations([]);

                }
            }

            fetchConsultationAndPatient();

        }
    }, [consultationIdString]);









    if (!consultation || !patient) {
        return (
            <main className="min-h-screen max:w-full flex justify-center py-10 bg-slate-50">
                <div className="bg-[#70DB93] flex justify-center items-center w-[50rem] h-[25rem] mt-[5rem] rounded-xl">
                    <p className="text-white font-bold text-lg md:text-xl lg:text-2xl">
                        Carregando os detalhes da consulta do paciente, aguarde.
                    </p>
                </div>
            </main>
        );
    }




    let backGroundColor;

    switch (consultation[0].type) {
        case "Primeira Consulta":
            backGroundColor = "bg-[#BFB5FF]";
            break;
        case "Vacinação":
            backGroundColor = "bg-[#AAE1FF]";
            break;
        case "Check-up":
            backGroundColor = "bg-[#9CFF95]";
            break;
        case "Emergência":
            backGroundColor = 'bg-[#FF7F7F]'
            break
        case "Retorno":
        default:
            backGroundColor = "bg-[#FF641999]";
            break;
    }

    const PetImage = patient?.species ? SPECIES_MAP[patient.species] : Cat.src;

    return (
        <main className="min-h-screen bg-white py-6 px-4 md:px-8">
            <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-10 max-w-6xl">
                <Link href="/" className="flex items-baseline w-full">
                    <Image
                        src={SimpleArrowBack}
                        alt="Botão para voltar para a página anterior"
                        className="mr-8 h-3.5 sm:h-4 md:h-5 lg:h-6"
                    />
                    <h1 className="[word-spacing:1rem] text-2xl md:text-3xl lg:text-4xl font-bold">
                        Detalhes da Consulta{" "}
                    </h1>
                </Link>

                <div className="flex justify-between gap-x-12">
                    <div className="">
                        <p className="py-8 font-bold text-base sm:text-lg md:text-xl lg:text-2xl">
                            Paciente
                        </p>

                        <div className="flex">
                            <Image
                                src={PetImage}
                                alt="Foto Representando a Espécie do Animal"
                                width={0}
                                height={0}
                                className="w-48 h-auto lg:w-56"
                            />

                            <div className="ml-4 md:ml-6 h-56 flex flex-col justify-between">
                                <div className="mt-10">
                                    <p className="font-bold text-base sm:text-lg md:text-xl lg:text-2xl">
                                        {patient.name}
                                    </p>
                                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl">
                                        {patient.age} Anos
                                    </p>
                                </div>

                                <div>
                                    <p className="text-base sm:text-lg md:text-lg lg:text-lg">
                                        {patient?.tutorName}
                                    </p>
                                    <p className="text-base sm:text-lg md:text-lg lg:text-lg">
                                        {consultation[0].doctorName}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 max-w-xl">
                            <p className="font-bold text-base md:text-lg">
                                Descrição do problema:
                            </p>
                            <p className="text-base">{consultation[0].description}</p>
                        </div>

                        <div className="flex mt-6 justify-start h-8 items-center">
                            <p className="text-base font-bold mr-10">Tipo de Consulta:</p>
                            <div>
                                <p
                                    className={`${backGroundColor}  h-full rounded-sm flex justify-center items-center p-1.5`}
                                >
                                    {consultation[0].type}
                                </p>
                            </div>
                        </div>

                        <div className="mt-10 flex flex-col w-[39.4375rem] h-[8.625rem] items-center justify-center shadow rounded-3xl border-[1px] gap-6 p-6">
                            <p className="font-bold text-base mt-[12px]">
                                Deseja Realizar Outra Consulta?
                            </p>
                            <NovaConsultaModal 
                            id={patient.id}/>
                        </div>
                    </div>

                    <div className="h-full lg:pl-10 ">
                        <p className="py-8 font-bold text-base sm:text-lg md:text-xl lg:text-2xl ">
                            Histórico de Consulta
                        </p>
                        <div className="rounded-3xl shadow h-96 lg:h-[28rem] w-full  md:w-96 lg:w-[33rem] overflow-auto  px-6 py-4 flex gap-8 flex-col  border-1">
                            {prevsConsultations && prevsConsultations.length > 0 ? (
                                prevsConsultations.map((consult) => {

                                    const { date, time} = formatDateTime(consult.datetime)

                                    return (
                                        <HistoryCard
                                            key={consult.id}
                                            consultationId={consult.id} 
                                            doctorName={consult.doctorName}
                                            type={consult.type}
                                            date={date}
                                            time={time}
                                        />
                                    );
                                })
                            ) : (

                                <p className="text-center text-gray-500 mt-10">
                                    Nenhuma consulta anterior encontrada para este paciente.
                                </p>
                            )} 
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
