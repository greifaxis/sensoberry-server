import React, { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';

export type AlertType = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';

export interface IAlert {
	type: AlertType;
	message: string;
}

export interface AlertOptions {
	dismissible?: boolean;
	hideTimeoutMs?: number;
}

export const defaultAlertOptions: AlertOptions = {
	dismissible: true,
	hideTimeoutMs: 5000,
};

const useAlert = (options: AlertOptions = defaultAlertOptions) => {
	const { dismissible = true, hideTimeoutMs = 5000 } = options;

	const [alert, setAlert] = useState<IAlert>();
	const [shouldShowAlert, setShouldShowAlert] = useState(false);
	const [displayTimeout, setDisplayTimeout] = useState<NodeJS.Timeout>();

	const onHideAlert = () => {
		setAlert(undefined);
		setDisplayTimeout(undefined);
		setShouldShowAlert(false);
	};

	const displayAlert = (type: AlertType, message: string, autoClose = true) => {
		setAlert({
			type,
			message,
		});
		setShouldShowAlert(true);

		if (autoClose) {
			const timeout = setTimeout(() => {
				onHideAlert();
			}, hideTimeoutMs);

			setDisplayTimeout(timeout);
		}
	};

	useEffect(() => {
		return () => {
			if (displayTimeout) clearTimeout(displayTimeout);
		};
	}, []);

	const AlertElement = () =>
		shouldShowAlert ? (
			<Alert variant={alert?.type} onClose={onHideAlert} dismissible={dismissible} className='mt-4'>
				{alert?.message}
			</Alert>
		) : null;

	return {
		AlertElement,
		displayAlert,
	};
};

export default useAlert;
