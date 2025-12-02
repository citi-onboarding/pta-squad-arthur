'use client';

import React, { useState, ChangeEvent, FormEvent } from "react";
// import { LogoCITiPet } from "@/assets/index" // Descomente no seu projeto
// import Image from "next/image"; // Descomente no seu projeto

// Placeholder para funcionar aqui na visualização (Remova no seu projeto)
const LogoCITiPet = "https://placehold.co/200x50/png?text=Logo+CITi+Pet";

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function RegistrationModal() {

    const [formData, setFormData] = useState({
        tutorsEmail: "",
    });

    const [isLoading, setIsLoading] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const [errors, setErrors] = useState({
        tutorsEmail: "",
        apiError: "",
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setErrors(prev => ({ ...prev, apiError: "" }));
        setIsLoading(true);

        try {
            // Chamada real para o seu Backend na porta 3001
            const response = await fetch("http://localhost:3001/send-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: formData.tutorsEmail,
                    // Como o backend exige nome e data, estamos enviando automáticos por enquanto
                    petName: "Pet Cadastrado", 
                    date: new Date().toLocaleDateString('pt-BR'),
                    time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
                }),
            });

            if (response.ok) {
                console.log("Email enviado com sucesso!");
                setFormData({ tutorsEmail: "" }); // Limpa o campo
                setIsDialogOpen(false); // Fecha o modal
            } else {
                const data = await response.json();
                setErrors(prev => ({ 
                    ...prev, 
                    apiError: data.error || "Erro ao enviar o e-mail. Tente novamente." 
                }));
            }
        } catch (error) {
            console.error("Erro de conexão:", error);
            setErrors(prev => ({ 
                ...prev, 
                apiError: "Erro de conexão. Verifique se o backend está rodando na porta 3001." 
            }));
        } finally {
            setIsLoading(false);
        }
    };

    const validateForm = () => {
        let isValid = true;
        let newErrors = { tutorsEmail: "", apiError: "" };
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formData.tutorsEmail.trim()) {
            newErrors.tutorsEmail = "O e-mail do tutor é obrigatório.";
            isValid = false;
        }
        else if (!emailRegex.test(formData.tutorsEmail)) {
            newErrors.tutorsEmail = "Por favor, insira um formato de e-mail válido.";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild >
                <Button variant="outline" className="bg-green-400 text-white rounded-3xl max-w-full shadow-md hover:bg-green-500" onClick={() => setIsDialogOpen(true)}>
                    Finalizar Cadastro
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[340px] overflow-y-auto !rounded-3xl [&>button]:top-8 [&>button]:right-8 [&>button_svg]:h-12">
                <form onSubmit={handleSubmit}>
                    <DialogHeader className="mt-6">
                        <div className="flex justify-center mb-4">
                            {/* Ajustado para img padrão para funcionar no preview */}
                            {/* No seu projeto, volte para <Image src={LogoCITiPet} ... /> */}
                            <img 
                                src={LogoCITiPet} 
                                width={200} 
                                height={50} 
                                alt="Logo do CITi Pet" 
                                style={{ objectFit: 'contain' }}
                            />
                        </div>
                        <DialogDescription>
                            <div className="text-center mb-4 text-black">
                                <strong className="font-bold">Cadastro finalizado!</strong> Envie o <br /> comprovante para o <strong className="font-bold text-black">tutor</strong>
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
                            {errors.tutorsEmail && (<p className="text-red-500 text-sm mt-1">{errors.tutorsEmail}</p>)}
                        </div>
                        
                        {/* Exibe erro da API se houver */}
                        {errors.apiError && (
                            <p className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">
                                {errors.apiError}
                            </p>
                        )}
                    </div>

                    <DialogFooter>
                        <Button type="submit" className="w-full bg-green-500 rounded-2xl shadow-md mt-10" disabled={isLoading}>
                            {isLoading ? "Enviando..." : "Enviar"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}