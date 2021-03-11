import React, { useCallback, useEffect, useState } from 'react';
import { Form, FormGroup } from 'react-bootstrap';
import axios from '../../axios';
import { Reading, ReadingField, ReadingIntervalMode } from '../../apiModels';
import { formatData, getUnit, translateField } from './helpers';
import LineChart from './LineChart';
import { ReadingContainer } from './parts';

interface SingleSensorChartsProps {
	sensorId: string;
}

const readingFields: ReadingField[] = ['temperature', 'pressure', 'humidity', 'luminance'];
const readingIntervalModes: ReadingIntervalMode[] = ['1h', '12h', '24h', 'week', 'month'];
const readingIntervalTranslations = {
	'1h': 'ostatnia godzina',
	'12h': 'ostatnie 12 godzin',
	'24h': 'ostatnia doba (24h)',
	week: 'ostatni tydzień',
	month: 'ostatni miesiąc',
};

const SingleSensorCharts: React.FC<SingleSensorChartsProps> = ({ sensorId }) => {
	const [readings, setReadings] = useState<Reading[]>([]);
	const [modeValue, setModeValue] = useState<ReadingIntervalMode>('1h');

	const onChangeModeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setModeValue(e.target.value as ReadingIntervalMode);
	};

	const fetchReadings = useCallback(async () => {
		try {
			const { data } = await axios.get(`/readings/${sensorId}?mode=${modeValue}`);
			setReadings(data);
		} catch (e) {}
	}, [sensorId, modeValue]);

	useEffect(() => {
		fetchReadings();
	}, [modeValue, fetchReadings]);

	return (
		<div>
			<FormGroup>
				<Form.Label>Tryb</Form.Label>
				<Form.Control as='select' size='sm' custom onChange={onChangeModeSelect}>
					{readingIntervalModes.map((mode, idx) => (
						<option key={idx} value={mode}>
							{readingIntervalTranslations[mode]}
						</option>
					))}
				</Form.Control>
			</FormGroup>

			{readingFields.map((field) => (
				<ReadingContainer key={field}>
					<h3>Pomiar: {translateField(field)}</h3>
					<LineChart data={formatData(readings, field)} mode={modeValue} unit={getUnit(field)} />
				</ReadingContainer>
			))}
		</div>
	);
};

export default SingleSensorCharts;
