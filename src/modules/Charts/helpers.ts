import { Serie, Datum } from '@nivo/line';
import dayjs from 'dayjs';
import { Reading, ReadingField, ReadingIntervalMode } from '../../apiModels';

export const formatData = (data: Reading[], readingField: ReadingField): Serie[] => {
	const formattedData: Datum[] = data.map((reading) => ({
		x: formatDateTimestamp(reading.timestamp),
		y: reading[readingField].toFixed(2),
	}));

	return [
		{
			id: translateField(readingField),
			data: formattedData,
		},
	];
};

export const dateAndTimeFormat = 'DD.MM.YYYY HH:mm:ss';

export const formatDateTimestamp = (timestamp: Date) => dayjs(timestamp).format(dateAndTimeFormat);

const units = {
	temperature: '*C',
	pressure: 'hPa',
	humidity: '%',
	luminance: 'lux',
};

export const getUnit = (field: ReadingField) => units[field];

const translations = {
	temperature: 'temperatura',
	pressure: 'ciśnienie',
	humidity: 'wilgotność',
	luminance: 'nasłonecznienie',
};

export const translateField = (field: ReadingField) => translations[field];

interface ChartConfig {
	minDate: string;
	maxDate: string;
	bottomAxisFormat: string;
	tickValues: string;
}

export const getChartConfig = (mode: ReadingIntervalMode, currentDate: Date): ChartConfig => {
	let startingDateObject: dayjs.Dayjs;
	let bottomAxisFormat: string;
	let tickValues: string;

	switch (mode) {
		case '1h':
			startingDateObject = dayjs(currentDate).subtract(1, 'hour');
			bottomAxisFormat = '%H:%M:%S';
			tickValues = 'every 5 minutes';
			break;
		case '12h':
			startingDateObject = dayjs(currentDate).subtract(12, 'hours');
			bottomAxisFormat = '%d/%m %H:%M';
			tickValues = 'every 2 hours';
			break;
		case '24h':
			startingDateObject = dayjs(currentDate).subtract(1, 'day');
			bottomAxisFormat = '%d/%m \n %H:%M';
			tickValues = 'every 3 hours';
			break;
		case 'week':
			startingDateObject = dayjs(currentDate).subtract(7, 'days');
			bottomAxisFormat = '%H:%M:%S';
			bottomAxisFormat = '%d/%m';
			tickValues = 'every day';
			break;
		case 'month':
			startingDateObject = dayjs(currentDate).subtract(30, 'days');
			bottomAxisFormat = '%d/%m/%Y';
			tickValues = 'every 4 days';
			break;
	}

	return {
		minDate: startingDateObject.format(dateAndTimeFormat),
		maxDate: formatDateTimestamp(currentDate),
		bottomAxisFormat,
		tickValues,
	};
};

export const getAxisBottomFormat = (mode: ReadingIntervalMode) => {
	switch (mode) {
		case '1h':
			return '%H:%M:%S';
		case '12h':
			return;
		case '24h':
			return;
		case 'week':
			return;
		case 'month':
			return;
	}
};
