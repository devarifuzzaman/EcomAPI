import nodemailer from "nodemailer";

import {EMAIL_HOST,EMAIL_USER,EMAIL_SECURITY,EMAIL_PORT,EMAIL_PASSWORD} from "../config/config.js";


const sendEmail = async(EmailTo,EmailText,EmailSubject)=>{

	let transporter = nodemailer.createTransport({
		host: EMAIL_HOST,
		port: EMAIL_PORT,
		secure: EMAIL_SECURITY,
		auth: {
			user: EMAIL_USER,
			pass: EMAIL_PASSWORD,
		},
		tls:{
			rejectUnauthorized: false
		}
	})

	let mailOptions = {
		from: 'Ecommerce Back End API <info@teamrabbil.com>',
		to: EmailTo,
		subject:EmailSubject,
		text:EmailText
	}

	return await transporter.sendMail(mailOptions);

}

export default sendEmail;