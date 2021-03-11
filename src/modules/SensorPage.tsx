import React, { useEffect, useCallback, useState } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { CpuFill } from 'react-bootstrap-icons';
import { useParams } from 'react-router';
import { Sensor } from '../apiModels';
import axios from '../axios';
import SingleSensorCharts from './Charts/SingleSensorCharts';
import { IconContainer, Jumbotron, SummaryContainer, TextWrapper } from './parts';

interface SensorPageProps { }

interface ParamsType {
	id: string;
}

const SensorPage: React.FC<SensorPageProps> = () => {
	const { id: sensorId } = useParams<ParamsType>();
	const [sensorData, setSensorData] = useState<Sensor>();

	const getDeviceData = useCallback(async () => {
		try {
			const { data } = await axios.get(`/sensors/${sensorId}`);
			setSensorData(data);
		} catch (e) {
			console.log('nie udało się pobrać danych czujnika', e);
		}
	}, [sensorId]);

	useEffect(() => {
		document.title = 'Sensoberry - Wybrany czujnik';
		getDeviceData();
	}, [getDeviceData]);

	return (
		<>
			{sensorData ? (
				<>
					<Jumbotron>
						<SummaryContainer>
							<IconContainer>
								<CpuFill size={60} />
							</IconContainer>
							<TextWrapper>
								<h1>{sensorData.custom_name}</h1>
								<h2>Unikalne ID: {sensorData.unique_id}</h2>
								<h3>Wersja oprogramowania: {sensorData.firmware_version}</h3>
							</TextWrapper>
						</SummaryContainer>
					</Jumbotron>
					<Container>
						<SingleSensorCharts sensorId={sensorId} />
					</Container>
				</>
			) : (
					<Spinner animation='border' />
				)}
		</>
	);
};

export default SensorPage;
