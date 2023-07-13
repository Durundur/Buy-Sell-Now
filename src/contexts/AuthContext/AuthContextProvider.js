import { createContext, useEffect, useState, } from "react";
import { loginUser, logoutUser, signupUser, ensureAuth } from "../../utils/apiServices";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [error, setError] = useState({});
    const [redirect, setRedirect] = useState('')
    const [userInfo, setUserInfo] = useState(
        localStorage.getItem("userInfo")
            ? JSON.parse(localStorage.getItem("userInfo"))
            : null
    );



    useEffect(()=>{
        checkAuthentication()
    },[])


    const checkAuthentication = async () => {
        try {
            const response = await ensureAuth();
            if (response?.status === 200) {
                localStorage.setItem(
                    "userInfo",
                    JSON.stringify(response?.data?.userId)
                );
                setUserInfo(response?.data?.userId)
            }
            return response
        } catch (error) {
            if(error?.response?.status === 401){
                setUserInfo(null)
                localStorage.setItem("userInfo", null)
            }
            return error.response
        }
    }




    const loginHandler = async (credentials) => {
        try {
            const response = await loginUser(credentials);
            if (response?.status === 200 || response?.status === 201) {
                localStorage.setItem(
                    "userInfo",
                    JSON.stringify(response?.data?.userId)
                );
                setUserInfo(response?.data?.userId)
                setRedirect(response?.data?.redirect)
            }
            return response
        } catch (error) {
            return error.response
        }
    }

    const registerHandler = async (credentials) => {
        try {
            const response = await signupUser(credentials);
            if (response?.status === 200 || response?.status === 201) {
                localStorage.setItem(
                    "userInfo",
                    JSON.stringify(response?.data?.userId)
                );
                setUserInfo(response?.data?.userId)
                setRedirect(response?.data?.redirect)
            }
            return response
        } catch (error) {
            return error.response
        }
    }


    const logoutHandler = async () => {
        try {
            const response = await logoutUser()
            if (response?.status === 200 || response?.status === 201) {
                localStorage.removeItem("userInfo");
                setUserInfo(null)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (<AuthContext.Provider value={{ userInfo, loginHandler, registerHandler, logoutHandler, error, redirect }}>
        {children}
    </AuthContext.Provider>)
}

export default AuthContextProvider