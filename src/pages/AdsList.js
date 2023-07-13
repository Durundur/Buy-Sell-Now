import React, { useState, useEffect } from 'react'
import { useSearchParams } from "react-router-dom";
import { Box, Container, VStack } from "@chakra-ui/react"
import AdPreviewListItem from '../components/AdPreview/AdPreviewListItem'
import Pagination from '../components/Pagination';
import LoadingSpinner from '../components/LoadingSpinner';
import { useApiContext } from '../contexts';
import Error from '../components/Error'
import usePagination from '../hooks/usePagination';
function AdsList (){
    const { getAdsData, isLoading} = useApiContext()
     const {data, error, pageParam} = usePagination(getAdsData)

    return (
        <Box pb={10} color={'blue.900'} bg={'gray.50'}>
            <Container maxW={{ md: 'container.md', lg: 'container.lg', xl: 'container.xl' }}>
                {isLoading && <LoadingSpinner/>}
                {error && <Error error={error}/>}
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

