import { Box, Button, Container, Input, InputGroup, VStack, InputRightElement, } from '@chakra-ui/react'
import Header from '../Layout/Header'
import SecondaryText from '../Layout/SecondaryText'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router";
import { useAuthContext } from '../../contexts'
import { LoginCredentials, LoginRequestResponse } from '../../contexts/AuthContext/types'


function Login() {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    const [credentials, setCredentials] = useState<LoginCredentials>({
        username: 'user',
        password: 'user'
    });
    const { loginHandler } = useAuthContext();
    const [error, setError] = useState<LoginRequestResponse | null>();

    const loginUser = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setError(null);
        e.preventDefault();
        const response = await loginHandler(credentials);
        if (response?.status === 200 && response?.success) {
            navigate(response?.redirect as string);
            return;
        }
        else setError(response);
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
                        <Link to={''}><SecondaryText>Nie pamiętam hasła</SecondaryText></Link>
                    </Box>
                    <Box>
                        {error && error.message}
                    </Box>
                    <Button onClick={(e) => loginUser(e)} w={'50%'} colorScheme={'blue'} >Zaloguj się</Button>
                    <Button onClick={() => {
                        setCredentials({ username: 'admin', password: 'admin' })
                    }} w={'50%'} colorScheme={'blue'} >Zaloguj się jako Administrator</Button>
                    <SecondaryText align={'center'}>lub</SecondaryText>
                    <Button>
                        <Link to='/rejestracja'>
                            Zarejestruj się
                        </Link>
                    </Button>
                </VStack>
            </Container>
        </Box >
    )
}

export default Login