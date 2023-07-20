import { Icon, Text, Flex } from "@chakra-ui/react"

export default function Badge({ text, icon }) {
  if (text === undefined) return null
  return <Flex direction={'row'} gap={'2'} alignItems={'center'} bg={'gray.50'} borderRadius={'md'} shadow={'md'} mr={'4'} as="span">
    {icon ? <Icon as={icon}></Icon> : null}
    <Text shadow={'sm'} p="1" css={{
      "&:first-letter": {
        textTransform: "uppercase",
      },
    }} fontSize={'sm'} color={'blue.900'} >{text}</Text>
  </Flex>
}   