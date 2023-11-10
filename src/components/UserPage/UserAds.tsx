import { useEffect } from 'react';
import { useOutletContext, useNavigate } from 'react-router';
import { Flex, InputGroup, Input, InputLeftElement, Select, FormLabel, FormControl, Grid, GridItem,
} from '@chakra-ui/react';
import ContainerBox from '../Layout/ContainerBox';
import ListItemPublic from '../AdPreview/ListItemPublic';
import Pagination from '../AdPage/Pagination';
import { IoSearchOutline } from 'react-icons/io5';
import { useParams, useLocation } from 'react-router-dom';
import { UserAdsFilter } from './UserAdsFilter';
import LoadingSpinner from '../Layout/LoadingSpinner';
import useApi from '../../hooks/useApi';
import { GET_USER_ADS_URL } from '../../hooks/ApiEndpoints';
import { AdvertQueryType } from '../../types/ApiDataTypes';

export default function UserAds({ ...props }) {
    const {setActiveTab}: {setActiveTab: React.Dispatch<React.SetStateAction<number>>} = useOutletContext();
    useEffect(() => {
        setActiveTab(props.activeTab)
    }, [props.activeTab])

	const navigate = useNavigate();
	const location = useLocation();
	const { id, mainCatParam, subCatParam, subSubCatParam } = useParams();
	const { data: userAds, isLoading: isLoadingUserAds, makeRequest: getUserAds} = useApi<AdvertQueryType[]>({
		url: GET_USER_ADS_URL((location.pathname + location.search).replace('/uzytkownik/', '')),
	});

	useEffect(() => {
		getUserAds();
	}, [location.search, location.pathname]);


	function handleSortIntulChange(e: React.ChangeEvent<HTMLSelectElement>) {
		const value = e.target.value.split('/');
		const key = value[0];
		const order = value[1];
		if (key && order) navigate(`?sort=${key}&order=${order}`);
	}

	return (
		<ContainerBox>
			<Grid gap={4} templateColumns={'repeat(4, 1fr)'}>
				<GridItem colSpan={1}>
					<FormControl>
						<FormLabel fontWeight={400}>Znajdz na stronie</FormLabel>
						<InputGroup>
							<InputLeftElement children={<IoSearchOutline />} />
							<Input shadow={'sm'} bg={'#fff'} />
						</InputGroup>
					</FormControl>
				</GridItem>
				<GridItem>
					<FormControl>
						<FormLabel textTransform={'capitalize'} fontWeight={400}>
							Sortuj
						</FormLabel>
						<Select
							defaultValue={'featured'}
							onChange={(e) => handleSortIntulChange(e)}
							textTransform={'capitalize'}
							shadow={'sm'}
							bg={'#fff'}
							autoComplete={'off'}>
							<option value={'price/asc'}>Cena: od najtańszych</option>
							<option value={'price/desc'}>Cena: od najdroższych</option>
							<option value={'createdAt/desc'}>Czas: od najnowszych</option>
							<option value={'createdAt/asc'}>Czas: od najstarszych</option>
							<option value={'featured'}>Wybrane dla Ciebie</option>
						</Select>
					</FormControl>
				</GridItem>
				<GridItem colSpan={1} colStart={1}>
					<UserAdsFilter
						mainCatParam={mainCatParam as string}
						subCatParam={subCatParam as string}
						subSubCatParam={subSubCatParam as string}
						userId={id as string}></UserAdsFilter>
				</GridItem>
				<GridItem colSpan={3}>
					{isLoadingUserAds && <LoadingSpinner></LoadingSpinner>}
					<Flex gap={2} direction={'column'} borderRadius={'20px'}>
						{userAds &&
							userAds.map((ad) => {
								return <ListItemPublic key={ad._id} adData={ad}></ListItemPublic>;
							})}
						<Pagination
							isLoading={isLoadingUserAds}
							pathParams={location.pathname}
							queryParams={location.search}></Pagination>
					</Flex>
				</GridItem>
			</Grid>
		</ContainerBox>
	);
}
