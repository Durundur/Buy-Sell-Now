import { Box, Flex, VStack, Text, InputGroup, Input, InputLeftElement, Select, FormLabel, FormControl, Grid, GridItem } from '@chakra-ui/react';
import { CategoryBadge } from './CategoryBadge';
import { getUsersAdsStats } from '../../utils/apiServices';
import useApi from '../../hooks/useApi';
import LoadingSpinner from './../LoadingSpinner'
import { useEffect } from 'react';
import { CategoryFilterItem } from './CategoryFilterItem'

export function UserAdsFilter({ userId, mainCatParam, subCatParam, subSubCatParam }) {
    const { triggerApiCall, isLoading, data } = useApi();
    useEffect(() => {
        triggerApiCall(getUsersAdsStats(userId))
    }, [])

    if (isLoading) return <LoadingSpinner></LoadingSpinner>
    return (
        <Flex shadow={'md'} padding={'20px'} direction={'column'} gap={4} bg={'#fff'} borderRadius={'20px'}>
            <Box>
                <Text fontWeight={600} fontSize={'lg'}>Filtruj ogłoszenia</Text>
                <Text fontSize={'sm'}>Znaleźliśmy {data?.totalCount} ogłoszeń</Text>
            </Box>
            <Box fontSize={'sm'}>
                <Text mb={2}>Kategorie</Text>
                <CategoryBadge ahref={`/uzytkownik/${userId}`} disableLeftIcon={true} state={(mainCatParam === undefined && subCatParam === undefined && subSubCatParam === undefined) ? 'active' : null} categoryName={'wszystkie ogłoszenia'} badgeText={data?.totalCount}></CategoryBadge>
                {
                    data?.stats.map((category, i) => {
                        return (
                            <CategoryFilterItem userId={userId} mainCatParam={mainCatParam} subCatParam={subCatParam} subSubCatParam={subSubCatParam} key={i} categoriesObj={category} ></CategoryFilterItem>
                        )
                    })
                }
            </Box>
        </Flex>
    )
}