import { Box } from "@chakra-ui/react";
import LoadingSpinner from "./LoadingSpinner";


export default function LoadingSpinnerPage(){
	return (
	<Box zIndex={999} backgroundColor={'rgba(0, 0, 0, 0.15)'} position={'fixed'} top={0} left={0} right={0} bottom={0} width={'100%'} height={'100%'}>
		<LoadingSpinner />
	</Box>
);
}