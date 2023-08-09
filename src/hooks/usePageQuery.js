import { useSearchParams, useParams } from "react-router-dom";

const usePageQuery = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    let pageParam = Number(searchParams.get('page'));
    if (pageParam <= 0 || !pageParam) {
        pageParam = 1;
        setSearchParams({ page: 1 })
    }
    return { pageParam }
}

export default usePageQuery