import AvatarFallback from "./AvatarFallback";
import { Image, Box, AspectRatio } from "@chakra-ui/react"

export default function Avatar({ children, src, ...props }) {
    return (
        <Box {...props} display={'flex'} justifyContent={'center'} alignItems={'center'} bgColor={'gray.100'} borderRadius={'full'} shadow={'md'}
            bgSize={'cover'} bgImage={src || null} bgRepeat={'no-repeat'} bgPosition={'center'}>
            {!src && <AvatarFallback></AvatarFallback>}
            {children}
        </Box>
    )
} 