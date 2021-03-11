const addSettings = () => {
	const x = [
		{
			name: 'ssid',
			settingGroup: 'networkSettings',
			defaultValue: '',
		},
		{
			name: 'wifiPassword',
			settingGroup: 'networkSettings',
			defaultValue: '',
		},
		{
			name: 'shouldUseDefaultIP',
			settingGroup: 'mqttSettings',
			defaultValue: true,
		},
		{
			name: 'mqttAddress',
			settingGroup: 'mqttSettings',
			defaultValue: '',
		},
	];

	x.forEach(async (item) => {
		const setting = new SettingsModel({
			settingName: item.name,
			settingGroup: item.settingGroup,
			value: item.defaultValue,
		});

		try {
			await setting.save();
		} catch (e) {
			console.log(e);
		}
	});
};
