
import { Formik, Form } from "formik"
import { Text } from '@chakra-ui/react'
import * as Yup from 'yup';
import { Button } from '@chakra-ui/react'
import { updateUserInfo } from "../../../utils/apiServices";
import LoadingSpinner from '../../LoadingSpinner'
import { Box } from "@chakra-ui/react";
import AdvertiserInfo from "../../Form/AdvertiserInfo"
import { handleInputChange } from "../../../utils/utils";

export default function ChangeGeneralInfo({ data, setData, error, isLoading, triggerApiCall }) {

    if (isLoading) return <LoadingSpinner></LoadingSpinner>
    return (
        <Box w={['100%', '80%', '65%', '40%']}>
            <Formik enableReinitialize initialValues={{ advertiser: data.advertiser, localization: data.localization }} validationSchema={Yup.object().shape({
                advertiser: Yup.object().shape({
                    name: Yup.string().required('Pole obowiązkowe'),
                    phoneNumber: Yup.string().matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/).max(13, 'Niepoprawny numer telefonu').required('Pole obowiązkowe').trim()
                }),
                localization: Yup.object().shape({
                    place: Yup.string().min(2, 'Niepoprawna nazwa miejscowości').required('Pole obowiązkowe'),
                })
            })} onSubmit={(values) => {
                triggerApiCall(updateUserInfo(values))
            }}>
                <Form>
                    <AdvertiserInfo onInputChange={(e) => handleInputChange(e, data, setData)}></AdvertiserInfo>
                    {error && <Text fontSize={'14px'} color={'red.500'}>{error?.response?.data?.message}</Text>}
                    <Button mt={4} variant={"solid"} type={'submit'} colorScheme={"blue"}>
                        Zapisz
                    </Button>
                </Form>
            </Formik>
        </Box>

    )
}