import { Box, Flex, HStack, Text, Stack, Divider, Avatar, VStack, Button, Breadcrumb, BreadcrumbItem } from "@chakra-ui/react";
import { React, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import Carousel from "../components/Carousel";
import SecondaryText from '../components/SecondaryText'
import { TfiHelpAlt, TfiAngleRight, TfiLocationPin, TfiMobile, TfiAngleLeft } from "react-icons/tfi";
import LoadingSpinner from "../components/LoadingSpinner"
import Error from '../components/Error';
import AdBadges from '../components/Badge/AdBadges'
import useApi from "../hooks/useApi";
import { getAd } from "../utils/apiServices";
import ContainerBox from '../components/ContainerBox'
import { formatDate } from "../utils/utils";
import { createNewConversation } from './../utils/apiServices';

function Ad() {
    const { id } = useParams();
    const phoneNumber = useRef(null);
    const { data, error, isLoading, triggerApiCall } = useApi()

    useEffect(() => {
        triggerApiCall(getAd(id));
    }, [id, triggerApiCall])


    async function handleCreateNewConversation(e) {
        e.preventDefault();
        const newConversationData = { adId: id };
        await triggerApiCall(createNewConversation(newConversationData));
    }


    if (isLoading) return <ContainerBox bgColor1={'gray.50'}><LoadingSpinner></LoadingSpinner></ContainerBox>
    else if (!isLoading && error) return <ContainerBox bgColor1={'gray.50'}><Error variant="error" error={error}></Error></ContainerBox>
    return (
        <ContainerBox bgColor1={'gray.50'}>
            <Flex justifyItems={'center'} alignItems={'center'} gap={10} direction={'row'} p={'6'}>
                <Link to={-1}>
                    <Flex justifyItems={'center'} alignItems={'center'} gap={'2'}>
                        <TfiAngleLeft></TfiAngleLeft>
                        <Text textTransform={'capitalize'}>wróc</Text>
                    </Flex>
                </Link>
                <Breadcrumb fontSize={'sm'} spacing='8px' textTransform={'capitalize'} separator={<TfiAngleRight />}>
                    <BreadcrumbItem>
                        <Link to={'/'}>Strona główna</Link>
                    </BreadcrumbItem>

                    <BreadcrumbItem >
                        <Link to={`/ogloszenia/${data?.mainCategory}`} >{data?.mainCategory}</Link>
                    </BreadcrumbItem>

                    <BreadcrumbItem >
                        <Link to={`/ogloszenia/${data?.mainCategory}/${data?.subCategory}`} >{data?.subCategory}</Link>
                    </BreadcrumbItem>

                    <BreadcrumbItem >
                        <Link to={`/ogloszenia/${data?.mainCategory}/${data?.subCategory}/${data?.subSubCategory}`}>{data?.subSubCategory}</Link>
                    </BreadcrumbItem>
                </Breadcrumb>
            </Flex>
            <Flex gap={'20px'} display={'flex'} flexDirection={'row'}>
                <Flex gap={'20px'} width={'70%'} flexDirection={'column'}>
                    <Box boxShadow={'md'} bg={'#fff'} borderRadius={'20px'} padding={'20px'}>
                        <Carousel cards={data?.images || []}></Carousel>
                    </Box>

                    <Stack boxShadow={'md'} bg={'#fff'} borderRadius={'20px'} padding={'20px'}>
                        <Text fontSize='2xl' fontWeight={'medium'}>{data?.tittle}</Text>
                        <Text fontSize={'2xl'} fontWeight={'bold'} >{data?.price?.value + " zł"}</Text>
                        <AdBadges details={data?.details}></AdBadges>
                        <Text fontSize='md' textTransform={'uppercase'} fontWeight={'bold'}>opis</Text>
                        <Text fontSize={'lg'} whiteSpace={'pre-line'} dangerouslySetInnerHTML={{ __html: data?.description }}></Text>
                        <Divider></Divider>
                        <Flex justifyContent={'space-between'}>
                            <SecondaryText>ID: {data?._id}</SecondaryText>
                            <SecondaryText>Wyświetlenia: { }</SecondaryText>
                            <SecondaryText>Zgłoś</SecondaryText>
                        </Flex>
                    </Stack>
                </Flex>
                <Flex width={'30%'} gap={'20px'} flexDirection={'column'}>
                    <Box boxShadow={'md'} bg={'#fff'} borderRadius={'20px'} padding={'20px'}>
                        <Text fontSize='md' textTransform={'uppercase'} fontWeight={'bold'}>{data?.advertiser?.details?.isCompanyAcc ? 'przedsiębiorca' : 'osoba prywatna'}</Text>
                        <Flex mt={'20px'} gap={'20px'} alignItems={'center'}>
                            <Avatar src={data?.advertiser?.details?.avatar}></Avatar>
                            <Flex flexDirection={'column'} alignItems={'flex-start'}>
                                <Text mb={'5px'} fontWeight={'medium'} fontSize={'lg'}>{data?.advertiser?.name}</Text>
                                <SecondaryText fontWeight={'light'}>Na BSN od {formatDate(data?.advertiser?.details?.createdAt, 'long')}</SecondaryText>
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
                            <Button onClick={(e) => handleCreateNewConversation(e)} w={'100%'} variant={'solid'} colorScheme={'blue'}>Wyślij wiadomość</Button>
                            <HStack justifyContent={'center'} alignItems={'center'}>
                                <TfiMobile fontSize={'24px'} />
                                <Text ref={phoneNumber} fontSize={'24px'}>xxx xxx xxx</Text>
                            </HStack>
                            <Button variant={'solid'} colorScheme={'blue'} w={'100%'} onClick={(e) => { phoneNumber.current.textContent = data?.advertiser?.details?.phoneNumber }}>Zadzwoń</Button>
                        </VStack>
                        <Link to={`../uzytkownik/${data?.advertiser?._id}`}>
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
                                <Text fontWeight={'bold'}>{data?.address?.city}</Text>
                                <SecondaryText fontSize={'sm'}>{data?.address?.state}</SecondaryText>
                                <SecondaryText fontSize={'sm'} fontWeight={'light'}>143 km od Ciebie</SecondaryText>
                            </Flex>
                        </HStack>
                        <Box >
                            <img width="600" alt={'map'} height="400" src={`https://maps.geoapify.com/v1/staticmap?style=osm-liberty&width=300&height=200&center=lonlat:${data?.address?.lon},${data?.address?.lat}&zoom=10.2989&apiKey=48c7df543ab243d5bb855a75817032ff`}></img>
                        </Box>
                    </VStack>
                    {data?.advertiser?.details?.isCompanyAcc ?
                        <VStack fontSize={'sm'} boxShadow={'md'} bg={'#fff'} borderRadius={'20px'} width={'100%'} padding={'20px'} alignItems={'stretch'}>
                            <Text fontSize='md' textTransform={'uppercase'} fontWeight={'bold'}>dane firmy</Text>
                            <Text maxH={'14rem'} sx={{
                                '&::-webkit-scrollbar': {
                                    width: '4px',
                                    borderRadius: '8px',
                                },
                                '&::-webkit-scrollbar-thumb': {
                                    backgroundColor: `blue.500`,
                                    borderRadius: '8px',
                                },
                            }} overflowY={'scroll'}>{data?.advertiser?.details?.aboutCompany}</Text>
                            <VStack justifyContent={'flex-start'} alignItems={'flex-start'}>
                                <Text><span style={{ fontWeight: '500' }}>Nazwa firmy:</span> {data?.advertiser?.details?.name}</Text>
                                {data?.advertiser?.details?.nip && <Text><span style={{ fontWeight: '500' }}>NIP:</span> {data?.advertiser?.details?.nip}</Text>}
                                <Text><span style={{ fontWeight: '500' }}>Numer telefonu:</span> {data?.advertiser?.details?.phoneNumber}</Text>
                                {data?.advertiser?.details?.email && <Text><span style={{ fontWeight: '500' }}>E-mail:</span> {data?.advertiser?.details?.email}</Text>}
                                <Text><span style={{ fontWeight: '500' }}>Adres:</span> {data?.advertiser?.details?.address?.street} {data?.advertiser?.details?.address?.buildingNumber}</Text>
                                <Text>{data?.advertiser?.details?.address?.postcode} {data?.advertiser?.details?.address?.city}</Text>
                                {data?.advertiser?.details?.companyWebsite && <Text><span style={{ fontWeight: '500' }}>Strona internetowa: </span><a target="_blank" rel="noreferrer" href={data?.advertiser?.details?.companyWebsite} >{data?.advertiser?.details?.companyWebsite}</a></Text>}
                            </VStack>
                        </VStack> : null}
                </Flex>
            </Flex>
            <Box boxShadow={'md'} mt={'20px'} bg={'#fff'} borderRadius={'20px'} padding={'20px'}>
                <Text fontSize='md' textTransform={'uppercase'} fontWeight={'bold'}>Zobacz też</Text>
            </Box>
        </ContainerBox >
    )
}
export default Ad