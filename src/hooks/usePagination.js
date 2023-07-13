
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const usePagination = (apiCall)=>{
    const [searchParams] = useSearchParams();
    const [data, setData] = useState([]);
    const [error, setError] = useState();
    const pageParam = Number(searchParams.get('page')) || 1;

    async function fetchData(page){
        try{
            const response = await apiCall(page);
            if(response.status === 200){
                setData(response.data);
                return response.data;
            }
        }
        catch(error) {
            setError(error?.response)
            return error?.response
        }
    }  

    useEffect(() => {
        let ignore = false;
        if (!ignore) {
            fetchData(pageParam);
        }
        return () => {
            ignore = true;
        };
    }, [pageParam])


    return {data, error, pageParam}
}

export default usePagination