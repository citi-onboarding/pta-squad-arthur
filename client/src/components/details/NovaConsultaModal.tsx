'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription
} from "@/components/ui/dialog";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LogoCITiPet, CalendarIcon, AlarmIcon } from "@/assets";
import { CircleCheckBig } from "lucide-react";
import { consultationService } from "@/services/consultation";



interface NewConsultationModalProps {
      id: string; // o id do paciente
}

function DateFormatting (date: string, time: string){

    let datetime = `${date}T${time}:00.000Z`;

    return datetime;
}

export function NovaConsultaModal({ id } : NewConsultationModalProps) {

  const [isOpen, setIsOpen] = useState(false);

  const [medico, setMedico] = useState('');
  const [dataAtendimento, setDataAtendimento] = useState('');
  const [horarioAtendimento, setHorarioAtendimento] = useState('');
  const [tipoConsulta, setTipoConsulta] = useState('');
  const [descrição, setDescrição] = useState('');


  // Essa função será chamada ao clicar em finalizar. apertando f12, verá as informações enviadas
  const Submit = async (e: React.FormEvent) => {
    e.preventDefault();

    const datetime = DateFormatting(dataAtendimento, horarioAtendimento);

    const newConsultationData = {

      doctorName: medico,
      description: descrição,
      type: tipoConsulta,
      datetime: datetime,
      patientId: id
    }

    try{

        console.log(dataAtendimento);
        await consultationService.createConsultation(newConsultationData);

        console.log(newConsultationData);

        setMedico('');
        setDataAtendimento('');
        setHorarioAtendimento('');
        setTipoConsulta('');
        setDescrição('')
        setIsOpen(false);

    } catch(error){

      console.error("Error trying to schedule a new consultation");
      alert("Erro ao agendar a consulta. Verifique os dados e tente novamente.")

    }
    
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="
                                    bg-[#70DB93]
                                    hover:bg-green-500 hover:text-white
                                    h-[8.625rem]
                                    w-[16rem] sm:w-[24rem] md:w-[30rem] lg:w-[36rem] 
                                    rounded-3xl 
                                    text-white
                                     shadow
                                     mx-
                                     mb-[12px]">
          <CircleCheckBig />
          Agendamento</Button>
      </DialogTrigger>

      <DialogContent
        className="
            w-full
            max-w-[824px]
            h-auto      
            max-h-[90vh]  
            rounded-[24px]     
            bg-white 
            p-12         
            flex                 
            flex-col            
            gap-7   
          "
      >


        {/* Logo. DialogHeader serve para acessibilidade */}
        <div className="flex justify-center mb-2">
          <Image src={LogoCITiPet} width={189} height={74} alt="Citi Logo" />
        </div>
        <DialogHeader className="flex justify-center">
          <DialogTitle className="text-center text-lg font-normal leading-tight">
            <span className="font-semibold">
              O pet já está cadastrado no sistema!
            </span>{" "}
            Preencha os dados da{" "}
            <span className="font-semibold">consulta</span>
          </DialogTitle>

          <DialogDescription className="sr-only">
            Formulário para agendamento de uma nova consulta para o paciente.
          </DialogDescription>

        </DialogHeader>


        <form onSubmit={Submit} className="mt-4">

          {/*Em celular, cria-se 1 coluna, em notebook, cria-se duas
          selectContent: tipo uma caixa, selectGroup: uma pasta dentro da caixa e selectLabel: o tipo dos documentos (texto aqui)*/}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* Tipo de consulta. Conecta o Select ao estado tipoConsulta.  */}
            <div className="flex flex-col space-y-1">
              <Label className="text-base font-bold  text-black leading-[110%] ">
                Tipo de consulta
              </Label>
              <Select value={tipoConsulta} onValueChange={setTipoConsulta}>
                <SelectTrigger className="
                  w-full               
                  h-12           
                  rounded-[8px]        
                  border-[1px]   
                  border-[#101010]  
                  p-4   
                  text-base            
                  placeholder:text-gray-400">
                  <SelectValue placeholder="Selecione aqui" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Tipos de Consulta</SelectLabel>
                    <SelectItem value="Primeira Consulta">Primeira Consulta</SelectItem>
                    <SelectItem value="Retorno">Retorno</SelectItem>
                    <SelectItem value="Check-up">Check-up</SelectItem>
                    <SelectItem value="Vacinação">Vacinação</SelectItem>
                    <SelectItem value="Emergência">Emergência</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Médico Responsável. Usa o useState para pegar o que for digitado. */}
            <div className="flex flex-col space-y-1">
              <Label className="text-base font-bold  text-black leading-[110%] ">
                Médico Responsável
              </Label>
              <Input
                placeholder="Digite aqui..."
                value={medico}
                onChange={(e) => setMedico(e.target.value)}
                required
                className="w-full h-12 rounded-[8px] border-[1px] border-[#101010] p-4 text-base placeholder:text-gray-400"
              />
            </div>

            {/* Data. Também usa o useState para pegar a informação e o [&::-webkit-calendar-picker-indicator]:hidden, serve para
            esconder o símbolo padrão do navegador*/}
            <div className="flex flex-col space-y-1">
              <Label className="text-base font-bold  text-black leading-[110%] ">
                Data do atendimento
              </Label>
              <div className="relative">
                <Input
                  type="date"
                  value={dataAtendimento}
                  onChange={(e) => setDataAtendimento(e.target.value)}
                  required
                  className="
                  w-full h-12 rounded-[8px] border-[1px] border-[#101010] p-4 text-base placeholder:text-gray-400
                 [&::-webkit-calendar-picker-indicator]:hidden"
                />
                <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
                  <Image
                    src={CalendarIcon}
                    width={20}
                    height={20}
                    alt="Calendário"
                  />
                </span>
              </div>
            </div>


            {/* Horário. Basicamente a mesma coisa da data*/}
            <div className="flex flex-col space-y-1">
              <Label className="text-base font-bold  text-black leading-[110%] ">
                Horário do atendimento
              </Label>
              <div className="relative">
                <Input
                  type="time"
                  value={horarioAtendimento}
                  onChange={(e) => setHorarioAtendimento(e.target.value)}
                  required
                  className=" 
                  w-full h-12 rounded-[8px] border-[1px] border-[#101010] p-4 text-base placeholder:text-gray-400
                  [&::-webkit-calendar-picker-indicator]:hidden"
                />
                <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
                  {/* Ícone manual */}
                  <Image
                    src={AlarmIcon}
                    width={20}
                    height={20}
                    alt="Relógio"
                  />
                </span>
              </div>

            </div>
          </div>
          

          {/*Descrição da consulta */}
          <div className="flex flex-col space-y-1 mt-4">
            <Label className="text-base font-bold text-black leading-[110%]">
              Descrição da consulta
            </Label>
            
              <Textarea 
              value={descrição}
              onChange={(e) => setDescrição(e.target.value)} 
              required
              placeholder="Informe uma descrição da consulta..."
              className="w-full min-h-24 max-h-40 rounded-[8px] border-[1px] border-[#101010] p-4 text-base placeholder:text-gray-400" 
              />
          </div>


          <Button
            type="submit"
            className="
                w-full   
                h-auto         
                px-[32px]      
                py-[12px]        
                rounded-[24px]     
                gap-[10px]       
                bg-[#70DB93]   
                hover:bg-green-500   
                text-white           
                flex items-center justify-center
                text-md font-medium   
                mt-6                 
              "
          >
            Finalizar cadastro
          </Button>

        </form>
      </DialogContent>
    </Dialog>
  );
}
