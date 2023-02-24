import { Container, Input, HStack, InputGroup, InputLeftElement, InputRightElement, Button, Box } from "@chakra-ui/react";
import {IoLocationOutline, IoSearchOutline} from 'react-icons/io5'
import { Outlet } from "react-router-dom";


function SearchBar(){
    return(
        <>
        <Box bg={'gray.50'}>
        <Container maxW={{base:'container.md',lg:'container.lg', xl:'container.xl'}}  py={10} >
            <HStack>
                <InputGroup size={'lg'} bg={'#fff'}>
                <InputGroup w={'150%'} >
                   <InputLeftElement
                    children={<IoSearchOutline/>}
                   />
                   <Input sx={{borderRightRadius: '0'}} placeholder="Wyszukaj"/>
                </InputGroup>
                <InputGroup>
                   <InputLeftElement
                   children={<IoLocationOutline/>}
                   />
                   <Input sx={{borderRadius: '0'}} placeholder="Lokalizacja"/>
                </InputGroup>
                    <Button  px={10}  sx={{borderLeftRadius: '0'}} variant={'solid'} colorScheme={'blue'} rightIcon={<IoSearchOutline/>}>Szukaj</Button>
                </InputGroup>
            </HStack>
        </Container>        
        </Box>
        <Outlet></Outlet>
        </>
    )
}

export default SearchBar