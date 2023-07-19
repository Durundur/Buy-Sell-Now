

import { FormLabel, Input, Box, FormHelperText, FormControl, FormErrorMessage, Select } from "@chakra-ui/react";
import { useField } from "formik";

export const SelectInput = (props) => {
    const [field, meta] = useField(props);
    return (
        <FormControl textTransform={'capitalize'} my={'15px'} isInvalid={meta?.error && meta?.touched}>
            <FormLabel fontWeight={400}>{props?.label}</FormLabel>
            <Select shadow={'sm'} variant="filled" bg={'gray.50'} autoComplete={'off'} {...field} {...props}></Select>
            <FormErrorMessage>{meta.error}</FormErrorMessage>
            <FormHelperText>{props?.help}</FormHelperText>
        </FormControl >
    );
};