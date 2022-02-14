const isEmpty = (text: string): boolean => {
    return !text || text.length === 0;
};

const isBlank = (text: string): boolean => {
    return !text || /^\s*$/.test(text);
};

const isEmptyOrWhiteSpace = (text: string): boolean => {
    return isBlank(text) || isBlank(text);
};

const isNull = (val: unknown): boolean => !val;

export { isEmpty, isBlank, isEmptyOrWhiteSpace, isNull };
