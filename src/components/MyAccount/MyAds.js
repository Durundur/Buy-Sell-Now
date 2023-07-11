import { createRef, useEffect, useState } from "react"
import { useOutletContext } from "react-router"
import { useSearchParams } from "react-router-dom";
import { Box, Container, VStack } from "@chakra-ui/react";
import AdPreviewListItem from "../AdPreview/AdPreviewListItem";
import useFetch from "../../hooks/useFetch";
import Pagination from "../Pagination";
import usePagination from "../../hooks/usePagination";
import LoadingSpinner from "../LoadingSpinner";
import {useApiContext} from "../../contexts"
import { useAuthContext } from "../../contexts";
import { redirect } from "react-router-dom";



function MyAds(props) {
    // const {url, page} = usePagination("https://buy-sell-now.fly.dev/api/v1/ads/?p=")
    // const { data, isLoading, error } = useFetch(url)
    const {userInfo} = useAuthContext();
    const {isLoading, getUserAdsData } = useApiContext();
    const [data, setData] = useState();
    const [error, setError] = useState();
    

    useEffect(() => {
        async function fetchData() {
            const response = await getUserAdsData(userInfo);
            if(response.status === 200){
                setData(response.data);
                return;
            }
            setError(response);
            
        }
        let ignore = false;
        if (!ignore) {
            fetchData();
        }
        return () => {
            ignore = true;
        };
    }, [])

    return (
        <Box py={10} color={'blue.900'} bg={'gray.50'}>
            <Container maxW={{ md: 'container.md', lg: 'container.lg', xl: 'container.xl' }} >
                {isLoading ? <LoadingSpinner></LoadingSpinner> : <VStack  refspacing={{ base: 2, md: 4 }}>
                    {data && data.map((ad) => {
                        return <AdPreviewListItem type={'userAd'} key={ad._id} adData={ad}></AdPreviewListItem>
                    })}
                </VStack> }
                {/* <Pagination currentPage={page} startPage={1} endPage={4}></Pagination> */}
            </Container>
        </Box>
    )
}

export default MyAds