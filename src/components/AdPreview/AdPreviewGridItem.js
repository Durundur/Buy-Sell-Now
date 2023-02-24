import { Box, Image, Text, AspectRatio } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import SecondaryText from '../SecondaryText'
function AdPreviewGridItem(props) {
    return (
        <Box boxShadow={'md'} p={{base: 2, md:3}} bg={'white'} rounded={4} w={{ base: '100%' }}>
            <AspectRatio mb={4} ratio={4 / 3}>
                <Link to={'/ogloszenie/' + props.data._id}>
                    <Image objectFit={'contain'} src={props.data.image}></Image>
                </Link>
            </AspectRatio>
            <Box  h={'72px'}>
                <Text as={'span'} noOfLines={3}>
                    <Link to={'/ogloszenie/' + props.data._id}>
                        {props.data.tittle}
                    </Link>
                </Text>
            </Box>
            <SecondaryText >{props.data.location}</SecondaryText>
            <Text fontWeight={'bold'}>{props.data.price}</Text>
        </Box>
    )
}
export default AdPreviewGridItem