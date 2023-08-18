
import ContainerBox from './../../components/ContainerBox';
import { VStack, Text, Box, HStack, Avatar, Button, Image, Flex, Tabs, TabList, TabPanels, TabPanel, Tab, TabIndicator } from '@chakra-ui/react';
import useApi from './../../hooks/useApi';
import { Link, useParams } from 'react-router-dom';
import { getUsersInfo } from './../../utils/apiServices';
import { useOutletContext, Outlet } from "react-router"
import { useState, useEffect } from 'react';
import { formatDate } from '../../utils/utils';

export default function User(props) {
    const [activeTab, setActiveTab] = useState(0);
    const { id } = useParams()
    const { data, isLoading, error, triggerApiCall } = useApi();
    useEffect(() => {
        triggerApiCall(getUsersInfo(id));
    }, [])

    return (
        <>
            {data?.advertiser?.isCompanyAcc && <Box>
                <Image width={'100%'} src={data?.banner}></Image>
            </Box>}
            <ContainerBox mt={!data?.advertiser?.isCompanyAcc ? '20px' : '0px'} width={'100%'} style={{ padding: '0', backgroundColor: '#fff' }}>
                <HStack width={'100%'} bg={'#fff'} justifyContent={'space-between'}>
                    <HStack>
                        <Box position={'relative'}><Avatar size={'xl'}></Avatar></Box>
                        <VStack alignItems={'flex-start'}>
                            <Text>{data?.advertiser?.name}</Text>
                            <Text fontSize={'xs'}>Ostatnio online: 25 lip 2023, 15:17 Na Buy Sell Now od: {formatDate(data?.createdAt, 'long')}</Text>
                        </VStack>
                    </HStack>
                    <Button>Obserwuj</Button>
                </HStack>
                <Tabs marginTop={4} index={activeTab} variant="unstyled">
                    <TabList>
                        <Tab>
                            <Link to={''}>Ogłoszenia</Link>
                        </Tab>
                        {data?.advertiser?.isCompanyAcc &&
                            <>
                                <Tab>
                                    <Link to={'informacje'}>Informacje</Link>
                                </Tab>
                                <Tab>
                                    <Link to={'kontakt'}>Kontakt</Link>
                                </Tab>
                            </>
                        }
                        {/*  todo block accesing these pages on private account type  */}
                    </TabList>
                    <TabIndicator mt="-1.5px" height="2px" bg="blue.500" borderRadius="1px" />
                </Tabs>
            </ContainerBox >
            <Outlet context={[setActiveTab, data]}></Outlet>
        </>

    )
}