import styled from 'styled-components';
import { Card as CardBase } from 'react-bootstrap';

// SENSOR CARD

export const CardContainer = styled.div`
	flex: 0 1 33%;
	margin-bottom: 10px;
`;

export const Card = styled(CardBase)`
	width: 100%;
	height: 100%;
	padding: 6px;
`;

export const CardHeader = styled(CardBase.Header)`
	display: flex;
	justify-content: space-between;
	padding-top: 20px;
`;

export const CardBody = styled(CardBase.Body)`
	display: flex;
	padding: 24px 16px;
`;

export const SensorDetailsContainer = styled.div`
	margin-left: 16px;

	p {
		margin: 0;
	}
`;

export const CardFooter = styled(CardBase.Footer)`
	display: flex;
	justify-content: flex-end;
`;

export const Hr = styled.hr`
	border: 1px solid #aaa;
	width: 90%;

	@media (min-width: 768px) {
		display: none;
	}
`;

// ACTIVE INDICATOR
export const Title = styled.p`
	margin-left: 4px;
	margin-bottom: 0;
	/* font-weight: bold; */
`;

export const IndicatorContainer = styled.div<{ active: boolean }>`
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: default;
	position: absolute;
	right: 16px;
	top: 10px;

	${Title} {
		color: ${({ active }) => (active ? 'green' : '#d74904')};
	}
`;
