import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import axios from '../axios';

interface CreateAdminModalProps {
	onHide: () => void;
}

const CreateAdminModal: React.FC<CreateAdminModalProps> = ({ onHide }) => {
	const [newPassword, setNewPassword] = useState('');

	const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewPassword(e.target.value);
	};

	const onSubmit = async () => {
		if (!newPassword) return;

		try {
			const { status } = await axios.post('/register', { password: newPassword });

			if (status === 201) {
				onHide();
			}
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<Modal show onHide={() => false} size='lg' aria-labelledby='contained-modal-title-vcenter' centered>
			<Modal.Header>
				<Modal.Title id='contained-modal-title-vcenter'>Pierwszy raz w aplikacji?</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<h5>Dodaj hasło autoryzacyjne</h5>
				<p>
					Aby móc korzystać z aplikacji, wymagane jest utworzenie hasła dostępowego, z którego następnie będziesz mógł korzystać na
					każdym urządzeniu, aby uzyskać dostęp do panelu sterowania.
				</p>

				<Form onSubmit={(e) => e.preventDefault()}>
					<Form.Group controlId='formBasicEmail'>
						<Form.Label>Twoje hasło dostępowe</Form.Label>
						<Form.Control type='password' placeholder='Podaj hasło...' value={newPassword} onChange={onChangePassword} />
					</Form.Group>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant='info' type='submit' onClick={onSubmit} className='mb-2' block>
					Zapisz hasło
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default CreateAdminModal;
