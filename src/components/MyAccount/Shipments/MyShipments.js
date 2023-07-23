import { useEffect } from "react"
import { useOutletContext } from "react-router"


function MyShipments(props){
    const [setActiveTab] = useOutletContext();
    useEffect(()=>{
        setActiveTab(props.activeTab)
    }, [props.activeTab])
    return(
        <>MyShipments</>
    )
}

export default MyShipments