import { Box, HStack, Text, AspectRatio, Image, VStack } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import SecondaryText from "../SecondaryText"
function AdPreviewListItem(props){
    return(
        <HStack  alignItems={'stretch'} boxShadow={'md'} width={'100%'} p={{base: 2, md:3}} bg={'#fff'} borderRadius={'20px'}>
            <AspectRatio  ratio={4/3}  minWidth={'17%'}>
                <Image objectFit={'contain'} src={props.adData?.images[0]}></Image>
            </AspectRatio>
            <VStack height={{base: '160px', md: '120px', sm: '70px'}} flexGrow={1} alignItems={'flex-start'} justifyContent={'space-between'}>
               <Link to={'/ogloszenie/' + props.adData?._id}>
                    <Text fontSize={'xl'}>{props.adData?.tittle}</Text>
               </Link>
               <Text fontSize={'sm'}>{props.adData?.localization?.place}</Text>
            </VStack>
            <VStack>
                <VStack>
                    <Text fontSize={'xl'} fontWeight={'bold'}>{props.adData?.price?.value + " zł"}</Text>
                    <Text fontSize={'xs'}> Do negocjacji </Text>
                </VStack>

            </VStack>   
        </HStack>
    )
}
export default AdPreviewListItem