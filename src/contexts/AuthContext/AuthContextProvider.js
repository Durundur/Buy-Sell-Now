import { createContext, useState, } from "react";
import { loginUser, logoutUser, signupUser } from "../../utils/apiServices";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [error, setError] = useState({});

    const [userInfo, setUserInfo] = useState(
        localStorage.getItem("userInfo")
          ? JSON.parse(localStorage.getItem("userInfo"))
          : null
      );


    const loginHandler = async (credentials) => {
        try {
            const response = await loginUser(credentials);
            if (response?.status === 200 || response?.status === 201) {
                localStorage.setItem(
                    "userInfo",
                    JSON.stringify(response?.data?.user)
                  );
                  setUserInfo(response?.data?.user)
            }
        }catch (error) {
            setError(error.response)
        }
    }


    const logoutHandler = async () => {
        try{
            const response = await logoutUser()
            if (response?.status === 200 || response?.status === 201) {
                localStorage.removeItem("userInfo");
                setUserInfo(null)
            }
        }catch(error){
            console.log(error)
        }
    }

    return (<AuthContext.Provider value={{ userInfo, loginHandler,logoutHandler, error }}>
        {children}
    </AuthContext.Provider>)
}

export default AuthContextProvider