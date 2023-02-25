import { Container, Box, Text, Input, Button, Flex, Textarea } from "@chakra-ui/react";
import SecondaryText from "../components/SecondaryText";
import Uploader from '../components/Uploader/Uploader'
export default function NewAd() {
    return (
        <Box color={'blue.900'} bg={'gray.50'}>
            <Container maxW={{ md: 'container.md', lg: 'container.lg', xl: 'container.xl' }} >
                <Text mb={'30px'} fontWeight={'bold'} textTransform={'capitalize'} fontSize={'lg'}>dodaj ogłoszenie</Text>
                <Flex gap={'20px'} flexDirection={'column'}>
                    <Box boxShadow={'md'} bg={'#fff'} borderRadius={'20px'} padding={'20px'}>
                        <Box maxW={'container.sm'}>
                            <Text mb={'30px'} fontWeight={'bold'} fontSize={'md'}>Im więcej szczegółów, tym lepiej!</Text>
                            <Text mb={'10px'}>Tytuł ogłoszenia</Text>
                            <Input mb={'30px'} size={'md'}></Input>
                            <Text mb={'10px'}>Kategoria</Text>
                            <Button mb={'30px'} variant={'solid'} colorScheme={'blue'}>Wybierz kategorie</Button>
                        </Box>
                    </Box>


                    <Box boxShadow={'md'} bg={'#fff'} borderRadius={'20px'} padding={'20px'}>
                            <Text mb={'30px'} fontWeight={'bold'} fontSize={'md'}>Zdjęcia</Text>
                            <SecondaryText mb={'10px'} >Pierwsze zdjęcie będzie zdjęciem głównym. Przeciągaj zdjęcia na inne miejsca, aby zmienić ich kolejność</SecondaryText>
                            <Uploader mb={'30px'} />
                    </Box>

                    <Box boxShadow={'md'} bg={'#fff'} borderRadius={'20px'} padding={'20px'}>
                        <Box maxW={'container.sm'}><Text mb={'30px'} fontWeight={'bold'} fontSize={'md'}>Opis</Text>
                            <Textarea mb={'10px'} rows={'11'} background={'gray.50'} resize={'none'} placeholder='Wpisz te informacje, które byłyby ważne dla Ciebie podczas przeglądania takiego ogłoszenia'></Textarea>
                            <Flex mb={'30px'} justifyContent={'space-between'}>
                                <SecondaryText>Wpisz jeszcze przynajmniej 80 znaków</SecondaryText>
                                <SecondaryText>0/9000</SecondaryText>
                            </Flex>
                        </Box>
                    </Box>


                    <Box boxShadow={'md'} bg={'#fff'} borderRadius={'20px'} padding={'20px'}>
                        <Box maxW={'30%'}>
                            <Text mb={'30px'} fontWeight={'bold'} fontSize={'md'}>Dane kontaktowe</Text>
                            <Text mb={'10px'}>Osoba kontaktowa</Text>
                            <Input mb={'30px'} size={'md'}></Input>
                            <Text mb={'10px'}>Numer telefonu</Text>
                            <Input mb={'30px'} size={'md'}></Input>
                            <Text mb={'10px'}>Lokalizacja</Text>
                            <Input mb={'30px'} size={'md'}></Input>
                        </Box>
                    </Box>


                    <Box mb={'20px'} gap={'20px'} display={'flex'} justifyContent={'flex-end'} boxShadow={'md'} bg={'#fff'} borderRadius={'20px'} padding={'20px'}>
                        <Button variant={'solid'} >Podgląd ogłoszenia</Button>
                        <Button variant={'solid'} colorScheme={'blue'}>Dodaj ogłoszenie</Button>
                    </Box>
                </Flex>

            </Container>
        </Box>

    )
}