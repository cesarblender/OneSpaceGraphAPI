import * as nodemailer from "nodemailer";
import MESSAGES from "../constants/messages";
import VERIFICATION_TEMPLATE from "../email_templates/verification";

export async function sendVerificationEmail(to, token) {
  const options = {
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
    logger: true,
  };

  const transporter = nodemailer.createTransport(options);

  await transporter.sendMail({
    from: `Soporte para OneSpace ${process.env.APP_EMAIL}`,
    to,
    subject: MESSAGES.VERIFICATION_EMAIL_SUBJECT,
    html: VERIFICATION_TEMPLATE
      .replaceAll(/(\{\{action_url\}\})/g, `${process.env.FRONTEND_URL}/${token}`),
    priority: "high",
  });
}
