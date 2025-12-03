import nodemailer from "nodemailer";

class MailClient {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: Number(process.env.MAIL_PORT),
        secure: false,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
        tls: {
          rejectUnauthorized: false
        },
        connectionTimeout: 10000,
        socketTimeout: 10000,
      });

      this.transporter.verify((error, success) => {
        if (error) {
            console.error("🔴 Erro na conexão SMTP:", error);
        } else {
            console.log("🟢 Servidor de Email pronto!");
        }
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