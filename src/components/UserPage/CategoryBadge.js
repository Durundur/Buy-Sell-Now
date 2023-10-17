/** @jsxImportSource @emotion/react */
import { Flex } from "@chakra-ui/react"
import Badge from "../Badge/Badge"
import { css } from '@emotion/react'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { useNavigate } from "react-router-dom";


export function CategoryBadge({ state, categoryName, badgeText, childen, display, onClick, expandedIconState, disableLeftIcon, ahref, ...props }) {
    const fontWeight = state === 'active' ? 600 : 400;
    const navigate = useNavigate();
    function expandIcon(expandedIconState) {
        if (disableLeftIcon) return null;
        if (expandedIconState) {
            return <IoIosArrowUp cursor={'pointer'} onClick={() => onClick()} fontSize={'1.3rem'}></IoIosArrowUp>
        }
        return <IoIosArrowDown cursor={'pointer'} onClick={() => onClick()} fontSize={'1.3rem'}></IoIosArrowDown>
    }

    return (
        <Flex gap={'0.5rem'} {...props} display={display} fontWeight={fontWeight} alignItems={'center'} justifyContent={'flex-start'}>
            {expandIcon(expandedIconState)}
            <Flex onClick={() => navigate(ahref)} as={'span'} flex={1} _hover={{ '.category-text': { fontWeight: 500 } }} alignItems={'center'} cursor={'pointer'} justifyContent={'space-between'} direction={'row'} >
                <span width={'100%'} css={css`:first-letter { text-transform: uppercase;}`} className="category-text">{categoryName}</span>
                <Badge style={{ margin: 0 }} fontWeight={400} borderRadius={'xl'} bgColor={'blue.500'} color={'#fff'} text={badgeText}></Badge>
            </Flex >
        </Flex>
    )
}

