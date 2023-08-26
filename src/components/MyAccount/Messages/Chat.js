import { Flex, Icon, Text, Box, AspectRatio } from "@chakra-ui/react";
import { AiOutlineDelete, AiOutlineFlag, AiOutlineStop, AiOutlineBook } from 'react-icons/ai'
import { useAuthContext } from "../../../contexts";
import { useParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import { Message } from './Message'
import ChatInput from './ChatInput'
import { getConversationChat } from "../../../utils/apiServices";
import useApi from "../../../hooks/useApi";
import LoadingSpinner from '../../LoadingSpinner'
import useSocket from '../../../hooks/useSocket'
import { Link } from "react-router-dom";
import { Image } from "../../Image";

export default function Chat() {
    const scrollRef = useRef(null);
    const { id } = useParams();
    const { userInfo } = useAuthContext();
    const { data, error, isLoading, triggerApiCall, setData } = useApi()
    const { isConnectionAlive, joinRoom, sendRoomMessage } = useSocket(setData);


    useEffect(() => {
        const scrollHeight = scrollRef.current?.scrollHeight;
        scrollRef.current?.scrollTo({ top: scrollHeight, behavior: 'smooth' })
    }, [data]);

    useEffect(() => {
        triggerApiCall(getConversationChat(id));
        joinRoom(id);
    }, [id])


    if (isLoading || !isConnectionAlive) return <LoadingSpinner></LoadingSpinner>
    return (
        <Flex flexBasis={'100%'} direction={'column'}>
            <Box display={'flex'} p={2} borderBottom={'1px'} borderColor={'gray.200'} justifyContent={'space-between'} alignItems={'center'} direction={'row'}>
                <Flex direction={'column'} fontSize={'sm'} gap={1} alignItems={'flex-start'}>
                    <Link to={`/uzytkownik/${data?.conversation?.ad?.advertiser?._id}`}>
                        <Text fontWeight={500}>{data?.conversation?.ad?.advertiser?.name}</Text>
                    </Link>
                    <Text>Ostatnio online dziś o 14:42</Text>
                </Flex>

                <Flex fontSize={'xl'} gap={2} direction={'row'} alignItems={'center'}>
                    <Icon as={AiOutlineDelete}></Icon>
                    <Icon as={AiOutlineFlag}></Icon>
                    <Icon as={AiOutlineStop}></Icon>
                    <Icon as={AiOutlineBook}></Icon>
                </Flex>
            </Box >
            <Link to={`/ogloszenie/${data?.conversation?.ad?._id}`}>
                <Flex gap={2} p={1} fontSize={'sm'} borderBottom={'1px'} borderColor={'gray.200'} alignItems={'center'} direction={'row'}>
                    <AspectRatio minW={['30%', '20%', '15%']} ratio={4 / 3}>
                        <Image src={data?.conversation?.ad?.images[0]}></Image>
                    </AspectRatio>
                    <Flex direction={'column'}>
                        <Text>{data?.conversation?.ad?.tittle}</Text>
                        <Text fontWeight={'bold'}>{data?.conversation?.ad?.price?.value}</Text>
                    </Flex>
                </Flex>
            </Link>

            <Box sx={{
                '&::-webkit-scrollbar': {
                    width: '4px',
                    borderRadius: '8px',
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: `blue.500`,
                    borderRadius: '8px',
                },
            }} ref={scrollRef} height={'100%'} overflowY={'scroll'} >
                {
                    data?.messages?.map((message, index) => {
                        return (
                            <Message key={index} userId={userInfo.userId} message={message}></Message>
                        )
                    })
                }
            </Box>
            <Box display={'flex'} alignItems={'center'} gap={2} direction={'row'} justifyContent={'space-between'} p={2}>
                <ChatInput sendRoomMessage={sendRoomMessage} userInfo={userInfo.userId} conversationId={id}></ChatInput>
            </Box>
        </Flex >
    )
}