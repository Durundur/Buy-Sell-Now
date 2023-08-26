import { Avatar, Flex, VStack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function ConversationPreview({ userId, conversation, active }) {
    const conversationInfo = userId === conversation.inquirer._id ?
        { name: conversation?.ad?.advertiser?.name, avatar: conversation?.ad?.advertiser?.details?.avatar }
        :
        { name: conversation?.inquirer?.advertiser?.name, avatar: conversation?.inquirer?.avatar }

    return < Link to={`./${conversation._id}`
    }>
        <Flex direction={'row'} alignItems='center' gap={2} p={2} fontSize={'sm'} borderBottom={'1px'} borderColor={'gray.200'} bg={active ? 'blue.50' : null}>
            <Avatar size={'md'} src={conversationInfo?.avatar}></Avatar>
            <Flex wrap={'nowrap'} direction={'column'} justifyContent={'flex-start'} alignItems={'flex-start'}>
                <Text noOfLines={1}>{conversationInfo?.name}</Text>
                <Text fontWeight={500} noOfLines={1}>{conversation?.ad?.tittle}</Text>
                <Text mt={2} noOfLines={1}>{conversation?.lastMessage}</Text>
            </Flex>
            <VStack>
                <Text>{conversation?.date}</Text>
            </VStack>
        </Flex>
    </Link >
}