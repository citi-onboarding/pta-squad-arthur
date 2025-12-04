import { View, Text, Image } from "react-native";
import { Cat, Dog, Cow, Sheep, Pig, Alarm } from "@assets";
import React, { useEffect, useState } from "react";
import { getSpeciesByPatientId } from "../../services/Patient";

interface AppointmentCardProps {
  patientId: string;
  date: string;
  time: string;
  petName: string;
  ownerName: string;
  doctorName: string;
  species?: string;
  consultationType: string;
}

export function AppointmentCardMobile({
  date,
  time,
  petName,
  ownerName,
  doctorName,
  consultationType,
  patientId,
  species: speciesProp
}: AppointmentCardProps) {

  const [currentSpecies, setCurrentSpecies] = useState<string | undefined>(speciesProp || "");

  const fetchSpecies = async () => {
    if (speciesProp) {
      return;
    }

    try {
      const result = await getSpeciesByPatientId(patientId);
      setCurrentSpecies(result);
    } catch (error) {
      console.error("Erro ao buscar espécie do paciente no card:", error);
    }
  }

  useEffect(() => {
    fetchSpecies();
  }, [patientId]);

  let bgColor = "";
  switch (consultationType) {
    case "Primeira Consulta":
      bgColor = "bg-[#BFB5FF]";
      break;
    case "Vacinação":
      bgColor = "bg-[#AAE1FF]";
      break;
    case "Check-up":
      bgColor = "bg-[#9CFF95]";
      break;
    default:
      bgColor = "bg-[#FF641999]";
  }

  const renderSpeciesImage = () => {
    const imgWidth = 56.26;
    const imgHeight = 57;

    if (currentSpecies === "DOG") {
      return (
        <Image 
          source={Dog} 
          style={{ width: imgWidth, height: imgHeight }} 
          resizeMode="contain"
          fadeDuration={0} // <--- ISSO REMOVE O ATRASO VISUAL
        />
      );
    }

    let SvgComponent;
    switch (currentSpecies) {
      case "CAT":
        SvgComponent = Cat;
        break;
      case "COW":
        SvgComponent = Cow;
        break;
      case "SHEEP":
        SvgComponent = Sheep;
        break;
      case "PIG":
        SvgComponent = Pig;
        break;
      default:
        SvgComponent = Cat; 
    }

    return <SvgComponent width={imgWidth} height={imgHeight} />;
  };

  return (
    <View className={`flex-row justify-between items-center
                    w-full max-w-[358px]
                    h-[122px]
                    rounded-[16px]
                    px-6 py-4
                    ${bgColor} 
                    mb-3 shadow-sm`}>
      
      <View className=" bg-white/80    
            rounded-[4px]     
            px-[6px] py-[12px] 
            items-center
            gap-[8px]">

        <Alarm width={20} height={20} />
        <Text className="text-xs font-bold text-gray-800">{date}</Text>
        <Text className="text-xs font-bold text-gray-800">{time}</Text>
      </View>

      <View className="flex-1 justify-center ml-4">
        <View className="flex-row items-baseline flex-wrap">
            <Text className="text-base font-bold text-gray-900">{petName}</Text>
            <Text className="text-sm text-gray-600 font-normal"> / {ownerName}</Text>
        </View>
        <Text className="text-sm text-gray-700 mt-1 font-medium">Dr. {doctorName}</Text>
      </View>

      <View className="justify-between items-center py-1 mr-4">
        
        {renderSpeciesImage()}

        <View className="bg-white rounded-lg px-3 py-1 shadow-sm mt-1">
            <Text
              className="text-[10px] font-bold text-gray-800"
              numberOfLines={1} 
            >
              {consultationType}
            </Text>
        </View>
      </View>
    </View>
  );
}