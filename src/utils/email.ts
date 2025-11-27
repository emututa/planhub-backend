import transporter from "../config/mail";

export async function sendEmail(
  to: string, 
  subject: string, 
  message: string
): Promise<{ success: boolean; message?: string; error?: string }> {
  try {
    console.log(`📧 Attempting to send email to: ${to}`);
    
    const info = await transporter.sendMail({
      from: '"PlanHub" <noreply@planhub.com>',
      to,
      subject,
      text: message,
      html: `<p>${message.replace(/\n/g, '<br>')}</p>`
    });

    console.log(`✅ Email sent successfully! Message ID: ${info.messageId}`);
    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    console.error("❌ Email error:", error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return { success: false, error: errorMessage };
  }
}


// ## Step 4: Restart your server

// 1. Stop your server (Ctrl+C)
// 2. Make sure your `.env` changes are saved
// 3. Restart: `npm run dev`

// You should see:
// ```
// ✅ SMTP Server is ready to send emails
// 🚀 Server running on port 5000