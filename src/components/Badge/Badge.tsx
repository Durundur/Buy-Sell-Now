import { Icon, Text, Flex } from "@chakra-ui/react"
import {type IconType} from 'react-icons'

type BadgeProps = {
  text: string,
  icon?: IconType,
  bgColor?: string,
  color?: string,
  borderRadius?: string,
  padding?: string,
}

export default function Badge({ text, icon, bgColor, color, borderRadius, padding }: BadgeProps) {
  if (text === undefined) return null
  return <Flex textAlign={'center'} direction={'row'} gap={'2'} alignItems={'center'} mr={'4'} as="span">
    {icon ? <Icon as={icon}></Icon> : null}
    <Text shadow={'sm'} p={padding || "1"} css={{
      "&:first-letter": {
        textTransform: "uppercase",
      },
    }} minW={'3ch'} fontSize={'sm'} borderRadius={borderRadius || 'md'} color={color || 'blue.900'} bg={bgColor || 'gray.50'}>{text}</Text>
  </Flex>
}   