import React from 'react'
import { Link } from "react-router-dom"
import { Box, Image, Text, AspectRatio, Container, VStack } from "@chakra-ui/react"
import AdPreviewListItem from '../components/AdPreview/AdPreviewListItem'
import useFetch from '../hooks/useFetch'
function AdsList (props){
    const {data, loading, error} = useFetch("http://localhost:7000/api/v1/ads")
    return (
        <Box pb={10} color={'blue.900'} bg={'gray.50'}>
            <Container maxW={{ md: 'container.md', lg: 'container.lg', xl: 'container.xl' }} >
                <VStack spacing={{base: 2, md: 4}}>
                    {data && data.map((ad)=>{
                        return <AdPreviewListItem key={ad._id} adData={ad}></AdPreviewListItem>
                    })}
                </VStack>
            </Container>    
        </Box>
        
    )
}

export default AdsList





let data = [{
    tittle: 'BRAMA garażowa BRAMY do garażu Producent Bram Dostawa - CAŁA',
    location: 'Warszawa Wawer',
    time: '09/10/2022, 12:23:28',
    image: 'https://ireland.apollo.olxcdn.com/v1/files/s6le7zfqqnp61-PL/image;s=644x461',
    price: 1700,
    currency: 'zł',
    _id: 1
},{
    tittle: 'VW Passat 2.0 tdi dsg idealny stan',
    location: 'Warszawa Rembertów',
    time: '09/10/2022, 12:23:28',
    image: 'https://ireland.apollo.olxcdn.com/v1/files/edley38yfjnw1-PL/image;s=644x461',
    price: 90000,
    currency: 'zł',
    _id: 2
},{
    tittle: 'Laptop HP EliteBook 850 G2 15" i5-5300U 256SSD 8GB FHD',
    location: 'Warszawa Rembertów',
    time: '09/10/2022, 12:23:28',
    image: 'https://ireland.apollo.olxcdn.com/v1/files/sforkei3v2it1-PL/image;s=644x461',
    price: 2000,
    currency: 'zł',
    _id: 3
},{
    tittle: 'Szoper (Dostawca/kurier/kierowca) - EVERLI - Praca od zaraz',
    location: 'Warszawa, Mazowieckie',
    time: '09/10/2022, 12:23:28',
    image: 'https://ireland.apollo.olxcdn.com/v1/files/qjqig26qbsed1-PL/image;s=644x461',
    price: 6000,
    currency: 'zł',
    _id: 4
},{
    tittle: 'VW Passat 2.0 tdi dsg idealny stan',
    location: 'Warszawa Rembertów',
    time: '09/10/2022, 12:23:28',
    image: 'https://ireland.apollo.olxcdn.com/v1/files/edley38yfjnw1-PL/image;s=644x461',
    price: 90000,
    currency: 'zł',
    _id: 5
},{
    tittle: 'Szoper (Dostawca/kurier/kierowca) - EVERLI - Praca od zaraz',
    location: 'Warszawa, Mazowieckie',
    time: '09/10/2022, 12:23:28',
    image: 'https://ireland.apollo.olxcdn.com/v1/files/qjqig26qbsed1-PL/image;s=644x461',
    price: 6000,
    currency: 'zł',
    _id: 5
},{
    tittle: 'BRAMA garażowa BRAMY do garażu Producent Bram Dostawa - CAŁA',
    location: 'Warszawa Wawer',
    time: '09/10/2022, 12:23:28',
    image: 'https://ireland.apollo.olxcdn.com/v1/files/s6le7zfqqnp61-PL/image;s=644x461',
    price: 1700,
    currency: 'zł',
    _id: 6
}]