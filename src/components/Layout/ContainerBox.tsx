import { Container, Box } from "@chakra-ui/react";

type ContainerBoxProps = {
    bgColor1?: string,
    bgColor2?: string,
    children?: JSX.Element | JSX.Element[]
}

export default function ContainerBox({ bgColor1, bgColor2, children, ...props }: ContainerBoxProps) {
    return (
        <Box {...props} bg={bgColor1 || 'gray.50'} paddingY={10} color={'blue.900'} >
            <Container bg={bgColor2} maxW={{ md: 'container.md', lg: 'container.lg', xl: 'container.xl' }} >
                {children}
            </Container >
        </Box>
    )
}