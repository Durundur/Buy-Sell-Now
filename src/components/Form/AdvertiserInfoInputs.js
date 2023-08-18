
import { TextInput } from './TextInput'
import { LocalizationSuggestionForm } from './LocatizationSuggestion'
export default function AdvertiserInfoInputs({ onInputChange, localizationInputName }) {
    return (<>
        <TextInput onChange={(e) => onInputChange(e)} label="osoba kontaktowa" name="advertiser.name" type="text" placeholder="" />
        <TextInput onChange={(e) => onInputChange(e)} label="numer telefonu" name="advertiser.phoneNumber" type="text" placeholder="" />
        <LocalizationSuggestionForm onInputChange={(e) => { onInputChange(e) }} label="lokalizacja" name={localizationInputName || "advertiser.address"} type="text"></LocalizationSuggestionForm>
    </>)
} 
