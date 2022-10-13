import { Container, Box, SimpleGrid } from "@chakra-ui/react";
import { Outlet } from "react-router";
import AdPreviewGridItem from "../AdPreview/AdPreviewGridItem";
import Header from "../Header";
function PromotedAds(){
    let data = [{
        tittle: 'BRAMA garażowa BRAMY do garażu Producent Bram Dostawa - CAŁA',
        location: 'Warszawa Wawer',
        time: '09/10/2022, 12:23:28',
        image: 'https://ireland.apollo.olxcdn.com/v1/files/s6le7zfqqnp61-PL/image;s=644x461',
        price: 1700,
        currency: 'zł'
    },{
        tittle: 'VW Passat 2.0 tdi dsg idealny stan',
        location: 'Warszawa Rembertów',
        time: '09/10/2022, 12:23:28',
        image: 'https://ireland.apollo.olxcdn.com/v1/files/edley38yfjnw1-PL/image;s=644x461',
        price: 90000,
        currency: 'zł'
    },{
        tittle: 'Laptop HP EliteBook 850 G2 15" i5-5300U 256SSD 8GB FHD',
        location: 'Warszawa Rembertów',
        time: '09/10/2022, 12:23:28',
        image: 'https://ireland.apollo.olxcdn.com/v1/files/sforkei3v2it1-PL/image;s=644x461',
        price: 2000,
        currency: 'zł'
    },{
        tittle: 'Szoper (Dostawca/kurier/kierowca) - EVERLI - Praca od zaraz',
        location: 'Warszawa, Mazowieckie',
        time: '09/10/2022, 12:23:28',
        image: 'https://ireland.apollo.olxcdn.com/v1/files/qjqig26qbsed1-PL/image;s=644x461',
        price: 6000,
        currency: 'zł'
    },{
        tittle: 'VW Passat 2.0 tdi dsg idealny stan',
        location: 'Warszawa Rembertów',
        time: '09/10/2022, 12:23:28',
        image: 'https://ireland.apollo.olxcdn.com/v1/files/edley38yfjnw1-PL/image;s=644x461',
        price: 90000,
        currency: 'zł'
    },{
        tittle: 'Szoper (Dostawca/kurier/kierowca) - EVERLI - Praca od zaraz',
        location: 'Warszawa, Mazowieckie',
        time: '09/10/2022, 12:23:28',
        image: 'https://ireland.apollo.olxcdn.com/v1/files/qjqig26qbsed1-PL/image;s=644x461',
        price: 6000,
        currency: 'zł'
    },{
        tittle: 'BRAMA garażowa BRAMY do garażu Producent Bram Dostawa - CAŁA',
        location: 'Warszawa Wawer',
        time: '09/10/2022, 12:23:28',
        image: 'https://ireland.apollo.olxcdn.com/v1/files/s6le7zfqqnp61-PL/image;s=644x461',
        price: 1700,
        currency: 'zł'
    }]
    return(
        <Box pb={10} color={'blue.900'} bg={'gray.50'}>
             <Container  maxW={{md:'container.md', lg:'container.lg', xl:'container.xl'}} >
                <Header text={'Ogłoszenia promowane'}></Header>
                <SimpleGrid spacing={{base: 2, md: 4}} columns={{base: 2, md: 3, lg: 4}}>
                    {data.map(item=>{
                        return <AdPreviewGridItem data={item}></AdPreviewGridItem>
                    })}
                </SimpleGrid>
                <Outlet></Outlet>
             </Container>
        </Box>
       
    )
}
export default PromotedAds