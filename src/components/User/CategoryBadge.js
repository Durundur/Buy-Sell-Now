import { Flex } from "@chakra-ui/react"
import { Children } from "react";
import Badge from "../Badge/Badge"

export function CategoryBadge({ state, categoryName, badgeText, childen, display, ...props }) {
    const fontWeight = state === 'active' ? 600 : 400;
    return (
        <Flex {...props} display={display} fontWeight={fontWeight} _hover={{
            '.category-text': {
                fontWeight: 500
            }
        }} cursor={'pointer'} mt={2} as={'span'} alignItems={'center'} direction={'row'} justifyContent={'space-between'}>
            <span className="category-text">{categoryName}</span>
            <Badge fontWeight={400} borderRadius={'xl'} bgColor={'blue.500'} color={'#fff'} text={badgeText}></Badge>
        </Flex >
    )
}

