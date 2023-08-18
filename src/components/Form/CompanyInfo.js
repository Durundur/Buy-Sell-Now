import { TextInput } from './TextInput'
import { TextAreaInput } from './TextAreaInput'
export function CompanyInfo({ onInputChange }) {
    return (<>
        <TextInput onChange={(e) => onInputChange(e)} label="nazwa" name="advertiser.name" type="text" placeholder="" />
        <TextInput onChange={(e) => onInputChange(e)} label="numer telefonu" name="advertiser.phoneNumber" type="text" placeholder="" />
        <TextInput onChange={(e) => onInputChange(e)} label="ulica" name="advertiser.address.street" type="text" placeholder="" />
        <TextInput onChange={(e) => onInputChange(e)} label="numer budynku" name="advertiser.address.buildingNumber" type="text" placeholder="" />
        <TextInput onChange={(e) => onInputChange(e)} label="kod pocztowy" name="advertiser.address.postcode" type="text" placeholder="" />
        <TextInput onChange={(e) => onInputChange(e)} label="miasto" name="advertiser.address.city" type="text" placeholder="" />
        <TextAreaInput onChange={(e) => onInputChange(e)} name={'advertiser.aboutCompany'} label={'O firmie'} placeholder='Informacje o firmie'></TextAreaInput>
        <TextInput onChange={(e) => onInputChange(e)} label="strona internetowa" name="advertiser.companyWebsite" type="text" placeholder="" />

    </>)
}