import { Container, HStack, Text, Box, Tabs, Tab, TabList, TabPanel, TabPanels, TabIndicator } from "@chakra-ui/react"
import { Outlet } from "react-router";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

function MyAccount(props) {
    const [activeTab, setActiveTab] = useState(0);

    return (<>
        <Container maxW={{ md: 'container.md', lg: 'container.lg', xl: 'container.xl' }}>
            <Box py={10}>
                <Text fontWeight={'bold'} color={'blue.900'} fontSize={'3xl'} textAlign={'left'}>Twoje konto</Text>
            </Box>
            <Tabs index={activeTab} variant="unstyled">
                <TabList textAlign={'center'} display={'flex'} justifyContent={'space-between'}>
                    <Link to={'ogloszenia'}><Tab>Ogłoszenia</Tab></Link>
                    <Link to={'wiadomosci'}><Tab>Wiadomosci</Tab></Link>
                    <Link to={'oceny'}><Tab>Otrzymane oceny</Tab></Link>
                    <Link to={'przesylki'}><Tab>Przesyłki</Tab></Link>
                    <Link to={'ustawienia'}><Tab>Ustawienia</Tab></Link>
                    <Link to={'obserwowane'}><Tab>Obserwowane</Tab></Link>
                </TabList>
                <TabIndicator mt="-1.5px" height="2px" bg="blue.500" borderRadius="1px" />
            </Tabs>
        </Container>
        <Box bg={'gray.50'}>
            <Container maxW={{ md: 'container.md', lg: 'container.lg', xl: 'container.xl' }}>
                <Outlet context={[setActiveTab]}></Outlet>
            </Container>
        </Box>
    </>
    )
}

export default MyAccount