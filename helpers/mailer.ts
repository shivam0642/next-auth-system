import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';
import nodemailer from 'nodemailer';

interface SendEmailParams {
    email: string;
    emailType: 'VERIFY' | 'RESET';
    userId: string;
}

export const sendEmail = async ({ email, emailType, userId }: SendEmailParams) => {
    try {

        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        if (emailType === 'VERIFY') {
            await User.findByIdAndUpdate(userId,
                {
                    verifyToken: hashedToken,
                    verifyTokenExpiry: Date.now() + 3600000
                }
            )
        }
        else if (emailType === 'RESET') {
            await User.findByIdAndUpdate(userId,
                {
                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpiry: Date.now() + 3600000
                }
            )
        }

        // Looking to send emails in production? Check out our Email API/SMTP product!
        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "d2173694968950",
                pass: "f1bc95e162be51"
            }
        });

        const mailOptions = {
            from: 'shivam124@gmail.com', //Sender address
            to: email,
            subject: emailType === 'VERIFY' ? "Verify your email" : "Reset Your Email",
            html: "<p>Click the link below to " + (emailType === 'VERIFY' ? "verify your email" : "reset your password") + "</p>" +
                "<a href='" + (emailType === 'VERIFY' ? `${process.env.domain}/verifyemail?token=${hashedToken}` : `${process.env.domain}/resetpassword?token=${hashedToken}`) + "'>Click Here</a>" +
                "<p>or copy and paste the link below in your browser <br>" +
                (
                    emailType === "VERIFY"
                        ? `${process.env.DOMAIN}/verifyemail?token=${hashedToken}`
                        : `${process.env.DOMAIN}/resetpassword?token=${hashedToken}`
                ) +
                "</p>"

        }

        const mailResponse = await transport.sendMail(mailOptions)
        return mailResponse;
    } catch (error: unknown) {
        throw new Error(error instanceof Error ? error.message : 'Unknown error')
    }
}