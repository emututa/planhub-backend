// import nodemailer from 'nodemailer';
// import dotenv from 'dotenv';

// dotenv.config();

// async function testEmail() {
//   console.log('🧪 Testing email configuration...\n');
  
//   // Create transporter
//   const transporter = nodemailer.createTransport({
//     host: process.env.SMTP_HOST || "sandbox.smtp.mailtrap.io",
//     port: Number(process.env.SMTP_PORT) || 2525,
//     auth: {
//       user: process.env.SMTP_USER,
//       pass: process.env.SMTP_PASS
//     },
//     tls: {
//       rejectUnauthorized: false
//     }
//   });

//   console.log('📧 SMTP Configuration:');
//   console.log('Host:', process.env.SMTP_HOST);
//   console.log('Port:', process.env.SMTP_PORT);
//   console.log('User:', process.env.SMTP_USER);
//   console.log('Pass:', process.env.SMTP_PASS ? '***hidden***' : 'NOT SET');
//   console.log('\n');

//   try {
//     // Send test email
//     console.log('📤 Sending test email...');
//     const info = await transporter.sendMail({
//       from: '"PlanHub Test" <test@planhub.com>',
//       to: 'mututaemmanuel52@gmail.com',
//       subject: 'Test Email from PlanHub',
//       text: 'Hello! This is a test email. If you see this in Mailtrap, your email setup is working! 🎉',
//       html: '<h1>Test Email</h1><p>Hello! This is a test email. If you see this in Mailtrap, your email setup is working! 🎉</p>'
//     });

//     console.log('✅ Email sent successfully!');
//     console.log('Message ID:', info.messageId);
//     console.log('\n🔍 Now check your Mailtrap inbox at: https://mailtrap.io/inboxes');
//     console.log('\n⚠️  NOTE: Emails will NOT appear in real Gmail!');
//     console.log('   Mailtrap catches them for testing purposes.');
    
//   } catch (error: any) {
//     console.error('❌ Error sending email:', error.message);
//     console.log('\n💡 Common issues:');
//     console.log('   1. Check your .env file has correct SMTP credentials');
//     console.log('   2. Make sure SMTP_USER and SMTP_PASS are set');
//     console.log('   3. Verify credentials in Mailtrap dashboard');
//   }
// }

// testEmail();