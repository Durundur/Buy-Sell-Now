import React, { useState, useEffect } from 'react'
import { Link, useSearchParams } from "react-router-dom";
import { Box, Container, VStack } from "@chakra-ui/react"
import AdPreviewListItem from '../components/AdPreview/AdPreviewListItem'
import usePagination from '../hooks/usePagination';
import useFetch from '../hooks/useFetch'
import Pagination from '../components/Pagination';
import LoadingSpinner from '../components/Spinner';
function AdsList (props){
    const {url, page} = usePagination("https://buy-sell-now.fly.dev/api/v1/ads/?p=")
    const {data, isLoading, error} = useFetch(url)  
    
    return (
        <Box pb={10} color={'blue.900'} bg={'gray.50'}>
            <Container maxW={{ md: 'container.md', lg: 'container.lg', xl: 'container.xl' }} >
                {isLoading ? <LoadingSpinner/> : <VStack spacing={{base: 2, md: 4}}>
                    {data && data.map((ad)=>{
                        return <AdPreviewListItem key={ad._id} adData={ad}></AdPreviewListItem>
                    })}
                </VStack> }
                    
                <Pagination currentPage={page} startPage={1} endPage={4}></Pagination>
            </Container>   
        </Box>
        
    )
}

export default AdsList

