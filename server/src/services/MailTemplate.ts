export function mailTemplate(userName: string, petName: string, date: string, time: string, doctorName: string) {
  return `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
      
      <div style="max-width: 600px; margin: 40px auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);">
        
        <div style="background: linear-gradient(135deg, #16a34a 0%, #22c55e 100%); padding: 40px 24px; text-align: center; color: white;">
          <img 
            src="https://i.imgur.com/pypINKD.png" 
            alt="Logo" 
            style="width: 80px; margin-bottom: 16px; filter: brightness(0) invert(1);"
          />
          <h1 style="margin: 0; font-size: 28px; font-weight: 700;">Agendamento Confirmado! 🎉</h1>
        </div>

        <div style="padding: 40px 24px;">
          
          <p style="font-size: 16px; color: #666; margin-top: 0;">Olá <strong>${userName}</strong>,</p>
          
          <p style="font-size: 15px; color: #555; line-height: 1.6;">
            Sua consulta veterinária foi agendada com sucesso! 🐾 Aqui estão os detalhes:
          </p>

          <div style="background: #f8fafc; border-radius: 12px; padding: 24px; margin: 24px 0; border-left: 4px solid #16a34a;">
            
            <div style="display: flex; align-items: center; margin-bottom: 16px;">
              <span style="font-size: 24px; margin-right: 12px;">🐱</span>
              <div>
                <p style="margin: 0; font-size: 12px; color: #999; text-transform: uppercase; font-weight: 600;">Paciente</p>
                <p style="margin: 0; font-size: 18px; color: #333; font-weight: 700;">${petName}</p>
              </div>
            </div>

            <div style="display: flex; align-items: center; margin-bottom: 16px;">
              <span style="font-size: 24px; margin-right: 12px;">📅</span>
              <div>
                <p style="margin: 0; font-size: 12px; color: #999; text-transform: uppercase; font-weight: 600;">Data</p>
                <p style="margin: 0; font-size: 18px; color: #333; font-weight: 700;">${date}</p>
              </div>
            </div>

            <div style="display: flex; align-items: center; margin-bottom: 16px;">
              <span style="font-size: 24px; margin-right: 12px;">🕐</span>
              <div>
                <p style="margin: 0; font-size: 12px; color: #999; text-transform: uppercase; font-weight: 600;">Horário</p>
                <p style="margin: 0; font-size: 18px; color: #333; font-weight: 700;">${time}</p>
              </div>
            </div>

            <div style="display: flex; align-items: center;">
              <span style="font-size: 24px; margin-right: 12px;">👨‍⚕️</span>
              <div>
                <p style="margin: 0; font-size: 12px; color: #999; text-transform: uppercase; font-weight: 600;">Veterinário</p>
                <p style="margin: 0; font-size: 18px; color: #333; font-weight: 700;">Dr. ${doctorName}</p>
              </div>
            </div>

          </div>

          <hr style="margin: 32px 0; border: none; border-top: 1px solid #e0e0e0;">

          <p style="font-size: 12px; color: #999; text-align: center; margin: 0;">
            Este é um e-mail automático. Não responda este e-mail.
          </p>

        </div>

      </div>

    </body>
    </html>
  `;
}