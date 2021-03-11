import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import TextInput from '../../components/TextInput';
import PasswordInput from '../../components/PasswordInput';
import useSettings from '../../hooks/useSettings';

interface NetworkSettingsProps {}

const NetworkSettings: React.FC<NetworkSettingsProps> = () => {
	const { settings, onChangeField, hasChangedSettings, onUpdateSetting, AlertElement } = useSettings('network');

	return (
		<>
			<Row className='mb-3'>
				<Col xs={3}>SSID</Col>

				<Col xs={9}>
					<TextInput
						value={(settings.ssid as string) || ''}
						placeholder='SSID...'
						bottomText='Nazwa sieci bezprzewodowej z którą ma połączyć się czujnik'
						onChange={onChangeField('ssid')}
					/>
				</Col>
			</Row>

			<Row className='mb-3'>
				<Col xs={3}>Hasło</Col>

				<Col xs={9}>
					<PasswordInput
						value={(settings.wifiPassword as string) || ''}
						placeholder='Hasło do sieci...'
						bottomText='Hasło do sieci bezprzewodowej o SSID podanym powyżej'
						onChange={onChangeField('wifiPassword')}
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

export default NetworkSettings;
