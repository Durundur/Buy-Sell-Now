import { Text } from "@chakra-ui/react"
function SecondaryText(props){
    return(
    <Text {...props} fontSize={'xs'} >
        {props.children}
    </Text>
    )
}

export default SecondaryText