import { Flex } from "@chakra-ui/react";
import Badge from "./Badge";
import { AdvertDetailsType } from './../../types/AdvertDataType';


const keysMap = {
    model: 'model',
    vinNumber: 'numer VIN',
    productionYear: 'rok produkcji',
    enginePower: {label: 'moc silnika', unit: 'KM'},
    engineSize: {label: 'poj. silnika', unit: 'cm³'}, 
    fuel: 'paliwo', 
    mileage: {label: 'przebieg', unit: 'km'}, 
    condition: 'stan techniczny', 
    transmission: 'skrzynia biegów', 
    driveType: 'napęd', 
    brand: 'marka', 
    techCondition: 'stan',
    level: 'piętro', 
    buildingType: 'rodzaj zabudowy', 
    livingArea: {label: 'powierzchnia', unit: 'cm²'}, 
    numberOfRooms: 'liczba pokoi', 
    rent: {label: 'czynsz', unit: 'zł'}, 
    plotArea: {label: 'powierzchnia działki', unit: 'cm²'},
}

type objectKey = keyof typeof keysMap;

const getKeyValue = (key: string, value: 'label' | 'unit') => {
    const keyVal = keysMap[key as objectKey];
    if(typeof keyVal === "object" && keyVal !== null) return keyVal[value];
    if(value === 'unit') return '';
    return keyVal;
}


export default function AdBadges({ details }: {details: AdvertDetailsType}) {
    let keys = Object.keys(details || {})
    return (
        <Flex columnGap={'4'} rowGap={'2'} wrap={'wrap'}>
            {keys.map((key) => {
                return <Badge key={key} text={`${getKeyValue(key, 'label')}: ${details[key as (keyof AdvertDetailsType)]} ${getKeyValue(key, 'unit')}`}/>
            })}
        </Flex>
    )
}