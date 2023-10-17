import { useEffect } from "react"
import { useOutletContext } from "react-router"

function MyRatings({...props}){
    const {setActiveTab}: {setActiveTab: React.Dispatch<React.SetStateAction<number>>} = useOutletContext();
    useEffect(() => {
        setActiveTab(props.activeTab)
    }, [props.activeTab])

    return(
        <>rating</>
    )
}

export default MyRatings