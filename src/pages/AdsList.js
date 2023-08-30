import { VStack } from "@chakra-ui/react"
import Pagination from '../components/Pagination';
import LoadingSpinner from '../components/LoadingSpinner';
import Error from '../components/Error'
import ListItemPublic from '../components/AdPreview/ListItemPublic';
import ContainerBox from '../components/ContainerBox';
import { getAds } from '../utils/apiServices';
import useApi from '../hooks/useApi';
import { useLocation } from 'react-router-dom';
import { useEffect } from "react";
import { EmptyAdsResponse } from '../components/EmptyAdsResponse'

export default function AdsList() {
    const { data, error, isLoading, triggerApiCall } = useApi();
    const location = useLocation();

    useEffect(() => {
        triggerApiCall(getAds((location.pathname + location.search).replace('ogloszenia', 'search')))
    }, [location, triggerApiCall])

    if (isLoading) return <ContainerBox><LoadingSpinner></LoadingSpinner></ContainerBox>
    else if (!isLoading && error) return <ContainerBox><Error variant="error" error={error}></Error></ContainerBox>
    return (
        <ContainerBox>
            <VStack spacing={{ base: 2, md: 4 }}>
                {
                    data?.length === 0 ? <EmptyAdsResponse /> :
                        data?.map((ad) => {
                            return <ListItemPublic key={ad._id} adData={ad}></ListItemPublic>
                        })
                }
            </VStack>
            {
                data?.length === 0 ? null : <Pagination isLoading={isLoading} pathParams={location.pathname} queryParams={location.search}></Pagination>
            }
        </ContainerBox >
    )
}













