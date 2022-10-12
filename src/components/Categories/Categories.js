import { Container, Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Header from "../Header";

function Categories(){
    return(
        <>
            <Header text='Kategorie Główne'></Header>
            <Outlet/>
        </>
    )
}

export default Categories