import { NovaConsultaModal } from "@/components/details/NovaConsultaModal";
import { AppointmentCard } from "@/components/service/AppointmentCard";
import { HistoryCard } from "@/components/details/HistoryCard";
import { RegistrationModal } from "@/components/register/registerModal";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 md:px-8 font-sans">
      
      <div className="max-w-5xl mx-auto space-y-16">
        
        {/* Título Discreto */}
        <div className="text-center border-b border-gray-200 pb-8">
            <h1 className="text-2xl font-semibold text-gray-700">Apresentação dos Componentes</h1>
            <p className="text-gray-400 text-sm mt-2">Visualização isolada para aprovação</p>
        </div>

        {/* Seção 1: Modais (Nova Consulta e Cadastro) */}
        <section className="flex flex-col items-center space-y-6">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest bg-gray-200 px-3 py-1 rounded-full">
                Botões de Ação & Janelas de Registro
            </span>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
                
                {/* Modal Nova Consulta */}
                <div className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center justify-center space-y-4">
                    <h3 className="text-sm font-medium text-gray-600">Janela: Nova Consulta</h3>
                    <NovaConsultaModal />
                </div>

                {/* Modal de Registro (Email) */}
                <div className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center justify-center space-y-4">
                    <h3 className="text-sm font-medium text-gray-600">Janela: Cadastro (Email)</h3>
                    <RegistrationModal /> 
                </div>

            </div>
        </section>

        {/* Seção 2: Cards de Consulta */}
        <section className="flex flex-col items-center space-y-6">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest bg-gray-200 px-3 py-1 rounded-full">
                Cartões de Próximas Consultas (AppointmentCard)
            </span>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full justify-items-center">
                <AppointmentCard
                    date="21/11"
                    time="09:30"
                    petName="Rex"
                    ownerName="Arthur"
                    doctorName="Roberto"
                    species="DOG"
                    consultationType="Primeira Consulta"
                />

                <AppointmentCard
                    date="21/11"
                    time="10:00"
                    petName="Mimi"
                    ownerName="Maria"
                    doctorName="Ana"
                    species="CAT"
                    consultationType="Vacinação"
                />

                <AppointmentCard
                    date="21/11"
                    time="11:15"
                    petName="Spirit"
                    ownerName="Carlos"
                    doctorName="Roberto"
                    species="HORSE"
                    consultationType="Check-up"
                />

                <AppointmentCard
                    date="21/11"
                    time="14:00"
                    petName="Babe"
                    ownerName="Julia"
                    doctorName="Ana"
                    species="PIG"
                    consultationType="Retorno"
                />
            </div>
        </section>

        {/* Seção 3: Card de Histórico */}
        <section className="flex flex-col items-center space-y-6">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest bg-gray-200 px-3 py-1 rounded-full">
                Cartões de Histórico (HistoryCard)
            </span>

            <div className="grid grid-cols-1 gap-4 w-full max-w-4xl">
                <HistoryCard
                    date="15/10"
                    time="10:00"
                    type="Primeira Consulta"
                    doctorName="Dr. House"
                    onClick={() => console.log('Navegar para detalhes do histórico')}
                />
                <HistoryCard
                    date="01/11"
                    time="14:30"
                    type="Vacinação Anual"
                    doctorName="Dr. Ana"
                    onClick={() => console.log('Navegar para detalhes do histórico')}
                />
            </div>
        </section>

      </div>
    </main>
  );
}