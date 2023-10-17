import { Avatar as ChakraAvatar } from '@chakra-ui/react';

type AvatarProps = {
    src: string
}

export function Avatar({ src, ...props }: AvatarProps) {
    if (src === undefined || src === null || src === '') return <ChakraAvatar key={1} {...props} ></ChakraAvatar>
    return (
        <ChakraAvatar key={2} {...props} src={src}></ChakraAvatar>
    )
}
