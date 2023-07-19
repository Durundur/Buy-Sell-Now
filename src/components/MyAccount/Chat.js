import { VStack, Flex, Avatar, Input, Icon, Text, Box, Divider, HStack, Image, Textarea, Button, AspectRatio, Link } from "@chakra-ui/react";
import { AiOutlineDelete, AiOutlineFlag, AiOutlineStop, AiOutlineBook } from 'react-icons/ai'
import AdPreviev from '../AdPreview/adPreview.png'
import { useState } from "react";
import { useAuthContext } from "../../contexts";
import { useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useApiContext } from "../../contexts";
import { Message } from './Message'
import useSocket from '../../hooks/useSocket'
import ChatInput from './ChatInput'
import { getConversationChat } from "../../utils/apiServices";
import useApi from "../../hooks/useApi";



export default function Chat() {
    const location = useLocation();
    const chatRef = useRef(0);
    const conversationId = location.pathname.split("/")[3];

    const { response, isLoading, triggerApiCall } = useApi()
    const { userInfo } = useAuthContext();
    const { socket, isConnected, chatData, setChatData, joinConversation } = useSocket();


    useEffect(() => {
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }, [chatData])


    useEffect(() => {
        triggerApiCall(getConversationChat(conversationId))
        joinConversation(conversationId)
    }, [])





    return (
        <Flex flexBasis={'100%'} justifyContent={'flex-start'} direction={'column'}>
            <Link as={'div'} display={'flex'} p={2} borderBottom={'1px'} borderColor={'gray.200'} justifyContent={'space-between'} alignItems={'center'} direction={'row'}>
                <Flex gap={4} flexGrow={5} alignItems={'center'}>
                    <Avatar size={'sm'}></Avatar>
                    <Box fontSize={'sm'}>
                        <Text fontWeight={'bold'}>{chatData?.conversation?.ad?.advertiser?.name}</Text>
                        <Text>Ostatnio online dziś o 14:42</Text>
                    </Box>
                </Flex>
                <Flex fontSize={'xl'} gap={2} direction={'row'} alignItems={'center'}>
                    <Icon as={AiOutlineDelete}></Icon>
                    <Icon as={AiOutlineFlag}></Icon>
                    <Icon as={AiOutlineStop}></Icon>
                    <Icon as={AiOutlineBook}></Icon>
                </Flex>
            </Link>
            <Flex gap={2} p={1} fontSize={'sm'} borderBottom={'1px'} borderColor={'gray.200'} alignItems={'center'} direction={'row'}>
                <AspectRatio minW={['30%', '20%', '15%']} ratio={4 / 3}>
                    <Image src={chatData?.conversation?.ad?.images[0] || AdPreviev}></Image>
                </AspectRatio>
                <Flex direction={'column'}>
                    <Text>{chatData?.conversation?.ad?.tittle}</Text>
                    <Text fontWeight={'bold'}>{chatData?.conversation?.ad?.price?.value}</Text>
                </Flex>
            </Flex>
            <Box sx={{
                '&::-webkit-scrollbar': {
                    width: '4px',
                    borderRadius: '8px',
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: `blue.500`,
                    borderRadius: '8px',
                },
            }} ref={chatRef} height={'100%'} overflowY={'scroll'} scrollSnapAlign={'end'}>
                {
                    chatData?.messages?.map((message, index) => {
                        return (
                            <Message key={index} userId={userInfo} message={message}></Message>
                        )
                    })
                }
            </Box>
            <Box display={'flex'} alignItems={'center'} gap={2} direction={'row'} justifyContent={'space-between'} p={2}>
                <ChatInput userInfo={userInfo} conversationId={conversationId} socket={socket}></ChatInput>
            </Box>
        </Flex>
    )
}