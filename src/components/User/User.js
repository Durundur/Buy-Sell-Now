
import ContainerBox from './../../components/ContainerBox';
import { VStack, Text, Box, HStack, Avatar, Button, Image, Flex, Tabs, TabList, TabPanels, TabPanel, Tab, TabIndicator } from '@chakra-ui/react';
import useApi from './../../hooks/useApi';
import { Link } from 'react-router-dom';
import { getUsersAds } from './../../utils/apiServices';
import { useOutletContext, Outlet } from "react-router"
import { useState, useEffect } from 'react';
import UserAds from './UserAds'
import UserContact from './UserContact'
// const { data, isLoading, error, triggerApiCall } = useApi();
// useEffect(() => {
//     triggerApiCall(getUsersAds());
// }, [])

const img = 'https://img-resizer.prd.01.eu-west-1.eu.olx.org/img-eu-olxpl-production/764455141_1_1366x210.jpg'
export default function User(props) {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <>
            <Box>
                <Image width={'100%'} src={img}></Image>
            </Box>
            <ContainerBox width={'100%'} style={{ padding: '0', backgroundColor: '#fff' }}>
                <HStack width={'100%'} bg={'#fff'} justifyContent={'space-between'}>
                    <HStack>
                        <Box position={'relative'}><Avatar size={'xl'}></Avatar></Box>
                        <VStack alignItems={'flex-start'}>
                            <Text>Deal Master Marlena Centkowska</Text>
                            <Text fontSize={'xs'}>Ostatnio online: 25 lip 2023, 15:17 Na OLX od: 06 paź 2016</Text>
                        </VStack>
                    </HStack>
                    <Button>Obserwuj</Button>
                </HStack>
                <Tabs marginTop={4} index={activeTab} variant="unstyled">
                    <TabList>
                        <Tab>
                            <Link to={''}>Ogłoszenia</Link>
                        </Tab>
                        <Tab>
                            <Link to={'informacje'}>Informacje</Link>
                        </Tab>
                        <Tab>
                            <Link to={'kontakt'}>Kontakt</Link>
                        </Tab>
                    </TabList>
                    <TabIndicator mt="-1.5px" height="2px" bg="blue.500" borderRadius="1px" />
                </Tabs>
            </ContainerBox >
            <Outlet context={[setActiveTab]}></Outlet>
        </>

    )
}