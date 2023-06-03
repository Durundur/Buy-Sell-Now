import { useEffect } from "react"
import { useOutletContext } from "react-router"

function MySettings(props){
    const [setActiveTab] = useOutletContext();
    useEffect(()=>{
        setActiveTab(props.activeTab)
    }, [props.activeTab])
    return(
        <>settings</>
    )
}

export default MySettings