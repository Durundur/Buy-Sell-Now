import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url)=>{
    const [data, setData] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)
    const [response, setResponse] = useState()
    
    useEffect(()=>{
        const fetchData = async ()=>{
            setIsLoading(true)
            try{
                const res = await axios({method: "GET", url: url, withCredentials: true, headers: { 'Content-Type': 'application/json' }})
                setResponse(res)
                setData(res.data)
            }catch(error){
                setError(error)
            }
            setIsLoading(false)
        }
        fetchData()
    }, [url])
    const reFetch = async () => {
        setIsLoading(true);
        try {
          const res = await axios({method: "GET", url: url, withCredentials: true, headers: { 'Content-Type': 'application/json' }})
          setResponse(res);
          setData(res.data);
        } catch (err) {
          setError(err);
        }
        setIsLoading(false);
      }; 
    
      return { data, response, isLoading, error, reFetch, setData};
    };
    
    export default useFetch;