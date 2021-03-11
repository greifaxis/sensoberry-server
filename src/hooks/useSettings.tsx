import { useState, useEffect, useCallback } from 'react';
import { Setting, SettingField, SettingGroup } from '../apiModels';
import axios from '../axios';
import useAlert from './useAlert';

type SettingsObject = Record<SettingField, string | number | boolean>;
type PartialSettings = Partial<SettingsObject>;

const useSettings = (settingGroup: SettingGroup) => {
	const { AlertElement, displayAlert } = useAlert();
	const [initialValues, setInitialValues] = useState<PartialSettings>({});
	const [settings, setSettings] = useState<PartialSettings>({});
	const [hasChangedSettings, setChangedSettings] = useState(false);

	const getInitialSettings = useCallback(async () => {
		try {
			const { data } = await axios.get<Setting[]>(`/settings/${settingGroup}`);
			const fetchedInitialValues: PartialSettings = {};

			data.forEach(({ settingName, value }) => {
				fetchedInitialValues[settingName] = value;
			});

			setInitialValues(fetchedInitialValues);
			setSettings(fetchedInitialValues);
			setChangedSettings(false);
		} catch (e) {
			console.log(e);
		}
	}, [settingGroup]);

	const onChangeField = (fieldName: SettingField, isSwitch?: boolean) => (e: React.ChangeEvent<HTMLInputElement>) => {
		setSettings((prevSettings) => ({
			...prevSettings,
			[fieldName]: isSwitch ? e.target.checked : e.target.value,
		}));
	};

	const onUpdateSetting = async () => {
		const { status } = await axios.patch('/settings', Object.entries(settings));

		if (status === 200) {
			displayAlert('success', 'Zaktualizowano dane.');
			getInitialSettings();
		} else {
			displayAlert('danger', 'Wystąpił błąd.');
		}
	};

	useEffect(() => {
		getInitialSettings();
	}, [getInitialSettings]);

	useEffect(() => {
		if (Object.entries(initialValues).toString() !== Object.entries(settings).toString()) {
			setChangedSettings(true);
		} else {
			setChangedSettings(false);
		}
	}, [settings, initialValues]);

	return {
		settings,
		onChangeField,
		hasChangedSettings,
		onUpdateSetting,
		AlertElement,
	};
};

export default useSettings;
