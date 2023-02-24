import React, { useState } from "react";
import { Container, Flex, ButtonGroup, Button, Avatar, Divider } from '@chakra-ui/react'
import { Link } from "react-router-dom";
import { IoAdd, IoPersonAddOutline } from "react-icons/io5";
import Logo from '../Logo'
import { Outlet } from "react-router-dom";
function NavBar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    return (<>
        <Container maxW={{ md: 'container.md', lg: 'container.lg', xl: 'container.xl' }}>
            <Flex justifyContent={'space-between'} alignItems={'center'} py={'2'}>
                <Logo fontSize={{ base: 'md', md: 'lg' }}></Logo>
                {isLoggedIn ?
                    <Flex alignItems={'center'} gap={'2'}>
                        <Button size={{ base: 'sm', md: 'md' }} leftIcon={<IoAdd />} colorScheme={'blue'}>Dodaj ogłoszenie</Button>
                        <Avatar size={{ base: 'sm' }}></Avatar>
                    </Flex>
                    :
                    <ButtonGroup size={{ base: 'sm', md: 'md' }}>
                        <Link _hover={{
                            textDecoration: 'none'
                        }} to={'/login'}>
                            <Button >Zaloguj się</Button>
                        </Link>
                        <Link _hover={{
                            textDecoration: 'none'
                        }} to={'/register'}>
                            <Button leftIcon={<IoPersonAddOutline />} variant={'solid'} colorScheme={'blue'}>Zarejestruj się</Button>
                        </Link>
                    </ButtonGroup>
                }

            </Flex>
        </Container>
        <Divider></Divider>
    </>
    )
}

export default NavBar