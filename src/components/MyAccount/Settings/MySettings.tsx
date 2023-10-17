import { useEffect } from 'react';
import ContainerBox from '../../Layout/ContainerBox';
import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	Box,
	AccordionPanel,
	AccordionItem,
} from '@chakra-ui/react';
import useApi from '../../../hooks/useApi';
import ChangeEmail from './ChangeEmail';
import ChangePassword from './ChangePassword';
import ChangeGeneralInfo from './ChangeGenaralInfo';
import ChangeUserImages from './ChangeUserImages';
import { useOutletContext } from 'react-router';
import LoadingSpinner from '../../Layout/LoadingSpinner';
import { UserDataType } from '../../../types/UserDataType';

function MySettings({ ...props }) {
	const {
		data: mySettingsData,
		error,
		isLoading,
		makeRequest: getMySettings,
	} = useApi<UserDataType>({
		url: 'api/v1/settings/general-info',
	});

	const { setActiveTab }: { setActiveTab: React.Dispatch<React.SetStateAction<number>> } =
		useOutletContext();
	useEffect(() => {
		setActiveTab(props.activeTab);
	}, [props.activeTab]);

	useEffect(() => {
		getMySettings();
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
				<AccordionItem
					shadow={'md'}
					marginBottom={4}
					border={'none'}
					borderRadius={'20px'}
					bg={'#fff'}>
					<h2>
						<AccordionButton _hover={{ bg: 'inherit' }}>
							<Box as='span' flex='1' textAlign='left'>
								Domyślne informacje
							</Box>
							<AccordionIcon />
						</AccordionButton>
					</h2>
					<AccordionPanel pb={4}>
						<ChangeGeneralInfo mySettingsData={mySettingsData as UserDataType}></ChangeGeneralInfo>
						{/* naprawic zeby nie dalo sie wywylac pustych */}
					</AccordionPanel>
				</AccordionItem>

				<AccordionItem
					shadow={'md'}
					marginBottom={4}
					border={'none'}
					borderRadius={'20px'}
					bg={'#fff'}>
					<h2>
						<AccordionButton _hover={{ bg: 'inherit' }}>
							<Box as='span' flex='1' textAlign='left'>
								Logo i baner
							</Box>
							<AccordionIcon />
						</AccordionButton>
					</h2>
					<AccordionPanel pb={4}>
						<ChangeUserImages
							avatar={mySettingsData?.avatar}
							banner={mySettingsData?.banner} setData={undefined} error={undefined} isLoading={undefined} triggerApiCall={undefined}></ChangeUserImages>
					</AccordionPanel>
				</AccordionItem>

				<AccordionItem
					shadow={'md'}
					marginBottom={4}
					border={'none'}
					borderRadius={'20px'}
					bg={'#fff'}>
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

				<AccordionItem
					shadow={'md'}
					marginBottom={4}
					border={'none'}
					borderRadius={'20px'}
					bg={'#fff'}>
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
