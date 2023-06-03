
import { useEffect } from "react"
import { useOutletContext } from "react-router"

function MyMessages(props){
    const [setActiveTab] = useOutletContext();
    useEffect(()=>{
        setActiveTab(props.activeTab)
    }, [props.activeTab])
    return(
        <>
        wiadomosci
        </>
    )
}

export default MyMessages