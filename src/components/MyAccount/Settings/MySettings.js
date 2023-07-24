import { useEffect } from "react";
import ContainerBox from "../../ContainerBox";
import { Accordion, AccordionButton, AccordionIcon, Box, AccordionPanel, AccordionItem } from "@chakra-ui/react";
import { getUserInfo } from "../../../utils/apiServices";
import useApi from "../../../hooks/useApi";
import ChangeEmail from "./ChangeEmail";
import ChangePassword from "./ChangePassword";
import ChangeGeneralInfo from "./ChangeGenaralInfo";
import ChangeUserImages from "./ChangeUserImages";


function MySettings(props) {
  const { data, error, setData, isLoading, triggerApiCall } = useApi()


  useEffect(() => {
    triggerApiCall(getUserInfo())
  }, [])
  return (
    <ContainerBox>
      <Accordion allowMultiple gap={2}>
        <AccordionItem shadow={"md"} marginBottom={4} border={"none"} borderRadius={"20px"} bg={"#fff"}>
          <h2>
            <AccordionButton _hover={{ bg: "inherit" }}>
              <Box as="span" flex="1" textAlign="left">
                Domyślne informacje
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <ChangeGeneralInfo data={{ advertiser: data?.advertiser, localization: data?.localization }} error={error} setData={setData} isLoading={isLoading} triggerApiCall={triggerApiCall}></ChangeGeneralInfo>
            {/* naprawic zeby nie dalo sie wywylac pustych */}
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem shadow={"md"} marginBottom={4} border={"none"} borderRadius={"20px"} bg={"#fff"}>
          <h2>
            <AccordionButton _hover={{ bg: "inherit" }}>
              <Box as="span" flex="1" textAlign="left">
                Logo i baner
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <ChangeUserImages avatar={data?.avatar} banner={data?.banner} error={error} setData={setData} isLoading={isLoading} triggerApiCall={triggerApiCall}></ChangeUserImages>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem shadow={"md"} marginBottom={4} border={"none"} borderRadius={"20px"} bg={"#fff"}>
          <h2>
            <AccordionButton _hover={{ bg: "inherit" }}>
              <Box as="span" flex="1" textAlign="left">
                Zmiana hasła
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <ChangePassword></ChangePassword>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem shadow={"md"} marginBottom={4} border={"none"} borderRadius={"20px"} bg={"#fff"}>
          <h2>
            <AccordionButton _hover={{ bg: "inherit" }}>
              <Box as="span" flex="1" textAlign="left">
                Zmiana e-mail
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <ChangeEmail></ChangeEmail>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </ContainerBox>
  );
}

export default MySettings;
