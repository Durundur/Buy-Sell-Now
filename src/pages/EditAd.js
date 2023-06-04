import { Container, Box, Text, Input, Button, Flex, Textarea, Select } from "@chakra-ui/react";
import SecondaryText from "../components/SecondaryText";
import UploadGrid from '../components/Uploader/UploadGrid'
import Category from "../components/SelectCategory/Category";
import { createRef, useEffect, useRef, useState } from 'react'
import { useNavigate,useLocation } from "react-router";
import categoriesFields from "../components/categoriesFields";
import usePost from "../hooks/usePost";
import useFetch from "../hooks/useFetch";

export default function EditAd() {
    const navigate = useNavigate();
    const uploaderRef = useRef()
    const [charCounter, setCharCounter] = useState(0)


    const [adData, setAdData] = useState({})
    const [categories, setCategories] = useState();
    const [categoryFields, setCategoryFields] = useState()
    const { response, isLoading, postData} = usePost('https://buy-sell-now.fly.dev/api/v1/ads', adData)
    

    const location = useLocation();
    const id = '647a43b5b4038a610b46a503' || location.pathname.split("/")[2];
    const {data, loading, error, setData} = useFetch("https://buy-sell-now.fly.dev/api/v1/ads/" + id)

    // useEffect(()=>{
    //     console.log(testVar)
    // },[testVar])

    


    const handleAddButton = async (e) => {
        try {
            adData['images'] = await uploaderRef.current.postFiles();
            postData()
        } catch (error) {
            console.log(error)
        }
    }

    const handleInputChange = (e) => {
        const value = e.target.value;
        const name = e.target.name.split(".");
        if (e.target.name === 'description') {
            setAdData((prev) => ({ ...prev, [e.target.name]: e.target.value.replace(/\n\r?/g, '<br />') }))
            return
        }
        if(name[1]){
        setAdData((prev) => ({
            ...prev,
            [name[0]]: {
                ...prev[name[0]],
                [name[1]]: value
            }
        }))}
        else{
            setAdData((prev)=>({
                ...prev, [name[0]]: value
            }))
        }
    }


    useEffect(()=>{
        if(response.status === 200)
            navigate('/ogloszenie/' + response.data._id)
    }, [response])

    useEffect(() => {
        if(categories){
            if(categoriesFields){
                setCategoryFields(categoriesFields.find(o=> o.subCategoryName.includes(categories[1])).fields)
            }
        }  
    }, [categories])

    const formatDescritpion = (text)=>{
        return text?.replace(/<br\s*[\/]?>/gi, "\n")
    }






    const testCategories = ['motoryzacja', 'dostawcze', 'autolaweta'];
    console.log(categories)

    return (
        <Box pt={'30px'} color={'blue.900'} bg={'gray.50'}>
            <Container maxW={{ md: 'container.md', lg: 'container.lg', xl: 'container.xl' }} >
                <Text mb={'30px'} fontWeight={'bold'} textTransform={'capitalize'} fontSize={'lg'}>edytuj ogłoszenie</Text>
                <Flex gap={'20px'} flexDirection={'column'}>
                    <Box boxShadow={'md'} bg={'#fff'} borderRadius={'20px'} padding={'20px'}>
                        <Box maxW={'container.sm'}>
                            <Text mb={'30px'} fontWeight={'bold'} fontSize={'md'}>Im więcej szczegółów, tym lepiej!</Text>
                            <Text mb={'10px'}>Tytuł ogłoszenia</Text>
                            <Input  shadow={'md'} variant="filled" bg={'gray.50'} value={data?.tittle} onChange={(e) => handleInputChange(e)} name={'tittle'} autoComplete={'off'} mb={'30px'} size={'md'}></Input>
                            <Text mb={'10px'}>Kategoria</Text>
                            <Category onChange={(categories)=>{setCategories(categories)}}/>
                            {console.log}
                        </Box>
                    </Box>
                    <Box boxShadow={'md'} bg={'#fff'} borderRadius={'20px'} padding={'20px'}>
                        <Text mb={'30px'} fontWeight={'bold'} fontSize={'md'}>Zdjęcia</Text>
                        <SecondaryText mb={'10px'} >Pierwsze zdjęcie będzie zdjęciem głównym. Przeciągaj zdjęcia na inne miejsca, aby zmienić ich kolejność</SecondaryText>
                        <UploadGrid ref={uploaderRef}  mb={'30px'} />
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
                                categoryFields?.map((field)=>{
                                    return (<>
                                        <Text textTransform={'capitalize'}  mb={'10px'}>{field?.label}</Text>
                                        {
                                            field.type==='select' ? 
                                            <Select key={field.label + field.name} shadow={'sm'} variant="filled" bg={'gray.50'}  textTransform={'capitalize'} onChange={(e) => handleInputChange(e)}  name={field?.name} autoComplete={'off'} mb={'30px'} size={'md'}>
                                                <option selected hidden disabled value>{field.placeholder}</option>
                                                {
                                                    field.values.map((option)=>{
                                                        return(
                                                            <option value={option}>{option}</option>
                                                        )
                                                    })
                                                }
                                            </Select>
                                            : <Input value={data?.field.name} key={field.label + field.name} shadow={'sm'} variant="filled" bg={'gray.50'}   onChange={(e) => handleInputChange(e)} placeholder={field?.placeholder} type={field?.type}  name={field?.name} autoComplete={'off'} mb={'30px'} size={'md'}></Input>
                                        }
                                        
                                    </>)
                                })
                            }
                            
                        </Box>
                        </Box>
                    }

                    <Box boxShadow={'md'} bg={'#fff'} borderRadius={'20px'} padding={'20px'}>
                        <Box maxW={'30%'}>
                            <Text mb={'30px'} fontWeight={'bold'} fontSize={'md'}>Dane kontaktowe</Text>
                            <Text textTransform={'capitalize::first-letter'} mb={'10px'}>Osoba kontaktowa</Text>
                            <Input value={data?.advertiser.name} shadow={'sm'} variant="filled" bg={'gray.50'} onChange={(e) => handleInputChange(e)} name={'advertiser.name'} autoComplete={'off'} mb={'30px'} size={'md'}></Input>
                            <Text textTransform={'capitalize::first-letter'} mb={'10px'}>Numer telefonu</Text>
                            <Input value={data?.advertiser.phoneNumber} shadow={'sm'} variant="filled" bg={'gray.50'}  onChange={(e) => handleInputChange(e)} name={'advertiser.phoneNumber'} autoComplete={'off'} mb={'30px'} size={'md'}></Input>
                            <Text textTransform={'capitalize::first-letter'} mb={'10px'}>Lokalizacja</Text>
                            <Input value={data?.localization.place} shadow={'sm'} variant="filled" bg={'gray.50'} onChange={(e) => handleInputChange(e)} name={'localization.place'} autoComplete={'off'} mb={'30px'} size={'md'}></Input>
                        </Box>
                    </Box>


                    <Box mb={'20px'} gap={'20px'} display={'flex'} justifyContent={'flex-end'} boxShadow={'md'} bg={'#fff'} borderRadius={'20px'} padding={'20px'}>
                        <Button variant={'solid'} >Podgląd ogłoszenia</Button>
                        <Button onClick={(e) => handleAddButton(e)} variant={'solid'} colorScheme={'blue'}>Dodaj ogłoszenie</Button>
                    </Box>
                </Flex>

            </Container>
        </Box>

    )
}