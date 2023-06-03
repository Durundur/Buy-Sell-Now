
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const usePagination = (basicUrl)=>{
    const [url, setUrl] = useState(basicUrl);
    const [page, setPage] = useState(0)
    const [searchParams, setSearchParams] = useSearchParams();
    let pageParam = searchParams.get('page') || 1;

    useEffect(() => {
        setPage(pageParam)
        setUrl(basicUrl+pageParam)
        window.scrollTo(0, 0);
    }, [pageParam])  


    return {url, page}
}

export default usePagination