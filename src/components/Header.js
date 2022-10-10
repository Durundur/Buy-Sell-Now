const { Container, Text, Center } = require("@chakra-ui/react");

function Header(props){
    return(
        <Container py={10} maxW={{md:'container.md', lg:'container.lg', xl:'container.xl'}} >
            <Center>
                <Text color={'blue.900'} fontWeight={'bold'} fontSize={'2xl'}>{props.text}</Text>
            </Center>
        </Container>
    )
}

export default Header