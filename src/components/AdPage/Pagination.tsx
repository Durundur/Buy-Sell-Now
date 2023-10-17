import { Button, Flex, Icon, } from "@chakra-ui/react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";

type PaginationButtonProps = {
    onClick?: () => void,
    disabled?: boolean,
    children?: JSX.Element
}


const PaginationButton = ({onClick, disabled, children}: PaginationButtonProps) => {
    const activeStyle = {
        bg: "gray.200",
        color: "blue.900",
    };

    return (
        <Button onClick={!disabled ? onClick : ()=>{}} mx={1} px={4} py={2} rounded="md" bg="gray.50" color="blue.900" opacity={disabled ? 0.6 : 1}
            _hover={!disabled ? activeStyle : {}} cursor={disabled ? "default" : 'pointer'}>
            {children}
        </Button>
    );
};

type PaginationProps = {
    pathParams: string,
    queryParams: string
    isLoading: boolean
}

function Pagination({ pathParams, queryParams, isLoading }: PaginationProps) {
    const searchParams = new URLSearchParams(queryParams);
    const currentPage = parseInt(searchParams.get('page') as string) || 1;
    const navigate = useNavigate();

    const handleArrowClick = (direction: number) => {
        let nextPage = currentPage + direction;
        if (nextPage <= 0) nextPage = currentPage;
        searchParams.set('page', nextPage.toString());
        navigate(pathParams + '?' + searchParams.toString());
    }


    return (
        <Flex boxShadow={'md'} borderRadius={'20px'} bg="#fff" p={4} marginTop={'20px'} w="full" alignItems="center" justifyContent="center">
            <Flex>
                <PaginationButton disabled={isLoading || currentPage-1 <= 0} onClick={() => {handleArrowClick(-1)}} >
                    <Icon as={IoIosArrowBack} color="blue.900" boxSize={4} />
                </PaginationButton>

                <PaginationButton>
                    <span>{currentPage}</span>
                </PaginationButton>

                <PaginationButton disabled={isLoading} onClick={() => {handleArrowClick(1);}}>
                    <Icon as={IoIosArrowForward} color="blue.900" boxSize={4}></Icon>
                </PaginationButton>
            </Flex>
        </Flex>
    )
}


export default Pagination