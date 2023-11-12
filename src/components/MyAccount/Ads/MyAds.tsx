import { useEffect, useState } from "react"
import { useOutletContext } from "react-router"
import { VStack } from "@chakra-ui/react";
import ListItemPrivate from "../../AdPreview/ListItemPrivate";
import Pagination from "../../AdPage/Pagination";
import LoadingSpinner from "../../Layout/LoadingSpinner";
import ContainerBox from '../../Layout/ContainerBox';
import Error from "../../Layout/Error";
import { useLocation } from 'react-router-dom'
import useApi from "../../../hooks/useApi";
import { AdvertQueryType } from "../../../types/ApiDataTypes";
import { GET_USER_ADS_URL } from "../../../hooks/ApiEndpoints";

function MyAds({...props}) {
    const location = useLocation();
    const { data: MyAds, error, isLoading, makeRequest: getMyAds } = useApi<AdvertQueryType[]>({
        url: GET_USER_ADS_URL(location.search),
        // url: 'api/v1/ads/user' + location.search,
    });
    
    useEffect(()=>{
        getMyAds();
    }, [location.search])

    const {setActiveTab}: {setActiveTab: React.Dispatch<React.SetStateAction<number>>} = useOutletContext();
    useEffect(() => {
        setActiveTab(props.activeTab)
    }, [props.activeTab])


    if (isLoading) return <ContainerBox><LoadingSpinner></LoadingSpinner></ContainerBox>
    else if (!isLoading && error) return <ContainerBox><Error variant="error" error={error}></Error></ContainerBox>
    return (
        <ContainerBox>
            <VStack>
                {MyAds?.map((ad) => {
                    return <ListItemPrivate key={ad._id} adData={ad}></ListItemPrivate>
                })}
            </VStack>
            <Pagination isLoading={isLoading} pathParams={location.pathname} queryParams={location.search}></Pagination>
        </ContainerBox>
    )
}

export default MyAds