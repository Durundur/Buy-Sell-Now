import { FormLabel, Textarea, FormHelperText, FormControl, FormErrorMessage } from "@chakra-ui/react";
import { useField } from "formik";
import { css } from '@emotion/react'

export const TextAreaInput = ({ ...props }) => {
    const [field, meta] = useField(props);

    return (
        <FormControl my={'15px'} isInvalid={meta?.error && meta?.touched}>
            <FormLabel css={css`:first-letter {
        text-transform: capitalize
      }`} fontWeight={400}>{props?.label}</FormLabel>
            <Textarea autoComplete={'off'} mb={'10px'} rows={'6'} shadow={'sm'} variant={"filled"} bg={'gray.50'} resize={'none'} {...field} {...props} />
            <FormErrorMessage>{meta.error}</FormErrorMessage>
            <FormHelperText>{props?.help}</FormHelperText>
        </FormControl >
    );
};