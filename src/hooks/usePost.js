import { useEffect, useState } from "react";
import axios from "axios";

const usePost = (url, data) => {
    const [response, setResponse] = useState({})
    const [isPosting, setIsPosting] = useState(false)
    const [error, setError] = useState(false)

    const postData = async () => {
        setIsPosting(true)
        try {
            const res = await axios.post(url, data, { headers: { 'Content-Type': 'application/json' } })
            console.log(res);
            setResponse(res)
        } catch (error) {
            setError(error)
        }
        setIsPosting(false)
    }

    return { response, isPosting,error, postData };
};

export default usePost;