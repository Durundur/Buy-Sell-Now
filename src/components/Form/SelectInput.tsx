import { FormLabel, FormHelperText, FormControl, FormErrorMessage, Select, SelectProps } from '@chakra-ui/react';
import { useField } from 'formik';

type SelectInputProps = SelectProps & {
	label?: string,
	help?: string
}

export const SelectInput = ({ ...props }: SelectInputProps) => {
	const [field, meta] = useField(props.name as string);
	return (
		<FormControl my={'15px'} isInvalid={Boolean(meta?.error) && Boolean(meta?.touched)}>
			<FormLabel className={'firstLetterUppercase'} fontWeight={400}>
				{props.label}
			</FormLabel>
			<Select textTransform={'capitalize'} shadow={'sm'} variant='filled' bg={'gray.50'} autoComplete={'off'} {...field} {...props}></Select>
			<FormErrorMessage>{meta.error}</FormErrorMessage>
			<FormHelperText>{props.help}</FormHelperText>
		</FormControl>
	);
};
