import React, { useState, useEffect } from 'react'
import { Link, useSearchParams } from "react-router-dom";
import { Box, Container, VStack } from "@chakra-ui/react"
import AdPreviewListItem from '../components/AdPreview/AdPreviewListItem'
import usePagination from '../hooks/usePagination';
import useFetch from '../hooks/useFetch'
import Pagination from '../components/Pagination';
import LoadingSpinner from '../components/LoadingSpinner';
import Error from '../components/Error';
import { useApiContext } from '../contexts';
function AdsList (props){
    const {url, page} = usePagination(process.env.REACT_APP_API_LOCAL + 'api/v1/ads/?p=')
    const [data, setData] = useState([]);
    const [error, setError] = useState();
    const { getAdsData, isLoading} = useApiContext()

    useEffect(() => {
        async function fetchData(){
            const response = await getAdsData();
            if(response.status === 200){
                setData(response.data);
                return;
            }
            setError(response)
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
        <Box pb={10} color={'blue.900'} bg={'gray.50'}>
            <Container maxW={{ md: 'container.md', lg: 'container.lg', xl: 'container.xl' }}>
                {isLoading && <LoadingSpinner/>}
                {error && <Error/>}
                {!isLoading && !error && <VStack spacing={{base: 2, md: 4}}>
                    {data && data.map((ad)=>{
                        return <AdPreviewListItem key={ad._id} adData={ad}></AdPreviewListItem>
                    })}
                </VStack>}
                <Pagination currentPage={page} startPage={1} endPage={4}></Pagination>
            </Container>   
        </Box> 
    )
}

export default AdsList

