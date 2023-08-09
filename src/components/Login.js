import { Box, Button, Container, Input, InputGroup, VStack, Divider, InputRightElement, Text } from '@chakra-ui/react'
import Header from './Header'
import SecondaryText from './SecondaryText'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router";
import { useAuthContext } from '../contexts'
import Error from '../components/Error'


function Login() {
    const navigate = useNavigate();
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)
    const [credentials, setCredentials] = useState({
        username: 'user',
        password: 'user'
    });
    const { loginHandler } = useAuthContext()
    const [error, setError] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await loginHandler(credentials);
        if (response?.status === 200) navigate(response.data.redirect)
        setError(response)
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
                        {error && <Error variant={'info'} error={error}></Error>}
                    </Box>
                    <Button onClick={(e) => handleSubmit(e)} w={'50%'} colorScheme={'blue'} >Zaloguj się</Button>
                    <Button onClick={(e) => {
                        setCredentials({ username: 'admin', password: 'admin' })
                    }} w={'50%'} colorScheme={'blue'} >Zaloguj się jako Administrator</Button>
                    <SecondaryText align={'center'}>lub</SecondaryText>
                    <Button>
                        <Link _hover={{ textDecoration: 'none' }} to='/rejestracja'>
                            Zarejestruj się
                        </Link>
                    </Button>
                </VStack>
            </Container>
        </Box >
    )
}

export default Login