import { Box, Container, Flex, HStack, Text, Stack, Divider, Avatar, VStack, Button } from "@chakra-ui/react";
import {React, useRef} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Carousel from "../components/Carousel";
import GeneralSpec from "../components/GeneralSpec";
import Header from '../components/Header'
import SecondaryText from '../components/SecondaryText'
import { TfiHelpAlt, TfiAngleRight, TfiLocationPin, TfiMobile } from "react-icons/tfi";
import useFetch from '../hooks/useFetch'

function Ad() {
    const location = useLocation();
    const phoneNumber = useRef(null);
    const id = location.pathname.split("/")[2];
    const {data, loading, error} = useFetch("http://localhost:7000/api/v1/ads/" + id)
    return (
        <Box pb={10} color={'blue.900'} bg={'gray.50'}>
            <Container maxW={{ md: 'container.md', lg: 'container.lg', xl: 'container.xl' }} >
                <Flex gap={'20px'} display={'flex'} flexDirection={'row'}>
                    <Flex gap={'20px'} width={'70%'} flexDirection={'column'}>
                        <Box boxShadow={'md'} bg={'#fff'} borderRadius={'20px'} padding={'20px'}>
                            <Carousel cards={data ? data?.images : []}></Carousel>
                        </Box>

                        <Stack boxShadow={'md'} bg={'#fff'} borderRadius={'20px'} padding={'20px'}>
                            <Text fontSize='2xl' fontWeight={'medium'}>{data?.tittle}</Text>
                            <Text fontSize={'2xl'} fontWeight={'bold'} >{data?.price?.value + " zł"}</Text>
                            <GeneralSpec></GeneralSpec>
                            <Text fontSize='md' textTransform={'uppercase'} fontWeight={'bold'}>opis</Text>
                            <Text fontSize={'lg'} whiteSpace={'pre-line'} dangerouslySetInnerHTML={{__html: data?.description}}></Text>
                            <Divider></Divider>
                            <Flex justifyContent={'space-between'}>
                                <SecondaryText>ID: {data?._id}</SecondaryText>
                                <SecondaryText>Wyświetlenia: {}</SecondaryText>
                                <SecondaryText>Zgłoś</SecondaryText>
                            </Flex>
                        </Stack>
                    </Flex>
                    <Flex gap={'20px'} flexDirection={'column'}>
                        <Box boxShadow={'md'} bg={'#fff'} borderRadius={'20px'} padding={'20px'}>
                            <Text fontSize='md' textTransform={'uppercase'} fontWeight={'bold'}>osoba prywatna</Text>
                            <Flex mt={'20px'} gap={'20px'} alignItems={'center'}>
                                <Avatar></Avatar>
                                <Flex flexDirection={'column'} alignItems={'flex-start'}>
                                    <Text mb={'5px'} fontWeight={'medium'} fontSize={'lg'}>{data?.advertiser?.name}</Text>
                                    <SecondaryText fontWeight={'light'}>Na OLX od grudzień 2022</SecondaryText>
                                    <SecondaryText fontWeight={'light'}>Ostatnio online dziś o 13:36</SecondaryText>
                                </Flex>
                            </Flex>
                            <Box bg={'gray.50'} borderRadius={'10px'} padding={'10px'} my={'20px'}>
                                <Flex gap={'20px'} justifyContent={'center'} alignItems={'center'} flexDirection={'row'}>
                                    <TfiHelpAlt fontSize={'72px'}></TfiHelpAlt>
                                    <Text fontSize={'md'}>Ten ogłoszeniodawca nie otrzymał jeszcze żadnych ocen</Text>
                                </Flex>
                            </Box>
                            <VStack gap={'10px'}>
                                <Button w={'100%'} variant={'solid'} colorScheme={'blue'}>Wyślij wiadomość</Button>
                                <HStack justifyContent={'center'} alignItems={'center'}>
                                    <TfiMobile fontSize={'24px'} />
                                    <Text  fontSize={'24px'}>xxx xxx xxx</Text>
                                </HStack>
                                <Button variant={'solid'} colorScheme={'blue'} w={'100%'} onClick={(e) => { phoneNumber.current.textContent = data?.advertiser?.phoneNumber }}>Zadzwoń</Button>
                            </VStack>
                            <Link>
                                <HStack m={'20px'} justifyContent={'center'} alignItems={'center'}>
                                    <SecondaryText>Więcej od tego ogłoszeniodawcy</SecondaryText>
                                    <TfiAngleRight />
                                </HStack>
                            </Link>
                        </Box>

                        <VStack boxShadow={'md'} bg={'#fff'} borderRadius={'20px'} width={'100%'} padding={'20px'} alignItems={'stretch'}>
                            <Text fontSize='md' textTransform={'uppercase'} fontWeight={'bold'}>lokalizacja</Text>
                            <HStack my={'20px'} justifyContent={'center'} alignItems={'center'}>
                                <TfiLocationPin fontSize={'32px'} />
                                <Flex flexDirection={'column'}>
                                    <Text fontWeight={'bold'}>{data?.localization?.place}</Text>
                                    <SecondaryText fontSize={'sm'}>Mazowieckie</SecondaryText>
                                    <SecondaryText fontSize={'sm'} fontWeight={'light'}>143 km od Ciebie</SecondaryText>
                                </Flex>
                            </HStack>
                            <Box >
                                <iframe src="https://maps.google.com/maps?q=Warszawa%20Mokot%C3%B3w+(My%20Business%20Name)&amp;t=&amp;z=12&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
                                </iframe>
                            </Box>
                        </VStack>


                    </Flex>
                </Flex>

                <Box boxShadow={'md'} mt={'20px'} bg={'#fff'} borderRadius={'20px'} padding={'20px'}>
                    <Text fontSize='md' textTransform={'uppercase'} fontWeight={'bold'}>Zobacz też</Text>

                </Box>
            </Container>
        </Box>
    )
}
export default Ad