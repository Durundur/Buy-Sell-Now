import ImageFallback from "./PhotoFallback"
import { Box, AspectRatio, Image } from "@chakra-ui/react"

export default function Photo({ src, ...props }) {
    return (
        <Box {...props} bgColor={'gray.50'} shadow={'md'}>
            {src !== undefined ? <Image borderRadius={'xl'} objectFit={'cover'} width={'100%'} height={'100%'} src={typeof src === 'object' ? URL.createObjectURL(src) : src}></Image> : <ImageFallback></ImageFallback>}
        </Box>
    )
} 