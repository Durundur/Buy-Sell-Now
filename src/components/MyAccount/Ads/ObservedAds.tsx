import { useEffect } from "react"
import { useOutletContext } from "react-router"


function ObservedAds({...props}){
    const {setActiveTab}: {setActiveTab: React.Dispatch<React.SetStateAction<number>>} = useOutletContext();
    useEffect(() => {
        setActiveTab(props.activeTab)
    }, [props.activeTab])
    
    return(
        <>observer</>
    )
}

export default ObservedAds