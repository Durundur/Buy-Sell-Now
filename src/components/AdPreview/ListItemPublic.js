import { Box, HStack, Text, AspectRatio, Image, VStack, } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { TfiCalendar, TfiLocationPin } from "react-icons/tfi";
import formatDate from "../../hooks/formatDate";
import { useApiContext } from "../../contexts";
import { useNavigate } from "react-router-dom";
import AdListBadges from "../Badge/AdListBadges";

import { deleteAd } from "../../utils/apiServices";
import useApi from "../../hooks/useApi";


function ListItemPublic({ adData }) {
    const { response, isLoading, triggerApiCall } = useApi();
    const navigate = useNavigate();

    const handleAdDelete = async () => {
        await triggerApiCall(deleteAd(adData._id));
        // navigate(response.response.data.redirect)
    }

    return (
        <Box borderRadius={'20px'} bg={'#fff'} alignItems={'stretch'} boxShadow={'md'} width={'100%'} p={{ base: 2, md: 3 }}>
            <HStack as={Link} to={'/ogloszenie/' + adData?._id} width={'100%'} alignItems={'stretch'}>
                <AspectRatio ratio={4 / 3} minWidth={['33%', '28%', '23%', '18%', '15%']}>
                    <Image objectFit={'contain'} src={adData?.images[0]}></Image>
                </AspectRatio>
                <VStack flexGrow={1} justifyContent={'space-between'} alignItems={'stretch'}>
                    <Text height={'60px'} noOfLines={2} fontSize={'xl'}>{adData?.tittle}</Text>
                    <AdListBadges details={adData.details}></AdListBadges>
                    <VStack gap={'sm'} alignItems={'stretch'}>
                        <HStack >
                            <TfiLocationPin></TfiLocationPin>
                            <Text fontSize={'sm'}>{adData?.localization?.place + ' - ' + formatDate(adData?.createdAt, 'full')}</Text>
                        </HStack>
                    </VStack>
                </VStack>
                {adData?.price?.value ?
                    <VStack alignItems={'flex-end'} justifyContent={'space-between'}>
                        <VStack>
                            <Text whiteSpace={'nowrap'} fontSize={'xl'} fontWeight={'bold'}>{adData?.price?.value + " zł"}</Text>
                            {adData?.price?.negotiable ? <Text fontSize={'xs'}>Do negocjacji</Text> : null}
                        </VStack>
                    </VStack> : null}
            </HStack>
        </Box>
    )
}
export default ListItemPublic