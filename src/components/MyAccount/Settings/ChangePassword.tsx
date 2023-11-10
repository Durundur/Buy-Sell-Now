
import { Formik, Form } from "formik"
import { Text } from '@chakra-ui/react'
import * as Yup from 'yup';
import { Button } from '@chakra-ui/react'
import { TextInput } from "../../Forms/TextInput";
import useApi from "../../../hooks/useApi";
import LoadingSpinner from '../../Layout/LoadingSpinner'
import { Box } from "@chakra-ui/react";
import {UPDATE_ACC_PASS_URL} from '../../../hooks/ApiEndpoints';
import { ApiQueryResponseType } from "../../../types/ApiDataTypes";


export default function ChangePassword() {
    const { data: changePasswordResponse, error, isLoading, makeRequest: changePassword } = useApi<ApiQueryResponseType>({
        url: UPDATE_ACC_PASS_URL,
        method: 'put'
    })
    if (isLoading) return <LoadingSpinner></LoadingSpinner>
    return (
        <Box w={['100%', '80%', '65%', '40%']}>
            <Formik initialValues={{oldPassword: '',newPassword: ''}} onSubmit={(values)=>changePassword(values)} validationSchema={
                Yup.object({
                    oldPassword: Yup.string()
                        .required('Pole obowiązkowe'),
                    newPassword: Yup.string()
                        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/, "Hasło powinno mieć przynajmniej 8 znaków, małe i wielkie litery, cyfry oraz znaki specjalne").required('Pole obowiązkowe'),
                })
            }>
                <Form>
                    <TextInput label="Stare hasło" name="oldPassword" type="password" />
                    <TextInput label="Nowe hasło" name="newPassword" type="password" help={'Hasło powinno mieć przynajmniej 8 znaków. Naprawdę mocne hasła mają małe i wielkie litery, cyfry oraz znaki tego typu: @!€='} />
                    {error && <Text fontSize={'14px'} color={'red.500'}>{error.message}</Text>}
                    {changePasswordResponse?.message && <Text fontSize={'14px'} color={'blue.900'}>{changePasswordResponse.message}</Text>}
                    <Button mt={4} type={'submit'} variant={"solid"} colorScheme={"blue"}>
                        Zmień hasło
                    </Button>
                </Form>
            </Formik >
        </Box>
    )
}