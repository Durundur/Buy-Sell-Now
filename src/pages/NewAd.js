import { Container, Box, Text, Input, Button, Flex, Textarea } from "@chakra-ui/react";
import SecondaryText from "../components/SecondaryText";
import UploadGrid from '../components/Uploader/UploadGrid'
import Category from "../components/SelectCategory/Category";
import axios from "axios";
import { createRef, useRef, useState } from 'react'

export default function NewAd() {
    const [adData, setAdData] = useState({})
    const UploaderRef = useRef()
    const [filesUrls, setfilesUrls] = useState([])
    const [charCounter, setCharCounter] = useState(0)


    const handleAddButton = async (e) => {
        try {
            await setfilesUrls(await UploaderRef.current.postFiles())
        } catch (error) {

        }
    }
    const handleInputChange = (e) => {
        if (e.target.name === 'description') {
            setAdData((prev) => ({ ...prev, [e.target.name]: e.target.value.replace(/\n\r?/g, '<br />') }))
            return
        }
        setAdData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }
    
   
    return (
        <Box color={'blue.900'} bg={'gray.50'}>
            <Container maxW={{ md: 'container.md', lg: 'container.lg', xl: 'container.xl' }} >
                <Text mb={'30px'} fontWeight={'bold'} textTransform={'capitalize'} fontSize={'lg'}>dodaj ogłoszenie</Text>
                <Flex gap={'20px'} flexDirection={'column'}>
                    <Box boxShadow={'md'} bg={'#fff'} borderRadius={'20px'} padding={'20px'}>
                        <Box maxW={'container.sm'}>
                            <Text mb={'30px'} fontWeight={'bold'} fontSize={'md'}>Im więcej szczegółów, tym lepiej!</Text>
                            <Text mb={'10px'}>Tytuł ogłoszenia</Text>
                            <Input onChange={(e) => handleInputChange(e)} name={'tittle'} autoComplete={'off'} mb={'30px'} size={'md'}></Input>
                            <Text mb={'10px'}>Kategoria</Text>
                            <Category />
                        </Box>
                    </Box>
                    <Box boxShadow={'md'} bg={'#fff'} borderRadius={'20px'} padding={'20px'}>
                        <Text mb={'30px'} fontWeight={'bold'} fontSize={'md'}>Zdjęcia</Text>
                        <SecondaryText mb={'10px'} >Pierwsze zdjęcie będzie zdjęciem głównym. Przeciągaj zdjęcia na inne miejsca, aby zmienić ich kolejność</SecondaryText>
                        <UploadGrid ref={UploaderRef} mb={'30px'} />
                    </Box>

                    <Box boxShadow={'md'} bg={'#fff'} borderRadius={'20px'} padding={'20px'}>
                        <Box maxW={'container.sm'}><Text mb={'30px'} fontWeight={'bold'} fontSize={'md'}>Opis</Text>
                            <Textarea onChange={(e) => {
                                handleInputChange(e)
                                setCharCounter(e.target.value.length)
                            }} name="description" autoComplete={'off'} mb={'10px'} rows={'11'} background={'gray.50'} resize={'none'} placeholder='Wpisz te informacje, które byłyby ważne dla Ciebie podczas przeglądania takiego ogłoszenia'></Textarea>
                            <Flex mb={'30px'} justifyContent={'space-between'}>
                                <SecondaryText>{charCounter >= 180 ? null : `Wpisz jeszcze przynajmniej ${180 - charCounter} znaków`}</SecondaryText>
                                <SecondaryText>{charCounter}/9000</SecondaryText>
                            </Flex>
                        </Box>
                    </Box>


                    <Box boxShadow={'md'} bg={'#fff'} borderRadius={'20px'} padding={'20px'}>
                        <Box maxW={'30%'}>
                            <Text mb={'30px'} fontWeight={'bold'} fontSize={'md'}>Dane kontaktowe</Text>
                            <Text mb={'10px'}>Osoba kontaktowa</Text>
                            <Input onChange={(e) => handleInputChange(e)} name={'sellerName'} autoComplete={'off'} mb={'30px'} size={'md'}></Input>
                            <Text mb={'10px'}>Numer telefonu</Text>
                            <Input onChange={(e) => handleInputChange(e)} name={'phoneNumber'} autoComplete={'off'} mb={'30px'} size={'md'}></Input>
                            <Text mb={'10px'}>Lokalizacja</Text>
                            <Input onChange={(e) => handleInputChange(e)} name={'location'} autoComplete={'off'} mb={'30px'} size={'md'}></Input>
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