import { Text } from "@chakra-ui/react"
function SecondaryText(props){
    return(
    <Text {...props} fontSize={'sm'} >
        {props.children}
    </Text>
    )
}

export default SecondaryText