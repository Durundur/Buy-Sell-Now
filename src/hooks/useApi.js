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


    const updateData = useCallback((newData) => {
        setData(newData);
    }, []);



    return { data, error, isLoading, triggerApiCall, updateData }
}


export default useApi