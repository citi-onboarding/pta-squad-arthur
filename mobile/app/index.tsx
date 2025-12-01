import { useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { AppointmentCardMobile } from "../src/components/AppointmentCardMobile";


const sun = require("../src/assets/sun.png");
const cloud = require("../src/assets/cloud.png");
const moon = require("../src/assets/moon.png");
const logo = require("../src/assets/logo-citi.png");

// APPOINTMENTS é um array com vários objetos, cada um representando uma consulta.

const APPOINTMENTS = [
  {
    date: "18/02",
    time: "09:00",
    petName: "Luna",
    ownerName: "João Alves",
    doctorName: "José Carlos",
    consultationType: "Primeira Consulta",
  },
  {
    date: "18/02",
    time: "14:00",
    petName: "Luna",
    ownerName: "João Alves",
    doctorName: "José Carlos",
    consultationType: "Primeira Consulta",
  },
   {
    date: "18/02",
    time: "14:00",
    petName: "Luna",
    ownerName: "João Alves",
    doctorName: "José Carlos",
    consultationType: "Primeira Consulta",
  },
   {
    date: "18/02",
    time: "14:00",
    petName: "Luna",
    ownerName: "João Alves",
    doctorName: "José Carlos",
    consultationType: "Primeira Consulta",
  },
   {
    date: "18/02",
    time: "14:00",
    petName: "Luna",
    ownerName: "João Alves",
    doctorName: "José Carlos",
    consultationType: "Primeira Consulta",
  },
  {
    date: "18/02",
    time: "19:00",
    petName: "Luna",
    ownerName: "João Alves",
    doctorName: "José Carlos",
    consultationType: "Primeira Consulta",
  },
];


// Função auxiliar que decide se um horário pertence a um período do dia: manhã, tarde ou noite
function filterByPeriod(hour: number, period: "morning" | "afternoon" | "night") {
  if (period === "morning") return hour < 12;
  if (period === "afternoon") return hour >= 12 && hour < 18;
  return hour >= 18;
}

export default function Home() {
  // cria o estado chamado selected
  const [selected, setSelected] = useState<"morning" | "afternoon" | "night">("morning");

  // filteredAppointments é a lista de consultas filtrada pelo período selecionado.
  // appt é uma função que recebe cada consulta individual 
  const filteredAppointments = APPOINTMENTS.filter((appt) => {
    const [h] = appt.time.split(":");
    return filterByPeriod(Number(h), selected);
  });

  return (
    <View className="flex-1 bg-white">
      {/*scroll envolve todo o conteudo que pode rolar, caso venha muita coisa
      showsVerticalScrollIndicator={false} esconde a barrinha de scroll, parece melhor aos olhos*/}
      <ScrollView 
        contentContainerStyle={{ paddingBottom: 120, paddingTop: 60 }} 
        className="px-6"
        showsVerticalScrollIndicator={false}
      >
        
        <View className="items-center mb-8">
          <Image
            source={logo}
            className="w-10/12 max-w-[143px]"
            style={{ aspectRatio: 143 / 54 }}
            resizeMode="contain"
          />
        </View>

        <View className="mb-8">
            <Text className="text-2xl font-bold text-black mb-1">Sua agenda</Text>
            <Text className="text-sm text-gray-500 leading-relaxed">
            Veja aqui todos os seus pacientes agendados para hoje.
            </Text>
        </View>
        
        {/*não estava conseguindo fazer a sombra ficar igual ao figma, por isso criei uma personalizada, tipo css e imagino que
        isso fará com que o mesmo detalhe seja inerente à ios ou android (eu acho kkk)*/}
        <View className="flex-row items-center justify-between self-center
            bg-white border border-gray-100
            w-10/12 max-w-[252px]    
            aspect-[252/70]           
            rounded-[32px]            
            px-6                       
            mb-8"
            style={{
                shadowColor: '#000000',         
                shadowOffset: { width: 0, height: 1 }, 
                shadowOpacity: 0.3,      
                shadowRadius: 4,               
                elevation: 2,                   
              }}>

                 {/* TouchableOpacity é o que permite fazer dos ícones botões clicáveis*/}
          <TouchableOpacity
            className={`p-2 rounded-full ${selected === "morning" ? "bg-yellow-100" : ""}`}
            onPress={() => setSelected("morning")}
          >
            <Image source={sun} className="w-6 h-6" resizeMode="contain" />
          </TouchableOpacity>

          <TouchableOpacity
            className={`p-2 rounded-full ${selected === "afternoon" ? "bg-blue-100" : ""}`}
            onPress={() => setSelected("afternoon")}
          >
            <Image source={cloud} className="w-6 h-6" resizeMode="contain" />
          </TouchableOpacity>

          <TouchableOpacity
            className={`p-2 rounded-full ${selected === "night" ? "bg-purple-100" : ""}`}
            onPress={() => setSelected("night")}
          >
            <Image source={moon} className="w-6 h-6" resizeMode="contain" />
          </TouchableOpacity>
        </View>

          {/* filteredAppointments: map percorre cada consulta filtrada.
                                    Para cada appt, renderiza um AppointmentCardMobile.
                                    {...appt}: espalha todas as propriedades do objeto como props do componente: */}
        <View className="gap-2">
          {filteredAppointments.map((appt, index) => (
            <AppointmentCardMobile key={index} {...appt} />
          ))}
          {filteredAppointments.length === 0 && (
              <Text className="text-center text-gray-400 mt-10">Nenhuma consulta neste período.</Text>
          )}
        </View>

      </ScrollView>

      <View className="w-full max-w-[414px]
          h-[75px]
          bg-[#70DB93]
          absolute bottom-0 left-0
          rounded-t-[24px]
          items-center justify-end
          pb-5">
        
      </View>
      
    </View>
  );
}