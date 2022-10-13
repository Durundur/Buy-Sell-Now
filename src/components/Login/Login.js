import {Box, Button, Container, Input, InputGroup, VStack, Link, Divider, InputRightElement } from '@chakra-ui/react'
import Header from '../Header'
import SecondaryText from '../SecondaryText'
import React from 'react'

function Login (){
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)
    return(
        <Box bg={'gray.50'}>
            <Container pb={10}  maxW={{base:'container.md'}} >
                <Header text={'Logowanie'}></Header>
                <VStack gap={4}>
                        <Input bg={'white'} placeholder='e-mail' type={'email'}></Input>
                        <Box w={'100%'}>
                            <InputGroup>
                            <Input bg={'white'} placeholder='hasło' type={show ? 'text' : 'password'}></Input>
                            <InputRightElement width='4.5rem'>
                                <Button h='1.75rem' size='sm' onClick={handleClick}>
                                {show ? 'Pokaż' : 'Ukryj'}
                                </Button>
                            </InputRightElement>

                            </InputGroup>
                            <Link ><SecondaryText py={1}>Nie pamiętam hasła</SecondaryText></Link>
                        </Box>
                        <Button w={'50%'} colorScheme={'blue'} >Zaloguj się</Button>
                        <SecondaryText  align={'center'}>lub</SecondaryText>
                        <Button>
                            <Link _hover={{textDecoration: 'none'}} href='/register'>
                            Zarejestruj się
                            </Link>
                        </Button>
                </VStack>
            </Container>
        </Box>
    )
}

export default Login