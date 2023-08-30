import { Button, Flex, Icon, } from "@chakra-ui/react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
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

function Pagination({ pathParams, queryParams, isLoading }) {
    const searchParams = new URLSearchParams(queryParams);
    const currentPage = parseInt(searchParams.get('page')) || 1;
    const navigate = useNavigate();

    const handleArrowClick = (direction) => {
        let nextPage = currentPage + direction;
        if (nextPage <= 0) nextPage = currentPage;
        searchParams.set('page', nextPage);
        navigate(pathParams + '?' + searchParams.toString());
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