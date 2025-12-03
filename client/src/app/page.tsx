"use client";

import { Calendar22} from "@/components/ui/datepicker";
import { useState } from "react";
import { AppointmentCard } from "@/components/service/AppointmentCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "@/assets";
import { RegistrationModal } from "@/components/register/registerModal";

const mockAppointments = [
  {
    id: 1,
    date: "29/11",
    time: "09:30",
    petName: "Rex",
    ownerName: "Arthur",
    doctorName: "Roberto",
    species: "DOG",
    consultationType: "Primeira Consulta",
  },
  {
    id: 2,
    date: "26/11",
    time: "10:00",
    petName: "Mimi",
    ownerName: "Maria",
    doctorName: "Ana",
    species: "CAT",
    consultationType: "Vacinação",
  },
  {
    id: 3,
    date: "29/11",
    time: "11:15",
    petName: "Spirit",
    ownerName: "Carlos",
    doctorName: "Roberto",
    species: "HORSE",
    consultationType: "Check-up",
  },
  {
    id: 4,
    date: "29/11",
    time: "01:51",
    petName: "Babe",
    ownerName: "Julia",
    doctorName: "Ana maria",
    species: "PIG",
    consultationType: "Retorno",
  },
  {
    id: 5,
    date: "31/11",
    time: "11:30",
    petName: "Claudio",
    ownerName: "Lucas",
    doctorName: "Geovana",
    species: "DOG",
    consultationType: "Primeira Consulta",
  },
    {
    id: 6,
    date: "30/11",
    time: "09:30",
    petName: "Pablo",
    ownerName: "Junior",
    doctorName: "Matheus",
    species: "PIG",
    consultationType: "Check-up",
  },
    {
    id: 7,
    date: "22/11",
    time: "09:30",
    petName: "Jinx",
    ownerName: "Gabriel",
    doctorName: "Pedro",
    species: "SHEEP",
    consultationType: "Primeira Consulta",
  },
] as const;
  
export default function Home() {
    
    const [activeTab, setActiveTab] = useState<'agendamento' | 'historico'>('agendamento');
    const [searchTerm, setSearchTerm] = useState('');
    const [date, setDate] = useState<Date | undefined>(undefined);
    const handleReset = () => setSearchTerm('');
    const handleClearDate = () => setDate(undefined);
    const selectedDateString = date
    ? `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}`
    : null;

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    
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
                    <Button onClick={handleReset} className="w-32 h-12 rounded-full bg-[#7D1AD7]">
                        Limpar
                    </Button>
                </div>
                <div>
            <h1>Atendimento</h1>
                <Button onClick={() => setIsDialogOpen(true)}>Abrir Modal de Cadastro</Button>
                
                {/* exibi o modal para testar o nodemailer*/}
                <RegistrationModal isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} />
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
                            <Calendar22 {...({ selectedDate: date, onDateChange: setDate } as any)} />
                        </div>
                    <Button onClick={handleClearDate} className="w-24 h-12 rounded-full bg-[#7D1AD7]">
                        Limpar Data
                    </Button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                {mockAppointments.filter(app => {
                    const [day, month] = app.date.split('/').map(Number);
                    const [hours, minutes] = app.time.split(':').map(Number);
                    const appointmentDateTime = new Date(2025, month - 1, day, hours, minutes);
                    const isPassed = appointmentDateTime.getTime() < Date.now();
                    
                    const matchesTab = activeTab === 'historico' ? isPassed : !isPassed;
                    const matchesSearch = app.doctorName.toLowerCase().includes(searchTerm.toLowerCase());
                    const matchesDate = selectedDateString 
                        ? app.date === selectedDateString 
                        : true; 
                    return matchesTab && matchesSearch && matchesDate;
                })
                .map(app => (
                    <AppointmentCard key={app.id} {...app} />
                ))
                }
            </div>
            <div className="w-full flex justify-end">
                <Button className = "rounded-full bg-[#50E678]">
                <img src={Plus.src} className="w-5 h-5" />
                Nova Consulta
                </Button>
            </div>
        </div>
    </main>
  );
}