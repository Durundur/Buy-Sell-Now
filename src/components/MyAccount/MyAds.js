import { createRef, useEffect, useState } from "react"
import { useOutletContext } from "react-router"
import { useSearchParams } from "react-router-dom";
import { Box, Container, VStack } from "@chakra-ui/react";
import AdPreviewListItem from "../AdPreview/AdPreviewListItem";
import useFetch from "../../hooks/useFetch";
import Pagination from "../Pagination";
import usePagination from "../../hooks/usePagination";
import LoadingSpinner from "../Spinner";

function MyAds(props) {
    const [setActiveTab] = useOutletContext();
    useEffect(() => {
        setActiveTab(props.activeTab)
    }, [props.activeTab])

    const {url, page} = usePagination("https://buy-sell-now.fly.dev/api/v1/ads/?p=")
    const { data, isLoading, error } = useFetch(url)


    return (
        <Box py={10} color={'blue.900'} bg={'gray.50'}>
            <Container maxW={{ md: 'container.md', lg: 'container.lg', xl: 'container.xl' }} >
                {isLoading ? <LoadingSpinner/> : <VStack  refspacing={{ base: 2, md: 4 }}>
                    {data && data.map((ad) => {
                        return <AdPreviewListItem type={'userAd'} key={ad._id} adData={ad}></AdPreviewListItem>
                    })}
                </VStack> }
                <Pagination currentPage={page} startPage={1} endPage={4}></Pagination>
            </Container>
        </Box>
    )
}

export default MyAds