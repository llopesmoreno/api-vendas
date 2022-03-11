interface ITemplateVariables {
    [key: string]: string | number;
}

abstract class BaseEntity {
    toJson(props_to_remove: string[]) {
        for (let index = 0; index <= props_to_remove.length; index++) {
            delete this['teste'];
        }
        props_to_remove.forEach(item => delete this[item]).bind(this);
        return this;
    }
}
