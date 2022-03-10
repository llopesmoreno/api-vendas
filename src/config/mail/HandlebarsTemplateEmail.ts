import Handlebars from 'handlebars';

interface ITemplateVariables {
    [key: string]: string | number;
}

interface IParseMailTemplate {
    template: string;
    variables: ITemplateVariables;
}

export default class handlebarsMailTemplate {
    public async parse({
        template,
        variables,
    }: IParseMailTemplate): Promise<string> {
        const parseTemplate = Handlebars.compile(template);

        return parseTemplate(variables);
    }
}
