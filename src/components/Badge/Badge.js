import { Icon, Text, Flex } from "@chakra-ui/react"

export default function Badge({ text, icon, bgColor, color, borderRadius, padding, ...props }) {
  if (text === undefined) return null
  return <Flex {...props} textAlign={'center'} direction={'row'} gap={'2'} alignItems={'center'} mr={'4'} as="span">
    {icon ? <Icon as={icon}></Icon> : null}
    <Text shadow={'sm'} p={padding || "1"} css={{
      "&:first-letter": {
        textTransform: "uppercase",
      },
    }} minW={'3ch'} fontSize={'sm'} borderRadius={borderRadius || 'md'} color={color || 'blue.900'} bg={bgColor || 'gray.50'}>{text}</Text>
  </Flex>
}   