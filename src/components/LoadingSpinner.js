import { Spinner, Flex, Box } from "@chakra-ui/react"

export default function LoadingSpinner() {
    return (
        <Flex width={'100%'} height={'100%'} padding={75} alignItems={'center'} justifyContent={'center'}>
            <Spinner thickness='8px' speed='0.85s' emptyColor='gray.200' color='blue.500' size='xl' />
        </Flex>
    )
}
