import { Image as Img, Box } from '@chakra-ui/react';


export function Image({ src, borderRadius, ...props }) {
    return <Img borderRadius={borderRadius} {...props} objectFit={'contain'} src={src} fallback={<FallbackImage borderRadius={borderRadius} />}></Img>
}


export function FallbackImage({ height, borderRadius, ...props }) {
    return (
        <Box {...props} borderRadius={borderRadius} w={'100%'} height={height || '100%'} bg={'gray.100'}>
            <svg height={'100%'} width={'100%'} fill={'var(--chakra-colors-blue-900)'} id="Flat" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path d="M208,36H48A12.01312,12.01312,0,0,0,36,48V208a12.01312,12.01312,0,0,0,12,12H208a12.01312,12.01312,0,0,0,12-12V48A12.01312,12.01312,0,0,0,208,36Zm4,172a4.004,4.004,0,0,1-4,4H48a4.004,4.004,0,0,1-4-4V177.65631l33.17187-33.171a4.00208,4.00208,0,0,1,5.65723,0l20.68652,20.68652a12.011,12.011,0,0,0,16.96973,0l44.68652-44.68652a4.00208,4.00208,0,0,1,5.65723,0L212,161.65625Zm0-57.65625L176.48535,114.8291a11.99916,11.99916,0,0,0-16.96973,0L114.8291,159.51562a4.00681,4.00681,0,0,1-5.65723,0L88.48535,138.8291a12.01009,12.01009,0,0,0-16.96973,0L44,166.34393V48a4.004,4.004,0,0,1,4-4H208a4.004,4.004,0,0,1,4,4ZM108.001,92v.00195a8.001,8.001,0,1,1,0-.00195Z"></path> </svg>
        </Box>
    )
}


