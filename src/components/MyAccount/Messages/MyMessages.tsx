import { HStack, Flex, Text, Image } from '@chakra-ui/react';
import ConversationPreview from './ConversationPreview';
import { useEffect } from 'react';
import useApi from '../../../hooks/useApi';
import ContainerBox from '../../Layout/ContainerBox';
import { useOutletContext } from 'react-router';
import LoadingSpinner from '../../Layout/LoadingSpinner';
import { useOutlet } from 'react-router-dom';
import { useAuthContext } from '../../../contexts';
import { ConversationQueryType } from '../../../types/ApiDataTypes';

function MyMessages({ ...props }) {
	const { data: MyConversations, isLoading, makeRequest: getMyConversations} = useApi<ConversationQueryType[]>({
		url: 'api/v1/conversations',
	});
	const outlet = useOutlet();
	const { userInfo } = useAuthContext();

	const { setActiveTab }: { setActiveTab: React.Dispatch<React.SetStateAction<number>> } =
		useOutletContext();
	useEffect(() => {
		setActiveTab(props.activeTab);
	}, [props.activeTab]);

	useEffect(() => {
		getMyConversations();
	}, []);

	return (
		<ContainerBox>
			<HStack height={'80vh'} alignItems={'stretch'}>
				<Flex
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
					flexBasis={'35%'}
					direction={'column'}
					justifyContent={'flex-start'}
					overflowY={'scroll'}
					borderRadius={'20px'}
					bg={'#fff'}
					alignItems={'stretch'}
					boxShadow={'md'}>
					{isLoading ? (
						<LoadingSpinner />
					) : (
						MyConversations?.map((conversation) => {
							return (
								<ConversationPreview
									userId={userInfo.userId as string}
									key={conversation._id}
									conversation={conversation}
									active={true}
								/>
							);
						})
					)}
				</Flex>
				<Flex flexBasis={'65%'} borderRadius={'20px'} bg={'#fff'} boxShadow={'md'}>
					{outlet || (
						<Flex flexGrow={1} justifyContent={'center'} alignItems={'center'} direction={'column'}>
							<Image
								src={
									'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMzUiIGhlaWdodD0iMTM1IiB2aWV3Qm94PSIwIDAgMTM1IDEzNSI+CiAgICA8ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnPgogICAgICAgICAgICA8Zz4KICAgICAgICAgICAgICAgIDxnPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGZpbGw9IiMzQTc3RkYiIGQ9Ik0zNi45MDcgMTIwLjQ4MWwtNi44MTktMy44VjcxLjEzNGMwLTIxLjkzMiAxNy45NDUtMzkuNzc2IDQwLjAwMy0zOS43NzZoOS43NzFjMjIuMDU4IDAgNDAuMDA1IDE3Ljg0NCA0MC4wMDUgMzkuNzc2IDAgMjEuOTMzLTE3Ljk0NyAzOS43NzgtNDAuMDA1IDM5Ljc3OEg1My4wNWMtLjQ0NCAwLS44NzcuMTU3LTEuMjIuNDRsLS41MjMuMzcyLTE0LjM5OSA4Ljc1N3oiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xMTMgLTEzMCkgdHJhbnNsYXRlKDExMyAxMzApIHRyYW5zbGF0ZSg3LjIzMiA3LjIzMikiLz4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBmaWxsPSIjQ0VEREZGIiBkPSJNNjguNzIzIDgwLjM2NmwtLjUyMy0uMzcyYy0uMzQzLS4yODMtLjc3Ni0uNDQtMS4yMi0uNDRINDAuMTY2QzE4LjExIDc5LjU1NC4xNjIgNjEuNzEuMTYyIDM5Ljc3NlMxOC4xMSAwIDQwLjE2NiAwaDkuNzcyYzIyLjA1OCAwIDQwLjAwMyAxNy44NDMgNDAuMDAzIDM5Ljc3NnY0NS41NDdsLTYuODIgMy44LTE0LjM5OC04Ljc1N3oiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xMTMgLTEzMCkgdHJhbnNsYXRlKDExMyAxMzApIHRyYW5zbGF0ZSg3LjIzMiA3LjIzMikiLz4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBzdHJva2U9IiMwMDJGMzQiIHN0cm9rZS13aWR0aD0iNSIgZD0iTTY1LjgzMyA1My44MjhTNDkuOTA1IDczLjE0IDMwLjkyIDUxLjk4OCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTExMyAtMTMwKSB0cmFuc2xhdGUoMTEzIDEzMCkgdHJhbnNsYXRlKDcuMjMyIDcuMjMyKSIvPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGZpbGw9IiMwMDJGMzQiIGQ9Ik0zNC42NiAyMC42M2MtNi42NTcgMC0xMi4wNTMgNS4zNTctMTIuMDUzIDExLjk2NiAwIDYuNjA5IDUuMzk2IDExLjk2NiAxMi4wNTMgMTEuOTY2IDYuNjU3IDAgMTIuMDU0LTUuMzU3IDEyLjA1NC0xMS45NjYgMC02LjYwOS01LjM5Ny0xMS45NjYtMTIuMDU0LTExLjk2Nm0wIDguMzc2YzEuOTk0IDAgMy42MTYgMS42MSAzLjYxNiAzLjU5IDAgMS45OC0xLjYyMiAzLjU5LTMuNjE2IDMuNTktMS45OTMgMC0zLjYxNi0xLjYxLTMuNjE2LTMuNTkgMC0xLjk4IDEuNjIzLTMuNTkgMy42MTYtMy41OSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTExMyAtMTMwKSB0cmFuc2xhdGUoMTEzIDEzMCkgdHJhbnNsYXRlKDcuMjMyIDcuMjMyKSIvPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIHN0cm9rZT0iIzAwMkYzNCIgc3Ryb2tlLXdpZHRoPSI1IiBkPSJNNjUuODMzIDMxLjc3MUw1MS43MDIgMzEuNzcxIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTEzIC0xMzApIHRyYW5zbGF0ZSgxMTMgMTMwKSB0cmFuc2xhdGUoNy4yMzIgNy4yMzIpIi8+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg=='
								}></Image>
							<Text>Wybierz konwersację, aby ją przeczytać</Text>
						</Flex>
					)}
				</Flex>
			</HStack>
		</ContainerBox>
	);
}

export default MyMessages;
