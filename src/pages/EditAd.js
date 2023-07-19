import { Container, Box, Text, Input, Button, Flex, Textarea, Select } from "@chakra-ui/react";
import SecondaryText from "../components/SecondaryText";
import UploadGrid from '../components/Uploader/UploadGrid'
import Category from "../components/SelectCategory/Category";
import { useEffect, useRef, useState } from 'react'
import { useNavigate, useLocation } from "react-router";
import LoadingSpinner from "../components/LoadingSpinner"
import { useApiContext } from "../contexts";
import Error from "../components/Error";
import useApi from "../hooks/useApi";
import { updateAd, getAd } from "../utils/apiServices";
import { useParams } from 'react-router-dom'
import ContainerBox from "../components/ContainerBox";
import AdDetailsInputs from "../components/Form/AdDetailsInputs";

export default function EditAd() {
    const { id } = useParams();
    const uploaderRef = useRef()
    const [charCounter, setCharCounter] = useState(0)
    const { data, error, updateData, isLoading, triggerApiCall } = useApi()




    useEffect(() => {
        triggerApiCall(getAd(id));
    }, [])


    const handleSubmitButton = async (e) => {
        try {
            let adImagesUrls = await uploaderRef.current.postFiles();
            const updatedData = { ...data, images: adImagesUrls };
            await triggerApiCall(updateAd(updatedData, id));
        } catch (error) {
            console.log(error)
        }
    }

    const handleInputChange = (e) => {
        const value = e.target.value;
        const name = e.target.name.split(".");
        let updatedData = { ...data };

        let target = updatedData;
        for (const key of name.slice(0, -1)) {
            if (!target.hasOwnProperty(key)) {
                target[key] = {};
            }
            target = target[key];
        }
        target[name[name.length - 1]] = value;
        updateData(updatedData);
    };

    const handleCategoryChange = (categoryData) => {
        let categoryKeys = Object.keys(categoryData);
        let updatedData = { ...data }
        for (let categoryKey of categoryKeys) {
            updatedData[categoryKey] = categoryData[categoryKey];
        }
        updateData(updatedData);
    }

    const formatDescritpion = (text) => {
        return text?.replace(/<br\s*[\/]?>/gi, "\n")
    }


    return (
        <>
            <ContainerBox>
                {isLoading && <LoadingSpinner></LoadingSpinner>}
                {error && <Error error={error}></Error>}
                {!isLoading && !error && <>
                    <Text mb={'30px'} fontWeight={'bold'} fontSize={'lg'}>Edytuj ogłoszenie</Text>
                    <Flex gap={'20px'} flexDirection={'column'}>
                        <Box boxShadow={'md'} bg={'#fff'} borderRadius={'20px'} padding={'20px'}>
                            <Box maxW={'container.sm'}>
                                <Text mb={'30px'} fontWeight={'bold'} fontSize={'md'}>Im więcej szczegółów, tym lepiej!</Text>
                                <Text mb={'10px'}>Tytuł ogłoszenia</Text>
                                <Input shadow={'md'} variant="filled" bg={'gray.50'} value={data?.tittle} onChange={(e) => handleInputChange(e)} name={'tittle'} autoComplete={'off'} mb={'30px'} size={'md'}></Input>
                                <Text mb={'10px'}>Kategoria</Text>
                                <Category id={'category'} mainCategory={data?.mainCategory} subCategory={data?.subCategory} subSubCategory={data?.subSubCategory} onChange={(categoryData) => { handleCategoryChange(categoryData) }} />
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
                                    handleInputChange(e)
                                    setCharCounter(e.target.value.length)
                                }} name="description" value={formatDescritpion(data?.description)} autoComplete={'off'} mb={'10px'} rows={'11'} shadow={'sm'} variant="filled" bg={'gray.50'} resize={'none'} placeholder='Wpisz te informacje, które byłyby ważne dla Ciebie podczas przeglądania takiego ogłoszenia'></Textarea>
                                <Flex mb={'30px'} justifyContent={'space-between'}>
                                    <SecondaryText>{charCounter >= 180 ? null : `Wpisz jeszcze przynajmniej ${180 - charCounter} znaków`}</SecondaryText>
                                    <SecondaryText>{charCounter}/9000</SecondaryText>
                                </Flex>
                            </Box>
                        </Box>

                        <AdDetailsInputs data={data}></AdDetailsInputs>

                        <Box boxShadow={'md'} bg={'#fff'} borderRadius={'20px'} padding={'20px'}>
                            <Box maxW={'30%'}>
                                <Text mb={'30px'} fontWeight={'bold'} fontSize={'md'}>Dane kontaktowe</Text>
                                <Text textTransform={'capitalize::first-letter'} mb={'10px'}>Osoba kontaktowa</Text>
                                <Input value={data?.advertiser?.name || ''} shadow={'sm'} variant="filled" bg={'gray.50'} onChange={(e) => handleInputChange(e)} name={'advertiser.name'} autoComplete={'off'} mb={'30px'} size={'md'}></Input>
                                <Text textTransform={'capitalize::first-letter'} mb={'10px'}>Numer telefonu</Text>
                                <Input value={data?.advertiser?.phoneNumber || ''} shadow={'sm'} variant="filled" bg={'gray.50'} onChange={(e) => handleInputChange(e)} name={'advertiser.phoneNumber'} autoComplete={'off'} mb={'30px'} size={'md'}></Input>
                                <Text textTransform={'capitalize::first-letter'} mb={'10px'}>Lokalizacja</Text>
                                <Input value={data?.localization?.place || ''} shadow={'sm'} variant="filled" bg={'gray.50'} onChange={(e) => handleInputChange(e)} name={'localization.place'} autoComplete={'off'} mb={'30px'} size={'md'}></Input>
                            </Box>
                        </Box>


                        <Box mb={'20px'} gap={'20px'} display={'flex'} justifyContent={'flex-end'} boxShadow={'md'} bg={'#fff'} borderRadius={'20px'} padding={'20px'}>
                            <Button variant={'solid'} >Podgląd ogłoszenia</Button>
                            <Button onClick={(e) => handleSubmitButton(e)} variant={'solid'} colorScheme={'blue'}>Edytuj ogłoszenie</Button>
                        </Box>
                    </Flex>
                </>}
            </ContainerBox>
        </>
    )
}