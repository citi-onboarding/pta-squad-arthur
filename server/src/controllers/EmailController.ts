import { Request, Response } from "express";
import MailService from "../services/MailService";

export class EmailController {
  async sendConfirmation(req: Request, res: Response) {
    

    const { email, petName, date, time } = req.body;

    // Verifica se os dados chegaram
    if (!email || !petName) {
      console.log(" ERRO: Faltando email ou petName.");
      return res.status(400).json({ error: "Email e nome do paciente são obrigatórios" });
    }

    const emailBody = `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="color: #8257E5;">Consulta Confirmada! </h2>
        <p>Olá,</p>
        <p>A consulta do pet foi agendada com sucesso.</p>
        <p><strong>Data:</strong> ${date}</p>
        <p><strong>Horário:</strong> ${time}</p>
      </div>
    `;

    try {
      console.log("🚀 Tentando enviar para o MailService...");
      
      // logs credenciais (Para ver se o .env foi lido)
      console.log(" Status das Credenciais:");
      console.log("   - Usuário:", process.env.MAIL_USER ? "OK (Carregado)" : "ERRO (Vazio)");
      console.log("   - Senha:", process.env.MAIL_PASS ? "OK (Carregado)" : "ERRO (Vazio)");

      await MailService.sendMail(email, "Confirmação de Agendamento", emailBody);
      
      console.log(" SUCESSO! Email enviado.");
      return res.status(200).json({ message: "E-mail enviado com sucesso!" });
    } catch (error) {
      console.log(" ERRO FATAL NO ENVIO (Veja abaixo):");
      console.error(error);
      return res.status(500).json({ error: "Erro interno ao enviar e-mail" });
    }
  }
}