import { Box, HStack, Text, AspectRatio, Image, VStack, Icon, Divider, Button } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { TfiCalendar, TfiLocationPin } from "react-icons/tfi";
import { FiPhone, FiHeart, FiEye } from "react-icons/fi";
import formatDate from "../../hooks/formatDate";
import { GoPrimitiveDot } from 'react-icons/go'
import { useApiContext } from "../../contexts";
import { useNavigate } from "react-router-dom";

function AdPreviewListItem({ type, adData }) {
    const { mainCategory, subCategory, subSubCategory } = adData;
    const { deleteAdData } = useApiContext() 
    const navigate = useNavigate();
    
    const handleAdDelete = async () => {
        const response = await deleteAdData(adData._id);
        if(response.response.status === 401){
            navigate(response.response.data.redirect)
        } 
    }
    
    return (
        <Box borderRadius={'20px'} bg={'#fff'} alignItems={'stretch'} boxShadow={'md'} width={'100%'} p={{ base: 2, md: 3 }}>
            <VStack >
                <HStack width={'100%'} alignItems={'stretch'}>
                    <AspectRatio ratio={4 / 3} minWidth={'17%'}>
                        <Image objectFit={'contain'} src={adData?.images[0]}></Image>
                    </AspectRatio>
                    <VStack flexGrow={1} justifyContent={'space-between'} alignItems={'stretch'}>
                        <Link to={'/ogloszenie/' + adData?._id}>
                            <Text fontSize={'xl'}>{adData?.tittle}</Text>
                        </Link>
                        <VStack gap={'sm'} alignItems={'stretch'}>
                            {type === 'userAd' ?
                                <>
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
                                        <Text>{adData?.localization?.place}</Text>
                                    </HStack>
                                    <HStack alignItems={'stretch'} justifyContent={'space-between'}>
                                        <HStack>
                                            <TfiCalendar />
                                            <Text>{formatDate(adData?.createdAt, 'short') + " - " + formatDate(adData?.endAt, 'short')}</Text>
                                        </HStack>
                                    </HStack>

                                </>
                                : <>
                                    <HStack >
                                        <TfiLocationPin></TfiLocationPin>
                                        <Text fontSize={'sm'}>{adData?.localization?.place + ' - ' + formatDate(adData?.createdAt, 'full')}</Text>
                                    </HStack>
                                </>
                            }

                        </VStack>
                    </VStack>
                    {adData?.price?.value ?
                        <VStack alignItems={'flex-end'} justifyContent={'space-between'}>
                            <VStack>
                                <Text fontSize={'xl'} fontWeight={'bold'}>{adData?.price?.value + " zł"}</Text>
                                {adData?.price?.negotiable ? <Text fontSize={'xs'}>Do negocjacji</Text> : null}
                            </VStack>
                            {
                                type === 'userAd' ?
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
                                    :
                                    null
                            }
                        </VStack>
                        :
                        null}
                </HStack>
                {
                    type === 'userAd' ?
                        <HStack width={'100%'} justifyContent={'flex-end'}>
                            <Link to={'/edycja/' + adData?._id}>
                            <Button variant={'solid'}>Edytuj</Button>
                            </Link>
                            
                            <Button variant={'solid'}>Odświerz za 20 zł</Button>
                            <Button variant={'solid'}>Promuj</Button>
                            <Button onClick={handleAdDelete}variant={'solid'}>Zakończ</Button>
                        </HStack> : null
                }
            </VStack>
        </Box>
    )
}
export default AdPreviewListItem