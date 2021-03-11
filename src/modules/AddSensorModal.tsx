import React, { useState } from 'react';
import { Button, Form, Modal, Spinner } from 'react-bootstrap';
import { Sensor } from '../apiModels';
import axios from '../axios';
import useAlert from '../hooks/useAlert';

interface AddSensorModalProps {
	show: boolean;
	onHide: () => void;
}

const AddSensorModal: React.FC<AddSensorModalProps> = ({ show, onHide }) => {
	const [isWaiting, setIsWaiting] = useState(false);
	const [customName, setCustomName] = useState('');
	const [validated, setValidated] = useState(false);
	const { displayAlert, AlertElement } = useAlert();

	const onChangeCustomName = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCustomName(e.target.value);
		setValidated(false);
	};

	const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		e.stopPropagation();

		setValidated(true);
	};

	const triggerSerialPort = async () => {
		if (!customName) {
			return;
		}

		setIsWaiting(true);

		try {
			const { data } = await axios.get<Sensor>(`/detectSensor?customName=${customName}`);
			displayAlert('success', `Czujnik o id ${data.unique_id} został dodany do systemu pod nazwą ${data.custom_name}.`);
		} catch (error) {
			console.log(error);
			displayAlert('danger', 'Wystąpił błąd. Spróbuj ponownie.');
		} finally {
			setIsWaiting(false);
			setValidated(false);
		}
	};

	return (
		<Modal show={show} size='lg' aria-labelledby='contained-modal-title-vcenter' centered onHide={onHide}>
			<Modal.Header closeButton>
				<Modal.Title id='contained-modal-title-vcenter'>Dodaj czujnik</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<h4>Krok 1</h4>
				<p>Zrób cośtam i naciśnij przycisk</p>
				<Form noValidate validated={validated} onSubmit={onFormSubmit}>
					<Form.Group>
						<Form.Control required type='text' value={customName} placeholder='Nazwa czujnika...' onChange={onChangeCustomName} />
						<Form.Text className='text-muted'>Nazwa czujnika wyświetlana w systemie (np. "czujnik na piętrze").</Form.Text>
						<Form.Control.Feedback type='invalid'>Nazwa nie może być pusta.</Form.Control.Feedback>
					</Form.Group>

					<Button variant='info' type='submit' onClick={triggerSerialPort} disabled={isWaiting}>
						{isWaiting ? (
							<>
								<Spinner as='span' animation='border' size='sm' role='status' aria-hidden='true' />
								<span className='ml-2'>Przetwarzanie...</span>
							</>
						) : (
							<span>Gotowe</span>
						)}
					</Button>
				</Form>

				<AlertElement />
			</Modal.Body>
			<Modal.Footer>
				<Button variant='secondary' onClick={onHide}>
					Anuluj
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default AddSensorModal;
