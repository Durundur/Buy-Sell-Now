import { Input, Text, Box, FormLabel, FormHelperText, FormControl, FormErrorMessage } from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';
import { useField } from "formik";
import { css } from '@emotion/react'

export function LocalizationSuggestionInput({ field, value, onInputChange, name, ...props }) {
    const [suggestions, setSuggestions] = useState([]);
    const [localizationLabel, setLocalizationLabel] = useState(value);

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

    return (
        <Box position={'relative'} >
            <Input {...field} {...props} onChange={(e) => {
                autoSuggestApiCall(e.target.value)
                setLocalizationLabel(e.target.value)
            }} value={createSuggestionLabel(localizationLabel)} name variant="filled" bg={'gray.50'} autoComplete={'off'} ></Input>
            <Box shadow={'md'} bg={'#fff'} width={'100%'} position={'absolute'} zIndex={5}>
                {
                    suggestions.map((suggestion, i) => {
                        if (suggestion.datasource.sourcename === 'openstreetmap') {
                            if (suggestion.postcode) {
                                const { city, state, county, postcode, lat, lon } = suggestion;
                                return <Box onClick={() => {
                                    onInputChange({
                                        target: {
                                            value: {
                                                city, state, county, postcode, lat, lon
                                            },
                                            name: name
                                        }
                                    })
                                    setSuggestions([])
                                    setLocalizationLabel({ city, state, county, postcode })
                                }} key={city + i} borderBottom={'gray.50'} borderWidth={'1px'} pl={'4'} py={'2'} _hover={{ backgroundColor: 'gray.100', cursor: 'pointer' }} >
                                    <Text key={city}>{createSuggestionLabel(suggestion)}</Text>
                                </Box>
                            }
                        }
                    })
                }
            </Box>
        </Box>
    )
}


export function LocalizationSuggestionForm({ error, ...props }) {
    const [field, meta] = useField(props);
    return (
        <FormControl my={'15px'} isInvalid={meta?.error && meta?.touched}>
            <FormLabel css={css`:first-letter {
        text-transform: capitalize
      }`} fontWeight={400}>{props?.label}</FormLabel>
            <LocalizationSuggestionInput {...field} {...props} />
            <FormErrorMessage>{meta.error}</FormErrorMessage>
            <FormHelperText>{props?.help}</FormHelperText>
        </FormControl >
    )
}