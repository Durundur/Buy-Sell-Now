import { useContext } from "react";
import { AuthContext } from "./AuthContext/AuthContextProvider";


export { default as AuthContextProvider } from "./AuthContext/AuthContextProvider";
export const useAuthContext = () => useContext(AuthContext);

