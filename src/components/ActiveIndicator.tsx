import React from 'react';
import { Broadcast } from 'react-bootstrap-icons';
import { Title, IndicatorContainer } from './parts';

interface ActiveIndicatorProps {
	active: boolean;
}

const ActiveIndicator: React.FC<ActiveIndicatorProps> = ({ active }) => {
	return (
		<IndicatorContainer active={active}>
			<Broadcast size={20} color={active ? 'green' : '#d74904'} />
			<Title>{active ? 'Aktywny' : 'Nieaktywny'}</Title>
		</IndicatorContainer>
	);
};

export default ActiveIndicator;
