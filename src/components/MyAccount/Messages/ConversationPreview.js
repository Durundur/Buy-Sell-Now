import { Avatar, Flex, VStack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function ConversationPreview({ conversation, active }) {
    return <Link to={`./${conversation._id}`}>
        <Flex direction={'row'} alignItems='center' gap={1} p={2} fontSize={'sm'} borderBottom={'1px'} borderColor={'gray.200'} bg={active ? 'blue.50' : null}>
            <Avatar size={'sm'} src={conversation?.advertiser?.avatar}></Avatar>
            <VStack justifyContent={'flex-start'} alignItems={'flex-start'}>
                <Text>{conversation?.ad?.advertiser?.name}</Text>
                <Text noOfLines={1}>{conversation?.ad?.tittle}</Text>
                <Text noOfLines={1}>{conversation?.lastMessage}</Text>
            </VStack>
            <VStack>
                <Text>{conversation?.date}</Text>
            </VStack>
        </Flex>
    </Link>
}