import React from 'react';
import { Button } from 'react-bootstrap';
import { Cpu } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import ActiveIndicator from './ActiveIndicator';
import { Card, CardBody, CardContainer, CardFooter, CardHeader, Hr, SensorDetailsContainer } from './parts';

interface SensorCardProps {
	sensorId: string;
	firmwareVersion: string;
	customName: string;
	isActive: boolean;
}

const SensorCard: React.FC<SensorCardProps> = ({ sensorId, firmwareVersion, customName, isActive }) => {
	return (
		<CardContainer>
			<Card border='light'>
				<CardHeader>
					{customName}
					<ActiveIndicator active={isActive} />
				</CardHeader>
				<CardBody>
					<Cpu size={40} />
					<SensorDetailsContainer>
						<p>Unikalne ID: {sensorId}</p>
						<p>Wersja systemu: {firmwareVersion}</p>
					</SensorDetailsContainer>
				</CardBody>
				<CardFooter>
					<Link to={`/dashboard/sensors/${sensorId}`}>
						<Button>Zobacz szczegóły</Button>
					</Link>
				</CardFooter>
			</Card>
			<Hr />
		</CardContainer>
	);
};

export default SensorCard;
