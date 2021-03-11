const express = require('express');
const { hashPassword, compareHash } = require('./hash');
const scanSerialPorts = require('./serial');
const {
	models: { UserModel, SensorModel, SettingsModel },
} = require('./mongo');
const readingsRouter = require('./readings');

const router = express.Router();

router.use('/readings', readingsRouter);

router.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../build/index.html'));
});

router.get('/checkAdmin', async (req, res) => {
	try {
		const admin = await UserModel.find({ name: 'admin' });
		if (!admin.length) {
			return res.status(404).end();
		}

		return res.status(200).end();
	} catch (e) {
		console.log(e);
		return res.status(500).end();
	}
});

router.post('/register', async (req, res) => {
	const { password: plainTextPassword } = req.body;
	const hashedPassword = await hashPassword(plainTextPassword);
	const newUser = new UserModel({ name: 'admin', password: hashedPassword });

	try {
		await newUser.save();
		return res.status(201).end();
	} catch (e) {
		console.log(e);
		return res.status(500).end();
	}
});

router.post('/login', async (req, res) => {
	const { password: plainTextPassword } = req.body;

	try {
		const adminQueryResult = await UserModel.findOne({ name: 'admin' });
		const isAuth = await compareHash(plainTextPassword, adminQueryResult.password);

		if (!isAuth) {
			return res.status(401).end();
		}

		return res.status(200).end();
	} catch (e) {
		console.log(e);
		return res.status(500).end();
	}
});

router.get('/settings/:group', async (req, res) => {
	const settingGroup = req.params.group;

	try {
		const settings = await SettingsModel.find({ settingGroup });

		settings.forEach(({ settingName, value }, index) => {
			if (settingName === 'wifiPassword') {
				settings[index].value = Buffer.from(value, 'base64').toString();
			}
		});

		return res.status(200).send(settings).end();
	} catch (e) {
		console.log(e);
		return res.status(500).end();
	}
});

router.patch('/settings', async (req, res) => {
	try {
		req.body.forEach(async (field) => {
			let [name, value] = field;

			if (name === 'wifiPassword') {
				value = Buffer.from(value).toString('base64');
			}

			await SettingsModel.updateOne({ settingName: name }, { $set: { value } });
		});
	} catch (e) {
		console.log(e);
		return res.status(500).end();
	} finally {
		return res.status(200).end();
	}
});

router.get('/sensors', async (req, res) => {
	try {
		const sensors = await SensorModel.find();
		return res.status(200).send(sensors).end();
	} catch (e) {
		console.log(e);
		return res.status(500).end();
	}
});

router.get('/sensors/:id', async (req, res) => {
	const { id } = req.params;

	try {
		const sensorData = await SensorModel.findOne({ unique_id: id });
		return res.status(200).send(sensorData).end();
	} catch (e) {
		console.log(e);
		return res.status(500).end();
	}
});

router.patch('/sensors/:id', async (req, res) => {
	const { id } = req.params;
	return res.status(200).end();
});

router.get('/verifySettings', async (req, res) => {
	const fields = req.query.fields.split(',');
	const settings = await SettingsModel.findOne();

	for (const field of fields) {
		if (!settings.hasOwnProperty(field)) {
			console.log('nie ma takiego pola w ustawieniach: ', field);
			return res.status(400).end();
		}

		if (!settings[field]) {
			console.log('puste pole ', field);
			return res.status(500).end();
		}
	}

	return res.status(200).end();
});

router.get('/detectSensor', async (req, res) => {
	const { customName } = req.query;

	try {
		const deviceData = await scanSerialPorts(customName);

		return res.status(200).send(deviceData).end();
	} catch (e) {
		console.log(e);
		return res.status(500).end();
	}
});

router.get('/*', async (req, res) => {
	res.redirect('/');
});

module.exports = router;
