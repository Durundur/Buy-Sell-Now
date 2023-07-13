
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const usePagination = (apiCall)=>{
    const [searchParams, setSearchParams] = useSearchParams();
    const [data, setData] = useState([]);
    const [error, setError] = useState();
    let pageParam = Number(searchParams.get('page'));
    if(pageParam <= 0 || !pageParam){
        pageParam = 1;
        setSearchParams({page: 1})
    } 

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