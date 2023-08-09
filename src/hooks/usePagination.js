
import { useEffect } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import useApi from "../hooks/useApi";
import { getAds, getUserAds } from "../utils/apiServices";


function usePagination(apiService, ...args) {
    const [searchParams, setSearchParams] = useSearchParams();
    const { data, error, isLoading, triggerApiCall } = useApi()

    let pageParam = Number(searchParams.get('page'));
    if (pageParam <= 0 || !pageParam) {
        pageParam = 1;
        setSearchParams({ page: 1 })
    }


    useEffect(() => {
        triggerApiCall(apiService(pageParam, ...args))
        window.scroll(0, 0)
    }, [pageParam])


    return { data, error, pageParam, isLoading }
}

export default usePagination