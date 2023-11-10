import { FormLabel, Textarea, FormHelperText, FormControl, FormErrorMessage, TextareaProps } from '@chakra-ui/react';
import { useField } from 'formik';
import { css } from '@emotion/react';

type TextAreaInputProps = TextareaProps & {
	label?: string;
	help?: string;
};

export const TextAreaInput = ({ ...props }: TextAreaInputProps) => {
	const [field, meta] = useField(props.name as string);
	return (
	<FormControl my={'15px'} isInvalid={Boolean(meta?.error) && Boolean(meta?.touched)}>
		<FormLabel fontWeight={400} className={'firstLetterUppercase'}>
			{props.label}
		</FormLabel>
		<Textarea autoComplete={'off'} mb={'10px'} shadow={'sm'} variant={'filled'} bg={'gray.50'} resize={'none'} {...field} {...props} />
		<FormErrorMessage>{meta.error}</FormErrorMessage>
		<FormHelperText>{props.help}</FormHelperText>
	</FormControl>
);
};
