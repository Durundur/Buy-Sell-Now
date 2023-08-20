
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import useApi from "../hooks/useApi";
import { useLocation } from 'react-router-dom';

//useSearchParams
function usePagination(apiService, ...args) {
    let location = useLocation();

    const [searchParams, setSearchParams] = useSearchParams();
    const { data, setData, error, isLoading, triggerApiCall } = useApi()
    let pageParam = Number(searchParams.get('page'));
    if (pageParam <= 0 || !pageParam) {
        pageParam = 1;
        // setSearchParams({ page: 1 })
    }
    const sort = searchParams.get('sort') || '';
    const order = searchParams.get('order') || '';

    useEffect(() => {
        triggerApiCall(apiService(pageParam, ...args, sort, order))
        window.scroll(0, 0)
    }, [searchParams, ...args])

    return { data, setData, error, pageParam, isLoading }
}

export default usePagination