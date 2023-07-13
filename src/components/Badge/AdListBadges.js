import { Flex } from "@chakra-ui/react";
import Badge from "./Badge";
import { FiCalendar} from "react-icons/fi";
import {TbRoad} from "react-icons/tb"
import {BiArea} from 'react-icons/bi'
import {CiMoneyBill} from 'react-icons/ci'

const keysToDisplay = ['condition', 'techCondition','productionYear', 'mileage', 'livingArea', 'rent']

const iconMap = {
    productionYear: FiCalendar,
    mileage: TbRoad,
    livingArea: BiArea,
    rent: CiMoneyBill
  };

export default function AdListBadges({details}){
    let keys = Object.keys(details || {})
    return(
        <Flex columnGap={'4'} rowGap={'2'} wrap={'wrap'}>
            {keys.map((key, index)=>{
                if(keysToDisplay.includes(key))
                return <Badge icon={iconMap[key]} text={details[key] + (key==='mileage' ? ' km' : "")}></Badge>
            })}
        </Flex>
    )
}