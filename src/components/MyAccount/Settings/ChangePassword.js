
import { Formik, Form } from "formik"
import { Text } from '@chakra-ui/react'
import * as Yup from 'yup';
import { Button } from '@chakra-ui/react'
import { TextInput } from "../../Form/TextInput";
import useApi from "../../../hooks/useApi";
import { updateUserPass } from "../../../contexts/AuthContext/AuthServices";
import LoadingSpinner from '../../Layout/LoadingSpinner'
import { Box } from "@chakra-ui/react";

export default function ChangePassword() {
    const { data, error, isLoading, makeRequest } = useApi()
    if (isLoading) return <LoadingSpinner></LoadingSpinner>
    return (
        <Box w={['100%', '80%', '65%', '40%']}>
            <Formik initialValues={{
                oldPassword: '',
                newPassword: '',
            }
            } validationSchema={
                Yup.object({
                    oldPassword: Yup.string()
                        .required('Pole obowiązkowe'),
                    newPassword: Yup.string()
                        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/, "Hasło powinno mieć przynajmniej 8 znaków, małe i wielkie litery, cyfry oraz znaki specjalne").required('Pole obowiązkowe'),
                })
            } 
            // onSubmit={(formData) => {
            //     triggerApiCall(updateUserPass(formData))
            // }}
            >
                <Form>
                    <TextInput error={error} label="Stare hasło" name="oldPassword" type="password" />
                    <TextInput label="Nowe hasło" name="newPassword" type="password" help={'Hasło powinno mieć przynajmniej 8 znaków. Naprawdę mocne hasła mają małe i wielkie litery, cyfry oraz znaki tego typu: @!€='} />
                    {error && <Text fontSize={'14px'} color={'red.500'}>{error?.response?.data?.message}</Text>}
                    <Button mt={4} type={'submit'} variant={"solid"} colorScheme={"blue"}>
                        Zmień hasło
                    </Button>
                </Form>
            </Formik >
        </Box>
    )
}