import { Flex } from "@chakra-ui/react";
import Badge from "./Badge";

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
    buildingType: {label: 'rodzaj zabudowy', }, 
    livingArea: {label: 'powierzchnia', unit: 'cm²'}, 
    numberOfRooms: 'liczba pokoi', 
    rent: {label: 'czynsz', unit: 'zł'}, 
    plotArea: {label: 'powierzchnia działki', unit: 'cm²'}
}

const getLabel = (key) => {
    if(Object.hasOwn(keysMap[key],'label')){
        return keysMap[key]['label'];
    }
    return keysMap[key]
}

const getDetailUnit = (key) => {
    if(Object.hasOwn(keysMap[key],'unit')){
        return keysMap[key]['unit'];
    }
    return ""
}

export default function AdBadges({ details }) {
    let keys = Object.keys(details || {})
    return (
        <Flex columnGap={'4'} rowGap={'2'} wrap={'wrap'}>
            {keys.map((key, index) => {
                return <Badge key={key} text={`${getLabel(key)}: ${details[key]} ${getDetailUnit(key)}`}></Badge>
            })}
        </Flex>
    )
}