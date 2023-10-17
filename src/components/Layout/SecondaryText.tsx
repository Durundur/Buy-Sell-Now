import { Text, TextProps } from "@chakra-ui/react"

type SecondaryTextType =  TextProps & {
    children?: React.ReactNode
}

function SecondaryText({children, ...props}: SecondaryTextType){
    return(
    <Text {...props} fontSize={'xs'} >
        {children}
    </Text>
    )
}

export default SecondaryText    