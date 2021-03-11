
export interface MongoObject {
	__v: number;
	_id: string;
}

export type SettingField = 'ssid' | 'wifiPassword' | 'shouldUseDefaultBroker' | 'serverIP';
export type SettingGroup = 'network' | 'mqtt';

export interface Setting extends MongoObject {
	settingName: SettingField;
	settingGroup: SettingGroup;
	value: string | number | boolean;
}

export interface Sensor extends MongoObject {
	unique_id: string;
	firmware_version: string;
	custom_name: string;
}

export interface Reading extends MongoObject {
	timestamp: Date;
	temperature: number;
	pressure: number;
	humidity: number;
	luminance: number;
	motion: boolean;
}

export type ReadingField = 'temperature' | 'pressure' | 'humidity' | 'luminance';

export type ReadingIntervalMode = '1h' | '24h' | '12h' | 'week' | 'month';
