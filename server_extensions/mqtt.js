const mqtt = require('mqtt');
const {
	models: { SettingsModel, SensorModel },
	helpers: { getReadingsCollectionModel },
} = require('./mongo');
const verifyServerIP = require('./ip');

const initializeMqtt = async () => {
	await verifyServerIP();
	const [mqttAddress] = await SettingsModel.find({ settingName: 'serverIP' });
	const mqttConnectionString = `mqtt://${mqttAddress.value}:1883`;

	const client = mqtt.connect(mqttConnectionString);
	client.on('connect', () => onConnect(client));
	client.on('message', onMessage);
};

const onConnect = async (client) => {
	console.log('połączono z brokerem mqtt');

	const devices = await SensorModel.find();

	devices.forEach((device) => {
		const { unique_id } = device;
		console.log('subskrybcja kanału', unique_id);
		client.subscribe(unique_id);
	});
};

const onMessage = async (topic, message) => {
	const sensorMessage = JSON.parse(message.toString()); // message is Buffer

	try {
		const timestamp = roundToNearestMinute(new Date());
		const ReadingModel = getReadingsCollectionModel(topic);
		delete sensorMessage.unique_id;

		const newReading = new ReadingModel({
			timestamp,
			...sensorMessage,
		});

		await newReading.save();
	} catch (e) {
		console.log(e);
	}
};

const roundToNearestMinute = (date) => {
	const ms = 1000 * 60;
	const roundedDate = new Date(Math.round(date.getTime() / ms) * ms);

	return roundedDate;
};

module.exports = initializeMqtt;
