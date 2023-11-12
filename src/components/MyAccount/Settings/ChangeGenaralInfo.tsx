import { Formik, Form } from 'formik';
import { Text } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import LoadingSpinner from '../../Layout/LoadingSpinner';
import AdvertiserInfo from '../../Forms/AdvertiserInfo';
import { CompanyInfo } from '../../Forms/CompanyInfo';
import useApi from '../../../hooks/useApi';
import { AccountDataType } from '../../../types/UserDataType';
import { GeneralInfoValidationSchema } from '../../../utils/Formik/GeneralInfoValidationSchema';
import { UPDATE_ACC_GENERAL_INFO_URL } from '../../../hooks/ApiEndpoints';
import { ApiQueryResponseType } from '../../../types/ApiDataTypes';
import { SelectIfCompanyAcc } from '../../Forms/SelectIfCompanyAcc';
import { createInitialValuesObject } from '../../../utils/utils';
import { GeneralInfoCompanyInitialValues, GeneralInfoPersonalInitialValues } from './../../../utils/Formik/GeneralInfoInitialValues';


type ChangeGeneralInfoProps = { generalInfo: AccountDataType };

export default function ChangeGeneralInfo({ generalInfo }: ChangeGeneralInfoProps) {
	const { data: updateUserInfoResponse, error: requestError, isLoading, makeRequest: updateUserInfo } = useApi<ApiQueryResponseType<AccountDataType>>({
		url: UPDATE_ACC_GENERAL_INFO_URL,
		method: 'put'
	});
	const actualData = updateUserInfoResponse?.data ?? generalInfo;
	const initialValues = createInitialValuesObject(actualData?.isCompanyAcc ? GeneralInfoCompanyInitialValues : GeneralInfoPersonalInitialValues, actualData as {});
	if (isLoading) return <LoadingSpinner />;
	return (
		<Formik
			initialValues={{ advertiser: initialValues }}
			validationSchema={GeneralInfoValidationSchema}
			onSubmit={values => updateUserInfo(values)}>
			{
				({ values }) =>
					<Form>
						{values.advertiser?.isCompanyAcc ? <CompanyInfo/> : <AdvertiserInfo/>}
						<SelectIfCompanyAcc />
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
			}
		</Formik>
	);
}


