import { Flex, VStack, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";


export default function Error({error}){
    return(
        <VStack py="12">
            <Text fontWeight={'bold'} fontSize={'3xl'}>Whoops, something went wrong.</Text>
            <Text fontSize={'xl'}>{error.message}</Text>
            <Text fontSize={'xl'}>{error.response.statusText}</Text>
            <Link to={'/'}>
                <Button size={{ base: 'sm', md: 'md' }} colorScheme={'blue'}>Strona główna</Button>
            </Link>
        </VStack>
    )
}