
import { FormLabel, Input, Box, FormHelperText, FormControl, FormErrorMessage } from "@chakra-ui/react";
import { useField } from "formik";

export const TextInput = (props) => {
  const [field, meta] = useField(props);
  return (
    <FormControl my={'15px'} isInvalid={meta?.error && meta?.touched}>
      <FormLabel fontWeight={400} textTransform={'capitalize'}>{props?.label}</FormLabel>
      <Input shadow={'sm'} variant="filled" bg={'gray.50'} autoComplete={'off'} {...field} {...props} />
      <FormErrorMessage>{meta.error}</FormErrorMessage>
      <FormHelperText>{props?.help}</FormHelperText>
    </FormControl >
  );
};