import { Box, HStack, Text, AspectRatio, VStack, } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { TfiLocationPin } from "react-icons/tfi";
import { formatDate } from "../../utils/utils";
import AdListBadges from "../Badge/AdListBadges";
import {Image} from "../Layout/Image";
import { AdvertQueryType } from "../../types/ApiDataTypes";

function ListItemPublic({ adData}: {adData: AdvertQueryType}) {
    return (
        <Box borderRadius={'20px'} bg={'#fff'} alignItems={'stretch'} boxShadow={'md'} width={'100%'} p={{ base: 2, md: 3 }}>
            <HStack as={Link} to={'/ogloszenie/' + adData?._id} width={'100%'} alignItems={'stretch'}>
                <AspectRatio ratio={4 / 3} minWidth={['200px']}>
                    <Image src={adData?.images[0]}></Image>
                </AspectRatio>
                <VStack flexGrow={1} justifyContent={'space-between'} alignItems={'stretch'}>
                    <Text height={'60px'} noOfLines={2} fontSize={'xl'}>{adData?.tittle}</Text>
                    <AdListBadges details={adData.details}></AdListBadges>
                    <VStack gap={'sm'} alignItems={'stretch'}>
                        <HStack >
                            <TfiLocationPin></TfiLocationPin>
                            <Text fontSize={'sm'}>{adData?.address?.city} - {formatDate(adData?.createdAt, 'full')}</Text>
                        </HStack>
                    </VStack>
                </VStack>
                {adData?.price?.value ?
                    <VStack alignItems={'flex-end'} justifyContent={'space-between'}>
                        <VStack>
                            <Text whiteSpace={'nowrap'} fontSize={'xl'} fontWeight={'bold'}>{adData?.price.value + " zł"}</Text>
                            {adData?.price.isNegotiable ? <Text fontSize={'xs'}>Do negocjacji</Text> : null}
                        </VStack>
                    </VStack> : null}
            </HStack>
        </Box>
    )
}
export default ListItemPublic