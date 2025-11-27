// src/utils/sms.ts
export async function sendSMS(phoneNumber: string, message: string): Promise<void> {
  try {
    // TODO: Implement SMS sending with Sendchamp or your SMS provider
    console.log(`SMS to ${phoneNumber}: ${message}`);
    
    // For now, just log it. Add your SMS provider implementation here later
    // Example with Sendchamp:
    // const response = await fetch('https://api.sendchamp.com/api/v1/sms/send', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${process.env.SENDCHAMP_API_KEY}`,
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     to: phoneNumber,
    //     message: message,
    //     sender_name: process.env.SMS_SENDER_NAME || 'PlanHub'
    //   })
    // });
    
  } catch (error) {
    console.error('SMS sending failed:', error);
    // Don't throw error - we don't want SMS failures to break registration
  }
}