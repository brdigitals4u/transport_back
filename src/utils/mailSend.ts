import { AddUserMail } from "../mailerTemplate/user";
import { transporter } from "./mailTransporter";

type props = {
    email:string
    message:string
}
export const mailSend = ({message, email}:props) => {
   return transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "test mail",
    html: `<p>Click <a href="${message}">here</a> to reset your password. The link is valid for 1 hour.</p>`,
  });
}

export const mailSendUser = ({message, email}:props) => {
    return transporter.sendMail({
     from: process.env.EMAIL_USER,
     to: email,
     subject: "Welcome to TTM System",
     html: AddUserMail({message}),
   });
 }
    

