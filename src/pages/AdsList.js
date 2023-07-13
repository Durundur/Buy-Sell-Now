import React, { useState, useEffect } from 'react'
import { useSearchParams } from "react-router-dom";
import { Box, Container, VStack } from "@chakra-ui/react"
import AdPreviewListItem from '../components/AdPreview/AdPreviewListItem'
import Pagination from '../components/Pagination';
import LoadingSpinner from '../components/LoadingSpinner';
import { useApiContext } from '../contexts';

function AdsList (props){
    const [searchParams, setSearchParams] = useSearchParams();
    const [data, setData] = useState([]);
    const [error, setError] = useState();
    const { getAdsData, isLoading} = useApiContext()
    const pageParam = Number(searchParams.get('page')) || 1;
     

    async function fetchData(page){
        const response = await getAdsData(page);
        if(response.status === 200){
            setData(response.data);
            return;
        }
        setError(response)
    }  

    useEffect(() => {
        let ignore = false;
        if (!ignore) {
            fetchData(pageParam);
        }
        return () => {
            ignore = true;
        };
    }, [pageParam])



    return (
        <Box pb={10} color={'blue.900'} bg={'gray.50'}>
            <Container maxW={{ md: 'container.md', lg: 'container.lg', xl: 'container.xl' }}>
                {isLoading && <LoadingSpinner/>}
                {/* {error && <Error/>} */}
                {!isLoading && !error && <VStack spacing={{base: 2, md: 4}}>
                    {data && data.map((ad)=>{
                        return <AdPreviewListItem key={ad._id} adData={ad}></AdPreviewListItem>
                    })}
                </VStack>}
                <Pagination isLoading={isLoading} currentPage={pageParam}></Pagination>
            </Container>   
        </Box> 
    )
}

export default AdsList

