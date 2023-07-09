import { Container, Box, Text, Input, Button, Flex, Textarea, Select } from "@chakra-ui/react";
import SecondaryText from "../components/SecondaryText";
import UploadGrid from '../components/Uploader/UploadGrid'
import Category from "../components/SelectCategory/Category";
import { useEffect, useRef, useState } from 'react'
import { useNavigate, useLocation } from "react-router";
import categoriesFields from "../components/categoriesFields";
import LoadingSpinner from "../components/LoadingSpinner"
import { useApiContext } from "../contexts";
import Error from "../components/Error";
export default function NewAd(props) {
    const navigate = useNavigate();
    const uploaderRef = useRef()
    const [charCounter, setCharCounter] = useState(0)
    const {isLoading, error, postAdData } = useApiContext()
    const [data, setData] = useState({})
    const [categoryFields, setCategoryFields] = useState([]);


    const handleSubmitButton = async (e) => {
        try {
            let adImagesUrls = await uploaderRef.current.postFiles();
            setData((prev) => {
                prev['images'] = adImagesUrls;
                return prev;
            })
            data["images"] = adImagesUrls
            const response = await postAdData(data);
            navigate(response.redirect)
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
        setData(updatedData);
    };

    const handleCategoryChange = (categoryData) => {
        let categoryKeys = Object.keys(categoryData);
        let updatedData = { ...data }
        for(let categoryKey of categoryKeys){
            updatedData[categoryKey] = categoryData[categoryKey];
        }
        if(categoryKeys.includes('subCategory')) setCategoryFields(categoriesFields.find(o => o.subCategoryName.includes(data.subCategory))?.fields)
        setData(updatedData);
    }

    const formatDescritpion = (text) => {
        return text?.replace(/<br\s*[\/]?>/gi, "\n")
    }


    return (
        <>
            <Box pt={'30px'} color={'blue.900'} bg={'gray.50'}>
                <Container maxW={{ md: 'container.md', lg: 'container.lg', xl: 'container.xl' }} >
                    {isLoading && <LoadingSpinner></LoadingSpinner>}
                    {(error?.response?.status >= 400) && <Error error={error}></Error>}
                    {!isLoading && (Object.keys(error).length === 0) && <>
                        <Text mb={'30px'} fontWeight={'bold'} fontSize={'lg'}>Dodaj ogłoszenie</Text>
                        <Flex gap={'20px'} flexDirection={'column'}>
                            <Box boxShadow={'md'} bg={'#fff'} borderRadius={'20px'} padding={'20px'}>
                                <Box maxW={'container.sm'}>
                                    <Text mb={'30px'} fontWeight={'bold'} fontSize={'md'}>Im więcej szczegółów, tym lepiej!</Text>
                                    <Text mb={'10px'}>Tytuł ogłoszenia</Text>
                                    <Input shadow={'md'} variant="filled" bg={'gray.50'} value={data?.tittle} onChange={(e) => handleInputChange(e)} name={'tittle'} autoComplete={'off'} mb={'30px'} size={'md'}></Input>
                                    <Text mb={'10px'}>Kategoria</Text>
                                    <Category id={'category'} mainCategory={data.mainCategory} subCategory={data.subCategory} subSubCategory={data.subSubCategory} onChange={(categoryData)=>{handleCategoryChange(categoryData)}} />
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
                            {
                                categoryFields &&
                                <Box boxShadow={'md'} bg={'#fff'} borderRadius={'20px'} padding={'20px'}>
                                    <Box maxW={'30%'}>
                                        <Text mb={'30px'} fontWeight={'bold'} fontSize={'md'}>Dodatkowe informacje</Text>
                                        {
                                            categoryFields.map((field) => {
                                                let fieldKeys = field.name?.split('.')
                                                let refValue = data
                                                for (let key of fieldKeys) {
                                                    if (refValue.hasOwnProperty(key)) {
                                                        refValue = refValue[key]
                                                    }
                                                }
                                                return (
                                                    <Box key={field?.name + field?.type}>
                                                        <Text textTransform={'capitalize'} mb={'10px'}>{field?.label}</Text>
                                                        {
                                                            field?.type === 'select' ?
                                                                <Select shadow={'sm'} variant="filled" bg={'gray.50'} textTransform={'capitalize'} onChange={(e) => handleInputChange(e)} name={field?.name} value={refValue} autoComplete={'off'} mb={'30px'} size={'md'}>
                                                                    <option hidden disabled >{field.placeholder}</option>
                                                                    {
                                                                        field.values.map((option, index) => {
                                                                            return (
                                                                                <option key={field?.label + field?.name + index} value={option}>{option}</option>
                                                                            )
                                                                        })
                                                                    }
                                                                </Select>
                                                                : <Input value={refValue} key={field?.label + field?.name} shadow={'sm'} variant="filled" bg={'gray.50'} onChange={(e) => handleInputChange(e)} placeholder={field?.placeholder} type={field?.type} name={field?.name} autoComplete={'off'} mb={'30px'} size={'md'}></Input>
                                                        }

                                                    </Box>
                                                )
                                            })
                                        }

                                    </Box>
                                </Box>
                            }

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
                                <Button onClick={(e) => handleSubmitButton(e)} variant={'solid'} colorScheme={'blue'}>Dodaj ogłoszenie</Button>
                            </Box>
                        </Flex>
                    </>}
                </Container>
            </Box>
        </>
    )
}