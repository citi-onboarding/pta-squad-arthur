import nodemailer from "nodemailer";

class MailClient {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },

        tls: {
          rejectUnauthorized: false,
          ciphers: "SSLv3"
        },
        
        debug: true,
        logger: true, 
        connectionTimeout: 10000,
      });
  }

  async sendMail(to: string, subject: string, htmlContent: string) {
    try {
      console.log(`📨 Tentando enviar email via Porta 465 para: ${to}`);
      
      const message = await this.transporter.sendMail({
        from: `"Equipe Citi Vet" <${process.env.MAIL_USER}>`,
        to,
        subject,
        html: htmlContent,
      });

      console.log("✅ Email enviado com sucesso! ID:", message.messageId);
      return message;
    } catch (error) {
      console.error("❌ Erro FATAL ao enviar email:", error);
      throw error; // Joga o erro para o Controller pegar
    }
  }
}

export default new MailClient();