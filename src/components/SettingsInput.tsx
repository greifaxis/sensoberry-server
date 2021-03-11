import React, { CSSProperties, useState } from 'react';
import { Button, Col, Container, FormControl, InputGroup, Row } from 'react-bootstrap';
import { Pencil, XCircle, CheckCircle } from 'react-bootstrap-icons';
import InfoPopover from './InfoPopover';

interface SettingsInputProps {
	settingName: string;
	description: string;
	value: string;
	onUpdateSetting: (settingName: string, newValue: any) => void;
}

const SettingsInput: React.FC<SettingsInputProps> = ({ settingName, description, value, onUpdateSetting }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [newValue, setNewValue] = useState<string>(value || '');

	const onEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewValue(e.target.value);
	};

	const onStartEditing = () => setIsEditing(true);
	const onCancelEditing = () => setIsEditing(false);

	const onSubmitNewValue = () => {
		onUpdateSetting(settingName, newValue);
	};

	return (
		<Container style={settingStyles}>
			{isEditing ? (
				<Row style={rowStyles}>
					<Col xs={4} md={3} lg={2}>
						{settingName}{' '}
					</Col>
					<Col xs={8} md={9} lg={10}>
						<InputGroup>
							<FormControl value={newValue} onChange={onEdit} />
							<InputGroup.Append>
								<Button variant='primary' style={buttonStyle} onClick={onSubmitNewValue}>
									<CheckCircle />
									<p>&nbsp;</p>
									Wyślij
								</Button>
							</InputGroup.Append>
							<InputGroup.Append>
								<Button variant='secondary' style={buttonStyle} onClick={onCancelEditing}>
									<XCircle />
									<p>&nbsp;</p>
									Anuluj
								</Button>
							</InputGroup.Append>
						</InputGroup>
					</Col>
				</Row>
			) : (
				<Row style={rowStyles}>
					<Col xs={1}>
						<InfoPopover text={description} />
					</Col>
					<Col xs={4} md={3} lg={2}>
						{settingName}{' '}
					</Col>
					<Col xs={6} md={7} lg={8}>
						<FormControl value={value || ''} onChange={(e) => e.preventDefault()} />
					</Col>
					<Col xs={1}>
						<div title='Edytuj' style={editContainerStyles} onClick={onStartEditing}>
							<Pencil color={'royalblue'} size={20} />
						</div>
					</Col>
				</Row>
			)}
		</Container>
	);
};

const settingStyles: CSSProperties = {
	marginBottom: 16,
};

const flexRowStyle: CSSProperties = { display: 'flex', alignItems: 'center' };

const buttonStyle: CSSProperties = { ...flexRowStyle, height: 38 };

const rowStyles: CSSProperties = {
	...buttonStyle,
	marginBottom: 14,
};

const editContainerStyles: CSSProperties = {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	width: 30,
	height: 20,
	cursor: 'pointer',
};

export default SettingsInput;
