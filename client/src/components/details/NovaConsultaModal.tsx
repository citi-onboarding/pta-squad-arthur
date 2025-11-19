'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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

  const handleSubmit = (e: React.FormEvent) => {
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
              max-h-[90vh]
              overflow-y-auto

              rounded-[24px]
              bg-white

              p-6
              sm:p-[48px]

              space-y-6
              sm:space-y-[29px]
            "
          >


        {/* Logo */}
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


        <form onSubmit={handleSubmit} className="mt-4">

          {/* GRID DE 2 COLUNAS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* Tipo de consulta */}
            <div className="flex flex-col space-y-1">
              <Label className="text-sm">Tipo de consulta</Label>
              <Select value={tipoConsulta} onValueChange={setTipoConsulta}>
                <SelectTrigger className="w-full">
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

            {/* Médico Responsável */}
            <div className="flex flex-col space-y-1">
              <Label className="text-sm">Médico Responsável</Label>
              <Input
                placeholder="Digite aqui..."
                value={medico}
                onChange={(e) => setMedico(e.target.value)}
                required
              />
            </div>

            {/* Data */}
            <div className="flex flex-col space-y-1">
              <Label className="text-sm">Data do atendimento</Label>
              <Input
                type="date"
                value={dataAtendimento}
                onChange={(e) => setDataAtendimento(e.target.value)}
                required
              />
            </div>

            {/* Horário */}
            <div className="flex flex-col space-y-1">
              <Label className="text-sm">Horário do atendimento</Label>
              <div className="relative">
                <Input
                  value={horarioAtendimento}
                  onChange={(e) => setHorarioAtendimento(e.target.value)}
                  required
                  className="pr-10" 
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Image 
                    src={AlarmIcon} 
                    width={20} 
                    height={20} 
                    alt="Relógio" 
                  />
                </div>
              </div>
            </div>
          </div>

          <Button
              type="submit"
              className="
                w-full mt-12
                bg-[#50E678] hover:bg-[#1FAA53]
                text-white 
                py-6 rounded-full 
                text-md font-medium
              "
            >
              Finalizar cadastro
            </Button>

        </form>
      </DialogContent>
    </Dialog>
  );
}
