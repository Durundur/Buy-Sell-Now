import { useEffect, useState } from "react";
import axios from "axios";

const usePost = (url, data)=>{
    const [response, setResponse] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)

    const postData = async ()=>{
            setIsLoading(true)
            try{
                const res = await axios.post(url, data, {headers: {'Content-Type': 'application/json'}})
                setResponse(res)
            }catch(error){
                setError(error)
            }
            setIsLoading(false)
    }
    
      return { response, isLoading, postData};
    };
    
    export default usePost;