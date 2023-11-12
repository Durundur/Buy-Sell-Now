import { useEffect } from 'react';
import ContainerBox from '../../Layout/ContainerBox';
import { Accordion, AccordionButton, AccordionIcon, Box, AccordionPanel, AccordionItem } from '@chakra-ui/react';
import useApi from '../../../hooks/useApi';
import ChangeEmail from './ChangeEmail';
import ChangePassword from './ChangePassword';
import ChangeGeneralInfo from './ChangeGenaralInfo';
import ChangeUserImages from './ChangeUserImages';
import { useOutletContext } from 'react-router';
import LoadingSpinner from '../../Layout/LoadingSpinner';
import { CompanyAccountDataType, PersonalAccountDataType, UserDataType } from '../../../types/UserDataType';
import { GET_ACC_GENERAL_INFO_URL } from '../../../hooks/ApiEndpoints';

function MySettings({ ...props }) {
	const { data: accountData, error, isLoading, makeRequest: getAccountData} = useApi<UserDataType>({
		url: GET_ACC_GENERAL_INFO_URL
	});

	const { setActiveTab }: { setActiveTab: React.Dispatch<React.SetStateAction<number>> } = useOutletContext();
	useEffect(() => {
		setActiveTab(props.activeTab);
	}, [props.activeTab]);

	useEffect(() => {
		getAccountData();
	}, []);
	if (isLoading)
		return (
			<ContainerBox>
				<LoadingSpinner />
			</ContainerBox>
		);
	return (
	<ContainerBox>
		<Accordion overflow={'visible'} allowMultiple gap={2}>
			<AccordionItem shadow={'md'} marginBottom={4} border={'none'} borderRadius={'20px'} bg={'#fff'}>
				<h2>
					<AccordionButton _hover={{ bg: 'inherit' }}>
						<Box as='span' flex='1' textAlign='left'>
							Domyślne informacje
						</Box>
						<AccordionIcon />
					</AccordionButton>
				</h2>

				<AccordionPanel pb={4}>
					<ChangeGeneralInfo generalInfo={accountData?.advertiser as PersonalAccountDataType | CompanyAccountDataType}></ChangeGeneralInfo>
					{/* naprawic zeby nie dalo sie wywylac pustych */}
				</AccordionPanel>
			</AccordionItem>

			<AccordionItem shadow={'md'} marginBottom={4} border={'none'} borderRadius={'20px'} bg={'#fff'}>
				<h2>
					<AccordionButton _hover={{ bg: 'inherit' }}>
						<Box as='span' flex='1' textAlign='left'>
							Logo i baner
						</Box>
						<AccordionIcon />
					</AccordionButton>
				</h2>
				<AccordionPanel pb={4}>
					<ChangeUserImages avatar={accountData?.avatar as string} banner={accountData?.banner as string}></ChangeUserImages>
				</AccordionPanel>
			</AccordionItem>

			<AccordionItem shadow={'md'} marginBottom={4} border={'none'} borderRadius={'20px'} bg={'#fff'}>
				<h2>
					<AccordionButton _hover={{ bg: 'inherit' }}>
						<Box as='span' flex='1' textAlign='left'>
							Zmiana hasła
						</Box>
						<AccordionIcon />
					</AccordionButton>
				</h2>
				<AccordionPanel pb={4}>
					<ChangePassword></ChangePassword>
				</AccordionPanel>
			</AccordionItem>

			<AccordionItem shadow={'md'} marginBottom={4} border={'none'} borderRadius={'20px'} bg={'#fff'}>
				<h2>
					<AccordionButton _hover={{ bg: 'inherit' }}>
						<Box as='span' flex='1' textAlign='left'>
							Zmiana e-mail
						</Box>
						<AccordionIcon />
					</AccordionButton>
				</h2>
				<AccordionPanel pb={4}>
					<ChangeEmail></ChangeEmail>
				</AccordionPanel>
			</AccordionItem>
		</Accordion>
	</ContainerBox>
);
}

export default MySettings;
