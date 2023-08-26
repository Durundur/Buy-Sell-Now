import { useEffect, useState } from "react"
import { useOutletContext } from "react-router"
import { VStack } from "@chakra-ui/react";
import ListItemPrivate from "../../AdPreview/ListItemPrivate";
import Pagination from "../../Pagination";
import LoadingSpinner from "../../LoadingSpinner";
import { getUserAds } from "../../../utils/apiServices";
import ContainerBox from '../../ContainerBox';
import Error from "../../Error";
import { useLocation } from 'react-router-dom'
import useApi from "../../../hooks/useApi";

function MyAds({ ...props }) {
    const { data, error, isLoading, triggerApiCall, setData } = useApi();
    const location = useLocation()

    useEffect(() => {
        triggerApiCall(getUserAds(location.search))
    }, [location])

    const [setActiveTab] = useOutletContext();
    useEffect(() => {
        setActiveTab(props.activeTab)
    }, [props.activeTab])


    if (isLoading) return <ContainerBox><LoadingSpinner></LoadingSpinner></ContainerBox>
    else if (!isLoading && error) return <ContainerBox><Error variant="error" error={error}></Error></ContainerBox>
    return (
        <ContainerBox>
            {isLoading ? <LoadingSpinner></LoadingSpinner> : <VStack refspacing={{ base: 2, md: 4 }}>
                {data && data.map((ad) => {
                    return <ListItemPrivate type={'userAd'} key={ad._id} adData={ad}></ListItemPrivate>
                })}
            </VStack>}
            <Pagination isLoading={isLoading} pathParams={location.pathname} queryParams={location.search}></Pagination>
        </ContainerBox>
    )
}

export default MyAds