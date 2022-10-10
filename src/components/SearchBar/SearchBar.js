import { Container, Input, HStack, InputGroup, InputLeftElement, InputRightElement, Button, Box } from "@chakra-ui/react";
import {IoLocationOutline, IoSearchOutline} from 'react-icons/io5'

function SearchBar(){
    return(
        <Box bg={'gray.50'}>
        <Container py={10} maxW={{md:'container.md', lg:'container.lg', xl:'container.xl'}} >
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
    )
}

export default SearchBar