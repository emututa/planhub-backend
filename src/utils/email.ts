import transporter from "../config/mail";

export async function sendEmail(
  to: string, 
  subject: string, 
  message: string
): Promise<{ success: boolean; message?: string; error?: string }> {
  try {
    await transporter.sendMail({
      from: '"PlanHub" <no-reply@myapp.com>',
      to,
      subject,
      text: message
    });

    return { success: true, message: "Email sent successfully From PlanHub" };
  } catch (error) {
    console.error("Email error:", error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return { success: false, error: errorMessage };
  }
}