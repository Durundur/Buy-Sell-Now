import { Box, Flex, Text } from '@chakra-ui/react';
import { CategoryBadge } from './CategoryBadge';
import useApi from '../../hooks/useApi';
import LoadingSpinner from '../Layout/LoadingSpinner'
import { useEffect } from 'react';
import { CategoryFilterItem } from './CategoryFilterItem'
import { GET_USER_PAGE_ADS_STATS_URL } from '../../hooks/ApiEndpoints';
import { UserAdsStats } from '../../types/ApiRequestDataTypes';

type UserAdsFilterProps = {
    userId: string,
    mainCatParam: string,
    subCatParam: string,
    subSubCatParam: string
}

export function UserAdsFilter({ userId, mainCatParam, subCatParam, subSubCatParam }: UserAdsFilterProps) {
    const { data: userAdsStats, isLoading: isLoadingUserAdsStats, makeRequest: getUserAdsStats} = useApi<UserAdsStats>({
		url: GET_USER_PAGE_ADS_STATS_URL(userId)
	});
    useEffect(() => {
        getUserAdsStats();
    }, [userId])

    if (isLoadingUserAdsStats) return <LoadingSpinner></LoadingSpinner>
    return (
        <Flex shadow={'md'} padding={'20px'} direction={'column'} gap={4} bg={'#fff'} borderRadius={'20px'}>
            <Box>
                <Text fontWeight={600} fontSize={'lg'}>Filtruj ogłoszenia</Text>
                <Text fontSize={'sm'}>Znaleźliśmy {userAdsStats?.totalCount} ogłoszeń</Text>
            </Box>
            <Box fontSize={'sm'}>
                <Text mb={2}>Kategorie</Text>
                <CategoryBadge ahref={`/uzytkownik/${userId}`} disableLeftIcon={true} isActive={(mainCatParam === undefined && subCatParam === undefined && subSubCatParam === undefined) ? true : false} categoryName={'wszystkie ogłoszenia'} categoryCount={userAdsStats?.totalCount as number}></CategoryBadge>
                {
                    userAdsStats && userAdsStats?.stats.map((category, i) => {
                        return (
                            <CategoryFilterItem userId={userId} mainCatParam={mainCatParam} subCatParam={subCatParam} subSubCatParam={subSubCatParam} key={i} mainCategoryObject={category} ></CategoryFilterItem>
                        )
                    })
                }
            </Box>
        </Flex>
    )
}