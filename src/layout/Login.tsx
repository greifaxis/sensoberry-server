import React, { useContext, useEffect, useState } from 'react';
import { Container, FormControl, InputGroup, Button, Jumbotron } from 'react-bootstrap';
import { Redirect } from 'react-router';
import axios from '../axios';
import useAlert from '../hooks/useAlert';
import { AuthContext } from '../hooks/useAuth';
import CreateAdminModal from '../modules/CreateAdminModal';

const Login: React.FC = () => {
	const [password, setPassword] = useState('');
	const [showModal, setShowModal] = useState(false);
	const { auth, isAuth } = useContext(AuthContext);
	const { AlertElement, displayAlert } = useAlert();

	const checkForAdmin = async () => {
		const { status } = await axios.get('/checkAdmin');

		if (status === 404) {
			setShowModal(true);
		}
	};

	useEffect(() => {
		document.title = 'Sensoberry - Logowanie';
		checkForAdmin();
	}, []);

	const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const onAuthorize = async () => {
		const authResult = await auth(password);

		if (!authResult) {
			displayAlert('danger', 'Niepoprawne hasło, spróbuj jeszcze raz.');
		}
	};

	const keyDownListener = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			e.stopPropagation();
			onAuthorize();
		}
	};

	const onRegisterSuccess = () => {
		setShowModal(false);
	};

	if (isAuth) {
		return <Redirect to='/dashboard' />;
	}

	return (
		<Container>
			<Jumbotron>
				<h1>Zaloguj się do systemu</h1>
			</Jumbotron>
			<InputGroup>
				<InputGroup.Prepend>
					<InputGroup.Text>Podaj hasło</InputGroup.Text>
				</InputGroup.Prepend>
				<FormControl type='password' onChange={onChangePassword} onKeyDown={keyDownListener} />

				<InputGroup.Append>
					<Button onClick={onAuthorize} type='submit' variant='outline-secondary'>
						Autoryzuj
					</Button>
				</InputGroup.Append>
			</InputGroup>
			<AlertElement />

			{showModal && <CreateAdminModal onHide={onRegisterSuccess} />}
		</Container>
	);
};

export default Login;
