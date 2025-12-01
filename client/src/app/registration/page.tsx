  "use client";
  import { useForm, Controller } from "react-hook-form";
  import { useState, useEffect } from "react";
  import { Textarea } from "@/components/ui/textarea";
  import { Input } from "@/components/ui/input";
  import { Button } from "@/components/ui/button";
  import { AlarmIcon } from "@/assets";
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  import Image from "next/image";
  import { Cat, Cow, Dog, Horse, Pig, Sheep } from "@/assets";
  import { CalendarIcon } from "@/assets";
  import { RegistrationModal } from "@/components/register/registerModal";

  interface FormData {
    nomePaciente: string;
    nomeTutor: string;
    animal: string;
    idadePaciente: string;
    tipoConsulta: string;
    medicoResponsavel: string;
    dataAtendimento: string;
    horaAtendimento: string;
    descricao: string;
  }

  export default function Home() {
    const { control, handleSubmit, setValue, formState: { errors } } = useForm<FormData>();
    const [selectedAnimal, setSelectedAnimal] = useState<string | null>(null); // estado para rastrear o animal selecionado ao clicar nele
    const [isDialogOpen, setIsDialogOpen] = useState(false); // estado para controlar a abertura do modal de e-mail de confirmação

    const animals = [
      { name: "Ovelha", src: Sheep },
      { name: "Gato", src: Cat },
      { name: "Porco", src: Pig },
      { name: "Vaca", src: Cow },
      { name: "Cavalo", src: Horse },
      { name: "Cachorro", src: Dog },
    ];

const onSubmit = (data: FormData) => { // função que e ativada após a validação bem-sucedida do formulário
        const ageNumber = parseInt(data.idadePaciente, 10); // convertendo a idade que ta em string para numero
        const [day, month, year] = data.dataAtendimento.split('/'); // data para o formato do bd
        const datetimeISO = `${year}-${month}-${day}T${data.horaAtendimento}:00.000Z`; // hora para o formato do bd
        const patientData = { // estrutura os dados do paciente para o bd no formato depois de ser convertido (paciente/nome do tutor etc aqui)
            name: data.nomePaciente,
            tutorName: data.nomeTutor,
            age: ageNumber,
            species: data.animal,
        };
        const consultationData = { // estrutura os dados da consulta para o bd no formato depois de ser convertido (medico/data etc aqui)
            doctorName: data.medicoResponsavel,
            description: data.descricao,
            type: data.tipoConsulta,
            datetime: datetimeISO,
        };
        console.log(data); // dados enviados do próprio formulário sem tá com as alteracoes do bd
        console.log(patientData); // dados de paciente formatados para o bd já
        console.log(consultationData); // dados de consulta formatados para o bd já
        setIsDialogOpen(true); // abre o modal aqui
    };

    useEffect(() => {
      if (selectedAnimal) { // usa o hook useEffect para sincronizar o estado local "selectedAnimal" com o campo "animal" do hookform
        setValue("animal", selectedAnimal, { shouldValidate: true }); // usa setValue para atualizar o valor do campo 'animal' no formulário quando o animal for escolhido
      }
    }, [selectedAnimal, setValue]);

    return (
      <main className="min-h-screen bg-white py-12 px-4 md:px-8 font-sans">
        <div className="max-w-7xl mx-auto flex flex-col">
          <div className="flex flex-col items-start gap-6">
            <h1 className="text-5xl font-bold">Cadastro</h1>
            
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              <div className="flex w-full gap-4 mb-4">
                {/* campo do paciente */}
                <div className="flex flex-col gap-2 w-1/2"> 
                  <span className="text-1xl font-bold">Nome do paciente</span>
                  <Controller
                    name="nomePaciente"
                    control={control}
                    defaultValue=""
                    rules={{ 
                    required: "Nome do paciente é obrigatório",
                    pattern: {
                      value: /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, // regex para aceitar apenas letras e espaços
                      message: "O nome do paciente deve conter apenas letras e espaços",
                    } 
                  }} // define sendo obrigátorio o campo
                    render={({ field }) => (
                      <Input {...field} className="w-full h-12 px-4" placeholder="Digite aqui..." /> 
                    )}
                  />
                  {errors.nomePaciente && <span className="text-red-500 text-sm">{typeof errors.nomePaciente.message === 'string' ? errors.nomePaciente.message : ''}</span>}
                </div>
                      
                <div className="flex flex-col gap-2 w-1/2">
                  <span className="text-1xl font-bold">Nome do tutor</span>
                  <Controller
                    name="nomeTutor"
                    control={control}
                    defaultValue=""
                    rules={{ 
                    required: "Nome do tutor é obrigatório",
                    pattern: {
                      value: /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, // regex para aceitar apenas letras e espaços
                      message: "O nome do tutor deve conter apenas letras e espaços",
                    }
                  }}
                    render={({ field }) => (
                      <Input {...field} className="w-full h-12 px-4" placeholder="Digite aqui..." />
                    )}
                  />
                  {errors.nomeTutor && <span className="text-red-500 text-sm">{typeof errors.nomeTutor.message === 'string' ? errors.nomeTutor.message : ''}</span>}
                </div>
              </div>
              <div className="flex flex-col gap-4 mb-4">
                
                <span className="text-1xl font-bold">Qual a espécie do paciente?</span>
                <div className="grid grid-cols-3 gap-4 md:grid-cols-6 md:gap-5">
                  {animals.map((animal) => (
                    <div
                      key={animal.name}
                      className={`cursor-pointer rounded-lg p-1 transition flex flex-col items-center ${selectedAnimal === animal.name ? "bg-gray-300" : "bg-transparent"} hover:bg-gray-200`}
                      onClick={() => setSelectedAnimal(animal.name)} // aqui muda o estado do animal, mudando o fundo dele pra cinza quando selecionar
                    >
                      <Image 
                        src={animal.src} 
                        alt={animal.name} 
                        className="w-[6rem] h-[6rem]" 
                      />
                      <span className="mt-1 block text-lg font-semibold">{animal.name}</span>
                    </div>
                  ))}
                </div>
                  {errors.animal && <span className="text-red-500 text-sm">{typeof errors.animal.message === 'string' ? errors.animal.message : ''}</span>}          
              </div>
              
              <Controller
                name="animal"
                control={control}
                defaultValue=""
                rules={{ required: "Selecione um animal" }} 
                render={({ field }) => <input type="hidden" {...field} />}  
              />

              <div className="flex w-full gap-4 mb-4"> 
                <div className="flex flex-col gap-2 w-1/2"> 
                  <span className="text-1xl font-bold">Idade do paciente</span> 
                  <Controller
                    name="idadePaciente" // campo de idade e selecao de consulta
                    control={control}
                    defaultValue=""
                    rules={{
                      required: "Idade do paciente é obrigatória",
                      pattern: {
                        value: /^[0-9]+$/, // botei regex para aceitar que só seja número selecionado
                        message: "A idade deve ser um número válido",
                      }
                    }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        className="w-full h-12 px-4"
                        placeholder="Digite aqui..."
                        type="text" // escolhi em formato de texto pra ser mais pratico e controlar melhor o regex
                      />
                    )}
                  />
                  {errors.idadePaciente && <span className="text-red-500 text-sm">{typeof errors.idadePaciente.message === 'string' ? errors.idadePaciente.message : ''}</span>}
                </div>
                <div className="flex flex-col gap-2 w-1/2">
                  <span className="text-1xl font-bold">Tipo de consulta</span>
                  <Controller
                    name="tipoConsulta"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Tipo de consulta é obrigatório" }}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}> 
                        <SelectTrigger className="w-full h-12">
                          <SelectValue placeholder="Selecione aqui" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="vacinacao">Vacinação</SelectItem> 
                          <SelectItem value="primeira-consulta">Primeira Consulta</SelectItem>
                          <SelectItem value="checkup">Check-up</SelectItem>
                          <SelectItem value="retorno">Retorno</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.tipoConsulta && <span className="text-red-500 text-sm">{typeof errors.tipoConsulta.message === 'string' ? errors.tipoConsulta.message : ''}</span>}
                </div>
              </div>
                          {/* campo de medico data e hora */}
              <div className="flex w-full gap-4 mb-4">
                <div className="flex flex-col gap-2 w-2/5">
                  <span className="text-1xl font-bold">Médico Responsável</span>
                  <Controller
                    name="medicoResponsavel"
                    control={control}
                    defaultValue=""
                    rules={{ 
                    required: "Médico responsável é obrigatório",
                    pattern: {
                      value: /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, // regex para aceitar apenas letras e espaços
                      message: "O nome do médico deve conter apenas letras e espaços",
                    }
                  }}
                    render={({ field }) => (
                      <Input {...field} className="w-full h-12 px-4" placeholder="Digite aqui..." />
                    )}
                  />
                  {errors.medicoResponsavel && <span className="text-red-500 text-sm">{typeof errors.medicoResponsavel.message === 'string' ? errors.medicoResponsavel.message : ''}</span>}
                </div>

                <div className="flex flex-col gap-2 w-1/3">
                  <span className="text-1xl font-bold">Data do atendimento</span>
                  <div className="relative">
                      <Controller
                        name="dataAtendimento"
                        control={control}
                        defaultValue=""
                        rules={{
                          required: "Data do atendimento é obrigatória",
                          pattern: {
                            value: /^\d{2}\/\d{2}\/\d{4}$/, // regex para o formato a ser aceito é o de dia/mes/ano
                            message: "A data deve estar no formato DD/MM/AAAA"
                          }
                        }}
                        render={({ field }) => (
                          <Input
                            type="text" // também deixei em texto para melhor controle de regex
                            {...field}
                            className="w-full h-12 px-4 rounded-lg border-2 border-gray-300 justify-start"
                            placeholder="dd/mm/aaaa   "
                          />
                        )}
                      />
                      <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
                        <Image 
                          src={CalendarIcon} 
                          width={20} 
                          height={20} 
                          alt="Calendário" 
                        />
                      </span>
                    </div>
                    {errors.dataAtendimento && <span className="text-red-500 text-sm">{typeof errors.dataAtendimento.message === 'string' ? errors.dataAtendimento.message : ''}</span>}
                  </div>
                <div className="flex flex-col gap-2 w-1/3">
                  <span className="text-1xl font-bold">Horário do atendimento</span>
                  <div className="relative">
                  <Controller
                    name="horaAtendimento"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: "Horário do atendimento é obrigatório",
                      pattern: {
                        value: /^\d{2}:\d{2}$/, // tambem formato de regex pra aceitar apenas formato hora/minuto com 2 numeros de hora (01,02,11,12 etc) e 2 numeros pra minuto(05,06,12,50)
                        message: "O horário deve estar no formato HH:MM",
                      },
                    }}
                    render={({ field }) => (
                      <Input {...field} className="w-full h-12 px-4" placeholder="00:00" />
                    )}
                  />
                  <Image
                    src={AlarmIcon}
                    width={20}
                    height={20}
                    alt="Relógio"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
                  />
                </div>
                  {errors.horaAtendimento && <span className="text-red-500 text-sm">{typeof errors.horaAtendimento.message === 'string' ? errors.horaAtendimento.message : ''}</span>}
                </div>
              </div>
                      {/* campo de descricao */}
              <div className="flex flex-col gap-2 w-full">
                <span className="text-1xl font-bold">Descrição</span>
                <Controller
                  name="descricao"
                  control={control}
                  defaultValue=""
                  rules={{ required: "A descrição do atendimento é obrigatória" }} // adicionado a obrigatoriedade do campo de descrição, sendo necessário ter algo na descrição para enviar o formulário tbm
                  render={({ field }) => (
                    <Textarea {...field} className="w-full h-32 resize-none" placeholder="Digite aqui..." /> 
                  )}
                />
                {errors.descricao && <span className="text-red-500 text-sm">{typeof errors.descricao.message === 'string' ? errors.descricao.message : ''}</span>}
              </div>
                             {/* campo de envio de dados */}
              <div className="flex justify-end w-full mt-4">
                <Button type="submit" className="bg-[#70DB93] text-white px-6 py-3 rounded-full">
                  Finalizar Cadastro
                </Button>
              </div>
            </form>
          </div>
        </div>
        <RegistrationModal isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} />
      </main>
    );
  }