import { Flex } from "@chakra-ui/react"
import Badge from "../Badge/Badge"
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { useNavigate } from "react-router-dom";
import { BoxProps } from '@chakra-ui/react';


type CategoryBadgeProps = BoxProps & {
    ahref: string,
    disableLeftIcon: boolean,
    isActive: boolean,
    categoryName: string,
    categoryCount: number,
    expandIconState?: boolean
    onClick?: () => void
}

export function CategoryBadge({ ahref, disableLeftIcon = false, isActive, categoryName, categoryCount, expandIconState, onClick, children, ...props} : CategoryBadgeProps) {
    const fontWeight = isActive ? 600 : 400;
    const navigate = useNavigate();

    function expandIcon(expandIconState: boolean | undefined) {
        if(typeof expandIconState === 'boolean'){
            if (expandIconState) {
                return <IoIosArrowUp cursor={'pointer'} onClick={onClick ? () => onClick() : ()=>{}} fontSize={'1.3rem'}></IoIosArrowUp>
            }
            return <IoIosArrowDown cursor={'pointer'} onClick={onClick ? () => onClick() : ()=>{}} fontSize={'1.3rem'}></IoIosArrowDown>
        }
    }

    return (
        <Flex {...props} gap={'0.5rem'} direction={'row'} fontWeight={fontWeight} alignItems={'center'} justifyContent={'flex-start'}>
            {expandIcon(expandIconState)}
            <Flex onClick={() => navigate(ahref)} as={'span'} flex={1} _hover={{ '.category-text': { fontWeight: 500 } }} alignItems={'center'} cursor={'pointer'} justifyContent={'space-between'} direction={'row'} >
                <span className={'firstLetterUppercase'} style={{width: '100%'}}>{categoryName}</span>
                <Badge style={{ margin: 0 }} fontWeight={400} borderRadius={'xl'} bgColor={'blue.500'} color={'#fff'} text={`${categoryCount}`}></Badge>
            </Flex >
        </Flex>
    )
}


