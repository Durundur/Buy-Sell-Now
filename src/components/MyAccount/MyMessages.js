
import { Container, Box, HStack, VStack, Flex } from "@chakra-ui/react"
import ConversationPreview from './ConversationPreview'
import { useEffect } from "react";
import { useState } from "react";
import { Outlet } from "react-router";
import { getUserConversations } from "../../utils/apiServices";
import useApi from "../../hooks/useApi";
function MyMessages() {
    const { response, isLoading, triggerApiCall } = useApi()


    useEffect(() => {
        triggerApiCall(getUserConversations());
    }, [])


    return (
        <Box py={10} color={'blue.900'} bg={'gray.50'}>
            <Container maxW={{ md: 'container.md', lg: 'container.lg', xl: 'container.xl' }} >
                <HStack height={'600px'} alignItems={'stretch'} >
                    <Flex sx={{
                        '&::-webkit-scrollbar': {
                            width: '4px',
                            borderRadius: '8px',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: `blue.500`,
                            borderRadius: '8px',
                        },
                    }} flexBasis={'35%'} direction={'column'} justifyContent={'flex-start'} overflowY={'scroll'} borderRadius={'20px'} bg={'#fff'} alignItems={'stretch'} boxShadow={'md'}>
                        {
                            response?.data.map((conversation) => {
                                return <ConversationPreview key={conversation._id} conversation={conversation}></ConversationPreview>
                            })
                        }
                    </Flex>
                    <Flex flexBasis={'65%'} borderRadius={'20px'} bg={'#fff'} boxShadow={'md'}>
                        <Outlet></Outlet>
                    </Flex>
                </HStack>
            </Container>
        </Box>
    )
}

export default MyMessages