
import { Input, Text, Box, FormLabel, FormHelperText, FormControl, FormErrorMessage } from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';


export function LocalizationInput({ inputsValue, updateInputsValue, ...props }) {
    const [suggestions, setSuggestions] = useState([]);
    async function triggerSuggestApiCall(place) {
        if (place) {
            try {
                const response = await axios.get(`https://api.geoapify.com/v1/geocode/search?text=${place}&lang=pl&limit=20&filter=countrycode:pl&type=city&format=json&apiKey=48c7df543ab243d5bb855a75817032ff`)
                setSuggestions(response?.data?.results)
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <Box flexGrow={1}>
            <Input {...props} onChange={(e) => {
                triggerSuggestApiCall(e.target.value);
                let newInputsValue = { localizationLabel: e.target.value, };
                if (e.target.value === '') {
                    newInputsValue = { ...newInputsValue, city: '', state: '', county: '' };
                }
                updateInputsValue((prevInputsValue) => {
                    return { ...prevInputsValue, ...newInputsValue }
                })
            }} autoComplete={'off'} value={inputsValue.localizationLabel}></Input>
            <Box shadow={'md'} bg={'#fff'} width={'100%'} position={'absolute'} zIndex={5}>
                {
                    suggestions.map((suggestion, i) => {
                        if (suggestion.datasource.sourcename === 'openstreetmap') {
                            if (suggestion.city) {
                                let { city, state, county, lat, lon } = suggestion;
                                if (county) {
                                    if (county.split(' ')[0] === 'powiat') county = county.split(' ')[1] || '';
                                }
                                if (state.split(' ')[0] === 'województwo') state = state.split(' ')[1];
                                return <Box onClick={() => {
                                    updateInputsValue((prevInputsValue) => {
                                        return { ...prevInputsValue, city, state, county, localizationLabel: createSuggestionLabel(suggestion) }
                                    })
                                    setSuggestions([]);
                                }} key={`${city}-container-${i}`} borderBottom={'gray.50'} borderWidth={'1px'} pl={4} py={'2'} _hover={{ backgroundColor: 'gray.100', cursor: 'pointer' }} >
                                    <Text key={`${city}-label-${i}`}>{createSuggestionLabel(suggestion)}</Text>
                                </Box>
                            }
                        }
                    })
                }
            </Box>
        </Box>
    )
}


function createSuggestionLabel(localizationObj) {
    const { city, state, county } = localizationObj || {};
    if (city) {
        let suggestionLabel = city + ', ';
        if (county) {
            const countyParts = county?.split(' ');
            if (countyParts[0] === 'powiat') {
                suggestionLabel += countyParts[1] + ', ';
            }
            else {
                suggestionLabel += county + ', ';
            }
        }
        if (state) {
            const stateParts = state?.split(' ');
            if (stateParts[0] === 'województwo') {
                suggestionLabel += stateParts[1];
            }
            else {
                suggestionLabel += state;
            }
        }
        return suggestionLabel
    }
}