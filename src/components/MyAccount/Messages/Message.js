import {Flex, Text, } from '@chakra-ui/react'

export function Message({ message, userId}) {
    return (
        <Flex justifyContent={userId!==message?.author ? 'flex-start' :'flex-end'} boxSizing="border-box" marginX={1} marginY={1} color={userId!==message?.author ? 'blue.900' : '#fff' }>
            <Text maxWidth={'80%'} display={'inline-block'} p={2} borderRadius={'xl'}  bg={userId!==message?.author ? 'gray.100' : 'blue.400' } as={'span'}>{message.message}</Text>
        </Flex>
    )
}