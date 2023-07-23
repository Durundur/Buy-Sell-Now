import { createRef, useEffect, useState } from "react"
import { useOutletContext } from "react-router"
import { useSearchParams } from "react-router-dom";
import { Box, Container, VStack } from "@chakra-ui/react";
import ListItemPrivate from "../../AdPreview/ListItemPrivate";
import useFetch from "../../../hooks/useFetch";
import Pagination from "../../Pagination";
import usePagination from "../../../hooks/usePagination";
import LoadingSpinner from "../../LoadingSpinner";
import { redirect } from "react-router-dom";
import { getUserAds } from "../../../utils/apiServices";
import ContainerBox from '../../ContainerBox';
import Error from "../../Error";



function MyAds({ props }) {
    const { data, error, pageParam, isLoading } = usePagination(getUserAds)

    if (isLoading) return <ContainerBox><LoadingSpinner></LoadingSpinner></ContainerBox>
    else if (!isLoading && error) return <ContainerBox><Error variant="error" error={error}></Error></ContainerBox>
    return (
        <ContainerBox>
            {isLoading ? <LoadingSpinner></LoadingSpinner> : <VStack refspacing={{ base: 2, md: 4 }}>
                {data && data.map((ad) => {
                    return <ListItemPrivate type={'userAd'} key={ad._id} adData={ad}></ListItemPrivate>
                })}
            </VStack>}
            <Pagination isLoading={isLoading} currentPage={pageParam}></Pagination>
        </ContainerBox>
    )
}

export default MyAds