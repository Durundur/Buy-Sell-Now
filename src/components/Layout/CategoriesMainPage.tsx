
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header";
import CategoriesData from '../SelectCategory/CategoriesData'
import { Box, SimpleGrid, Image, VStack, Text, } from "@chakra-ui/react";
import ContainerBox from "./ContainerBox";
import { css } from '@emotion/react'

function CategoriesMainPage() {
    const navigate = useNavigate()
    return (
        <>
            <ContainerBox bgColor1={'#fff'}>
                <Header>Kategorie główne</Header>
                <SimpleGrid minChildWidth='80px' spacing={10}>
                    {
                        CategoriesData.map((category) => {
                            return (
                                <VStack _hover={{
                                    div: {
                                        backgroundColor: "gray.200",
                                    }
                                }} cursor={'pointer'} onClick={() => navigate(`/ogloszenia/${category.name}`)} key={category.name} alignItems={'center'}>
                                    <Box shadow={'md'} bg={'gray.100'} borderRadius={'50%'} padding={'5px'}><Image src={category.picture}></Image></Box>
                                    <Text css={css`:first-letter { text-transform: uppercase;}`} align={'center'} fontWeight={'bold'} >{category.name}</Text>
                                </VStack>
                            )
                        })
                    }
                </SimpleGrid>
            </ContainerBox>
            <Outlet/>
        </>

    )
}

export default CategoriesMainPage

