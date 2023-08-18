import React, { useRef, useState } from 'react';
import CategoriesData from '../components/SelectCategory/CategoriesData'
import { Select, Button, Box, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import Success from './Alerts/Success';
import useFetch from '../hooks/useFetch';
import { AuthContextProvider } from '../contexts';
import Category from './SelectCategory/Category';
import useApi from '../hooks/useApi';
import { useEffect } from 'react';
import { getAd, getAllAds, postAd, updateAd, deleteAd, getUserAds, getAds } from "../utils/apiServices";
import { Input, Text } from '@chakra-ui/react';
import axios from 'axios';

const TestCom = () => {
    const [suggestions, setSuggestions] = useState([]);
    const [localizationLabel, setLocalizationLabel] = useState('');
    const [selectedLocalization, setSelectedLocalization] = useState({});

    async function autoSuggestApiCall(place) {
        if (place) {
            try {
                const response = await axios.get(`https://api.geoapify.com/v1/geocode/autocomplete?text=${place}&lang=pl&type=locality&filter=countrycode:pl&format=json&apiKey=48c7df543ab243d5bb855a75817032ff`)
                setSuggestions(response?.data?.results)
            } catch (error) {
                console.log(error)
            }
        }
    }

    function formatSuggestionLabel(city, county, state) {
        if (city) {
            let suggestionLabel = city + ', ';
            if (county) suggestionLabel += county + ', ';
            if (state) suggestionLabel += state;
            return suggestionLabel
        }
        return
    }
    return (
        <Box position={'relative'} >
            <Input onChange={(e) => {
                setLocalizationLabel(e.target.value)
                autoSuggestApiCall(e.target.value)
            }} value={localizationLabel} placeholder='adres'></Input>
            <Box shadow={'md'} bg={'#fff'} width={'100%'} position={'absolute'} zIndex={10}>
                {
                    suggestions.map((suggestion, i) => {
                        if (suggestion.datasource.sourcename === 'openstreetmap') {
                            const { city, county, state } = suggestion;
                            if (city) {
                                const countyLabel = county?.split(' ')[1];
                                const stateLabel = state?.split(' ')[1];
                                return <Box key={city + i} onClick={(e) => {
                                    setSelectedLocalization({ city, county: countyLabel, postcode: suggestion.postcode, state });
                                    setLocalizationLabel(formatSuggestionLabel(city, countyLabel, stateLabel))
                                    setSuggestions([])
                                }} borderBottom={'gray.50'} borderWidth={'1px'} pl={'4'} py={'2'} _hover={{ backgroundColor: 'gray.100', cursor: 'pointer' }} >
                                    <Text key={city}>{formatSuggestionLabel(city, countyLabel, stateLabel)}</Text>
                                </Box>
                            }
                        }
                    })
                }
            </Box>
        </Box>
    )
}

export default TestCom;
