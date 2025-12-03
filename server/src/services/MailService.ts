import nodemailer from "nodemailer";

class MailClient {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail', // <--- O "Pulo do Gato": Deixa o Nodemailer ajustar configurações ocultas
      host: "smtp.gmail.com",
      port: 587,        // Porta padrão de envio (TLS)
      secure: false,    // OBRIGATÓRIO ser false para porta 587
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false, // Ignora erro de certificado do container
        ciphers: "SSLv3"
      },
      // Configurações de Debug
      debug: true,
      logger: true 
    });
  }

  async sendMail(to: string, subject: string, htmlContent: string) {
    try {
      console.log(`📨 Tentando enviar via Porta 587 (TLS) para: ${to}`);
      
      const message = await this.transporter.sendMail({
        from: `"Equipe Citi Vet" <${process.env.MAIL_USER}>`,
        to,
        subject,
        html: htmlContent,
      });

      console.log("✅ Email enviado! ID:", message.messageId);
      return message;
    } catch (error) {
      console.error("❌ Erro no envio:", error);
      throw error;
    }
  }
}

export default new MailClient();