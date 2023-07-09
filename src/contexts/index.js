import { useContext } from "react";
import { AuthContext } from "./AuthContext/AuthContextProvider";
import { ApiContext } from "./ApiContext/ApiContextProvider";





export {default as AuthContextProvider } from "./AuthContext/AuthContextProvider";
export const useAuthContext = () => useContext(AuthContext);



export {default as ApiContextProvider } from "./ApiContext/ApiContextProvider";
export const useApiContext = () => useContext(ApiContext);