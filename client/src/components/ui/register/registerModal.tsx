import React from "react";
import { LogoCITiPet } from "@/assets/index"
import Image from "next/image";


import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


export function RegistrationModal() {
    return (
        <Dialog>
            <form>


                <DialogTrigger asChild>
                    <Button variant="outline" className="bg-green-400 text-white rounded-3xl max-w-full shadow-md">Finalizar Cadastro</Button>
                </DialogTrigger>



                <DialogContent className="sm:max-w-[340px] overflow-y-auto !rounded-3xl">
                    <DialogHeader className="mt-6">
                        <div className="flex justify-center mb-4">
                            <Image src={LogoCITiPet} width={200} height={50} alt="Logo do CITi Pet" />
                        </div>
                        <DialogDescription>
                            <div className="text-center mb-4  text-black">
                                <strong className="font-bold">Cadastro finalizado!</strong> Envie o <br /> comprovante para o <strong className="font-bold text-black">tutor</strong>
                            </div>
                        </DialogDescription>""
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="tutorsEmail">E-mail</Label>
                            <Input id="tutorsEmail" name="name" className="border-black" />
                        </div>

                    </div>
                    <DialogFooter>
                        <Button type="submit" className="w-full bg-green-500 rounded-2xl shadow-md">Enviar</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}
