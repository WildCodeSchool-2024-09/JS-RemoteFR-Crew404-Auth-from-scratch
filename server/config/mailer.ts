import "dotenv/config";
import nodemailer from "nodemailer";

// J'importe les infos de mon .Env pour ne pas mettre en dur mes infos sur internet
const { MAIL_USER, MAIL_PASSWORD } = process.env;

const transporter = nodemailer.createTransport({
	host: "in-v3.mailjet.com",
	port: 465,
	secure: true, // true for port 465, false for other ports
	auth: {
		user: MAIL_USER,
		pass: MAIL_PASSWORD,
	},
});

// export default transporter;
/**
 * import transporter from "./config/mailer" ✅
 * import mailer from "./config/mailer" ✅ (même si ça n'a pas de sens)
 * import camille from "./config/mailer" ✅ (même si ça n'a pas de sens)
 */
export { transporter };
/**
 * import { transporter } from "./config/mailer" ✅
 * import { mailer } from "./config/mailer" ❌
 */
