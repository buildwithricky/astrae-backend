import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
export const sendEmail = async ({ to, subject, html }) => {
  try {
    console.log("Sending email to:", to);
    const mailOptions = {
      from: `Certzilla Support <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    };

    const info = await resend.emails.send(mailOptions);
    console.log("Email sent successfully:", info);
    return info;

  } catch (error) {
    throw new Error("Email could not be sent: " + error.message);
  }
};
