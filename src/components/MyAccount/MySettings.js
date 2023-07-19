import { useEffect, useState } from "react";
import { useOutletContext } from "react-router";
import ContainerBox from "../../components/ContainerBox";
import { Accordion, AccordionButton, AccordionIcon, Box, AccordionPanel, AccordionItem, Input, Button, } from "@chakra-ui/react";
import { FormControl, FormLabel, FormErrorMessage, FormHelperText, InputGroup, InputRightElement, Text } from "@chakra-ui/react";
import { TextInput } from "../Form/TextInput";
import { Formik, Form, useField, Field } from 'formik';
import * as Yup from 'yup';



function MySettings(props) {
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
          <AccordionPanel w={["90%", "80%", "65%", "50%"]} pb={4}>
            <Formik initialValues={{
              name: '',
              localization: '',
              phoneNumber: ''
            }} validationSchema={Yup.object({
              name: Yup.string()
                .required('Pole obowiązkowe').trim(),
              localization: Yup.string()
                .min(2, 'Niepoprawna nazwa miejscowości').trim(),
              phoneNumber: Yup.string().matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/)
                .max(13, 'Niepoprawny numer telefonu').trim()
            })} >
              <Form>
                <TextInput label="Wyświetlana nazwa" name="name" type="text" placeholder="" />
                <TextInput label="Lokalizacja" name="localization" type="text" placeholder="" />
                <TextInput label="Numer telefonu" name="phoneNumber" type="text" placeholder="" />
              </Form>
            </Formik>
            <Button mt={4} variant={"solid"} colorScheme={"blue"}>
              Zapisz
            </Button>
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
          <AccordionPanel w={["90%", "80%", "65%", "50%"]} pb={4}>
            <FormControl my={4}>
              <FormLabel>Logo</FormLabel>
              <Input></Input>
            </FormControl>
            <FormControl my={4}>
              <FormLabel>Baner</FormLabel>
              <Input></Input>
            </FormControl>
            <Button mt={4} variant={"solid"} colorScheme={"blue"}>
              Zapisz
            </Button>
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
          <AccordionPanel w={["90%", "80%", "65%", "50%"]} pb={4}>
            <Formik initialValues={{
              oldPassword: '',
              newPassword: '',
            }} validationSchema={Yup.object({
              oldPassword: Yup.string()
                .required('Pole obowiązkowe'),
              newPassword: Yup.string()
                .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/, "Hasło powinno mieć przynajmniej 8 znaków, małe i wielkie litery, cyfry oraz znaki specjalne").required('Pole obowiązkowe'),
            })} >
              <Form>
                <TextInput label="Stare hasło" name="oldPassword" type="password" />
                <TextInput label="Nowe hasło" name="newPassword" type="password" help={'Hasło powinno mieć przynajmniej 8 znaków. Naprawdę mocne hasła mają małe i wielkie litery, cyfry oraz znaki tego typu: @!€='} />
              </Form>
            </Formik>
            <Button mt={4} variant={"solid"} colorScheme={"blue"}>
              Zmień hasło
            </Button>
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
          <AccordionPanel w={["90%", "80%", "65%", "50%"]} pb={4}>
            <Formik initialValues={{
              email: '',
            }} validationSchema={Yup.object({
              email: Yup.string()
                .email('Nieprawidłowy adres e-mail')
                .required('Pole obowiązkowe'),
            })} >
              <Form>
                <TextInput label="Nowy e-mail" name="email" type="email" placeholder="" />
              </Form>
            </Formik>
            <Button mt={4} variant={"solid"} colorScheme={"blue"}>
              Zmień e-mail
            </Button>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </ContainerBox>
  );
}

export default MySettings;
