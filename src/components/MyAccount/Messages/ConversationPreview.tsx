import { Avatar, Flex, VStack, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { ConversationQueryType } from '../../../types/ApiRequestDataTypes';

export default function ConversationPreview({
	userId,
	conversation,
	active,
}: {
	userId: string;
	conversation: ConversationQueryType;
	active: boolean;
}) {
	const conversationInfo =
		userId === conversation.inquirer._id
			? { name: conversation.ad.advertiser.name, avatar: conversation.ad.advertiser.details.avatar }
			: { name: conversation.inquirer.advertiser.name, avatar: conversation.inquirer.avatar };

	return (
		<Link to={`./${conversation._id}`}>
			<Flex
				direction={'row'}
				alignItems='center'
				gap={2}
				p={2}
				fontSize={'sm'}
				borderBottom={'1px'}
				borderColor={'gray.200'}
				bg={active ? 'blue.50' : undefined}>
				<Avatar size={'md'} src={conversationInfo?.avatar}></Avatar>
				<Flex
					wrap={'nowrap'}
					direction={'column'}
					justifyContent={'flex-start'}
					alignItems={'flex-start'}>
					<Text noOfLines={1}>{conversationInfo?.name}</Text>
					<Text fontWeight={500} noOfLines={1}>
						{conversation?.ad?.tittle}
					</Text>
					<Text mt={2} noOfLines={1}>
						{conversation?.lastMessages?.message}
					</Text>
				</Flex>
				<VStack>
					<Text>{conversation?.lastMessages?.timestamp}</Text>
				</VStack>
			</Flex>
		</Link>
	);
}
