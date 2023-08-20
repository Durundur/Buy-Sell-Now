import { Box, Image, Text, AspectRatio, Flex } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { formatDate } from "../../utils/utils"
import SecondaryText from '../SecondaryText'
function GridItem({ adData }) {
    return (
        <Flex direction={'column'} boxShadow={'md'} p={{ base: 2, md: 3 }} bg={'white'} borderRadius={'20px'} w={{ base: '100%' }}>
            <AspectRatio mb={3} ratio={4 / 3}>
                <Link to={'/ogloszenie/' + adData?._id}>
                    <Image objectFit={'contain'} src={adData?.images[0]}></Image>
                </Link>
            </AspectRatio>
            <Flex flexGrow={1} justifyContent={'space-between'} direction={'column'}>
                <Box flexGrow={0} h={'72px'}>
                    <Text as={'span'} noOfLines={3}>
                        <Link to={'/ogloszenie/' + adData?._id}>
                            {adData?.tittle}
                        </Link>
                    </Text>
                </Box>
                <Box>
                    <SecondaryText >{adData?.address?.city} - {formatDate(adData?.createdAt, 'long')}</SecondaryText>
                    {adData?.price?.value && <Text fontWeight={'bold'}>{adData?.price?.value + " zł"}</Text>}
                </Box>
            </Flex>
        </Flex>
    )
}
export default GridItem