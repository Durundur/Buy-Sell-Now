import { Box, HStack, Text, AspectRatio, Image, VStack } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import SecondaryText from "../SecondaryText"
function AdPreviewListItem(props){
    return(
        <HStack  alignItems={'stretch'} boxShadow={'md'} width={'100%'} p={{base: 2, md:3}} bg={'#fff'} borderRadius={'20px'}>
            <AspectRatio  width={'17%'}>
                <Image objectFit={'contain'} src={props.ad.image}></Image>
            </AspectRatio>
            <VStack flexGrow={1} alignItems={'flex-start'} justifyContent={'space-between'}>
               <Link to={'/ogloszenie/' + props.ad._id}>
                    <Text fontSize={'xl'}>{props.ad.tittle}</Text>
               </Link>
               <Text fontSize={'sm'}>{props.ad.location}</Text>
            </VStack>
            <VStack>
                <VStack>
                    <Text fontSize={'xl'} fontWeight={'bold'}>{props.ad.price}</Text>
                    <Text fontSize={'xs'}> Do negocjacji </Text>
                </VStack>

            </VStack>   
        </HStack>
    )
}
export default AdPreviewListItem