
import { Link, Outlet } from "react-router-dom";
import Header from "../Header";
import CategoriesData from './CategoriesData'
import { useRef, useState } from "react"
import { Box, Container, Wrap, SimpleGrid, Image, VStack, Text, Flex,  } from "@chakra-ui/react";
function CategoriesMainPage(){
    const [mainCategory, setMainCategory] = useState();
    const handleClickMainCategory = (mainCategoryName)=>{
        setMainCategory(mainCategoryName);
    }
    return(
        <>
        <Box pb={10} color={'blue.900'} bg={'#fff'}>
            <Container  maxW={{md:'container.md', lg:'container.lg', xl:'container.xl'}} >
                <Header>Kategorie Główne</Header>
                    <SimpleGrid minChildWidth='80px' spacing={10}>
                        {
                            CategoriesData.map((category) => {
                                return (
                                    <VStack _hover={{
                                        p: {
                                            textDecoration: "underline",
                                        },
                                        div: {
                                            backgroundColor: "gray.200",
                                        }
                                    }} cursor={'pointer'} onClick={()=>handleClickMainCategory(category.name)} key={category.name} alignItems={'center'}>
                                            <Box shadow={'md'} bg={'gray.100'} borderRadius={'50%'} padding={'5px'}><Image src={category?.picture}></Image></Box>
                                            <Text  align={'center'} fontWeight={'bold'} textTransform={'capitalize'}>{category?.name}</Text>
                                    </VStack>
                                    
                                )
                                
                            })
                        }
                        
                    </SimpleGrid>
            </Container>
        </Box>
        <Outlet/>
        </>
        
    )
}

export default CategoriesMainPage