import * as React from 'react';
import { Clock, Cat, Cow, Dog, Horse, Pig, Sheep } from '@/assets';

type PetSpecies = 'DOG' | 'CAT' | 'COW' | 'SHEEP' | 'PIG' | 'HORSE';

const SPECIES_MAP: Record<PetSpecies, string> = {
    DOG: Dog.src,
    CAT: Cat.src,
    COW: Cow.src,
    SHEEP: Sheep.src,
    PIG: Pig.src,
    HORSE: Horse.src,
};

interface AppointmentCardProps {
    date: string;
    time: string;
    petName: string;
    ownerName: string;
    doctorName: string;
    species: PetSpecies;
    consultationType: string; 
    onClick?: () => void;
}

export function AppointmentCard({
  date,
  time,
  petName,
  ownerName,
  doctorName,
  species,
  consultationType,
}: AppointmentCardProps) {
  
  // 1. Lógica de Mapeamento da Imagem
  const PetImageComponent = SPECIES_MAP[species];

  const [day, month] = date.split('/');
  const appointmentDateTime = new Date(`2025-${month}-${day} ${time}`); 
  const isPassed = appointmentDateTime.getTime() < Date.now();
  
let baseContainerColor

    switch (consultationType) {
        case 'Primeira Consulta':
            baseContainerColor = 'bg-[#BFB5FF]'
            break
        case 'Vacinação':
            baseContainerColor = 'bg-[#AAE1FF]'
            break
        case 'Check-up':
            baseContainerColor = 'bg-[#9CFF95]'
            break
        case 'Retorno':
        default:
            baseContainerColor = 'bg-[#FF641999]'
            break
    }

    const containerColor = isPassed ? 'bg-[#F0F0F0]' : baseContainerColor;

  return (
    // CONTAINER PRINCIPAL - corrigiDO a parte de px para rem para deixar mais reponsivo
    <div className={`flex items-center w-full max-w-[26rem] min-w-[240px] h-[8.5rem] rounded-[1rem] px-[1.5rem] py-[1rem] ${containerColor}`}>   
      
      {/* 1. Bloco Esquerdo: Ícone, Data e Hora (Flex Column) */}
      <div className="flex flex-col items-center pt-[0.8rem] pr-[0.4rem] pb-[0.8rem] pl-[0.4rem] gap-[0.1rem] bg-[#FFFFFF] bg-opacity-80 rounded-[0.3rem]"> 
            <img
            src={Clock.src}
            alt="Clock Icon"
            />
            <span className="text-sm font-bold text-[#101010]">{date}</span>
            <span className="text-sm font-bold text-[#101010]">{time}</span>
        </div>

      {/* 2. Bloco Central: Pet/Dono e Médico (Flex Grow) */}
        <div className="flex-grow flex justify-center">
            <h2 className="text-xs font-bold text-[#000000]">
                {petName} <span className="text-xs font-normal text-[#000000]">/ {ownerName}</span>
            </h2>
            <p className="text-xs font-normal [#000000] ml-10">
                Dr. <span>{doctorName}</span>
            </p>
        </div>
      {/* 3. Bloco Direito: Imagem e Tag de Consulta (Relative) */}
      <div className="relative flex flex-col items-center w-[101px] h-[103px] gap-[8px]">
        
        {/* Renderização Condicional da Imagem */}
        {PetImageComponent && (
            <img
            src={PetImageComponent}
            alt={species}
            className="w-[4.3rem] h-[4.4rem]"
             />
        )}
        {/* Tag Tipo de Consulta (Posicionamento Absoluto) */}
        <div className={`absolute flex justify-center items-center w-[6.3rem] h-[1.6rem] rounded-[0.25rem] bg-[#FFFFFF] bg-opacity-80 bottom-0 left-0`}>
            <span className="text-xs text-[#000000]">{consultationType}</span>
        </div>
      </div>
    </div>
  );
}