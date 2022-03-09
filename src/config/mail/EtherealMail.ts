import nodemailser from 'nodemailer';

interface ISendMail {
    to: string;
    subject: string;
    text: string;
}
export default class EtherealMail {
    static async sendMail({ to, subject, text }: ISendMail): Promise<void> {
        const account = await nodemailser.createTestAccount();

        const transporter = nodemailser.createTransport({
            host: account.smtp.host,
            port: account.smtp.port,
            secure: account.smtp.secure,
            auth: {
                user: account.user,
                pass: account.pass,
            },
        });

        const message = await transporter.sendMail({
            from: 'equipe@apivendas.com.br',
            to,
            subject,
            text,
        });

        console.log('message sent: %s', message.messageId);
        console.log('Previwe Url: %s', nodemailser.getTestMessageUrl(message));
    }
}
