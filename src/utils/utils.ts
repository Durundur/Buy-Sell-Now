import { EditAdvertQueryType } from "../types/ApiRequestDataTypes";

export const flattenObject = (value: object, currentKey?: string) => {
    let result = {};
    Object.keys(value).forEach(key => { 
        const tempKey = currentKey ? `${currentKey}.${key}` : key;
        if (typeof value[key as keyof typeof value] !== "object") {
            result[tempKey as keyof typeof value] = value[key as keyof typeof value];
        } else {
            if (value[key as keyof typeof value]) {
                result = { ...result, ...flattenObject(value[key as keyof typeof value], tempKey) };
            }
        }
    })
    return result
}

export const createFormDataFromObject = (object: EditAdvertQueryType) => {
    if (object) {
        const formData = new FormData();
        const flatObject = flattenObject(object);
        for (let field in flatObject) {
            formData.append(field, flatObject[field as keyof typeof flatObject])
        }
        // appending files again cause flatten() doesn't set File object
        for (let i = 0; i < object?.images.length; i++) {
            let img: string | File = object?.images[i];
            if (img instanceof File) {
                formData.append(`file.${i}`, img as File);
            }
        }
        return formData;
    }
    return undefined
}


export const formatDate = (dateString: string, formatName: "full" | "long" | "medium" | "short") => {
    let date = new Date(dateString);
    return date.toLocaleDateString('pl-PL', { dateStyle: formatName });
}