import React, { useState, useEffect } from 'react';
import { PlusSquare } from 'react-bootstrap-icons';
import { Sensor } from '../apiModels';
import axios from '../axios';
import { AddSensorCard, CardDeck } from './parts';
import SensorCard from '../components/SensorCard';
import AddSensorModal from './AddSensorModal';

const SensorsList: React.FC = () => {
	const [sensors, setSensors] = useState<Sensor[]>([]);
	const [showModal, setShowModal] = useState(false);

	const fetchSensors = async () => {
		try {
			const { data: fetchedSensors } = await axios.get<Sensor[]>('/sensors');
			setSensors(fetchedSensors);
		} catch (e) {
			console.log(e);
		}
	};
	useEffect(() => {
		document.title = 'Sensoberry - Lista czujników';

		fetchSensors();
	}, []);

	return (
		<>
			<CardDeck>
				{sensors.map(({ _id, unique_id, firmware_version, custom_name }) => (
					<SensorCard
						key={_id}
						sensorId={unique_id}
						customName={custom_name || unique_id}
						firmwareVersion={firmware_version}
						isActive={true}
					/>
				))}

				<AddSensorCard onClick={() => setShowModal(true)}>
					<PlusSquare color={'#444'} size={120} />
					<p>Dodaj czujnik</p>
				</AddSensorCard>
			</CardDeck>
			<AddSensorModal show={showModal} onHide={() => setShowModal(false)} />
		</>
	);
};

export default SensorsList;
