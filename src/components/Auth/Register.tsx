import { Box, Button, Container, Input, InputGroup, VStack, Checkbox, InputRightElement, HStack } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../Layout/Header'
import SecondaryText from '../Layout/SecondaryText'
import React, { useState } from 'react'
import { useAuthContext } from '../../contexts'
import Error from '../Layout/Error'
import { RegisterCredentials } from '../../contexts/AuthContext/types'

function Register() {
    const [show, setShow] = React.useState(false);
    const handleClick = () => setShow(!show);
    const [credentials, setCredentials] = useState<RegisterCredentials>({username: '', password: ''});
    const [error, setError] = useState();
    const { registerHandler } = useAuthContext();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const response = await registerHandler(credentials);
        if (response?.status === 201) {
            navigate(response.data.redirect)
            return
        }
        setError(response?.data);
    }

    return (
        <Box bg={'gray.50'}>
            <Container pb={10} maxW={{ base: 'container.md' }} >
                <Header>Rejestracja</Header>
                <VStack gap={4}>
                    <Input bg={'white'} placeholder='e-mail' type={'email'} onChange={(e) => {
                        setCredentials({
                            ...credentials,
                            username: e.target.value
                        })
                    }} ></Input>
                    <Box w={'100%'}>
                        <InputGroup>
                            <Input bg={'white'} placeholder='hasło' type={show ? 'text' : 'password'} onChange={(e) => {
                                setCredentials({
                                    ...credentials,
                                    password: e.target.value
                                })
                            }} ></Input>
                            <InputRightElement width='4.5rem'>
                                <Button h='1.75rem' size='sm' onClick={handleClick}>
                                    {show ? 'Pokaż' : 'Ukryj'}
                                </Button>
                            </InputRightElement>

                        </InputGroup>
                    </Box>
                    <SecondaryText align={'center'}>Klikając “Załóż konto”, akceptuję Regulamin serwisu BuySellNow Przyjmuję do wiadomości, że BuySellNow wykorzystuje moje dane osobowe zgodnie z Polityką prywatności oraz Polityką dotyczącą plików cookie i podobnych technologii. BuySellNow wykorzystuje zautomatyzowane systemy i partnerów do analizowania, w jaki sposób korzystam z usług w celu zapewnienia odpowiedniej funkcjonalności produktu, treści, dostosowanych i opartych na zainteresowaniach reklam, jak również ochrony przed spamem, złośliwym oprogramowaniem i nieuprawnionym korzystaniem z naszych usług.</SecondaryText>
                    <HStack>
                        <Checkbox p={3} size={'lg'}></Checkbox>
                        <SecondaryText>Wyrażam zgodę na używanie przez Grupę BuySellNow sp. z o.o. środków komunikacji elektronicznej oraz telekomunikacyjnych urządzeń końcowych w celu przesyłania mi informacji handlowych oraz prowadzenia marketingu (np. newsletter, wiadomości SMS) przez Grupę BuySellNow sp. z o.o., podmioty powiązane i partnerów biznesowych. Moja zgoda obejmuje numery telefonów i adresy e-mail wykorzystywane podczas korzystania z usług Grupy BuySellNow Sp. z o.o. Wyrażoną zgodę można wycofać lub ograniczyć w dowolnej chwili za pomocą odpowiednich ustawień konta lub zgłaszając nam takie żądanie.</SecondaryText>
                    </HStack>
                    {error && <Error error={error} variant={'info'}></Error>}
                    <Button w={'50%'} onClick={(e) => handleSubmit(e)} colorScheme={'blue'} >Załóż konto</Button>
                    <SecondaryText align={'center'}>lub</SecondaryText>
                    <Button>
                        <Link to='/logowanie'>
                            Zaloguj się
                        </Link>
                    </Button>
                </VStack>
            </Container>
        </Box>
    )
}

export default Register