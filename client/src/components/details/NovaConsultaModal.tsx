'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Input } from "@/components/ui/input";
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
import { LogoCITi, CalendarIcon, AlarmIcon } from "@/assets";

export function NovaConsultaModal() {
  const [medico, setMedico] = useState('');
  const [dataAtendimento, setDataAtendimento] = useState('');
  const [horarioAtendimento, setHorarioAtendimento] = useState('');
  const [tipoConsulta, setTipoConsulta] = useState('');


  // Essa função será chamada ao clicar em finalizar. apertando f12, verá as informações enviadas
  const Submit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log({
      medico,
      dataAtendimento,
      horarioAtendimento,
      tipoConsulta
    });

    setMedico('');
    setDataAtendimento('');
    setHorarioAtendimento('');
    setTipoConsulta('');
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Nova Consulta</Button>
      </DialogTrigger>

      <DialogContent
        className="
            w-full
            max-w-[824px]
            h-auto      
            max-h-[90vh]  
            rounded-[24px]     
            bg-white 
            p-[48px]          
            flex                 
            flex-col            
            gap-[29px]      
          "
        >


        {/* Logo. DialogHeader serve para acessibilidade */}
        <div className="flex justify-center mb-2">
          <Image src={LogoCITi} width={189} height={74} alt="Citi Logo" />
        </div>
        <DialogHeader className="flex justify-center">
        <p className="text-center text-lg font-normal leading-tight">
          <span className="font-semibold">
            O pet já está cadastrado no sistema!
          </span>{" "}
          Preencha os dados da{" "}
          <span className="font-semibold">consulta</span>
        </p>
      </DialogHeader>


        <form onSubmit={Submit} className="mt-4">

          {/*Em celular, cria-se 1 coluna, em notebook, cria-se duas
          selectContent: tipo uma caixa, selectGroup: uma pasta dentro da caixa e selectLabel: o tipo dos documentos (texto aqui)*/}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* Tipo de consulta. Conecta o Select ao estado tipoConsulta.  */}
            <div className="flex flex-col space-y-1">
              <Label>
                Tipo de consulta
              </Label>
              <Select value={tipoConsulta} onValueChange={setTipoConsulta}>
                <SelectTrigger className="
                  w-full               
                  h-[50px]             
                  rounded-[8px]        
                  border-[1px]         
                  border-[#101010]     
                  p-[16px]             
                  text-base            
                  placeholder:text-gray-400">
                  <SelectValue placeholder="Selecione aqui" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Tipos de Consulta</SelectLabel>
                    <SelectItem value="primeira">Primeira Consulta</SelectItem>
                    <SelectItem value="retorno">Retorno</SelectItem>
                    <SelectItem value="checkup">Check-up</SelectItem>
                    <SelectItem value="vacinacao">Vacinação</SelectItem>
                    <SelectItem value="emergencia">Emergência</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Médico Responsável. Usa o useState para pegar o que for digitado. */}
            <div className="flex flex-col space-y-1">
              <Label>
                Médico Responsável
              </Label>
              <Input
                placeholder="Digite aqui..."
                value={medico}
                onChange={(e) => setMedico(e.target.value)}
                required
              />
            </div>

            {/* Data. Também usa o useState para pegar a informação e o [&::-webkit-calendar-picker-indicator]:hidden, serve para
            esconder o símbolo padrão do navegador*/}
            <div className="flex flex-col space-y-1">
              <Label>
                    Data do atendimento
              </Label>
              <div className="relative">
                <Input
                type="date"
                value={dataAtendimento}
                onChange={(e) => setDataAtendimento(e.target.value)}
                required
                className="
                 [&::-webkit-calendar-picker-indicator]:hidden"
              />
              <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
                  {/* Ícone manual */}
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
              <Label>
                    Horário do atendimento
              </Label>
              <div className="relative">
                <Input
                  type="time"
                  value={horarioAtendimento}
                  onChange={(e) => setHorarioAtendimento(e.target.value)}
                  required
                  className=" 
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
            <Button
              type="submit"
              className="
                w-full   
                h-auto          
                px-[32px]      
                py-[12px]        
                rounded-[24px]     
                gap-[10px]       
                bg-[#50E678]    
                hover:bg-[#1FAA53]    
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
