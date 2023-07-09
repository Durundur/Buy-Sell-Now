import { createContext, useState, } from "react";
import { getAd, getAllAds,postAd, updateAd, deleteAd,  } from "../../utils/apiServices";

export const ApiContext = createContext();

const ApiContextProvider = ({ children }) => {
    const [error, setError] = useState({});
    const [redirect, setRedirect] = useState('');
    const [response, setResponse] = useState({});
    const [isLoading, setIsLoading] = useState(false)


    const getAdsData = async () => {
        setIsLoading(true);
        try{
            const response = await getAllAds();
            return response.data;
        } catch(error){
            console.log(error)
            setError(error);
        } finally{
            setIsLoading(false);
        }
    }

    const getAdData = async (adId) => {
        setIsLoading(true);
        try{
            const response = await getAd(adId);
            return response.data;
        } catch(error){
            console.log(error)
            setError(error);
        } finally{
            setIsLoading(false);
        }
    }


    const postAdData = async (data) =>{
        setIsLoading(true);
        try{
            const response = await postAd(data);
            return response.data;
        } catch(error){
            console.log(error)
            setError(error);
        } finally{
            setIsLoading(false);
        }
    }

    const updateAdData = async (data, adId) =>{
        setIsLoading(true);
        try{
            const response = await updateAd(data, adId);
            return response.data;
        } catch(error){
            console.log(error)
            setError(error);
        } finally{
            setIsLoading(false);
        }
    }

    const deleteAdData = async (adId) =>{
        setIsLoading(true);
        try{
            const response = await deleteAd(adId);
            return response.data;
        } catch(error){
            console.log(error)
            setError(error);
        } finally{
            setIsLoading(false);
        }
    }


    return (<ApiContext.Provider value={{getAdsData, getAdData, response, isLoading, error, redirect, postAdData, updateAdData, deleteAdData }}>
        {children}
    </ApiContext.Provider>)
}

export default ApiContextProvider