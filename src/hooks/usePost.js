import { useState } from "react";
import axios from "axios";

const usePost = (url, data, method) => {
    const [response, setResponse] = useState({})
    const [isPosting, setIsPosting] = useState(false)
    const [error, setError] = useState(false)

    const postData = async () => {
        setIsPosting(true)
        try {
            const res = await axios({ method: method, url: url, data: data, withCredentials: true, headers: { 'Content-Type': 'application/json' } })
            setResponse(res)
        } catch (error) {
            setError(error)
        }
        setIsPosting(false)
    }

    return { response, isPosting, setIsPosting, error, postData };
};

export default usePost;