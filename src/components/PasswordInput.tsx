import React, { useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { EyeFill, EyeSlashFill } from 'react-bootstrap-icons';

interface PasswordInputProps {
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	placeholder?: string;
	bottomText?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ value, onChange, placeholder, bottomText }) => {
	const [shouldHidePassword, setHidePassword] = useState(true);

	return (
		<Form.Group>
			<InputGroup className='mb-3'>
				<Form.Control type={shouldHidePassword ? 'password' : 'text'} value={value} placeholder={placeholder} onChange={onChange} />
				<InputGroup.Append>
					<InputGroup.Text
						onMouseDown={(e: any) => setHidePassword(false)}
						onMouseUp={(e: any) => setHidePassword(true)}
						style={{ cursor: 'pointer' }}
					>
						{shouldHidePassword ? <EyeFill size={20} /> : <EyeSlashFill size={20} />}
					</InputGroup.Text>
				</InputGroup.Append>
			</InputGroup>
			{bottomText && <Form.Text className='text-muted'>{bottomText}</Form.Text>}
		</Form.Group>
	);
};

export default PasswordInput;
