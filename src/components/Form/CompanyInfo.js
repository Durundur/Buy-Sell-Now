import { TextInput } from './TextInput';
import { TextAreaInput } from './TextAreaInput';
import { LocalizationSuggestionForm } from './LocatizationSuggestion';


export function CompanyInfo(){
    return (<>
        <TextInput label="nazwa" name="advertiser.name" type="text" placeholder="" />
        <TextInput label="numer telefonu" name="advertiser.phoneNumber" type="text" placeholder="" />
        <TextInput label="ulica" name="advertiser.address.street" type="text" placeholder="" />
        <TextInput label="numer budynku" name="advertiser.address.buildingNumber" type="text" placeholder="" />
        <TextInput  label="kod pocztowy" name="advertiser.address.postcode" type="text" placeholder="" />
        <LocalizationSuggestionForm label="miasto" name={"advertiser.address"} type="text"></LocalizationSuggestionForm>
        <TextAreaInput  name={'advertiser.aboutCompany'} label={'O firmie'} placeholder='Informacje o firmie'></TextAreaInput>
        <TextInput label="NIP" name="advertiser.nip" type="text" placeholder="" />
        <TextInput label="e-mail" name="advertiser.email" type="text" placeholder="" />
        <TextInput label="strona internetowa" name="advertiser.companyWebsite" type="text" placeholder="" />
    </>)
}