
import { Box, Text, Select, Input } from "@chakra-ui/react"
import { TextInput } from './TextInput'
import { useState } from "react";
import categoriesFields from "../categoriesFields";
import { Form, Formik } from 'formik';

export default function AdvertiserInfo({ onInputChange }) {
    return (<>
        <TextInput onChange={(e) => onInputChange(e)} label="osoba kontaktowa" name="advertiser.name" type="text" placeholder="" />
        <TextInput onChange={(e) => onInputChange(e)} label="numer telefonu" name="advertiser.phoneNumber" type="text" placeholder="" />
        <TextInput onChange={(e) => onInputChange(e)} label="lokalizacja" name="localization.place" type="text" placeholder="" />
    </>)
} 
