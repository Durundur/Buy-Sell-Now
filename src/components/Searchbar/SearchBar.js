import { Container, Input, HStack, InputGroup, InputLeftElement, InputRightElement, Button, Box } from "@chakra-ui/react";
import { IoLocationOutline, IoSearchOutline } from 'react-icons/io5'
import { Link, Outlet, useNavigate } from "react-router-dom";
import { LocalizationInput } from './LocalizationInput';
import { useState } from "react";
function SearchBar() {
    const [searchParams, setSearchParams] = useState({ localization: '', city: '', county: '', state: '', tittle: '' })
    const navigate = useNavigate();

    const handleSearchButton = () => {
        const { city, county, state, tittle } = searchParams;
        let params = new URLSearchParams();
        if (city) params.append('city', city);
        if (county) {
            const countyParts = county.split(' ');
            if (countyParts[0] === 'powiat') {
                params.append('county', countyParts[1]);
            }
            else params.append('county', county);

        }
        if (state) {
            const stateParts = state.split(' ');
            if (stateParts[0] === 'województwo') {
                params.append('state', stateParts[1]);
            }
            else params.append('state', state);
        }
        if (tittle) params.append('tittle', tittle);

        navigate(`/ogloszenia?${params}`)
    }
    return (
        <>
            <Box bg={'gray.50'}>
                <Container maxW={{ base: 'container.md', lg: 'container.lg', xl: 'container.xl' }} py={10} >
                    <HStack >
                        <InputGroup size={'md'} bg={'#fff'}>
                            <InputGroup flexBasis={'150%'}>
                                <InputLeftElement children={<IoSearchOutline />} />
                                <Input value={searchParams.tittle} onChange={(e) => setSearchParams({ ...searchParams, tittle: e.target.value })} sx={{ borderRightRadius: '0' }} placeholder="Wyszukaj" />
                            </InputGroup>
                            <InputGroup >
                                <InputLeftElement children={<IoLocationOutline />} />
                                <LocalizationInput searchParams={searchParams} updateSearchParams={(localizationParams) => setSearchParams({ ...searchParams, ...localizationParams })} pl={10} bg={'#fff'} sx={{ borderRadius: 0 }} variant={'outline'} placeholder="Lokalizacja"></LocalizationInput>
                            </InputGroup>
                            <Button px={10} sx={{ borderLeftRadius: '0' }} variant={'solid'} colorScheme={'blue'} onClick={() => { handleSearchButton() }} rightIcon={<IoSearchOutline />}>Szukaj</Button>
                        </InputGroup>
                    </HStack>
                </Container>
            </Box>
            <Outlet></Outlet>
        </>
    )
}

export default SearchBar