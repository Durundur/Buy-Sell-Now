import { Avatar as ChakraAvatar } from '@chakra-ui/react';


export function Avatar({ src, ...props }) {
    if (src === undefined || src === null || src === '') return <ChakraAvatar key={1} {...props} ></ChakraAvatar>
    return (
        <ChakraAvatar key={2} {...props} src={src}></ChakraAvatar>
    )
}
