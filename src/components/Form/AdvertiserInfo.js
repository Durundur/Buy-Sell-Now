import { TextInput } from './TextInput'
import { LocalizationSuggestionForm } from './LocatizationSuggestion'

export default function AdvertiserInfoInputs({localizationInputName }) {
    return (<>
        <TextInput label="osoba kontaktowa" name="advertiser.name" type="text" placeholder="" />
        <TextInput label="numer telefonu" name="advertiser.phoneNumber" type="text" placeholder="" />
        <LocalizationSuggestionForm label="lokalizacja" name={localizationInputName || "advertiser.address"}></LocalizationSuggestionForm>
    </>)
} 
