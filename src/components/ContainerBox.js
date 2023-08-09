import { Container, Box } from "@chakra-ui/react";

export default function ContainerBox({ bgColor1, bgColor2, ...props }) {
    return (
        <Box {...props} bg={bgColor1 || 'gray.50'} paddingTop={10} paddingBottom={10} color={'blue.900'} >
            <Container bg={bgColor2} maxW={{ md: 'container.md', lg: 'container.lg', xl: 'container.xl' }} >
                {props?.children}
            </Container >
        </Box>
    )
}