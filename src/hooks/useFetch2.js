import { useState, useCallback, useEffect } from "react";
import axios from "axios";
const useFetchLists = (
    url = "",
    currentPage = 1,
    selectedPageSize = 10,
    keyword = ""
) => {
    const [items, setItems] = useState([]);
    const [loading, setloading] = useState(false);
    const [totalPage, setTotalPage] = useState(1);
    const [totalItemCount, setTotalItemCount] = useState(0);

    const fetchListData = useCallback(async () => {
        try {
            setloading(true);
            await axios.get(
                `${url}?pageNumber=${currentPage}&pageSize=${selectedPageSize}&keyword=${keyword}`,
                {}
            ).then((response) => {
                setItems(response.data.items);
                setTotalPage(response.data.totalPages);
                setTotalItemCount(response.data.totalItems);
            });
        } catch (err) {
        } finally {
            setloading(false);
        }
    }, [url, currentPage, selectedPageSize, keyword]);

    useEffect(() => {
        fetchListData();
    }, [fetchListData]);

    return {
        data: [items, loading, totalPage, totalItemCount],
        refetch: fetchListData
    };
};

export default useFetchLists;