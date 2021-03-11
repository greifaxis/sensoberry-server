const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const {
	helpers: { createCollection },
	models: { SensorModel, SettingsModel },
	schemas: { readingSchema },
} = require('./mongo');

const listPorts = async () => {
	const ports = await SerialPort.list();
	const portPaths = ports.map((port) => port.path);
	console.log('Found ports: ', portPaths.join(', '));

	return { ports, portPaths };
};

const closePorts = async (portInstances) => {
	portInstances.forEach((portInstance) => {
		portInstance.close((err) => {});
	});
};

const scanSerialPorts = (customName) =>
	new Promise(async (resolve, reject) => {
		const portInstances = [];
		const { portPaths } = await listPorts();

		portPaths.forEach((path) => {
			const portInstance = new SerialPort(path, { baudRate: 115200 });
			const parser = portInstance.pipe(new Readline({ delimiter: '\n' }));
			portInstances.push(portInstance);

			portInstance.on('open', (err) => {
				if (err) {
					return console.log(`Couldn't open port ${path}. Error: `, err);
				}

				console.log(`Port ${path} opened`);
			});

			parser.on('data', async (data) => {
				console.log('got word from arduino: ', data);

				if (data === 'Error mode!') {
					console.log('Urządzenie działa teraz w Error mode - naciśnij przycisk do wchodzenia w config mode');
					return;
				}

				try {
					const parsedData = JSON.parse(data);
					if (parsedData.hasOwnProperty('unique_id')) {
						parsedData.custom_name = customName;
						const { unique_id } = parsedData;

						const device = await SensorModel.find({ unique_id });

						if (!device.length) {
							try {
								await createCollection(unique_id, readingSchema);
								console.log('utworzono kolekcję o nazwie ' + unique_id);

								const newDevice = new SensorModel(parsedData);
								await newDevice.save();
								console.log(`utworzono wpis o ID ${unique_id} w kolekcji devices`);
							} catch (e) {
								console.log(e);
								reject('db error');
							}
						}

						console.log('urządzenie w bazie');

						const settings = await SettingsModel.find();
						const settingsObject = {};

						settings.forEach((setting) => {
							switch (setting.settingName) {
								case 'ssid':
									settingsObject.wifi_ssid = setting.value;
								case 'wifiPassword':
									settingsObject.wifi_password = setting.value;
								case 'serverIP':
									settingsObject.mqtt_address = setting.value;
								default:
									return;
							}
						});

						console.log(JSON.stringify(settingsObject));

						try {
							portInstance.write('R');
							portInstance.write(JSON.stringify(settingsObject));
							console.log('wysłano config na arduino');
							closePorts(portInstances);
							resolve(parsedData);
						} catch (e) {
							console.log(e);
							reject('nie można zapisać do urządzenia');
						}
					}
				} catch (e) {
					console.log('Przekazano niepoprawne dane na serial port');
					console.log(e);
					reject('niepoprawne dane przekazane na serial port');
				}
			});
		});

		setTimeout(() => {
			closePorts(portInstances);
			reject('timeout');
		}, 15000);
	});

module.exports = scanSerialPorts;
