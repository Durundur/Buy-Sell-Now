import { Box, Text, Button, Flex, Textarea, } from "@chakra-ui/react";
import SecondaryText from "../components/Layout/SecondaryText";
import UploadGrid from '../components/Uploader/UploadGrid'
import { useEffect, useRef, useState } from 'react'
import LoadingSpinner from "../components/Layout/LoadingSpinner"
import Error from "../components/Layout/Error";
import useApi from "../hooks/useApi";
import { useParams } from 'react-router-dom'
import ContainerBox from "../components/Layout/ContainerBox";
import AdDetailsInputs from "../components/Form/AdDetailsInputs";
import { TextInput } from "../components/Form/TextInput";
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import AdvertiserInfoInputs from '../components/Form/AdvertiserInfo';
import { UPDATE_AD_URL, GET_AD_URL } from '../hooks/ApiEndpoints';
import { AdvertQueryType } from "../types/ApiRequestDataTypes";
import { TextAreaInput } from './../components/Form/TextAreaInput';
import SelectCategory from "../components/SelectCategory/SelectCategory";
import Uploader from './../components/Uploaderv2/Uploader';


export default function EditAd() {
    const { id } = useParams();
    const uploaderRef = useRef();
    const [charCounter, setCharCounter] = useState(0);
    const { data: updateAdResponse, isLoading: updateAdLoading, makeRequest: updateAd } = useApi({
        url: UPDATE_AD_URL(id as string),
        method: 'put'
    })
    const { data: adData,  isLoading: getAdLoading, makeRequest: getAd } = useApi<AdvertQueryType>({
        url: GET_AD_URL(id as string)
    })
    const isLoading = updateAdLoading || getAdLoading
    useEffect(() => {
        getAd();
    }, [])


    const handleSubmit = async (newAdData: AdvertQueryType) => {
        try {
            // let adImagesUrls = await uploaderRef.current.postFiles();
            // const updatedData = { ...data, images: adImagesUrls };
            updateAd<AdvertQueryType>(newAdData);
            // console.log(newAdData)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <ContainerBox bgColor1={'gray.50'}>
            {isLoading ? <LoadingSpinner></LoadingSpinner> : <></>}
            {!isLoading ? <>
                <Text mb={'30px'} fontWeight={'bold'} fontSize={'lg'}>Edytuj ogłoszenie</Text>
                <Formik onSubmit={(value)=>handleSubmit(value)} initialValues={adData as AdvertQueryType} validationSchema={Yup.object().shape({
                    advertiser: Yup.object().shape({
                        name: Yup.string().required('Pole obowiązkowe'),
                        phoneNumber: Yup.string().matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/).max(13, 'Niepoprawny numer telefonu').required('Pole obowiązkowe').trim()
                    }),
                })}>
                    <Form>
                        <Flex gap={'20px'} flexDirection={'column'}>
                            <Box boxShadow={'md'} bg={'#fff'} borderRadius={'20px'} padding={'20px'}>
                                <Box maxW={'container.sm'}>
                                    <Text mb={'30px'} fontWeight={'bold'} fontSize={'md'}>Im więcej szczegółów, tym lepiej!</Text>
                                    <TextInput label={'Tytuł ogłoszenia'} name='tittle'></TextInput>
                                    <Text mb={'10px'}>Kategoria</Text>
                                    <SelectCategory/>
                                </Box>
                            </Box>

                            <Box boxShadow={'md'} bg={'#fff'} borderRadius={'20px'} padding={'20px'}>
                                <Text mb={'30px'} fontWeight={'bold'} fontSize={'md'}>Zdjęcia</Text>
                                <SecondaryText mb={'10px'} >Pierwsze zdjęcie będzie zdjęciem głównym. Przeciągaj zdjęcia na inne miejsca, aby zmienić ich kolejność</SecondaryText>
                                {/* <UploadGrid value={data?.images} ref={uploaderRef} mb={'30px'} /> */}
                                <Uploader></Uploader>
                            </Box>

                            <Box boxShadow={'md'} bg={'#fff'} borderRadius={'20px'} padding={'20px'}>
                                <Box maxW={'container.sm'}><Text mb={'30px'} fontWeight={'bold'} fontSize={'md'}>Opis</Text>
                                    <TextAreaInput name="description" autoComplete={'off'} mb={'10px'} rows={11} shadow={'sm'} variant="filled" bg={'gray.50'} resize={'none'} placeholder='Wpisz te informacje, które byłyby ważne dla Ciebie podczas przeglądania takiego ogłoszenia'></TextAreaInput>
                                    <Flex mb={'30px'} justifyContent={'space-between'}>
                                        <SecondaryText>{charCounter >= 180 ? null : `Wpisz jeszcze przynajmniej ${180 - charCounter} znaków`}</SecondaryText>
                                        <SecondaryText>{charCounter}/9000</SecondaryText>
                                    </Flex>
                                </Box>
                            </Box>

                            <Box boxShadow={'md'} bg={'#fff'} borderRadius={'20px'} padding={'20px'}>
                                <Box maxW={'30%'}>
                                    <Text mb={'30px'} fontWeight={'bold'} fontSize={'md'}>Dodatkowe informacje</Text>
                                    <AdDetailsInputs subCategoryName={adData?.subCategory}></AdDetailsInputs>
                                </Box >
                            </Box >

                            <Box boxShadow={'md'} bg={'#fff'} borderRadius={'20px'} padding={'20px'}>
                                <Box maxW={'30%'}>
                                    <Text mb={'30px'} fontWeight={'bold'} fontSize={'md'}>Dane kontaktowe</Text>
                                    <AdvertiserInfoInputs localizationInputName={'address'}></AdvertiserInfoInputs>
                                </Box>
                            </Box>

                            <Box mb={'20px'} gap={'20px'} display={'flex'} justifyContent={'flex-end'} boxShadow={'md'} bg={'#fff'} borderRadius={'20px'} padding={'20px'}>
                                <Button variant={'solid'} >Podgląd ogłoszenia</Button>
                                <Button type={'submit'} variant={'solid'} colorScheme={'blue'}>Edytuj ogłoszenie</Button>
                            </Box>
                        </Flex>
                    </Form>
                </Formik>
            </> : <></>}
        </ContainerBox>
    )
}

