export const convertNameToRef = (data, name) => {
    let fieldKeys = name.split('.');
    let refValue = data
    for (let i = 0; i < fieldKeys.length - 1; i++) {
        refValue = refValue?.[fieldKeys[i]]
    }
    const fieldValue = refValue?.[fieldKeys[fieldKeys.length - 1]] || '';
    return fieldValue
}