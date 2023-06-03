import { Spinner, Flex } from "@chakra-ui/react"

function LoadingSpinner(){
    return(
        <Flex padding={75} justifyContent={'center'}>
            <Spinner thickness='8px' speed='0.85s' emptyColor='gray.200' color='blue.500' size='xl' />
        </Flex>
    )
}

export default LoadingSpinner