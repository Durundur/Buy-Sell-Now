
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