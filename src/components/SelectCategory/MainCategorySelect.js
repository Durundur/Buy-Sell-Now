import { Flex, Image, Text, Box } from "@chakra-ui/react";


export default function MainCategorySelect(props){
    return(
        <Flex {...props} cursor={'pointer'} shadow={'md'} gap={'10px'} alignItems={'center'} justifyContent={'flex-start'} padding={'10px'} borderRadius={'10px'} bg={'gray.50'} direction={'row'}>
            <Box width={'70px'} borderRadius={'50%'} bg={'gray.100'} padding={'5px'}><Image src={props.category.picture}></Image></Box>
            <Text fontWeight={'bold'} textTransform={'capitalize'}>{props.category.name}</Text>
        </Flex>
    )
} 