import { Input, Text, Box, FormLabel, FormHelperText, FormControl, FormErrorMessage } from '@chakra-ui/react';
import axios from 'axios';
import { useState, useRef } from 'react';
import { FieldHelperProps, FieldInputProps, useField } from "formik";
import { css } from '@emotion/react'

type SuggestionType = {
    datasource?: {sourcename: 'openstreetmap'}
    city: string,
    state: string,
    county: string
    lon: number,
    lat: number
}

type LocalizationSuggestionInputProps = FieldInputProps<SuggestionType> & FieldHelperProps<SuggestionType>;


export function LocalizationSuggestionInput({ setValue, setTouched, setError, ...props }: LocalizationSuggestionInputProps) {
	const [suggestionsVisibility, setSuggestionsVisibility] = useState(true);
	const [suggestions, setSuggestions] = useState<SuggestionType[]>([]);
	const addressLabel = createSuggestionLabel(props.value);
	const [inputValue, setInputValue] = useState(addressLabel || ' ');
	const inputRef = useRef<HTMLInputElement | null>(null);

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
				ref={inputRef}
				{...props}
				onFocus={() => {
					setTouched(true);
					setSuggestionsVisibility(true);
				}}
				onBlur={() => {
					setTimeout(() => setSuggestionsVisibility(false), 200);
				}}
				onChange={(e) => {
					getSuggestions(e.target.value);
					setValue({ ...props.value, city: '', state: '', county: '', lat: 0, lon: 0 });
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
										setValue({ ...props.value, city, state, county, lat, lon });
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
    const [field, meta, helpers] = useField(props.name);
    const error = typeof meta?.error === 'object' ? meta.error[Object.keys(meta.error)[0]] : meta?.error;
    return (
        <FormControl my={'15px'} isInvalid={(meta?.error && meta?.touched) as boolean}>
            <FormLabel css={css`:first-letter {text-transform: capitalize}`} fontWeight={400}>{props.label}</FormLabel>
            <LocalizationSuggestionInput {...helpers} {...field}/>
            <FormErrorMessage>{error}</FormErrorMessage>
            <FormHelperText>{props.help}</FormHelperText>
        </FormControl >
    )
}