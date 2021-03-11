import { Jumbotron as JumbotronBase } from 'react-bootstrap';
import styled from 'styled-components';

export const CardDeck = styled.div`
	display: flex;
	flex-flow: column nowrap;

	@media (min-width: 992px) {
		flex-flow: row wrap;
	}
`;

export const AddSensorCard = styled.div`
	flex: 0 1 33%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background: #f7f7f7;
	cursor: pointer;
	margin-bottom: 200px;
	padding: 20px 0;

	@media (min-width: 992px) {
		margin-bottom: unset;
		padding: unset;
	}
	p {
		margin-top: 6px;
		font-size: 2rem;
	}
`;

// SENSOR PAGE:

export const Jumbotron = styled(JumbotronBase)`
	padding: 2rem;

	@media (min-width: 992px) {
		padding: 3rem 2rem;
	}
`;

export const SummaryContainer = styled.div`
	display: flex;

	h1 {
		font-size: 2rem;
	}

	h2 {
		font-size: 1.5rem;
	}

	h3 {
		font-size: 1.2rem;
	}

	@media (min-width: 992px) {
		h1 {
			font-size: 2.5rem;
		}

		h2 {
			font-size: 1.75rem;
		}

		h3 {
			font-size: 1.45rem;
		}
	}
`;

export const IconContainer = styled.div`
	display: flex;
	align-items: center;
	margin-right: 20px;

	@media (min-width: 992px) {
		margin-right: 50px;
	}
`;

export const TextWrapper = styled.div``;
