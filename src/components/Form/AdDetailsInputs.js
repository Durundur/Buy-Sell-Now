import { TextInput } from './TextInput'
import categoriesFields from "../categoriesFields";
import { SelectInput } from "./SelectInput";

export default function AdDetailsInputs({ subCategoryName }) {
    const detailsFields = categoriesFields.find(o => o.subCategoryName.includes(subCategoryName))?.fields
    return (<>{
        detailsFields?.map((field, index) => {
            return (
                field?.type === 'select' ?
                    <SelectInput key={index} label={field?.label} name={field?.name}>
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
                    <TextInput key={index} name={field?.name} label={field?.label}></TextInput>
            )
        })
    }</>
    )
}
