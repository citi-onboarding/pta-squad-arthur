import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import { AppointmentCardMobile } from "../src/components/AppointmentCardMobile";
import { getAllConsultations } from "../services/Consultation";

import { 
  LogoCiti,
  Sun,
  Cloud,
  Moon
 } from "@assets";


// Interface para os dados FORMATADOS que o Card espera
interface FormattedAppointment {
  id: string;
  date: string;
  time: string;
  petName: string;
  ownerName: string;
  doctorName: string;
  consultationType: string;
  rawDate: Date; // Usado para ordenar/filtrar
  patientId: string;
}

// Função auxiliar que decide se um horário pertence a um período do dia
function filterByPeriod(hour: number, period: "morning" | "afternoon" | "night") {
  if (period === "morning") return hour < 12;
  if (period === "afternoon") return hour >= 12 && hour < 18;
  return hour >= 18;
}

export default function Home() {
  const [selected, setSelected] = useState<"morning" | "afternoon" | "night">("morning");
  const [appointments, setAppointments] = useState<FormattedAppointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const dataFromApi = await getAllConsultations();
      
      const formattedData = dataFromApi.map((item) => {
        const dateObj = new Date(item.datetime);
        
        return {
          id: item.id,
          date: dateObj.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
          time: dateObj.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
          petName: item.patient?.name || "Paciente",
          ownerName: item.patient?.tutorName || "Tutor",
          doctorName: item.doctorName,
          consultationType: item.type,
          rawDate: dateObj,
          patientId: item.patientId
        };
      });

      setAppointments(formattedData);
    } catch (error) {
      console.log("Erro ao carregar dados:", error);
    } finally {
      setLoading(false);
    }
  };

  // Lógica de filtro aplicada aos dados reais
  const filteredAppointments = appointments.filter((appt) => {
    // Pegamos a hora direto do objeto Date real
    const hour = appt.rawDate.getHours();
    return filterByPeriod(hour, selected);
  });

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#70DB93" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <ScrollView 
        contentContainerStyle={{ paddingBottom: 150, paddingTop: 60 }} 
        className="px-6"
        showsVerticalScrollIndicator={false}
      >
        
        <View className="items-center mb-8">
          <LogoCiti></LogoCiti>
        </View>

        <View className="mb-8">
            <Text className="text-2xl font-bold text-black mb-1">Sua agenda</Text>
            <Text className="text-sm text-gray-500 leading-relaxed">
            Veja aqui todos os seus pacientes agendados para hoje.
            </Text>
        </View>
        
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

          <TouchableOpacity
            className={`p-2 rounded-full ${selected === "morning" ? "bg-yellow-100" : ""}`}
            onPress={() => setSelected("morning")}
          >
            <Cloud></Cloud>
          </TouchableOpacity>

          <TouchableOpacity
            className={`p-2 rounded-full ${selected === "afternoon" ? "bg-blue-100" : ""}`}
            onPress={() => setSelected("afternoon")}
          >
            <Sun></Sun>
          </TouchableOpacity>

          <TouchableOpacity
            className={`p-2 rounded-full ${selected === "night" ? "bg-purple-100" : ""}`}
            onPress={() => setSelected("night")}
          >
            <Moon></Moon>
          </TouchableOpacity>
        </View>

        <View className="gap-2">
          {filteredAppointments.map((appt) => (
            // Usamos o ID do banco como key
            <AppointmentCardMobile key={appt.id} {...appt} />
          ))}
          {filteredAppointments.length === 0 && (
              <Text className="text-center text-gray-400 mt-10">Nenhuma consulta neste período.</Text>
          )}
        </View>

      </ScrollView>

      {/* Aumentei a altura e o paddingBottom */}
      <View className="w-full max-w-[414px]
          h-[110px]
          bg-[#70DB93]
          absolute bottom-0 left-0
          rounded-t-[24px]
          items-center justify-end
          pb-8"> 
      </View>
      
    </View>
  );
}