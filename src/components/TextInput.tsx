import React from 'react';
import { Form } from 'react-bootstrap';

interface TextInputProps {
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	placeholder?: string;
	bottomText?: string;
	disabled?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({ value, onChange, placeholder, bottomText, disabled }) => {
	return (
		<Form.Group>
			<Form.Control type='text' value={value} placeholder={placeholder} disabled={disabled} onChange={onChange} />
			{bottomText && <Form.Text className='text-muted'>{bottomText}</Form.Text>}
		</Form.Group>
	);
};

export default TextInput;
