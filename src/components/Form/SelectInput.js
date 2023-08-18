
import { FormLabel, Input, Box, FormHelperText, FormControl, FormErrorMessage, Select } from "@chakra-ui/react";
import { useField } from "formik";
export const SelectInput = (props) => {
    const [field, meta] = useField(props);

    return (
        <FormControl my={'15px'} isInvalid={meta?.error && meta?.touched}>
            <FormLabel textTransform={'capitalize'} fontWeight={400}>{props?.label}</FormLabel>
            <Select textTransform={'capitalize'} shadow={'sm'} variant="filled" bg={'gray.50'} autoComplete={'off'} {...field} {...props}></Select>
            <FormErrorMessage>{meta.error}</FormErrorMessage>
            <FormHelperText>{props?.help}</FormHelperText>
        </FormControl >
    );
};