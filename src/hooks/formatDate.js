

const formatDate = (dateString, formatName)=>{
    let date = new Date(dateString);
    return date.toLocaleDateString('pl-PL', {dateStyle: formatName});
}

export default formatDate