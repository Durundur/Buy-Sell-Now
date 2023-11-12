import { Flex, Icon, Text, Box, AspectRatio } from '@chakra-ui/react';
import { AiOutlineDelete, AiOutlineFlag, AiOutlineStop, AiOutlineBook } from 'react-icons/ai';
import { useAuthContext } from '../../../contexts';
import { useParams } from 'react-router-dom';
import { LegacyRef, useEffect, useRef } from 'react';
import { Message } from './Message';
import ChatInput from './ChatInput';
import useApi from '../../../hooks/useApi';
import LoadingSpinner from '../../Layout/LoadingSpinner';
import useSocket from '../../../hooks/useSocket';
import { Link } from 'react-router-dom';
import { Image } from '../../Layout/Image';
import { ConversationChatDataType } from '../../../types/ConversationDataType';
import { GET_ACC_CONVERSATION_CHAT_URL } from './../../../hooks/ApiEndpoints';

export default function Chat() {
	const scrollRef = useRef<HTMLDivElement>();
	const { id } = useParams();
	const { userInfo } = useAuthContext();
	const { data: conversationChat, error, isLoading, makeRequest: getConversationChat, setData: updateConversationChat} = useApi<ConversationChatDataType>({
		url: GET_ACC_CONVERSATION_CHAT_URL(id as string),
	});
	const { isConnectionAlive, joinRoom, sendRoomMessage } = useSocket(updateConversationChat);

	useEffect(() => {
		if (scrollRef.current) {
			const scrollHeight = scrollRef.current.scrollHeight;
			scrollRef.current.scrollTo({ top: scrollHeight, behavior: 'smooth' });
		}
	}, [conversationChat]);

	useEffect(() => {
		getConversationChat(id);
		joinRoom(id as string);
	}, [id]);

	if (isLoading || !isConnectionAlive) return <LoadingSpinner></LoadingSpinner>;
	return (
		<Flex flexBasis={'100%'} direction={'column'}>
			<Box
				display={'flex'}
				p={2}
				borderBottom={'1px'}
				borderColor={'gray.200'}
				justifyContent={'space-between'}
				alignItems={'center'}>
				<Flex direction={'column'} fontSize={'sm'} gap={1} alignItems={'flex-start'}>
					<Link to={`/uzytkownik/${conversationChat?.conversation?.ad?.advertiser?._id}`}>
						<Text fontWeight={500}>{conversationChat?.conversation?.ad?.advertiser?.name}</Text>
					</Link>
					<Text>Ostatnio online dziś o 14:42</Text>
				</Flex>

				<Flex fontSize={'xl'} gap={2} direction={'row'} alignItems={'center'}>
					<Icon as={AiOutlineDelete}></Icon>
					<Icon as={AiOutlineFlag}></Icon>
					<Icon as={AiOutlineStop}></Icon>
					<Icon as={AiOutlineBook}></Icon>
				</Flex>
			</Box>
			<Link to={`/ogloszenie/${conversationChat?.conversation.ad._id}`}>
				<Flex
					gap={2}
					p={1}
					fontSize={'sm'}
					borderBottom={'1px'}
					borderColor={'gray.200'}
					alignItems={'center'}
					direction={'row'}>
					<AspectRatio minW={['30%', '20%', '15%']} ratio={4 / 3}>
						<Image src={conversationChat?.conversation.ad.images[0] as string}></Image>
					</AspectRatio>
					<Flex direction={'column'}>
						<Text>{conversationChat?.conversation.ad.tittle}</Text>
						<Text fontWeight={'bold'}>{conversationChat?.conversation.ad.price.value}</Text>
					</Flex>
				</Flex>
			</Link>

			<Box
				sx={{
					'&::-webkit-scrollbar': {
						width: '4px',
						borderRadius: '8px',
					},
					'&::-webkit-scrollbar-thumb': {
						backgroundColor: `blue.500`,
						borderRadius: '8px',
					},
				}}
				ref={scrollRef as LegacyRef<HTMLDivElement>}
				height={'100%'}
				overflowY={'scroll'}>
				{conversationChat?.messages.map((message, index) => {
					return (
						<Message key={index} userId={userInfo.userId as string} message={message}></Message>
					);
				})}
			</Box>
			<Box display={'flex'} alignItems={'center'} gap={2} justifyContent={'space-between'} p={2}>
				<ChatInput
					sendRoomMessage={sendRoomMessage}
					userInfo={userInfo.userId as string}
					conversationId={id as string}></ChatInput>
			</Box>
		</Flex>
	);
}
