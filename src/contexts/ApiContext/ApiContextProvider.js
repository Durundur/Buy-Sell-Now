import { createContext, useState, } from "react";
import { getAd, getAllAds,postAd, updateAd, deleteAd, getUserAds  } from "../../utils/apiServices";

export const ApiContext = createContext();

const ApiContextProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false)


    const getAdsData = async () => {
        setIsLoading(true);
        try{
            const response = await getAllAds();
            return response;
        } catch(error){
           return error.response;
        } finally{
            setIsLoading(false);
        }
    }

    const getAdData = async (adId) => {
        setIsLoading(true);
        try{
            const response = await getAd(adId);
            return response;
        } catch(error){
            return error.response;
        } finally{
            setIsLoading(false);
        }
    }


    const postAdData = async (data) =>{
        setIsLoading(true);
        try{
            const response = await postAd(data);
            return response;
        } catch(error){
            return error.response;
        } finally{
            setIsLoading(false);
        }
    }

    const updateAdData = async (data, adId) =>{
        setIsLoading(true);
        try{
            const response = await updateAd(data, adId);
            return response;
        } catch(error){
            return error.response;
        } finally{
            setIsLoading(false);
        }
    }

    const deleteAdData = async (adId) =>{
        setIsLoading(true);
        try{
            const response = await deleteAd(adId);
            return response;
        } catch(error){
            return error.response;
        } finally{
            setIsLoading(false);
        }
    }

    const getUserAdsData = async (userId) => {
        setIsLoading(true);
        try{
            const response = await getUserAds(userId);
            return response;
        } catch(error){
            return error.response;
        } finally{
            setIsLoading(false);
        }
    }


    return (<ApiContext.Provider value={{getAdsData, getAdData,isLoading, postAdData, updateAdData, deleteAdData, getUserAdsData }}>
        {children}
    </ApiContext.Provider>)
}

export default ApiContextProvider