import { Box, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import React from "react";
function Logo(props){
    return(
        <Box {...props} fontSize={'2xl'} fontWeight={'bold'}>
            <Link _hover={{
                  textDecoration: 'none'
                }} to="/">
                <Text color={'blue.400'}>Buy Sell Now</Text>
            </Link>
        </Box>
    )
}

export default Logo