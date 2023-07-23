import { useEffect } from "react"
import { useOutletContext } from "react-router"


function ObservedAds(props){
    const [setActiveTab] = useOutletContext();
    useEffect(()=>{
        setActiveTab(props.activeTab)
    }, [props.activeTab])
    return(
        <>observer</>
    )
}

export default ObservedAds