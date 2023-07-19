import { Container, Box } from "@chakra-ui/react";

export default function ContainerBox(props){
    return (
        <Box {...props} py={10} color={'blue.900'} bg={'gray.50'}>
            <Container maxW={{ md: 'container.md', lg: 'container.lg', xl: 'container.xl' }} >
                {props?.children}
            </Container >
        </Box>
    )
}