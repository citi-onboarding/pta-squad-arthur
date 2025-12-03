'use client'; //necessário para todos os arquivos que usam algum hook do react

import * as React from 'react';
import { useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { LogoCITiPet } from '@/assets';
import { MadeWithLove } from '@/assets';

// Definição do Tipo de Estado
type ActiveTab = 'atendimento' | 'cadastro';

export function Header() {
  // 1. Definição do Estado
  
  const pathname = usePathname();
  const router = useRouter();

  const activeTab: ActiveTab = pathname?.startsWith('/registration') ? 'cadastro' : 'atendimento';

  const goTo = useCallback((path: string) => {
    router.push(path);
  }, [router]);

  return (
    <header className="flex justify-between items-center w-full p-4 border-b border-gray-200 bg-white">
      
      {/* 1. Lado Esquerdo: Logo (Use o SVG do logo citi) */}
        <div className="flex-1 flex items-center pr-20 justify-start">
            <Link href="/">
                <Image 
                    src={LogoCITiPet} 
                    alt="Logotipo da Empresa CITi Pet" 
                    width={190} 
                    height={75} 
                    className="cursor-pointer" 
                    />
            </Link>
        </div>

      {/* 2. Centro: Navegação Condicional */}
      <nav className="flex items-center space-x-8">
        <button
            onClick={() => goTo('/')}
            className={`cursor-pointer pb-1 transition duration-150
                ${activeTab === 'atendimento'
                ? 'font-semibold border-b-2 border-green-500' // Estilo ATIVO (com borda)
                : 'hover:text-gray-700' // Estilo INATIVO
                }`}
        >
            Atendimento
        </button>

        <button     // Utilzando como base de componente para visualização apenas no momento, adicionar mudança de página utilizando ''link'' ou ''router'' posteriormente. (perguntar a athurzao)
            onClick={() => goTo('/registration')}      
            className={`cursor-pointer pb-1 transition duration-150
                ${activeTab === 'cadastro'
                ? 'font-semibold border-b-2 border-green-500' // Estilo ATIVO (com bo+rda)
                : 'hover:text-gray-700' // Estilo INATIVO
                }`}
        >
            Cadastro
        </button>

      </nav> {/* Logo made with love no canto direito da página, depois testar em uma página e corrigir possiveis erros caso não esteja indo para o canto */}
        <div className="flex-1 flex items-center pl-20 justify-end"> 
            <Image 
                src={MadeWithLove} 
                alt="MadeWithLove by CITi <3" 
                width={190} 
                height={75} 
                />
        </div>
    </header>
  );
}
