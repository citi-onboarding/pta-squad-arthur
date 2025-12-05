import { Request, Response } from "express";
import MailService from "../services/MailService";
import { mailTemplate } from "src/services/MailTemplate";

export class EmailController {
  async sendConfirmation(req: Request, res: Response) {
    const { email, userName, petName, date, time, doctorName } = req.body;

    if (!email || !petName || !date || !time) {
      return res.status(400).json({ 
        error: "Email, petName, date e time são obrigatórios" 
      });
    }

    const emailBody = mailTemplate(
      userName || "Tutor(a)",
      petName,
      date,
      time,
      doctorName || "Veterinário"
    );

    try {
      console.log("📧 Enviando confirmação para:", email);
      await MailService.sendMail(email, "Agendamento Confirmado! 🎉", emailBody);
      
      console.log("✓ Email enviado com sucesso!");
      return res.status(200).json({ message: "E-mail enviado com sucesso!" });
    } catch (error) {
      console.error("❌ Erro ao enviar email:", error);
      return res.status(500).json({ error: "Erro ao enviar e-mail" });
    }
  }
}