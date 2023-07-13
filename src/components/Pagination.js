import { Button, Flex, Icon, } from "@chakra-ui/react";
import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const PagButton = (props) => {
    const activeStyle = {
        bg: "gray.200",
        color: "blue.900",
    };

    return (
        <Button onClick={props.onClick} mx={1} px={4} py={2} rounded="md" bg="gray.50" color="blue.900" opacity={props.disabled && 0.6}
            _hover={!props.disabled && activeStyle} cursor={props.disabled && "not-allowed"} {...(props.active && activeStyle)}
            display={props.p && !props.active && { base: "none", sm: "block", }}>
            {props.children}
        </Button>
    );
};

function Pagination({ currentPage, isLoading }) {
    const navigate = useNavigate();

    const handleArrowClick = (direction) => {
        navigate(`?page=${currentPage + direction}`)
    }


    return (
        <Flex boxShadow={'md'} borderRadius={'20px'} bg="#fff" p={4} marginTop={'20px'} w="full" alignItems="center" justifyContent="center">
            <Flex>
                <PagButton disabled={isLoading} onClick={() => { 
                    handleArrowClick(-1);
                 }} >
                    <Icon as={IoIosArrowBack} color="blue.900" boxSize={4} />
                </PagButton>

                <PagButton>{currentPage}</PagButton>

                <PagButton disabled={isLoading} onClick={() => { 
                    handleArrowClick(1);
                 }}>
                    <Icon as={IoIosArrowForward} color="blue.900" boxSize={4}></Icon>
                </PagButton>
            </Flex>
        </Flex>
    )
}

export default Pagination