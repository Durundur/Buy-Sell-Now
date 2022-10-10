import { Text } from "@chakra-ui/react"
function SecondaryText(props){
    return(
    <Text color={'gray'} fontSize={'sm'} >
        {props.children}
    </Text>
    )
}

export default SecondaryText