import { Button } from "@/components/ui/button"; // 1. Importe seu componente aqui
import { NovaConsultaModal } from "@/components/details/NovaConsultaModal";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      
      <div className="text-center space-y-6">
        <p className="text-sm text-gray-500 font-mono uppercase tracking-widest">
          Área de Teste
        </p>

        {/* 2. Coloque seu componente dentro desta caixa div, substituindo o Button */}
        <div className="flex items-center justify-center p-12 border-2 border-dashed border-gray-300 rounded-xl bg-white">
          
         <NovaConsultaModal />

        </div>
      </div>

    </main>
  );
}