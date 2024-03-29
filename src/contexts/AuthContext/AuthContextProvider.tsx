import { type AxiosError } from "axios";
import { createContext, useEffect, useState, } from "react";
import { loginUser, logoutUser, signupUser, ensureAuth } from "./AuthServices";
import { AuthContexType, LoginHandlerType, RegisterHandlerType, CheckAuthenticationHandlerType, LogoutHandlerType, LoginRequestResponse, UserInfoType } from "./types";

export const AuthContext = createContext<AuthContexType>({} as AuthContexType);

const AuthContextProvider = ({ children }: {children: JSX.Element}) => {
    
    const [userInfo, setUserInfo] = useState<UserInfoType>({
        userId: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo") || "") : "",
        userAvatar: localStorage.getItem("userAvatar") ? JSON.parse(localStorage.getItem("userAvatar") || "") : "",
    });

    useEffect(() => {
        checkAuthenticationHandler()
    }, [])

    const checkAuthenticationHandler: CheckAuthenticationHandlerType = async () => {
        try {
            const response = await ensureAuth();
            if (response.status === 200) {
                localStorage.setItem(
                    "userInfo",
                    JSON.stringify(response.data.userId || "")
                );
                localStorage.setItem(
                    "userAvatar",
                    JSON.stringify(response.data.avatar || "")
                );
                setUserInfo({ ...userInfo, userId: response.data.userId, userAvatar: response.data?.avatar });
            }
        } catch (error) {
            const e = (error as AxiosError<LoginRequestResponse>).response?.data
            if (e?.status === 401) {
                localStorage.removeItem("userInfo");
                localStorage.removeItem("userAvatar");
                setUserInfo({userAvatar: "", userId: ""});
            }
        }
    }

    const loginHandler: LoginHandlerType = async (credentials) => {
        try {
            const response = await loginUser(credentials);
            if (response?.status === 200 || response?.status === 201){
                localStorage.setItem(
                    "userInfo",
                    JSON.stringify(response.data.userId)
                );
                localStorage.setItem(
                    "userAvatar",
                    JSON.stringify(response.data.avatar || "")
                );
                setUserInfo({ userId: response.data.userId, userAvatar: response.data.avatar })
            }
            return response.data
        } 
        catch (error) {
            return (error as AxiosError<LoginRequestResponse>).response?.data;
        }
    }

    const registerHandler: RegisterHandlerType = async (credentials) => {
        try {
            const response = await signupUser(credentials);
            if (response?.status === 200 || response?.status === 201) {
                localStorage.setItem(
                    "userInfo",
                    JSON.stringify(response.data.userId)
                );
                localStorage.setItem(
                    "userAvatar",
                    JSON.stringify(response.data.avatar || "")
                );
                setUserInfo({ userId: response.data.userId, userAvatar: response.data.avatar })
            }
            return response.data
        } catch (error) {
            return (error as AxiosError<LoginRequestResponse>).response?.data
        }
    }


    const logoutHandler: LogoutHandlerType = async () => {
        try {
            const response = await logoutUser()
            if (response?.status === 200 || response?.status === 201) {
                localStorage.removeItem("userInfo");
                localStorage.removeItem("userAvatar");
                setUserInfo({userAvatar: "", userId: ""})
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