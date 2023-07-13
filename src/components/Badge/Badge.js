import {Icon, Text,Flex } from "@chakra-ui/react"

export default function Badge({text, icon}){
    if(text === undefined) return null
    if(icon) return <Flex direction={'row'} gap={'2'} alignItems={'center'}  mr={'4'} as="span">
        <Icon as={icon}></Icon>
        <Text shadow={'sm'} p="1" css={{
    "&:first-letter": {
      textTransform: "uppercase",
    },
  }}  fontSize={'sm'} borderRadius={'md'} color={'blue.900'} bg={'gray.50'}>{text}</Text>
    </Flex>
    return(
        <Text shadow={'sm'} p="1" css={{
            "&:first-letter": {
              textTransform: "uppercase",
            },
          }} fontSize={'sm'} borderRadius={'md'} color={'blue.900'} bg={'gray.50'}>{text}</Text>
    )
}   