import { Box, Flex, VStack, Text, InputGroup, Input, InputLeftElement, Select, FormLabel, FormControl, Grid, GridItem } from '@chakra-ui/react';
import Badge from './../Badge/Badge';
import { CategoryBadge } from './CategoryBadge';
import { getUsersAdsStats } from '../../utils/apiServices';
import useApi from '../../hooks/useApi';
import LoadingSpinner from './../LoadingSpinner'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { CatBadge } from './CatBadge'

export function UserAdsFilter({ userId }) {
    const { triggerApiCall, isLoading, data } = useApi();
    useEffect(() => {
        triggerApiCall(getUsersAdsStats(userId))
    }, [])

    if (isLoading) return <LoadingSpinner></LoadingSpinner>
    return (
        <Flex shadow={'md'} padding={'20px'} direction={'column'} gap={4} bg={'#fff'} borderRadius={'20px'}>
            <Box>
                <Text fontWeight={600} fontSize={'lg'}>Filtruj ogłoszenia</Text>
                <Text fontSize={'sm'}>Znaleźliśmy 200 ogłoszeń</Text>
            </Box>
            <Box fontSize={'sm'}>
                <Text mb={2} >Kategorie</Text>
                <CategoryBadge state={'active'} categoryName={'Wszystkie ogłoszenia'} badgeText={10}></CategoryBadge>
                {
                    data?.stats.map((category, i) => {
                        return (
                            <CatBadge key={i} categoriesObj={category} ></CatBadge>
                        )
                    })
                }
            </Box>

        </Flex>
    )
}