import nodemailer from "nodemailer";

class MailClient {
  private transporter;

  constructor() {
    const isSecure = process.env.MAIL_PORT === '465';

    this.transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: Number(process.env.MAIL_PORT),
        secure: isSecure,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
        tls: {
          rejectUnauthorized: false
        },
        connectionTimeout: 10000, 
      });
      
      console.log(`🔌 Tentando conectar em: ${process.env.MAIL_HOST}:${process.env.MAIL_PORT} (Secure: ${isSecure})`);
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