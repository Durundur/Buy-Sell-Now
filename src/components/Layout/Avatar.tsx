import { Avatar as ChakraAvatar, AvatarProps as ChakraAvatarProps } from '@chakra-ui/react';
import { AiOutlineUser } from 'react-icons/ai';

type AvatarProps = ChakraAvatarProps & {
    src: string
}

export function Avatar({ src, ...props }: AvatarProps) {
    if (src === undefined || src === null || src === '') return <ChakraAvatar bg={'gray.100'} icon={<AiOutlineUser color='var(--chakra-colors-blue-900)' style={{width: '100%', height: '100%', borderRadius: '50%'}}/>} key={1} {...props} ></ChakraAvatar>
    return (
        <ChakraAvatar key={2} {...props} src={src}></ChakraAvatar>
    )
}
