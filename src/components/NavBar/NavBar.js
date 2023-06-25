import React, { useState } from "react";
import { Container, Flex, ButtonGroup, Button, Avatar, Divider, Box, Menu, MenuButton, MenuList, MenuItem, MenuGroup, MenuDivider } from '@chakra-ui/react'
import { Link, Outlet } from "react-router-dom";
import { IoAdd, IoPersonAddOutline } from "react-icons/io5";
import Logo from '../Logo'

function NavBar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    return (<><Box boxShadow={'sm'}>
        <Container maxW={{ md: 'container.md', lg: 'container.lg', xl: 'container.xl' }}>
            <Flex justifyContent={'space-between'} alignItems={'center'} py={'2'}>
                <Logo fontSize={{ base: 'md', md: 'lg' }}></Logo>
                {isLoggedIn ?
                    <Flex alignItems={'center'} gap={'6 '}>
                        <Menu sx>
                            <MenuButton>
                                <Avatar size={{ base: 'sm' }}></Avatar>
                            </MenuButton>
                            <MenuList >
                                <MenuGroup fontSize={'md'} title="Moje konto">
                                <MenuItem sx={{textTransform: "capitalize"}}>
                                    <Link to={'/moje-konto/ogloszenia'}>ogłoszenia</Link>
                                </MenuItem>
                                <MenuItem sx={{textTransform: "capitalize"}}>
                                    <Link to={'/moje-konto/wiadomosci'}>wiadomosci</Link>
                                </MenuItem >
                                <MenuItem sx={{textTransform: "capitalize"}}>
                                    <Link to={'/moje-konto/oceny'}>otrzymane oceny</Link>
                                </MenuItem>
                                <MenuItem sx={{textTransform: "capitalize"}}>
                                    <Link to={'/moje-konto/przesylki'}>przesyłki</Link>
                                </MenuItem>
                                <MenuItem sx={{textTransform: "capitalize"}}>
                                    <Link to={'/moje-konto/ustawienia'}>ustawienia</Link>
                                </MenuItem>
                                </MenuGroup>
                                <MenuDivider></MenuDivider>
                                <MenuGroup fontSize={'md'} title="Ogłoszenia">
                                    <MenuItem sx={{textTransform: "capitalize"}}>
                                    <Link to={'/moje-konto/obserwowane'}>obserwowane</Link>
                                    </MenuItem>
                                </MenuGroup>
                                <MenuDivider></MenuDivider>
                                <MenuItem fontSize={'md'} fontWeight={'600'} sx={{textTransform: "capitalize"}}>
                                    <Link to={'/moje-konto/wyloguj'}>wyloguj</Link>
                                </MenuItem>
                            </MenuList>
                        </Menu>
                       
                        <Link to={'/nowe'}>
                            <Button size={{ base: 'sm', md: 'md' }} leftIcon={<IoAdd />} colorScheme={'blue'}>Dodaj ogłoszenie</Button>
                        </Link>
                    </Flex>
                    :
                    <ButtonGroup size={{ base: 'sm', md: 'md' }}>
                        <Link _hover={{textDecoration: 'none'}} to={'/logowanie'}>
                            <Button >Zaloguj się</Button>
                        </Link>
                        <Link _hover={{textDecoration: 'none'}} to={'/rejestracja'}>
                            <Button leftIcon={<IoPersonAddOutline />} variant={'solid'} colorScheme={'blue'}>Zarejestruj się</Button>
                        </Link>
                    </ButtonGroup>
                }
            </Flex>
        </Container>
        <Divider></Divider>
    </Box>
    <Outlet></Outlet>
    </>
    )
}

export default NavBar