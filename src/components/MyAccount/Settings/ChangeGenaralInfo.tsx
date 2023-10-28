import { Formik, Form } from 'formik';
import { Text } from '@chakra-ui/react';
import * as Yup from 'yup';
import { Button } from '@chakra-ui/react';
import LoadingSpinner from '../../Layout/LoadingSpinner';
import { Box } from '@chakra-ui/react';
import AdvertiserInfo from '../../Form/AdvertiserInfo';
import { handleInputChange } from '../../../utils/utilsOld';
import { CompanyInfo } from '../../Form/CompanyInfo';
import useApi from '../../../hooks/useApi';
import { UserDataType } from '../../../types/UserDataType';

export default function ChangeGeneralInfo({ mySettingsData }: { mySettingsData: UserDataType }) {
	return (
		<Box w={['100%', '80%', '65%', '40%']}>
			{mySettingsData?.advertiser?.isCompanyAcc ? (
				<GeneralInfoCompany data={mySettingsData} />
			) : (
				<GeneralInfoPersonal data={mySettingsData} />
			)}
		</Box>
	);
}

function GeneralInfoPersonal({ data }: { data: UserDataType }) {
	const {
		data: requestResponse,
		error: requestError,
		isLoading,
		makeRequest: updateUserInfo,
	} = useApi({
		url: 'api/v1/settings/general-info',
		method: 'put',
	});

	if (isLoading) return <LoadingSpinner />;
	return (
		<Formik
			initialValues={{ advertiser: { ...data?.advertiser } }}
			validationSchema={Yup.object().shape({
				advertiser: Yup.object().shape({
					name: Yup.string().required('Pole obowiązkowe'),
					phoneNumber: Yup.string()
						.matches(
							/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
						)
						.max(13, 'Niepoprawny numer telefonu')
						.required('Pole obowiązkowe')
						.trim(),
				}),
			})}
			onSubmit={(values) => {
				updateUserInfo(values);
			}}>
			<Form>
				<AdvertiserInfo localizationInputName={''}></AdvertiserInfo>
				{requestError && (
					<Text fontSize={'14px'} color={'red.500'}>
						{requestError.message}
					</Text>
				)}
				<Button mt={4} variant={'solid'} type={'submit'} colorScheme={'blue'}>
					Zapisz
				</Button>
			</Form>
		</Formik>
	);
}

function GeneralInfoCompany({ data }: { data: UserDataType }) {
	const {
		data: requestResponse,
		error: requestError,
		isLoading,
		makeRequest: updateUserInfo,
	} = useApi({
		url: 'api/v1/settings/general-info',
		method: 'put',
	});

	if (isLoading) return <LoadingSpinner />;
	return (
		<Formik
			initialValues={{ advertiser: { ...data?.advertiser } }}
			onSubmit={async (values) => {
				updateUserInfo(values);
			}}>
			<Form>
				<CompanyInfo></CompanyInfo>
				{
				requestError && (
				<Text fontSize={'14px'} color={'red.500'}>
					{requestError.message}
				</Text>)
				}
				<Button mt={4} variant={'solid'} type={'submit'} colorScheme={'blue'}>
					Zapisz
				</Button>
			</Form>
		</Formik>
	);
}
