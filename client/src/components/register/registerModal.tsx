'use client';

import React, { useState, ChangeEvent, FormEvent } from "react";
import { LogoCITiPet } from "@/assets/index"
import Image from "next/image";


import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface RegistrationModalProps {
    isDialogOpen: boolean;
    setIsDialogOpen: (isOpen: boolean) => void;
}


export function RegistrationModal({ isDialogOpen, setIsDialogOpen }: RegistrationModalProps) {

    const [formData, setFormData] = useState({
        tutorsEmail: "",
    });

    const [isLoading, setIsLoading] = useState(false);

    const [errors, setErrors] = useState({
        tutorsEmail: "",
        apiError: "", // for errors returned from the API
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [id]: value,
        }));
    };


    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();


        if (!validateForm()) {

            return;
        }


        setErrors(prev => ({ ...prev, apiError: "" }));
        setIsLoading(true);


        setTimeout(() => {
            setIsLoading(false);

            const isSuccess = Math.random() > 0.5;

            if (isSuccess) {
                console.log("Simulação de cadastro bem sucedida");
                setIsDialogOpen(false);

            } else {
                console.log("Simulação de falha de API: E-mail já cadastrado");

                setErrors(prev => ({ ...prev, apiError: "Ocorreu um erro: E-mail já está cadastrado ou servidor indisponível." }));
            }
        }, 1500);
    };

    const validateForm = () => {
        let isValid = true;
        let newErrors = { tutorsEmail: "", apiError: "" };
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // simple regex for email

        if (!formData.tutorsEmail.trim()) {
            newErrors.tutorsEmail = "O e-mail do tutor é obrigatório.";
            isValid = false;
        }
        // format validation
        else if (!emailRegex.test(formData.tutorsEmail)) {
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
                            <Image src={LogoCITiPet} width={200} height={50} alt="Logo do CITi Pet" />
                        </div>
                        <DialogDescription>
                            <div className="text-center mb-4  text-black">
                                <strong className="font-bold">Cadastro finalizado!</strong> Envie o <br /> comprovante para o <strong className="font-bold text-black">tutor</strong>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="tutorsEmail">E-mail</Label>
                            <Input id="tutorsEmail" name="tutorsEmail" className="border-black pl-4" type="email" value={formData.tutorsEmail} onChange={handleChange} required placeholder="Digite aqui..." />

                            {errors.tutorsEmail && (<p className="text-red-500 text-sm mt-1">{errors.tutorsEmail}</p>)}
                        </div>

                    </div>
                    <DialogFooter>
                        <Button type="submit" className="w-full bg-green-500 rounded-2xl shadow-md mt-10" disabled={isLoading}>{isLoading ? "Enviando..." : "Enviar"}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>

        </Dialog>
    )
}
