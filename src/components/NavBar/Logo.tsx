import { Box, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Logo() {
    return (
        <Box fontSize={{ base: 'md', md: 'lg' }} fontWeight={'bold'}>
            <Link to="/" state={{ search: { tittle: '' } }}>
                <Text color={'blue.400'}>Buy Sell Now</Text>
            </Link>
        </Box>
    )
}
export default Logo