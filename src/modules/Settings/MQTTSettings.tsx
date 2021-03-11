import React from 'react';
import { Button, Col, FormCheck, Row } from 'react-bootstrap';
import TextInput from '../../components/TextInput';
import useSettings from '../../hooks/useSettings';

interface MQTTSettingsProps {}

const MQTTSettings: React.FC<MQTTSettingsProps> = () => {
	const { settings, onChangeField, hasChangedSettings, onUpdateSetting, AlertElement } = useSettings('mqtt');

	return (
		<>
			<Row className='mb-3'>
				<Col xs={6}>Użyj domyślnego brokera MQTT</Col>
				<Col>
					<FormCheck
						id='default-switch'
						type='switch'
						checked={settings.hasOwnProperty('shouldUseDefaultBroker') ? (settings.shouldUseDefaultBroker as boolean) : false}
						onChange={onChangeField('shouldUseDefaultBroker', true)}
					/>
				</Col>
			</Row>

			<Row className='mb-3'>
				<Col xs={4}>Adres IP brokera</Col>

				<Col xs={8}>
					<TextInput
						disabled={settings.shouldUseDefaultBroker as boolean}
						value={(settings.serverIP as string) || ''}
						placeholder='Adres brokera MQTT'
						bottomText='Jeśli brokerem MQTT jest inne urządzenie w obrębie sieci lokalnej, tu wpisz jego adres.'
						onChange={onChangeField('serverIP')}
					/>
				</Col>
			</Row>

			<Row>
				<Col>
					<AlertElement />
				</Col>
			</Row>
			<Row>
				<Col xs={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
					<Button variant='secondary' disabled={!hasChangedSettings} onClick={onUpdateSetting}>
						Zapisz
					</Button>
				</Col>
			</Row>
		</>
	);
};

export default MQTTSettings;
