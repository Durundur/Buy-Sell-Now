
import { Formik, Form } from "formik"
import { Text } from '@chakra-ui/react'
import * as Yup from 'yup';
import { Button } from '@chakra-ui/react'
import { updateUserInfo } from "../../../utils/apiServices";
import LoadingSpinner from '../../LoadingSpinner'
import { Box } from "@chakra-ui/react";
import AdvertiserInfoInputs from "../../Form/AdvertiserInfoInputs"
import { handleInputChange } from "../../../utils/utils";
import { CompanyInfo } from '../../Form/CompanyInfo'
export default function ChangeGeneralInfo({ data, setData, error, isLoading, triggerApiCall, }) {

    if (isLoading) return <LoadingSpinner></LoadingSpinner>
    return (
        <Box w={['100%', '80%', '65%', '40%']}>
            {data?.advertiser?.isCompanyAcc ?
                <GeneralInfoCompany data={data} setData={setData} triggerApiCall={triggerApiCall} error={error}></GeneralInfoCompany>
                :
                <GeneralInfoPersonal data={data} setData={setData} triggerApiCall={triggerApiCall} error={error}></GeneralInfoPersonal>
            }
        </Box>

    )
}


function GeneralInfoPersonal({ data, setData, triggerApiCall, error }) {
    return (
        <Formik enableReinitialize initialValues={{ advertiser: data.advertiser }} validationSchema={Yup.object().shape({
            advertiser: Yup.object().shape({
                name: Yup.string().required('Pole obowiązkowe'),
                phoneNumber: Yup.string().matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/).max(13, 'Niepoprawny numer telefonu').required('Pole obowiązkowe').trim(),
            })
        })} onSubmit={(values) => { triggerApiCall(updateUserInfo(values)) }}>
            <Form>
                <AdvertiserInfoInputs onInputChange={(e) => handleInputChange(e, data, setData)}></AdvertiserInfoInputs>
                {error && <Text fontSize={'14px'} color={'red.500'}>{error?.response?.data?.message}</Text>}
                <Button mt={4} variant={"solid"} type={'submit'} colorScheme={"blue"}>
                    Zapisz
                </Button>
            </Form>
        </Formik>
    )
}


function GeneralInfoCompany({ data, triggerApiCall, setData, error }) {
    return (
        <Formik enableReinitialize initialValues={{ advertiser: data.advertiser }} validationSchema={Yup.object().shape({
            advertiser: Yup.object().shape({
                name: Yup.string().required('Pole obowiązkowe'),
                phoneNumber: Yup.string().matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/).max(13, 'Niepoprawny numer telefonu').required('Pole obowiązkowe').trim(),
            })
        })} onSubmit={(values) => { triggerApiCall(updateUserInfo(values)) }}>
            <Form>
                <CompanyInfo onInputChange={(e) => handleInputChange(e, data, setData)}></CompanyInfo>
                {error && <Text fontSize={'14px'} color={'red.500'}>{error?.response?.data?.message}</Text>}
                <Button mt={4} variant={"solid"} type={'submit'} colorScheme={"blue"}>
                    Zapisz
                </Button>
            </Form>
        </Formik>
    )

}