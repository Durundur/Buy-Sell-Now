
export const formatDescritpion = (text) => {
    return text?.replace(/<br\s*[\/]?>/gi, "\n")
}

export const formatDate = (dateString, formatName) => {
    let date = new Date(dateString);
    return date.toLocaleDateString('pl-PL', { dateStyle: formatName });
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

/**
    * function to convert value from input with name consists of dots to state with nested object 
*/
export const handleInputChange = (e, data, setData) => {
    const value = e.target.value;
    const name = e.target.name.split(".");
    let updatedData = { ...data };
    let target = updatedData;
    for (const key of name.slice(0, -1)) {
        if (!target.hasOwnProperty(key)) {
            target[key] = {};
        }
        if (target[key] === undefined) {
            target[key] = {};
        }
        target = target[key];
    }
    if (typeof value === 'object') {
        target[name[name.length - 1]] = { ...target[name[name.length - 1]], ...value }

    } else {
        target[name[name.length - 1]] = value;
    }
    setData(updatedData);
};