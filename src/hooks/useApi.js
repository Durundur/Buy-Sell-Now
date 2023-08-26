import { useCallback, useState } from "react"
import { useNavigate } from 'react-router';

const useApi = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState();
    const [error, setError] = useState();
    const navigate = useNavigate()

    const triggerApiCall = useCallback(async (apiService) => {
        setIsLoading(true);
        try {
            const res = await apiService;
            setData(res.data);
            if (res.data.redirect) {
                navigate(res.data.redirect)
            }
        }
        catch (e) {
            console.log(e);
            setError(e);
            if (e.response.data.redirect) {
                navigate(e.response.data.redirect)
            }
        }
        finally {
            setIsLoading(false);
        }
    }, [])


    return { data, error, isLoading, triggerApiCall, setData }
}


export default useApi