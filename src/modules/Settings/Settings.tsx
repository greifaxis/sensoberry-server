import React, { useEffect } from 'react';
import { Col, Container } from 'react-bootstrap';
import MQTTSettings from './MQTTSettings';
import NetworkSettings from './NetworkSettings';
import SectionContainer from './SectionContainer';

interface SettingsProps {}

const Settings: React.FC<SettingsProps> = () => {
	useEffect(() => {
		document.title = 'Sensoberry - Ustawienia';
	}, []);

	return (
		<Container>
			<Col xs={12} lg={8} xl={6} className='m-auto'>
				<SectionContainer title='Ustawienia sieciowe'>
					<NetworkSettings />
				</SectionContainer>
				<SectionContainer title='Broker MQTT'>
					<MQTTSettings />
				</SectionContainer>
			</Col>
		</Container>
	);
};

export default Settings;
