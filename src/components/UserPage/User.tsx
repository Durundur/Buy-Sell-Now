
import ContainerBox from '../Layout/ContainerBox';
import { VStack, Text, Box, HStack, Avatar, Button, Image, Tabs, TabList, Tab, TabIndicator } from '@chakra-ui/react';
import useApi from '../../hooks/useApi';
import { Link, useParams } from 'react-router-dom';
import { Outlet } from "react-router"
import { useState, useEffect } from 'react';
import { formatDate } from '../../utils/utils';
import { GET_USER_PAGE_INFO_URL } from '../../hooks/ApiEndpoints';
import { UserDataType } from '../../types/UserDataType';

export default function User() {
    const [activeTab, setActiveTab] = useState(0);
    const { id } = useParams()
    const { data: userPageData, isLoading: isLoadingUserPage, makeRequest: getUserPageData } = useApi<UserDataType>({
        url: GET_USER_PAGE_INFO_URL(id as string)
    });

    useEffect(() => {
        getUserPageData();
    }, [])
    
    return (
        <>
            {userPageData?.advertiser?.isCompanyAcc && <Box>
                <Image width={'100%'} src={userPageData?.banner}></Image>
            </Box>}
            <ContainerBox width={'100%'} style={{marginTop: '20px', padding: '0', backgroundColor: '#fff' }}>
                <HStack width={'100%'} bg={'#fff'} justifyContent={'space-between'}>
                    <HStack>
                        <Box position={'relative'}>
                            <Avatar src={userPageData?.avatar} size={'xl'}></Avatar>
                        </Box>
                        <VStack alignItems={'flex-start'}>
                            <Text>{userPageData?.advertiser?.name}</Text>
                            <Text fontSize={'xs'}>Ostatnio online: 25 lip 2023, 15:17 Na Buy Sell Now od: {formatDate(userPageData?.createdAt as string, 'long')}</Text>
                        </VStack>
                    </HStack>
                    <Button>Obserwuj</Button>
                </HStack>
                <Tabs marginTop={4} index={activeTab} variant="unstyled">
                    <TabList>
                        <Tab>
                            <Link to={''}>Ogłoszenia</Link>
                        </Tab>
                        {userPageData?.advertiser?.isCompanyAcc &&
                            <>
                                <Tab>
                                    <Link to={'informacje'}>Informacje</Link>
                                </Tab>
                                <Tab>
                                    <Link to={'kontakt'}>Kontakt</Link>
                                </Tab>
                            </>
                        }
                    </TabList>
                    <TabIndicator mt="-1.5px" height="2px" bg="blue.500" borderRadius="1px" />
                </Tabs>
            </ContainerBox >
            <Outlet context={{setActiveTab, userPageData}}></Outlet>
        </>
    )
}