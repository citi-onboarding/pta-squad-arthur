import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

class MailClient {
  private transporter;

  constructor() {
    const port = Number(process.env.MAIL_PORT) || 587;
    const isSecure = port === 465;

    this.transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: port,
        secure: isSecure,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
        tls: {
          rejectUnauthorized: false, 
        },
        family: 4,
        connectionTimeout: 10000, 
    } as SMTPTransport.Options); 
      
    console.log(`🔌 Configurado para: ${process.env.MAIL_HOST}:${port} (Secure: ${isSecure})`);
  }

  async sendMail(to: string, subject: string, htmlContent: string) {
    try {
      const message = await this.transporter.sendMail({
        from: `"Equipe Citi Vet" <${process.env.MAIL_USER}>`,
        to,
        subject,
        html: htmlContent,
      });

      console.log("Email enviado: %s", message.messageId);
      return message;
    } catch (error) {
      console.error("Erro ao enviar email:", error);
      throw new Error("Falha no envio de email");
    }
  }
}

export default new MailClient();