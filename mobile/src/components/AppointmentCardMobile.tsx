import { View, Text, Image } from "react-native";

// basicamente eu apenas atualizei os métodos inerentes ao native e modifiquei os classnames em relação ao arquivo original de matheus

interface AppointmentCardProps {
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
}: AppointmentCardProps) {
  const PetImage = require("../assets/cat-3d.png");
  const ClockIcon = require("../assets/alarm.png"); 

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
        <Image source={ClockIcon} className="w-5 h-5 opacity-90 mb-1" resizeMode="contain" />
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
        {/* Imagem do Pet */}
            <Image
                source={PetImage}
                className="w-[60px] h-[60px]"
                resizeMode="contain"
            />

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