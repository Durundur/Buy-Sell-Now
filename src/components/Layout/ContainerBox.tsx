import { Container, Box } from '@chakra-ui/react';
import { BoxProps } from '@chakra-ui/react';

interface ContainerBoxProps extends BoxProps {
	bgColor1?: string;
	bgColor2?: string;
}


export default function ContainerBox({ bgColor1, bgColor2, ...props }: ContainerBoxProps) {
    return (
        <Box {...props} bg={bgColor1 || 'gray.50'} paddingY={10} color={'blue.900'} >
            <Container bg={bgColor2} maxW={{ md: 'container.md', lg: 'container.lg', xl: 'container.xl' }} >
                {props.children}
            </Container >
        </Box>
    )
}
