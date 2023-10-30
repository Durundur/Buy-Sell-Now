import { Box, Text, Button, Flex, } from "@chakra-ui/react";
import SecondaryText from "../components/Layout/SecondaryText";
import LoadingSpinner from "../components/Layout/LoadingSpinner"
import Error from "../components/Layout/Error";
import useApi from "../hooks/useApi";
import ContainerBox from "../components/Layout/ContainerBox";
import AdDetailsInputs from "../components/Form/AdDetailsInputs";
import { TextInput } from "../components/Form/TextInput";
import { Form, Formik } from 'formik';
import AdvertiserInfoInputs from '../components/Form/AdvertiserInfo';
import SelectCategory from '../components/SelectCategory/SelectCategory';
import { CREATE_AD_URL } from "../hooks/ApiEndpoints";
import { createFormDataFromObject } from "../utils/utils";
import Uploader from "../components/Uploader/Uploader";
import { TextAreaInput } from "../components/Form/TextAreaInput";
import { EditAdvertQueryType } from "../types/ApiRequestDataTypes";
import { checkIfSubCategoryHasDetailsFields } from "../utils/Categories/categoriesDataMethods";
import { ValidationSchema } from "../utils/AdvertValidationSchema";

export default function NewAd() {
    const { data: createAdResponse, isLoading, error, makeRequest: createAd } = useApi({
        url: CREATE_AD_URL,
        method: 'post',
        headers: { 'Content-Type': 'multipart/form-data', }
    })
   
    const postNewAd = async (adData: EditAdvertQueryType) => {
        try {
            const formData = createFormDataFromObject(adData);
            createAd<FormData>(formData);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <ContainerBox bgColor1={'gray.50'}>
            {isLoading ? <LoadingSpinner/> : <></>}
            {error ? <Error error={error}/> : <></>}
            {(!isLoading && !error) ? <>
                <Text mb={'30px'} fontWeight={'bold'} fontSize={'lg'}>Edytuj ogłoszenie</Text>
                <Formik onSubmit={(value) => postNewAd(value)} initialValues={{} as EditAdvertQueryType} validationSchema={ValidationSchema}>
                    {({values}) => {
                        const descriptionCharCounter = values?.description?.length || 0;
                        const subCategory = values?.subCategory;
                        return (<Form>
                            <Flex gap={'20px'} flexDirection={'column'}>
                                <Box boxShadow={'md'} bg={'#fff'} borderRadius={'20px'} padding={'20px'}>
                                    <Box maxW={'container.sm'}>
                                        <Text mb={'30px'} fontWeight={'bold'} fontSize={'md'}>Im więcej szczegółów, tym lepiej!</Text>
                                        <TextInput label={'Tytuł ogłoszenia'} name='tittle'></TextInput>
                                        <Text mb={'10px'}>Kategoria</Text>
                                        <SelectCategory />
                                    </Box>
                                </Box>

                                <Box boxShadow={'md'} bg={'#fff'} borderRadius={'20px'} padding={'20px'}>
                                    <Text mb={'30px'} fontWeight={'bold'} fontSize={'md'}>Zdjęcia</Text>
                                    <SecondaryText mb={'10px'} >Pierwsze zdjęcie będzie zdjęciem głównym. Przeciągaj zdjęcia na inne miejsca, aby zmienić ich kolejność</SecondaryText>
                                    <Uploader></Uploader>
                                </Box>

                                <Box boxShadow={'md'} bg={'#fff'} borderRadius={'20px'} padding={'20px'}>
                                    <Box maxW={'container.sm'}><Text mb={'30px'} fontWeight={'bold'} fontSize={'md'}>Opis</Text>
                                        <TextAreaInput name="description" autoComplete={'off'} mb={'10px'} rows={11} shadow={'sm'} variant="filled" bg={'gray.50'} resize={'none'} placeholder='Wpisz te informacje, które byłyby ważne dla Ciebie podczas przeglądania takiego ogłoszenia'></TextAreaInput>
                                        <Flex mb={'30px'} justifyContent={'space-between'}>
                                            <SecondaryText>{descriptionCharCounter >= 180 ? null : `Wpisz jeszcze przynajmniej ${180 - descriptionCharCounter} znaków`}</SecondaryText>
                                            <SecondaryText>{descriptionCharCounter}/9000</SecondaryText>
                                        </Flex>
                                    </Box>
                                </Box>

                                 { checkIfSubCategoryHasDetailsFields(subCategory) ?
                                    <Box boxShadow={'md'} bg={'#fff'} borderRadius={'20px'} padding={'20px'}>
                                        <Box maxW={'30%'}>
                                            <Text mb={'30px'} fontWeight={'bold'} fontSize={'md'}>Dodatkowe informacje</Text>
                                            <AdDetailsInputs subCategoryName={subCategory}></AdDetailsInputs>
                                        </Box >
                                </Box > : <></>}

                                <Box boxShadow={'md'} bg={'#fff'} borderRadius={'20px'} padding={'20px'}>
                                    <Box maxW={'30%'}>
                                        <Text mb={'30px'} fontWeight={'bold'} fontSize={'md'}>Dane kontaktowe</Text>
                                        <AdvertiserInfoInputs localizationInputName={'address'}></AdvertiserInfoInputs>
                                    </Box>
                                </Box>

                                <Box mb={'20px'} gap={'20px'} display={'flex'} justifyContent={'flex-end'} boxShadow={'md'} bg={'#fff'} borderRadius={'20px'} padding={'20px'}>
                                    <Button variant={'solid'} >Podgląd ogłoszenia</Button>
                                    <Button type={'submit'} variant={'solid'} colorScheme={'blue'}>Dodaj ogłoszenie</Button>
                                </Box>
                            </Flex>
                        </Form>)
                    }}
                </Formik>
            </> : <></>}
        </ContainerBox>
    )
}