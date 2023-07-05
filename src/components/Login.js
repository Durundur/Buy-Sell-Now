import { Box, Button, Container, Input, InputGroup, VStack, Divider, InputRightElement, Text } from '@chakra-ui/react'
import Header from './Header'
import SecondaryText from './SecondaryText'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router";
import { useAuthContext } from '../contexts'

function Login() {
    const navigate = useNavigate();
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });
    const { loginHandler, error, userInfo } = useAuthContext()

    const handleSubmit = (e) => {
        e.preventDefault();
        loginHandler(credentials);
    }

    if (userInfo?.userId !== undefined) {
        navigate('/')
    }

    return (
        <Box bg={'gray.50'}>
            <Container pb={10} maxW={{ base: 'container.md' }} >
                <Header>Logowanie</Header>
                <VStack gap={4}>
                    <Input onChange={(e) => {
                        setCredentials({
                                ...credentials,
                                username: e.target.value
                        })
                    }} name={'username'} value={credentials.username} bg={'white'} placeholder='username' type={'string'}></Input>
                <Box w={'100%'}>
                    <InputGroup>
                        <Input onChange={(e) => {
                        setCredentials({
                                ...credentials,
                                password: e.target.value
                        })
                    }} value={credentials.password} name={'password'} bg={'white'} placeholder='hasło' type={show ? 'text' : 'password'}></Input>
                        <InputRightElement width='4.5rem'>
                            <Button h='1.75rem' size='sm' onClick={handleClick}>
                                {show ? 'Pokaż' : 'Ukryj'}
                            </Button>
                        </InputRightElement>

                    </InputGroup>
                    <Link ><SecondaryText py={1}>Nie pamiętam hasła</SecondaryText></Link>
                </Box>
                <Box>

                    {error?.status === 401 && <Text>Nieprawidłowe dane logowania</Text>}
                </Box>
                <Button onClick={(e) => handleSubmit(e)} w={'50%'} colorScheme={'blue'} >Zaloguj się</Button>
                <Button onClick={(e) => {
                    setCredentials({username: 'admin', password: 'admin'})
                    handleSubmit(e)}} w={'50%'} colorScheme={'blue'} >Zaloguj się jako Administrator</Button>
                <SecondaryText align={'center'}>lub</SecondaryText>
                <Button>
                    <Link _hover={{ textDecoration: 'none' }} href='/rejestracja'>
                        Zarejestruj się
                    </Link>
                </Button>
            </VStack>
        </Container>
        </Box >
    )
}

export default Login