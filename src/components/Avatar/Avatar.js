import AvatarFallback from "./AvatarFallback";
import { Box, AspectRatio, Input, Image } from "@chakra-ui/react"

export default function Avatar({ src, ...props }) {
    return (
        <Box {...props} bg={'gray.50'} borderRadius={'full'} shadow={'md'}>
            {src !== undefined ? <AspectRatio ratio={1 / 1}><Image objectFit={'cover'} width={'100%'} height={'100%'} borderRadius={'full'} src={typeof src === 'object' ? URL.createObjectURL(src) : src}></Image></AspectRatio> : <AvatarFallback></AvatarFallback>}
        </Box>
    )
} 