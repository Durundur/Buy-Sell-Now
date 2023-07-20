import { useCallback, useState } from "react"

const useApi = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState();
    const [error, setError] = useState();

    const triggerApiCall = useCallback(async (apiService) => {
        setIsLoading(true);
        try {
            const res = await apiService;
            setData(res.data);
        }
        catch (e) {
            console.log(e);
            setError(e);
        }
        finally {
            setIsLoading(false);
        }
    }, [])


    return { data, error, isLoading, triggerApiCall, setData }
}


export default useApi