import { Input, Text, Box, } from '@chakra-ui/react';
import axios from 'axios';
import { useState, useEffect } from 'react';


export function LocalizationInput({ defaultLocValues, updateLoc, ...props }) {
    const [suggestions, setSuggestions] = useState([]);
    const [localizationLabel, setLocalizationLabel] = useState(createSuggestionLabel(defaultLocValues));

    useEffect(() => {
        if (defaultLocValues.city === '') setLocalizationLabel('')
    }, [defaultLocValues.city])

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
                setLocalizationLabel(e.target.value)
                if (e.target.value === '') updateLoc({ ...defaultLocValues, city: '', state: '', county: '', lat: '', lon: '' })
            }} autoComplete={'off'} value={localizationLabel}></Input>
            <Box shadow={'md'} bg={'#fff'} width={'100%'} position={'absolute'} zIndex={5}>
                {
                    suggestions.map((suggestion, i) => {
                        if (suggestion.datasource.sourcename === 'openstreetmap') {
                            if (suggestion.city) {
                                const { city, state, county, lat, lon } = suggestion;
                                return <Box onClick={() => {
                                    updateLoc({ ...defaultLocValues, city, state: deletePrefixFromStateOrCounty(state), county: deletePrefixFromStateOrCounty(county), lat, lon })
                                    setLocalizationLabel(createSuggestionLabel(suggestion))
                                    setSuggestions([])
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

function deletePrefixFromStateOrCounty(stateOrCountyString) {
    if (stateOrCountyString) return stateOrCountyString.replace('powiat', '').replace('województwo', '').trim();
    return '';
}

function createSuggestionLabel(localizationObj) {
    const { city, state, county } = localizationObj || {};
    if (city) {
        let suggestionLabel = city + ', ';
        if (county) {
            suggestionLabel += deletePrefixFromStateOrCounty(county) + ', ';
        }
        if (state) {
            suggestionLabel += deletePrefixFromStateOrCounty(state);
        }
        return suggestionLabel
    }
    return '';
}