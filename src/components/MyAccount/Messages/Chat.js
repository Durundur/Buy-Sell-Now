import { Flex, Avatar, Icon, Text, Box, Image, AspectRatio, Link } from "@chakra-ui/react";
import { AiOutlineDelete, AiOutlineFlag, AiOutlineStop, AiOutlineBook } from 'react-icons/ai'
import AdPreviev from '../../../components/AdPreview/adPreview.png'
import { useAuthContext } from "../../../contexts";
import { useParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import { Message } from './Message'
import ChatInput from './ChatInput'
import { getConversationChat } from "../../../utils/apiServices";
import useApi from "../../../hooks/useApi";
import LoadingSpinner from '../../LoadingSpinner'
import useSocket from '../../../hooks/useSocket'
import { useOutletContext } from "react-router"


export default function Chat(props) {
    const chatRef = useRef(0);
    const { id } = useParams();
    const { userInfo } = useAuthContext();
    const { data, error, isLoading, triggerApiCall, setData } = useApi()
    const { socket, isConnected, chatData, setChatData } = useSocket(id, setData);


    useEffect(() => {
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }, [data])


    useEffect(() => {
        triggerApiCall(getConversationChat(id))
    }, [])


    if (isLoading) return <LoadingSpinner></LoadingSpinner>
    return (
        <Flex flexBasis={'100%'} direction={'column'}>
            <Box display={'flex'} p={2} borderBottom={'1px'} borderColor={'gray.200'} justifyContent={'space-between'} alignItems={'center'} direction={'row'}>
                <Link>
                    <Flex gap={4} flexGrow={5} alignItems={'center'}>
                        <Avatar size={'sm'}></Avatar>
                        <Box fontSize={'sm'}>
                            <Text fontWeight={'bold'}>{data?.conversation?.ad?.advertiser?.name}</Text>
                            <Text>Ostatnio online dziś o 14:42</Text>
                        </Box>
                    </Flex>
                </Link>

                <Flex fontSize={'xl'} gap={2} direction={'row'} alignItems={'center'}>
                    <Icon as={AiOutlineDelete}></Icon>
                    <Icon as={AiOutlineFlag}></Icon>
                    <Icon as={AiOutlineStop}></Icon>
                    <Icon as={AiOutlineBook}></Icon>
                </Flex>
            </Box>
            <Flex gap={2} p={1} fontSize={'sm'} borderBottom={'1px'} borderColor={'gray.200'} alignItems={'center'} direction={'row'}>
                <AspectRatio minW={['30%', '20%', '15%']} ratio={4 / 3}>
                    <Image src={data?.conversation?.ad?.images[0] || AdPreviev}></Image>
                </AspectRatio>
                <Flex direction={'column'}>
                    <Text>{data?.conversation?.ad?.tittle}</Text>
                    <Text fontWeight={'bold'}>{data?.conversation?.ad?.price?.value}</Text>
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
                    data?.messages?.map((message, index) => {
                        return (
                            <Message key={index} userId={userInfo} message={message}></Message>
                        )
                    })
                }
            </Box>
            <Box display={'flex'} alignItems={'center'} gap={2} direction={'row'} justifyContent={'space-between'} p={2}>
                <ChatInput socket={socket} userInfo={userInfo} conversationId={id}></ChatInput>
            </Box>
        </Flex>
    )
}