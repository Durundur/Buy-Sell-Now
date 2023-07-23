

export const formatDescritpion = (text) => {
    return text?.replace(/<br\s*[\/]?>/gi, "\n")
}


export const convertNameToRef = (data, name) => {
    let fieldKeys = name.split('.');
    let refValue = data
    for (let i = 0; i < fieldKeys.length - 1; i++) {
        refValue = refValue?.[fieldKeys[i]]
    }
    const fieldValue = refValue?.[fieldKeys[fieldKeys.length - 1]] || '';
    return fieldValue
}


export const handleInputChange = (e, data, setData) => {
    const value = e.target.value;
    const name = e.target.name.split(".");
    let updatedData = { ...data };
    let target = updatedData;
    for (const key of name.slice(0, -1)) {
        if (!target.hasOwnProperty(key)) {
            target[key] = {};
        }
        target = target[key];
    }
    target[name[name.length - 1]] = value;
    setData(updatedData);
};