import nodemailer from "nodemailer";

class MailClient {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: Number(process.env.MAIL_PORT),
        secure: false, // Para Gmail use o STARTTLS (não SSL)
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      });

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
