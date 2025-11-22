import { NovaConsultaModal } from "@/components/details/NovaConsultaModal";
import { AppointmentCard } from "@/components/ui/service/AppointmentCard";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 md:px-8 font-sans">
      
      <div className="max-w-5xl mx-auto space-y-16">
        
        {/* Título Discreto */}
        <div className="text-center border-b border-gray-200 pb-8">
            <h1 className="text-2xl font-semibold text-gray-700">Apresentação dos Componentes</h1>
            <p className="text-gray-400 text-sm mt-2">Visualização isolada para aprovação</p>
        </div>

        {/* Seção 1: Modal */}
        <section className="flex flex-col items-center space-y-6">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest bg-gray-200 px-3 py-1 rounded-full">
                Botão & Modal
            </span>
            
            {/* Área de destaque para o botão */}
            <div className="w-full max-w-md p-12 bg-white rounded-3xl border border-gray-100 shadow-sm flex justify-center items-center">
                <NovaConsultaModal />
            </div>
        </section>

        {/* Seção 2: Cards */}
        <section className="flex flex-col items-center space-y-6">
             <span className="text-xs font-bold text-gray-400 uppercase tracking-widest bg-gray-200 px-3 py-1 rounded-full">
                Variações dos Cards
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

                <AppointmentCard
                    date="10/01"
                    time="08:00"
                    petName="Dolly"
                    ownerName="Pedro"
                    doctorName="Roberto"
                    species="SHEEP"
                    consultationType="Check-up"
                />
             </div>
        </section>
      </div>
    </main>
  );
}