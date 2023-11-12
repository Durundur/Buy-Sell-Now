import { Input, Text, Box, FormLabel, FormHelperText, FormControl, FormErrorMessage } from '@chakra-ui/react';
import axios from 'axios';
import { useState, useRef, useEffect } from 'react';
import { FieldHelperProps, FieldInputProps, useField, useFormikContext } from "formik";
import { css } from '@emotion/react'

type SuggestionType = {
    datasource?: {sourcename: 'openstreetmap'}
    city: string,
    state: string,
    county: string
    lon: number,
    lat: number
}


type AddressType = {
	city: string,
    state: string,
    county: string
    lon: number,
    lat: number
}

type LocalizationSuggestionInputProps = FieldInputProps<SuggestionType> & FieldHelperProps<SuggestionType>;


export function LocalizationSuggestionInput({...props}) {
	const [field, meta, helpers] = useField<AddressType>(props.name);
	const [suggestionsVisibility, setSuggestionsVisibility] = useState(true);
	const [suggestions, setSuggestions] = useState<SuggestionType[]>([]);
	const addressLabel = createSuggestionLabel(field.value);
	const [inputValue, setInputValue] = useState(addressLabel || ' ');
	
	useEffect(()=>{
		setInputValue(createSuggestionLabel(field.value));
	}, [field.value?.city, field.value?.county, field.value?.state, field.value?.lon, field.value?.lat])

	async function getSuggestions(query: string) {
		if (query) {
			try {
				const response = await axios.get(
					`https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&lang=pl&type=locality&filter=countrycode:pl&format=json&apiKey=48c7df543ab243d5bb855a75817032ff`
				);
				setSuggestions(response?.data?.results);
			} catch (error) {
				console.log(error);
			}
		}
	}
	
	function createSuggestionLabel(suggestionObject: SuggestionType) {
		if (!suggestionObject) {
			return '';
		}
		const { city, state, county } = suggestionObject;
		if (city) {
			let suggestionLabel = city + ', ';
			if (county) {
				const countyParts = county?.split(' ');
				if (countyParts[0] === 'powiat') {
					suggestionLabel += countyParts[1] + ', ';
				} else {
					suggestionLabel += county + ', ';
				}
			}
			if (state) {
				const stateParts = state?.split(' ');
				if (stateParts[0] === 'województwo') {
					suggestionLabel += stateParts[1];
				} else {
					suggestionLabel += state;
				}
			}
			return suggestionLabel;
		}
		return '';
	}

	return (
		<Box flexGrow={1}>
			<Input
				onFocus={() => {
					setSuggestionsVisibility(true);
					helpers.setTouched({city: true, state: true, county: true, lat: true, lon: true} as any);
				}}
				onBlur={() => {
					setTimeout(() => setSuggestionsVisibility(false), 200);
				}}
				onChange={(e) => {
					getSuggestions(e.target.value);
					helpers.setValue({ ...field.value, city: '', state: '', county: '', lat: 0, lon: 0 });
					setInputValue(e.target.value);
				}}
				value={inputValue}
				variant={'filled'}
				bg={'gray.50'}
				autoComplete={'off'}></Input>
			<Box display={suggestionsVisibility ? 'block' : 'none'} shadow={'md'} bg={'#fff'} width={'100%'} position={'absolute'} zIndex={5}>
				{suggestions.map((suggestion, i) => {
					if (suggestion.datasource?.sourcename === 'openstreetmap') {
						if (suggestion.city) {
							let { city, state, county, lat, lon } = suggestion;
							if (county) {
								if (county.split(' ')[0] === 'powiat') county = county.split(' ')[1] || '';
							}
							if (state.split(' ')[0] === 'województwo') state = state.split(' ')[1];
							return (
								<Box
									onClick={() => {
										helpers.setValue({ ...field.value, city, state, county, lat, lon });
										setInputValue(createSuggestionLabel(suggestion));
										setSuggestionsVisibility(false);
									}}
									key={city + i}
									borderBottom={'gray.50'}
									borderWidth={'1px'}
									pl={4}
									py={'2'}
									_hover={{ backgroundColor: 'gray.100', cursor: 'pointer' }}>
									<Text key={city}>{createSuggestionLabel(suggestion)}</Text>
								</Box>
							);
						}
					}
				})}
			</Box>
		</Box>
	);
}

type LocalizationSuggestionFormProps = {
    label: string,
    name: string
    help?: string,
}

export function LocalizationSuggestionForm({ ...props }: LocalizationSuggestionFormProps) {
    const [cityField, cityMeta] = useField(`${props.name}.city`);
    const [countyField, countyMeta] = useField(`${props.name}.county`);
    const [stateField, stateMeta] = useField(`${props.name}.state`);
    const [latField, latMeta] = useField(`${props.name}.lat`);
    const [lonField, lonMeta] = useField(`${props.name}.lon`);
    const error = cityMeta.error ?? countyMeta.error ?? stateMeta.error ?? latMeta.error ?? lonMeta.error;
	const touched = cityMeta.touched && countyMeta.touched && stateMeta.touched && latMeta.touched && lonMeta.touched;
    return (
        <FormControl my={'15px'} isInvalid={(error && touched) as boolean}>
            <FormLabel className='firstLetterUppercase' fontWeight={400}>{props.label}</FormLabel>
            <LocalizationSuggestionInput {...props}/>
            <FormErrorMessage>{error}</FormErrorMessage>
            <FormHelperText>{props.help}</FormHelperText>
        </FormControl >
    )
}