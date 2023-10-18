import { Box, HStack, Text, AspectRatio, VStack, Button } from "@chakra-ui/react"
import { Link } from "react-router-dom";
import { TfiCalendar, TfiLocationPin } from "react-icons/tfi";
import { FiPhone, FiHeart, FiEye } from "react-icons/fi";
import { formatDate } from "../../utils/utils";
import { GoPrimitiveDot } from 'react-icons/go';
import { Image } from "../Layout/Image";
import useApi from "../../hooks/useApi";
import { AdvertQueryType } from "../../types/ApiRequestDataTypes";

function ListItemPrivate({ adData }: {adData: AdvertQueryType}) {
    const { mainCategory, subCategory, subSubCategory } = adData;
    const { data: response, isLoading, error, makeRequest: deleteAd } = useApi({
        url: 'api/v1/ads/' + adData._id,
        method: 'delete'
    });

    const handleAdDelete = async () => {
        deleteAd();
    }

    return (
        <Box borderRadius={'20px'} bg={'#fff'} alignItems={'stretch'} boxShadow={'md'} width={'100%'} p={{ base: 2, md: 3 }}>
            <VStack >
                <HStack width={'100%'} alignItems={'stretch'}>
                    <AspectRatio ratio={4 / 3} minWidth={{ base: "25%", md: "17%" }}>
                        <Image src={adData?.images[0]}></Image>
                    </AspectRatio>
                    <VStack flexGrow={1} justifyContent={'space-between'} alignItems={'stretch'}>
                        <Link  to={'/ogloszenie/' + adData?._id}>
                            <Text noOfLines={2} fontSize={'xl'}>{adData?.tittle}</Text>
                        </Link>
                        {/* height: 60px as box */}
                        <VStack gap={'sm'} alignItems={'stretch'}>
                            <HStack>
                                <Text textTransform={'capitalize'}>{mainCategory}</Text>
                                <GoPrimitiveDot size={8} />
                                <Text textTransform={'capitalize'}>{subCategory}</Text>
                                {subSubCategory ? <>
                                    <GoPrimitiveDot size={8} />
                                    <Text textTransform={'capitalize'}>{subSubCategory}</Text>
                                </> : null}
                            </HStack>
                            <HStack >
                                <TfiLocationPin></TfiLocationPin>
                                <Text>{adData?.address?.city}</Text>
                            </HStack>
                            <HStack alignItems={'stretch'} justifyContent={'space-between'}>
                                <HStack>
                                    <TfiCalendar />
                                    <Text>{formatDate(adData?.createdAt, 'short') + " - " + formatDate(adData?.endAt, 'short')}</Text>
                                </HStack>
                            </HStack>
                        </VStack>
                    </VStack>
                    {adData?.price?.value ?
                        <VStack alignItems={'flex-end'} justifyContent={'space-between'}>
                            <VStack>
                                <Text fontSize={'xl'} fontWeight={'bold'}>{adData?.price.value + " zł"}</Text>
                                {adData?.price.isNegotiable ? <Text fontSize={'xs'}>Do negocjacji</Text> : null}
                            </VStack>
                            <VStack gap={'10px'}>
                                <Button colorScheme={'blue'} variant={'solid'}>Zobacz statystyki</Button>
                                <HStack>

                                    <HStack>
                                        <FiPhone />
                                        <Text>123</Text>
                                    </HStack>
                                    <HStack>
                                        <FiHeart />
                                        <Text>3</Text>
                                    </HStack>
                                    <HStack>
                                        <FiEye />
                                        <Text>12343</Text>
                                    </HStack>
                                </HStack>
                            </VStack>
                        </VStack>
                        :
                        null}
                </HStack>
                <HStack width={'100%'} justifyContent={'flex-end'}>
                    <Link to={'/edycja/' + adData?._id}>
                        <Button variant={'solid'}>Edytuj</Button>
                    </Link>
                    <Button variant={'solid'}>Odświerz za 20 zł</Button>
                    <Button variant={'solid'}>Promuj</Button>
                    <Button onClick={handleAdDelete} variant={'solid'}>Zakończ</Button>
                </HStack>
            </VStack>
        </Box>
    )
}
export default ListItemPrivate