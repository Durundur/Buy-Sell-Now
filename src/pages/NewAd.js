import { Container, Box, Text, Input, Button, Flex, Textarea, Select } from "@chakra-ui/react";
import SecondaryText from "../components/SecondaryText";
import UploadGrid from '../components/Uploader/UploadGrid'
import Category from "../components/SelectCategory/Category";
import { useEffect, useRef, useState } from 'react'
import LoadingSpinner from "../components/LoadingSpinner"
import Error from "../components/Error";
import useApi from "../hooks/useApi";
import { postAd } from "../utils/apiServices";
import ContainerBox from "../components/ContainerBox";
import AdDetailsInputs from "../components/Form/AdDetailsInputs";
import { TextInput } from "../components/Form/TextInput";
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { formatDescritpion } from '../utils/utils'
import AdvertiserInfoInputs from '../components/Form/AdvertiserInfo';
import { handleInputChange } from "../utils/utils";
import { getUserInfo } from "../utils/apiServices";

export default function NewAd() {
    const uploaderRef = useRef()
    const [charCounter, setCharCounter] = useState(0)
    const { data, error, setData, isLoading, triggerApiCall } = useApi()

    useEffect(() => {
        triggerApiCall(getUserInfo())
            .then(() => {
                setData((prevData) => {
                    const { address, ...restAdvertiser } = prevData.advertiser;
                    return { address, advertiser: restAdvertiser }
                })
            })
    }, [])


    const handleSubmitButton = async (e) => {
        try {
            let adImagesUrls = await uploaderRef.current.postFiles();
            const updatedData = { ...data, images: adImagesUrls };
            await triggerApiCall(postAd(updatedData));
        } catch (error) {
            console.log(error)
        }
    }


    const handleCategoryChange = (categoryData) => {
        let categoryKeys = Object.keys(categoryData);
        let updatedData = { ...data }
        for (let categoryKey of categoryKeys) {
            updatedData[categoryKey] = categoryData[categoryKey];
        }
        setData(updatedData);
    }




    return (
        <ContainerBox bgColor1={'gray.50'}>
            {isLoading && <LoadingSpinner></LoadingSpinner>}
            {error && <Error error={error}></Error>}
            {!isLoading && !error && <>
                <Text mb={'30px'} fontWeight={'bold'} fontSize={'lg'}>Edytuj ogłoszenie</Text>
                <Formik enableReinitialize initialValues={{ ...data }} validationSchema={Yup.object().shape({
                    advertiser: Yup.object().shape({
                        name: Yup.string().required('Pole obowiązkowe'),
                        phoneNumber: Yup.string().matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/).max(13, 'Niepoprawny numer telefonu').required('Pole obowiązkowe').trim()
                    }),
                    localization: Yup.object().shape({
                        place: Yup.string().min(2, 'Niepoprawna nazwa miejscowości').required('Pole obowiązkowe'),
                    })
                })}>
                    <Form>
                        <Flex gap={'20px'} flexDirection={'column'}>
                            <Box boxShadow={'md'} bg={'#fff'} borderRadius={'20px'} padding={'20px'}>
                                <Box maxW={'container.sm'}>
                                    <Text mb={'30px'} fontWeight={'bold'} fontSize={'md'}>Im więcej szczegółów, tym lepiej!</Text>
                                    <TextInput label={'Tytuł ogłoszenia'} onChange={(e) => handleInputChange(e, data, setData)} name='tittle'></TextInput>
                                    <Text mb={'10px'}>Kategoria</Text>
                                    <Category mainCategory={data?.mainCategory} subCategory={data?.subCategory} subSubCategory={data?.subSubCategory} onChange={(categoryData) => { handleCategoryChange(categoryData) }} />
                                </Box>
                            </Box>

                            <Box boxShadow={'md'} bg={'#fff'} borderRadius={'20px'} padding={'20px'}>
                                <Text mb={'30px'} fontWeight={'bold'} fontSize={'md'}>Zdjęcia</Text>
                                <SecondaryText mb={'10px'} >Pierwsze zdjęcie będzie zdjęciem głównym. Przeciągaj zdjęcia na inne miejsca, aby zmienić ich kolejność</SecondaryText>
                                <UploadGrid value={data?.images} ref={uploaderRef} mb={'30px'} />
                            </Box>

                            <Box boxShadow={'md'} bg={'#fff'} borderRadius={'20px'} padding={'20px'}>
                                <Box maxW={'container.sm'}><Text mb={'30px'} fontWeight={'bold'} fontSize={'md'}>Opis</Text>
                                    <Textarea onChange={(e) => {
                                        handleInputChange(e, data, setData)
                                        setCharCounter(e.target.value.length)
                                    }} name="description" value={formatDescritpion(data?.description)} autoComplete={'off'} mb={'10px'} rows={'11'} shadow={'sm'} variant="filled" bg={'gray.50'} resize={'none'} placeholder='Wpisz te informacje, które byłyby ważne dla Ciebie podczas przeglądania takiego ogłoszenia'></Textarea>
                                    <Flex mb={'30px'} justifyContent={'space-between'}>
                                        <SecondaryText>{charCounter >= 180 ? null : `Wpisz jeszcze przynajmniej ${180 - charCounter} znaków`}</SecondaryText>
                                        <SecondaryText>{charCounter}/9000</SecondaryText>
                                    </Flex>
                                </Box>
                            </Box>

                            {
                                data?.subCategory &&
                                <Box boxShadow={'md'} bg={'#fff'} borderRadius={'20px'} padding={'20px'}>
                                    <Box maxW={'30%'}>
                                        <Text mb={'30px'} fontWeight={'bold'} fontSize={'md'}>Dodatkowe informacje</Text>
                                        <AdDetailsInputs onInputChange={(e) => handleInputChange(e, data, setData)} data={data}></AdDetailsInputs>
                                    </Box >
                                </Box >
                            }

                            <Box boxShadow={'md'} bg={'#fff'} borderRadius={'20px'} padding={'20px'}>
                                <Box maxW={'30%'}>
                                    <Text mb={'30px'} fontWeight={'bold'} fontSize={'md'}>Dane kontaktowe</Text>
                                    <AdvertiserInfoInputs localizationInputName={'address'} onInputChange={(e) => handleInputChange(e, data, setData)} ></AdvertiserInfoInputs>
                                </Box>
                            </Box>

                            <Box mb={'20px'} gap={'20px'} display={'flex'} justifyContent={'flex-end'} boxShadow={'md'} bg={'#fff'} borderRadius={'20px'} padding={'20px'}>
                                <Button variant={'solid'} >Podgląd ogłoszenia</Button>
                                <Button onClick={(e) => handleSubmitButton(e)} variant={'solid'} colorScheme={'blue'}>Dodaj ogłoszenie</Button>
                            </Box>
                        </Flex>
                    </Form>
                </Formik>
            </>}
        </ContainerBox>
    )
}