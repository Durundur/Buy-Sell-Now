
import { Box, Text, Select, Input } from "@chakra-ui/react"
import { TextInput } from './TextInput'
import { useState } from "react";
import categoriesFields from "../categoriesFields";
import { Form, Formik } from 'formik';
import { SelectInput } from "./SelectInput";

export default function AdDetailsInputs({ data }) {
    const detailsFields = categoriesFields.find(o => o.subCategoryName.includes(data?.subCategory))?.fields

    return (
        <Box boxShadow={'md'} bg={'#fff'} borderRadius={'20px'} padding={'20px'}>
            <Box maxW={'30%'}>
                <Text mb={'30px'} fontWeight={'bold'} fontSize={'md'}>Dodatkowe informacje</Text>
                <Formik initialValues={{ ...data }}>
                    <Form>
                        {
                            detailsFields?.map((field, index) => {
                                let fieldKeys = field.name?.split('.')
                                let refValue = data
                                for (let i = 0; i < fieldKeys.length - 1; i++) {
                                    refValue = refValue?.[fieldKeys[i]]
                                }
                                const fieldValue = refValue?.[fieldKeys[fieldKeys.length - 1]] || ''
                                console.log(field)
                                return (
                                    field?.type === 'select' ?
                                        <SelectInput key={index} label={field?.label} name={field?.name} value={fieldValue}>
                                            <option style={{ textTransform: 'capitalize' }}>{field.placeholder}</option>
                                            {
                                                field.values.map((option, index) => {
                                                    return (
                                                        <option style={{ textTransform: 'capitalize' }} key={field?.label + field?.name + index} value={option}>{option}</option>
                                                    )
                                                })
                                            }
                                        </SelectInput>
                                        :
                                        <TextInput value={fieldValue} name={field?.name} label={field?.label}></TextInput>
                                )
                            })
                        }
                    </Form>
                </Formik>
            </Box>
        </Box>
    )
}