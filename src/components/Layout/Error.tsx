import { VStack, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";


type ErrorProps = {
    error: Error
    variant?: 'error' | 'info'
}

export default function Error({ error, variant = "error" }: ErrorProps) {
    return (
        <VStack py="12">
            <Text fontWeight={'bold'} fontSize={'2xl'}>Whoops, something went wrong.</Text>
            <Text fontSize={'lg'}>{error?.message}</Text>
            {/* <Text>{error?.response?.data?.message}</Text> */}
            {variant === 'error' && <>
                <Link to={'/'}>
                    <Button size={{ base: 'sm', md: 'md' }} colorScheme={'blue'}>Strona główna</Button>
                </Link> </>}
        </VStack>
    )
}