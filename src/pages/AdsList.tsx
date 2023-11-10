import { VStack } from '@chakra-ui/react';
import Pagination from '../components/AdPage/Pagination';
import LoadingSpinner from '../components/Layout/LoadingSpinner';
import Error from '../components/Layout/Error';
import ListItemPublic from '../components/AdPreview/ListItemPublic';
import ContainerBox from '../components/Layout/ContainerBox';
import useApi from '../hooks/useApi';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { NoAds } from '../components/AdPage/NoAds';
import { AdvertQueryType } from '../types/ApiDataTypes';
import { GET_ADS_URL } from './../hooks/ApiEndpoints';

export default function AdsList() {
	const location = useLocation();
	const {
		data: AdvertListData,
		error,
		isLoading,
		makeRequest: getAdvertList,
	} = useApi<AdvertQueryType[]>({
		url: GET_ADS_URL((location.pathname + location.search).replace('ogloszenia', 'search')),
	});

	useEffect(() => {
		getAdvertList();
	}, [location]);

	if (isLoading)
		return (
			<ContainerBox>
				<LoadingSpinner></LoadingSpinner>
			</ContainerBox>
		);
	else if (!isLoading && error)
		return (
			<ContainerBox>
				<Error variant='error' error={error}></Error>
			</ContainerBox>
		);
	return (
		<ContainerBox>
			<VStack spacing={{ base: 2, md: 4 }}>
				{AdvertListData?.length === 0 ? (
					<NoAds />
				) : (
					AdvertListData?.map((ad) => {
						return <ListItemPublic key={ad._id} adData={ad}></ListItemPublic>;
					})
				)}
			</VStack>
			{AdvertListData?.length === 0 ? <></> : (
				<Pagination
					isLoading={isLoading}
					pathParams={location.pathname}
					queryParams={location.search}></Pagination>
			)}
		</ContainerBox>
	);
}
