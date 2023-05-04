import { Box, Image, Text, AspectRatio } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import SecondaryText from '../SecondaryText'
function AdPreviewGridItem(props) {
    return (
        <Box boxShadow={'md'} p={{base: 2, md:3}} bg={'white'} borderRadius={'20px'} w={{ base: '100%' }}>
            <AspectRatio mb={4} ratio={4 / 3}>
                <Link to={'/ogloszenie/' + props.adData?._id }>
                    <Image objectFit={'contain'} src={props.adData?.images[0]}></Image>
                </Link>
            </AspectRatio>  
            <Box  h={'72px'}>
                <Text as={'span'} noOfLines={3}>
                    <Link to={'/ogloszenie/' + props.adData?._id}>
                        {props.adData?.tittle}
                    </Link>
                </Text>
            </Box>
            <SecondaryText >{props.adData?.localization?.place}</SecondaryText>
            <Text fontWeight={'bold'}>{props.adData?.price?.value + " zł"}</Text>
        </Box>
    )
}
export default AdPreviewGridItem