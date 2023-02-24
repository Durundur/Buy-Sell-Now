import { Box, Container, Text } from "@chakra-ui/react";
import SecondaryText from "./SecondaryText";
import Logo from "./Logo";

function Footer() {
    return (
        <Box bg={'gray.200'}>
            <Container color={'blue.900'} gap={5} centerContent py={10} maxW={{ md: 'container.md', lg: 'container.lg', xl: 'container.xl' }} >
                <Logo ></Logo>
                <SecondaryText  align={'center'} w={{base: '100%', md: '70%'}}>BuySellNow.pl to darmowe ogłoszenia lokalne w kategoriach: Moda, Zwierzęta, Dla Dzieci, Sport i Hobby, Muzyka i Edukacja. Szybko znajdziesz tu ciekawe ogłoszenia i łatwo skontaktujesz się z ogłoszeniodawcą. Na naszym portalo czeka na Ciebie praca biurowa, mieszkania, pokoje, samochody. Jeśli chcesz coś sprzedać - w prosty sposób dodasz bezpłatne ogłoszenia. Chcesz coś kupić - tutaj znajdziesz ciekawe okazje, taniej niż w sklepie. Sprzedawaj po sąsiedzku na BuySellNow.pl</SecondaryText>
                <Text>&copy; All rights reserved</Text>
            </Container>
        </Box>
    )
}

export default Footer