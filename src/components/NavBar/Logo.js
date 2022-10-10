import { Box, Text } from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import React from "react";
function Logo(props){
    return(
        <Box {...props} fontWeight={'bold'}>
            <Link href="#">
                <Text color={'blue.400'}>Buy Sell Now!</Text>
            </Link>
        </Box>
    )
}

export default Logo