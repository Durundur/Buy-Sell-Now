import { Formik, Form } from 'formik';
import { Text } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import LoadingSpinner from '../../Layout/LoadingSpinner';
import AdvertiserInfo from '../../Forms/AdvertiserInfo';
import { CompanyInfo } from '../../Forms/CompanyInfo';
import useApi from '../../../hooks/useApi';
import { AccountDataType } from '../../../types/UserDataType';
import { GeneralInfoCompanyValidationSchema, GeneralInfoPersonalValidationSchema } from '../../../utils/Formik/GeneralInfoValidationSchema';
import { UPDATE_ACC_GENERAL_INFO_URL } from '../../../hooks/ApiEndpoints';
import { ApiQueryResponseType } from '../../../types/ApiDataTypes';
import { SelectIfCompanyAcc } from '../../Forms/SelectIfCompanyAcc';

type ChangeGeneralInfoProps = { generalInfo: AccountDataType };

export default function ChangeGeneralInfo({ generalInfo }: ChangeGeneralInfoProps) {
	const {
		data: updateUserInfoResponse,
		error: requestError,
		isLoading,
		makeRequest: updateUserInfo
	} = useApi<ApiQueryResponseType<AccountDataType>>({
		url: UPDATE_ACC_GENERAL_INFO_URL,
		method: 'put'
	});
	const isCompanyAcc = updateUserInfoResponse?.data?.isCompanyAcc || generalInfo?.isCompanyAcc;
	if (isLoading) return <LoadingSpinner />;
	return (
		<Formik
			initialValues={{ advertiser: updateUserInfoResponse?.data || generalInfo }}
			validationSchema={isCompanyAcc ? GeneralInfoCompanyValidationSchema : GeneralInfoPersonalValidationSchema}
			onSubmit={(values) => {
				updateUserInfo(values);
			}}>
			<Form>
				{isCompanyAcc ? (
					<CompanyInfo />
				) : (
					<>
						<AdvertiserInfo localizationInputName={''} />
						<SelectIfCompanyAcc></SelectIfCompanyAcc>
					</>
				)}
				{requestError && (
					<Text fontSize={'14px'} color={'red.500'}>
						{requestError.message}
					</Text>
				)}
				{updateUserInfoResponse?.message && (
					<Text fontSize={'14px'} color={'blue.900'}>
						{updateUserInfoResponse.message}
					</Text>
				)}
				<Button mt={4} variant={'solid'} type={'submit'} colorScheme={'blue'}>
					Zapisz
				</Button>
			</Form>
		</Formik>
	);
}
