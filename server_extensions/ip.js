const { networkInterfaces } = require('os');
const {
	models: { SettingsModel },
} = require('./mongo');

const getServerIP = () => {
	const interfaces = networkInterfaces();

	// FOR WINDOWS:

	if (interfaces.hasOwnProperty('Wi-Fi')) {
		const interface = interfaces['Wi-Fi'].find((el) => el.address.includes('192.168'));
		return interface.address;
	}

	if (interfaces.hasOwnProperty('Ethernet')) {
		const interface = interfaces['Ethernet'].find((el) => el.address.includes('192.168'));
		return interface.address;
	}

	// FOR LINUX:

	const wlanInterfaces = Object.keys(interfaces).filter((name) => name.includes('wlan'));
	for (const wlan of wlanInterfaces) {
		const interface = interfaces[wlan].find((el) => el.address.includes('192.168'));
		if (interface) {
			return interface.address;
		}
	}

	return '127.0.0.1';
};

const verifyIP = async () => {
	const currentIP = getServerIP();
	const { value: shouldUseDefaultBroker } = await SettingsModel.findOne({ settingName: 'shouldUseDefaultBroker' });
	const dbServerIP = await SettingsModel.findOne({ settingName: 'serverIP' });

	if (currentIP !== dbServerIP.value && shouldUseDefaultBroker) {
		dbServerIP.value = currentIP;
		await dbServerIP.save();
	}
};

module.exports = verifyIP;
