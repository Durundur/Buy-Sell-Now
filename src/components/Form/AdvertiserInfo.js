
import { Box, Text, Select, Input } from "@chakra-ui/react"
import { TextInput } from './TextInput'
import { useState } from "react";
import categoriesFields from "../categoriesFields";
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { convertNameToRef } from '../../utils/convertNameToRef'

export default function AdvertiserInfo({ data, onInputChange }) {
    return (
        <Formik enableReinitialize initialValues={{ ...data }} validationSchema={Yup.object().shape({
            advertiser: Yup.object().shape({
                name: Yup.string().required('Pole obowiązkowe'),
                phoneNumber: Yup.string().matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/).max(13, 'Niepoprawny numer telefonu').required('Pole obowiązkowe').trim()
            }),
            localization: Yup.object().shape({
                place: Yup.string().min(2, 'Niepoprawna nazwa miejscowości').required('Pole obowiązkowe'),
            })
        })} >
            <Form >
                <TextInput onChange={(e) => onInputChange(e)} label="osoba kontaktowa" name="advertiser.name" type="text" placeholder="" />
                <TextInput onChange={(e) => onInputChange(e)} label="numer telefonu" name="advertiser.phoneNumber" type="text" placeholder="" />
                <TextInput onChange={(e) => onInputChange(e)} label="lokalizacja" name="localization.place" type="text" placeholder="" />
            </Form>
        </Formik>
    )
} 
