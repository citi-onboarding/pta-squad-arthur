"use client";

import { Calendar22 } from "@/components/ui/datepicker";
import { useEffect, useState } from "react";
import { AppointmentCard } from "@/components/service/AppointmentCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "@/assets";
import { getAllConsultations, ConsultationData } from "@/services/consultation";
import { patientsService } from "@/services/patient";

/**
 * responsável por carregar dados de consultas e pacientes e mesclá-los,
 * e permitir a filtragem por médico, data e status (agendamento/histórico)
 */

export default function Home() {
  // estado para controlar a aba ativa: 'agendamento' (futuro) ou 'historico' (passado)
  const [activeTab, setActiveTab] = useState<"agendamento" | "historico">(
    "agendamento"
  );
  // estado para armazenar o termo de busca pelo nome do médico
  const [searchTerm, setSearchTerm] = useState("");
  // estado para armazenar a data selecionada na bomba do DatePicker
  const [date, setDate] = useState<Date | undefined>(undefined);
  // estado principal: armazena todas as consultas mescladas (com dados do paciente)
  const [appointments, setAppointments] = useState<ConsultationData[]>([]);
  // estado de carregamento para exibir o que esta carregando enquanto os dados são buscados
  const [loading, setLoading] = useState<boolean>(true);

  // função para limpar o termo de busca e limpar a data
  const handleReset = () => setSearchTerm("");
  const handleClearDate = () => setDate(undefined);

  // formata a data selecionada para o formato "DD/MM" para comparação
  const selectedDateString = date
    ? `${String(date.getDate()).padStart(2, "0")}/${String(
        date.getMonth() + 1
      ).padStart(2, "0")}`
    : null;

  // useEffect para carregar os dados de consultas e pacientes no primeiro render
  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);

      // 1- busca todos os dados da api
      const consultations = await getAllConsultations();
      const patients = await patientsService.getAll();

      // 2- cria um mapade pacientes para acesso rápido pelo id
      const patientsMap = new Map(patients.map((p) => [p.id, p]));

      // 3- (FUNCAO DE JUNTAR OS DADOS) mescla os dados (Merge): Anexa o objeto 'patient' completo a cada consulta certinha.
      const merged = consultations.map((c) => {
        const patientData = patientsMap.get(c.patientId);

        return {
          ...c,
          patient: patientData!, // adiciona os dados do paciente, garantido pelo Map
        };
      });

      setAppointments(merged); // atualiza o estado com a lista mesclada
      setLoading(false);
    };

    fetchAppointments();
  }, []); // rodando apenas uma vez na montagem do componente

  const formatDate = (iso: string) => {
    const d = new Date(iso);

    return `${String(d.getDate()).padStart(2, "0")}/${String(
      d.getMonth() + 1
    ).padStart(2, "0")}`;
  };

  const formatTime = (iso: string) => {
    const d = new Date(iso);
    // O navegador já converte automaticamente de UTC (banco) para o horário local do usuário
    return `${String(d.getHours()).padStart(2, "0")}:${String(
      d.getMinutes()
    ).padStart(2, "0")}`;
  };

  // lógica de filtragem dos agendamentos
  const filteredAppointments = appointments.filter((app) => {
    // verifica se a consulta já passou
    const appointmentDateTime = new Date(String(app.datetime));
    const isPassed = appointmentDateTime.getTime() < Date.now();

    // filtro aba
    const matchesTab = activeTab === "historico" ? isPassed : !isPassed;
    // filtro de busca do nome do doutor
    const matchesSearch = app.doctorName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    // filtro por data
    const matchesDate = selectedDateString
      ? formatDate(String(app.datetime)) === selectedDateString
      : true;

    // consulta se passou pelos 3 filtros
    return matchesTab && matchesSearch && matchesDate;
  });

  return (
    <main className="min-h-screen bg-white py-12 px-4 md:px-8 font-sans">
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-6">
        <div className="flex flex-col items-start gap-6">
          <h1 className="text-5xl font-bold"> Atendimento</h1>

          <span className="text-2xl">Qual é o médico?</span>

          <div className="flex gap-6">
            <Input
              className="w-96 h-12 px-4"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Pesquise aqui..."
            />
            <Button
              onClick={handleReset}
              className="w-32 h-12 rounded-full bg-[#7D1AD7]"
            >
              Limpar
            </Button>
          </div>
          <div className="w-full flex justify-between items-end">
            <div className="bg-gray-100 p-3 rounded-xl shadow-sm inline-flex gap-4">
              <button
                onClick={() => setActiveTab("agendamento")}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  activeTab === "agendamento"
                    ? "bg-white shadow-sm"
                    : "text-black"
                }`}
              >
                Agendamento
              </button>

              <button
                onClick={() => setActiveTab("historico")}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  activeTab === "historico"
                    ? "bg-white shadow-sm"
                    : "text-black"
                }`}
              >
                Histórico
              </button>
            </div>
            <div className="w-full flex gap-4 justify-end">
              <div>
                <Calendar22
                  {...({ selectedDate: date, onDateChange: setDate } as any)}
                />
              </div>
              <Button
                onClick={handleClearDate}
                className="w-24 h-12 rounded-full bg-[#7D1AD7]"
              >
                Limpar Data
              </Button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center text-lg font-medium py-12">
            Carregando consultas...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {filteredAppointments.map((app) => (
              <AppointmentCard
                id={app.id} // chave única
                date={formatDate(app.datetime)}
                time={formatTime(app.datetime)}
                originalDateTime={app.datetime}
                // acesso aos dados do paciente, que foram mesclados no useEffect
                petName={app.patient.name}
                ownerName={app.patient.tutorName}
                doctorName={app.doctorName}
                species={app.patient.species}
                consultationType={app.type}
              />
            ))}
          </div>
        )}
        <div className="w-full flex justify-end">
          <Button asChild className="rounded-full bg-[#70DB93]">
            <Link href="/registration" className="flex items-center gap-2">
              <img src={Plus.src} className="w-5 h-5" />
              Nova Consulta
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
