import { createContext, useEffect, useState, } from "react";
import { loginUser, logoutUser, signupUser, ensureAuth } from "../../utils/apiServices";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState({
        userId: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null,
        userAvatar: localStorage.getItem("userAvatar") ? JSON.parse(localStorage.getItem("userAvatar")) : null,
    });


    useEffect(() => {
        checkAuthentication()
    }, [])


    const checkAuthentication = async () => {
        try {
            const response = await ensureAuth();
            if (response?.status === 200) {
                localStorage.setItem(
                    "userInfo",
                    JSON.stringify(response?.data?.userId)
                );
                setUserInfo({ ...userInfo, userId: response?.data?.userId })
            }
            return response
        } catch (error) {
            if (error?.response?.status === 401) {
                setUserInfo({})
                localStorage.setItem("userInfo", null)
                localStorage.setItem("userAvatar", null)
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
                localStorage.setItem(
                    "userAvatar",
                    JSON.stringify(response?.data?.avatar || null)
                );
                setUserInfo({ userId: response?.data?.userId, userAvatar: response?.data?.avatar })
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
                localStorage.setItem(
                    "userAvatar",
                    JSON.stringify(response?.data?.avatar || null)
                );
                setUserInfo({ userId: response?.data?.userId, userAvatar: response?.data?.avatar })
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
                localStorage.removeItem("userAvatar");
                setUserInfo({})
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (<AuthContext.Provider value={{ userInfo, loginHandler, registerHandler, logoutHandler }}>
        {children}
    </AuthContext.Provider>)
}

export default AuthContextProvider