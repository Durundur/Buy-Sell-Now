
import { Formik, Form } from "formik"
import * as Yup from 'yup';
import { Button } from '@chakra-ui/react'
import { TextInput } from "../../Form/TextInput";
import { Box } from "@chakra-ui/react";

export default function ChangeEmail() {
    return (
        <Box w={['100%', '80%', '65%', '40%']}>
            <Formik initialValues={{
                email: '',
            }} validationSchema={Yup.object({
                email: Yup.string()
                    .email('Nieprawidłowy adres e-mail')
                    .required('Pole obowiązkowe'),
            })}>
                <Form>
                    <TextInput label="Nowy e-mail" name="email" type="email" placeholder="" />
                    <Button mt={4} variant={"solid"} colorScheme={"blue"}>
                        Zmień e-mail
                    </Button>
                </Form>
            </Formik>
        </Box>
    )
}