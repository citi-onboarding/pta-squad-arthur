"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { LogoCITiPet } from "@/assets/index";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api from "@/services/api";

// 1. Defina a interface dos dados que virão do formulário
interface AppointmentData {
  nomeTutor: string;
  nomePaciente: string;
  dataAtendimento: string;
  horaAtendimento: string;
  medicoResponsavel: string;
}

interface RegistrationModalProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (isOpen: boolean) => void;
  data: AppointmentData | null; // 2. Adicione essa prop nova
}

export function RegistrationModal({
  isDialogOpen,
  setIsDialogOpen,
  data, // 3. Receba a prop
}: RegistrationModalProps) {
  const [formData, setFormData] = useState({
    tutorsEmail: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    tutorsEmail: "",
    apiError: "",
  });

  // Função auxiliar para formatar a data (YYYY-MM-DD -> DD/MM/YYYY)
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;
    if (!data) return; // Segurança caso os dados não cheguem

    setErrors((prev) => ({ ...prev, apiError: "" }));
    setIsLoading(true);

    try {
      // 4. AQUI ESTÁ A CORREÇÃO: Usando os dados da prop 'data'
      const response = await api.post("/email/send-email", {
        email: formData.tutorsEmail,
        userName: data.nomeTutor, 
        petName: data.nomePaciente,
        date: formatDate(data.dataAtendimento), // Usa a função para formatar
        time: data.horaAtendimento,
        doctorName: data.medicoResponsavel
      });
      
      // Se der sucesso, fecha o modal e limpa o form (opcional)
      setIsDialogOpen(false); 
      alert("Email enviado com sucesso!");

    } catch (error) {
      console.error("Erro de conexão:", error);
      setErrors((prev) => ({
        ...prev,
        apiError: "Erro ao enviar e-mail. Tente novamente.",
      }));
    } finally {
      setIsLoading(false);
    }
  };

  // ... (manter o validateForm e o return do JSX iguais) ...
  const validateForm = () => {
    let isValid = true;
    let newErrors = { tutorsEmail: "", apiError: "" };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.tutorsEmail.trim()) {
      newErrors.tutorsEmail = "O e-mail do tutor é obrigatório.";
      isValid = false;
    } else if (!emailRegex.test(formData.tutorsEmail)) {
      newErrors.tutorsEmail = "Por favor, insira um formato de e-mail válido.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="sm:max-w-[340px] overflow-y-auto !rounded-3xl [&>button]:top-8  [&>button]:right-8 [&>button_svg]:h-12">
        <form onSubmit={handleSubmit}>
          <DialogHeader className="mt-6">
            <div className="flex justify-center mb-4">
              <Image
                src={LogoCITiPet}
                width={200}
                height={50}
                alt="Logo do CITi Pet"
              />
            </div>
            <DialogDescription>
              <div className="text-center mb-4 text-black">
                <strong className="font-bold">Cadastro finalizado!</strong>{" "}
                Envie o <br /> comprovante para o{" "}
                <strong className="font-bold text-black">{data?.nomeTutor || "tutor"}</strong>
              </div>
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="tutorsEmail">E-mail</Label>
              <Input
                id="tutorsEmail"
                name="tutorsEmail"
                className="border-black pl-4"
                type="email"
                value={formData.tutorsEmail}
                onChange={handleChange}
                required
                placeholder="Digite aqui..."
              />
              {errors.tutorsEmail && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.tutorsEmail}
                </p>
              )}
            </div>
            {errors.apiError && (
              <p className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">
                {errors.apiError}
              </p>
            )}
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="w-full bg-green-500 rounded-2xl shadow-md mt-10"
              disabled={isLoading}
            >
              {isLoading ? "Enviando..." : "Enviar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}