import {Box, Button, Container, Input, InputGroup, VStack, Divider, InputRightElement } from '@chakra-ui/react'
import Header from './Header'
import SecondaryText from './SecondaryText'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import usePost from '../hooks/usePost'

function Login (){
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)
    const [credentials, setCredentials] = useState({});
    // const { response, isPosting, setIsPosting, error, postData } = usePost('http://localhost:7000/api/v1/auth/login', credentials, 'post');
    const { response, isPosting, setIsPosting, error, postData } = usePost('https://buy-sell-now.fly.dev/api/v1/auth/login', credentials, 'post');

    const handleInputChange = (e) => {
        const value = e.target.value;
        const name = e.target.name.split(".");
        let updatedData = { ...credentials };

        let target = updatedData;
        for (const key of name.slice(0, -1)) {
            if (!target.hasOwnProperty(key)) {
                target[key] = {};
            }
            target = target[key];
        }
        target[name[name.length - 1]] = value;
        setCredentials(updatedData);
    };

    const handleSubmit = (e)=>{
        e.preventDefault();
        postData();
    }

    return(
        <Box bg={'gray.50'}>
            <Container pb={10}  maxW={{base:'container.md'}} >
                <Header >Logowanie</Header>
                <VStack gap={4}>
                        <Input onChange={(e)=>handleInputChange(e)} name={'username'} value={credentials?.username} bg={'white'} placeholder='username' type={'string'}></Input>
                        <Box w={'100%'}>
                            <InputGroup>
                            <Input onChange={(e)=>handleInputChange(e)} value={credentials?.password} name={'password'} bg={'white'} placeholder='hasło' type={show ? 'text' : 'password'}></Input>
                            <InputRightElement width='4.5rem'>
                                <Button h='1.75rem' size='sm' onClick={handleClick}>
                                {show ? 'Pokaż' : 'Ukryj'}
                                </Button>
                            </InputRightElement>

                            </InputGroup>
                            <Link ><SecondaryText py={1}>Nie pamiętam hasła</SecondaryText></Link>
                        </Box>
                        <Button type={'submit'} onClick={(e)=>handleSubmit(e)} w={'50%'} colorScheme={'blue'} >Zaloguj się</Button>
                        <SecondaryText  align={'center'}>lub</SecondaryText>
                        <Button>
                            <Link _hover={{textDecoration: 'none'}} href='/rejestracja'>
                            Zarejestruj się
                            </Link>
                        </Button>
                </VStack>
            </Container>
        </Box>
    )
}

export default Login