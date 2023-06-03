import { Button, Flex, Icon, } from "@chakra-ui/react";
import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

const PagButton = (props) => {
    const activeStyle = {
        bg: "gray.200",
        color: "blue.900",
    };

    return (
        <Button mx={1} px={4} py={2} rounded="md" bg="gray.50" color="blue.900" opacity={props.disabled && 0.6}
            _hover={!props.disabled && activeStyle} cursor={props.disabled && "not-allowed"} {...(props.active && activeStyle)}
            display={props.p && !props.active && { base: "none", sm: "block", }}>
            {props.children}
        </Button>
    );
};

function Pagination(props) {
    const { startPage, endPage, currentPage } = props



    const pagesButtons = (startPage, endPage) => {
        // for(startPage; startPage<=endPage; startPage++){
        //     return <Link to={'?page=' + startPage}><PagButton p>{startPage}</PagButton></Link>
        // }
    }

    const handleArrowClick = (direction) => {
        // setCurrentPage((prevState)=>{
        //     return prevState + direction
        // })
    }



    return (
        <Flex boxShadow={'md'} borderRadius={'20px'} bg="#fff" p={4} marginTop={'20px'} w="full" alignItems="center" justifyContent="center">
            <Flex>
                    <Link to={`?page=${Number(currentPage) - 1}`}>
                        <PagButton>
                            <Icon onChange={() => handleArrowClick(-1)} as={IoIosArrowBack} color="blue.900" boxSize={4} />
                        </PagButton>
                    </Link>

                {pagesButtons()}
                <PagButton>{currentPage}</PagButton>
                <Link to={`?page=${Number(currentPage) + 1}`}>
                    <PagButton>
                        <Icon onChange={() => handleArrowClick(1)} as={IoIosArrowForward} color="blue.900" boxSize={4}></Icon>
                    </PagButton>
                </Link>
            </Flex>
        </Flex>
    )
}

export default Pagination