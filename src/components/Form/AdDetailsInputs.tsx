import { TextInput } from './TextInput';
import categoriesFields from '../../utils/Categories/categoriesFields';
import { SelectInput } from './SelectInput';

export default function AdDetailsInputs({ subCategoryName }: { subCategoryName: string }) {
	const detailsFields = categoriesFields.find((o) => o.subCategoryName.includes(subCategoryName))?.fields;
	return (
		<>
			{detailsFields?.map((field, index) => {
				return field?.type === 'select' ? (
					<SelectInput key={index} label={field?.label} defaultValue={' '} name={field?.name}>
						<option value=' ' disabled >
							{field.placeholder}
						</option>
						{field.values?.map((option, index) => {
							return (
								<option key={field?.label + field?.name + index} value={option}>
									{option}
								</option>
							);
						})}
					</SelectInput>
				) : (
					<TextInput key={index} name={field?.name} label={field?.label} placeholder={field.placeholder}></TextInput>
				);
			})}
		</>
	);
}
