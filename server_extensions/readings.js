const express = require('express');
const {
	models: { SensorModel },
	helpers: { getReadingsCollectionModel },
} = require('./mongo');
const dayjs = require('dayjs');

const readingsRouter = express.Router();

readingsRouter.get('/:id', async (req, res) => {
	const { id } = req.params;
	const { mode } = req.query;
	const startingDate = getStartingDate(mode, new Date());
	const ReadingModel = getReadingsCollectionModel(id);

	try {
		const readings = await ReadingModel.find({ timestamp: { $gte: startingDate } }).sort({ timestamp: 'asc' });
		const reduced = getFilteredResults(readings);

		return res.status(200).send(reduced).end();
	} catch (e) {
		console.log(e);
		return res.status(500).end();
	}
});

const getStartingDate = (mode, currentDate) => {
	switch (mode) {
		case '1h':
			return dayjs(currentDate).subtract(1, 'hour');

		case '12h':
			return dayjs(currentDate).subtract(12, 'hours');

		case '24h':
			return dayjs(currentDate).subtract(1, 'day');

		case 'week':
			return dayjs(currentDate).subtract(7, 'days');

		case 'month':
			return dayjs(currentDate).subtract(30, 'days');
	}
};

const getFilteredResults = (readingsArr) => {
	const expectedResultsCount = 60;
	const { length } = readingsArr;

	if (length <= expectedResultsCount) {
		return readingsArr;
	}

	const modulo = length % expectedResultsCount;
	const floor = Math.floor(length / expectedResultsCount);

	return readingsArr.filter((_, idx) => {
		return idx % floor === 0;
	});
};

module.exports = readingsRouter;
