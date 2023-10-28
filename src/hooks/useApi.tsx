import axios, { AxiosRequestConfig } from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router';
const API_BASE_URL = process.env.REACT_APP_API;

const requestConfigDefault: AxiosRequestConfig = {
    method: 'get',
    baseURL: API_BASE_URL,
    withCredentials: true, 
    headers: { 'Content-Type': 'application/json' }
}

export type ApiResponse<T> = {
    redirect?: string,
    data: T;
}

export default function useApi<T>(requestConfig: AxiosRequestConfig) {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [data, setData] = useState<T>();
    const [error, setError] = useState<Error | undefined>();
    
    const makeRequest = async <D,>(data?: D | undefined): Promise<void> => {
        setIsLoading(true);
        try{
            const response = await axios<ApiResponse<T> | T>({...requestConfigDefault, ...requestConfig, data});
            if(response.statusText === 'OK'){
                const query = response.data;
                if ('redirect' in query) {
                    navigate(query.redirect as string);
                } else {
                    setData(query as T);
                    return;
                }
                setData(query.data)
                return;
            }
        }catch(error){
            setError(error as Error)
        }
        finally{
            setIsLoading(false)
        }
    }


    return {isLoading, data, error, makeRequest, setData}
}