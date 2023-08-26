import { Container, Input, HStack, InputGroup, InputLeftElement, Button, Box } from "@chakra-ui/react";
import { IoLocationOutline, IoSearchOutline } from 'react-icons/io5'
import { Outlet, useNavigate } from "react-router-dom";
import { LocalizationInput } from './LocalizationInput';
import { useState } from "react";
import { useLocation } from 'react-router-dom';


function SearchBar() {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const tittle = searchParams.get('tittle') || '';
    const city = searchParams.get('city') || '';
    const county = searchParams.get('county') || '';
    const state = searchParams.get('state') || '';

    const localizationLabel = () => {
        if (city && state) {
            if (county) {
                return `${city}, ${county}, ${state}`;
            }
            return `${city}, ${state}`;
        }
        return ''
    }

    const [inputsValue, setInputsValue] = useState({ tittle, city, county, state, localizationLabel: localizationLabel() });

    const deleteNullFields = (object) => {
        const newObject = { ...object };
        Object.keys(newObject).forEach(key => {
            if (newObject[key] === '' || key === 'localizationLabel' || newObject[key] === undefined) {
                delete newObject[key];
            }
        });
        return newObject;
    }

    return (
        <>
            <Box bg={'gray.50'}>
                <Container maxW={{ base: 'container.md', lg: 'container.lg', xl: 'container.xl' }} py={10} >
                    <HStack >
                        <InputGroup size={'md'} bg={'#fff'}>
                            <InputGroup flexBasis={'150%'}>
                                <InputLeftElement children={<IoSearchOutline />} />
                                <Input value={inputsValue.tittle} onChange={(e) => { setInputsValue({ ...inputsValue, tittle: e.target.value }) }} sx={{ borderRightRadius: '0' }} placeholder="Wyszukaj" />
                            </InputGroup>
                            <InputGroup >
                                <InputLeftElement children={<IoLocationOutline />} />
                                <LocalizationInput updateInputsValue={(newInputsValue) => setInputsValue(newInputsValue)} inputsValue={inputsValue} pl={10} bg={'#fff'} sx={{ borderRadius: 0 }} variant={'outline'} placeholder="Lokalizacja"></LocalizationInput>
                            </InputGroup>
                            <Button onClick={() => navigate("/ogloszenia?" + new URLSearchParams(deleteNullFields(inputsValue)).toString())} px={10} sx={{ borderLeftRadius: '0' }} variant={'solid'} colorScheme={'blue'} rightIcon={<IoSearchOutline />}>Szukaj</Button>
                        </InputGroup>
                    </HStack>
                </Container>
            </Box>
            <Outlet></Outlet>
        </>
    )
}

export default SearchBar

