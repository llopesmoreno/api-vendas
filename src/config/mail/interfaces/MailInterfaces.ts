interface ITemplateVariables {
    [key: string]: string | number;
}

interface IMailContact {
    name: string;
    email: string;
}

interface IParseMailTemplate {
    file: string;
    variables: ITemplateVariables;
}

interface ISendMail {
    to: IMailContact;
    from?: IMailContact;
    subject: string;
    templateData: IParseMailTemplate;
}

export { ITemplateVariables, IParseMailTemplate, ISendMail };
