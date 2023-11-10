import { FormLabel, Input, FormHelperText, FormControl, FormErrorMessage, InputProps } from '@chakra-ui/react';
import { useField } from 'formik';

type TextInputProps = InputProps & {
	label?: string;
	help?: string;
};

export const TextInput = ({ ...props }: TextInputProps) => {
	const [field, meta] = useField(props.name as string);
	return (
		<FormControl my={'15px'} isInvalid={Boolean(meta?.error) && Boolean(meta?.touched) }>
			<FormLabel className='firstLetterUppercase' fontWeight={400}>
				{props.label}
			</FormLabel>
			<Input shadow={'sm'} variant='filled' bg={'gray.50'} autoComplete={'off'} {...field} {...props} />
			<FormErrorMessage>{meta.error}</FormErrorMessage>
			<FormHelperText>{props.help}</FormHelperText>
		</FormControl>
	);
};
