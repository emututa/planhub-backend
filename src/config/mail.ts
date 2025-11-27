

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "641177b5b2c56c",
    pass: "ba524eb6c4f3d9"
  },
  tls: {
    rejectUnauthorized: false
  }
});

export default transporter;




// import nodemailer from "nodemailer";

// // Example using Gmail SMTP
// const transporter = nodemailer.createTransport({
//   service: "gmail", // or another email provider
//   auth: {
//     user: process.env.SMTP_USER, // your email
//     pass: process.env.SMTP_PASS  // your app password (not Gmail password)
//   }
// });

// export default transporter;

