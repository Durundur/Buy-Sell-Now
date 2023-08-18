import { VStack, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";


export default function Error({ error, variant = "error" }) {
    return (
        <VStack py="12">
            {variant === 'error' && <Text fontWeight={'bold'} fontSize={'2xl'}>Whoops, something went wrong.</Text>}
            <Text fontSize={'lg'}>{error?.message}</Text>
            {variant === 'error' && <>
                <Link to={'/'}>
                    <Button size={{ base: 'sm', md: 'md' }} colorScheme={'blue'}>Strona główna</Button>
                </Link> </>}
        </VStack>
    )
}