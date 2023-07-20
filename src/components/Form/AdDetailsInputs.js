import { Box, Text, Select, Input } from "@chakra-ui/react"
import { TextInput } from './TextInput'
import { useState } from "react";
import categoriesFields from "../categoriesFields";
import { Form, Formik } from 'formik';
import { SelectInput } from "./SelectInput";
import { convertNameToRef } from "../../utils/convertNameToRef";

export default function AdDetailsInputs({ data, onInputChange }) {
    const detailsFields = categoriesFields.find(o => o.subCategoryName.includes(data?.subCategory))?.fields

    return (
        <Formik enableReinitialize initialValues={{ ...data }}>
            <Form >
                {
                    detailsFields?.map((field, index) => {
                        return (
                            field?.type === 'select' ?
                                <SelectInput onChange={(e) => onInputChange(e)} key={index} label={field?.label} name={field?.name}>
                                    <option disabled hidden>{field.placeholder}</option>
                                    {
                                        field.values.map((option, index) => {
                                            return (
                                                <option key={field?.label + field?.name + index} value={option}>{option}</option>
                                            )
                                        })
                                    }
                                </SelectInput>
                                :
                                <TextInput key={index} onChange={(e) => onInputChange(e)} name={field?.name} label={field?.label}></TextInput>
                        )
                    })
                }
            </Form>
        </Formik>
    )
}