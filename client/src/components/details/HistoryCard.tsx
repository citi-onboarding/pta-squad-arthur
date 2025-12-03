import React from "react";
import Image from "next/image";
import { ArrowBack } from "@/assets/index";
import { useRouter } from "next/navigation";

interface HistoryCardProps {
  date: string;
  time: string;
  type: string;
  doctorName: string;
  consultationId: string,
  onClick: (id: string) => void;
}


// Componente HistoryCard without onClick implementation on the arrowback image and without the conection with the backend data
export const HistoryCard: React.FC<HistoryCardProps> = ({ date, time, type, doctorName, consultationId, onClick }) => {


  const handleClick = () => {
    onClick(consultationId);
  };




  return (
    <div 
    className="flex items-center justify-between w-full h-[3.25rem] md:h-[4rem] lg:h-[5.125rem] px-6 bg-gray-100 rounded-2xl shadow-md cursor-pointer hover:bg-gray-200 transition-colors"
    onClick={handleClick}>

      <div className="flex flex-col items-center justify-center border-r p-1.5 gap-2 bg-white rounded-xl">
        <p className="font-bold text-sm">{date}</p>
        <p className="font-bold text-sm">{time}</p>
      </div>

      <div className="flex-grow flex justify-start mx-4 min-w-0 p-6">
        <p className="font-bold text-sm whitespace-nowrap overflow-hidden text-ellipsis">{type}</p>
      </div>

      <div className="flex items-center space-x-4 pr-10 pl-6">
        <p className="whitespace-nowrap text-sm">{doctorName}</p>
      </div>

      <div className="flex items-center pl-4 flex-shrink-0">
        <Image src={ArrowBack} alt="Voltar" width={14} height={8} /> 
      </div>
    </div>
  );
}