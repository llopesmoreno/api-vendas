import nodemailser from 'nodemailer';
import handlebarsMailTemplate from './HandlebarsTemplateEmail';
import { ISendMail } from './interfaces/MailInterfaces';

export default class EtherealMail {
    static async sendMail({
        to,
        from,
        subject,
        templateData,
    }: ISendMail): Promise<void> {
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
            from: {
                name: from?.name || `Equipe Api Vendas`,
                address: from?.email || `apivendas@teste.com`,
            },
            to: {
                name: to?.name,
                address: to?.email,
            },
            subject,
            html: await new handlebarsMailTemplate().parse(templateData),
        });

        console.log('message sent: %s', message.messageId);
        console.log('Previwe Url: %s', nodemailser.getTestMessageUrl(message));
    }
}
