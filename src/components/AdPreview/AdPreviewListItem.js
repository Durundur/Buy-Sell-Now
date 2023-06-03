import { Box, HStack, Text, AspectRatio, Image, VStack, Icon, Divider, Button } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import SecondaryText from "../SecondaryText"
import { TfiCalendar, TfiLocationPin } from "react-icons/tfi";
import { FiPhone, FiHeart, FiEye } from "react-icons/fi";
import formatDate from "../../hooks/formatDate";
import { GoPrimitiveDot } from 'react-icons/go'
function AdPreviewListItem(props) {
    const { type } = props //globalAd or userAd
    let { mainCategory, subCategory, subSubCategory } = props.adData;
    return (
        <Box borderRadius={'20px'} bg={'#fff'} alignItems={'stretch'} boxShadow={'md'} width={'100%'} p={{ base: 2, md: 3 }}>
            <VStack >
                <HStack width={'100%'} alignItems={'stretch'}>
                    <AspectRatio ratio={4 / 3} minWidth={'17%'}>
                        <Image objectFit={'contain'} src={props.adData?.images[0]}></Image>
                    </AspectRatio>
                    <VStack flexGrow={1} justifyContent={'space-between'} alignItems={'stretch'}>
                        <Link to={'/ogloszenie/' + props.adData?._id}>
                            <Text fontSize={'xl'}>{props.adData?.tittle}</Text>
                        </Link>
                        <VStack gap={'sm'} alignItems={'stretch'}>
                            {props.type === 'userAd' ?
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
                                        <Text>{props.adData?.localization?.place}</Text>
                                    </HStack>
                                    <HStack alignItems={'stretch'} justifyContent={'space-between'}>
                                        <HStack>
                                            <TfiCalendar />
                                            <Text>{formatDate(props.adData?.createdAt, 'short') + " - " + formatDate(props.adData?.endAt, 'short')}</Text>
                                        </HStack>
                                    </HStack>

                                </>
                                : <>
                                    <HStack >
                                        <TfiLocationPin></TfiLocationPin>
                                        <Text fontSize={'sm'}>{props.adData?.localization?.place + ' - ' + formatDate(props.adData?.createdAt, 'full')}</Text>
                                    </HStack>
                                </>
                            }

                        </VStack>
                    </VStack>
                    {props.adData?.price?.value ?
                        <VStack alignItems={'flex-end'} justifyContent={'space-between'}>
                            <VStack>
                                <Text fontSize={'xl'} fontWeight={'bold'}>{props.adData?.price?.value + " zł"}</Text>
                                {props.adData?.price?.negotiable ? <Text fontSize={'xs'}>Do negocjacji</Text> : null}
                            </VStack>
                            {
                                props.type === 'userAd' ?
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
                    props.type === 'userAd' ?
                        <HStack width={'100%'} justifyContent={'flex-end'}>
                            <Button variant={'solid'}>Edytuj</Button>
                            <Button variant={'solid'}>Odświerz za 20 zł</Button>
                            <Button variant={'solid'}>Promuj</Button>
                            <Button variant={'solid'}>Zakończ</Button>
                        </HStack> : null
                }
            </VStack>
        </Box>
    )
}
export default AdPreviewListItem