import ImageFallback from "./PhotoFallback"
import { Box } from "@chakra-ui/react"

export default function Photo({ children, src, ...props }) {
    return (
        <Box {...props} display={'flex'} justifyContent={'center'} alignItems={'center'} bgColor={'gray.100'} borderRadius={"xl"} shadow={'md'}
            bgSize={'cover'} bgImage={src || null} bgRepeat={'no-repeat'} bgPosition={'center'}>
            {!src && <ImageFallback></ImageFallback>}
            {children}
        </Box>
    )
} 