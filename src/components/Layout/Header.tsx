import { Container, Text, Center } from "@chakra-ui/react";

function Header({children, ...props}: {children: React.ReactNode}){
    return(
        <Container py={10} maxW={{md:'container.md', lg:'container.lg', xl:'container.xl'}} >
            <Center>
                <Text {...props} color={'blue.900'}  fontWeight={'bold'} fontSize={'2xl'}>{children}</Text>
            </Center>
        </Container>
    )
}

export default Header