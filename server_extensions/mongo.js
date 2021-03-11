const mongoose = require('mongoose');
const { Schema } = mongoose;
const dbName = 'server';
const mongoURI = `mongodb+srv://admin:admin@sensory.fpu7r.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose.pluralize(null);
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }).catch(console.log);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
	console.log('połączono z bazą danych');
});

// MODELS AND SCHEMAS

const userSchema = new Schema({
	name: String,
	password: String,
});

const UserModel = mongoose.model('users', userSchema);

const settingSchema = new Schema({
	settingName: String,
	settingGroup: String,
	value: Schema.Types.Mixed,
});

const SettingsModel = mongoose.model('settings', settingSchema);

const sensorSchema = new Schema({
	unique_id: String,
	firmware_version: Number,
	custom_name: { type: String, default: '' },
});

const SensorModel = mongoose.model('devices', sensorSchema);

const readingSchema = new Schema({
	timestamp: Date,
	temperature: Number,
	pressure: Number,
	humidity: Number,
	luminance: Number,
	motion: Boolean,
});

// HELPERS:

const getReadingsCollectionModel = (sensorId) => mongoose.model(sensorId, readingSchema);

const createCollection = async (collectionName, schema) => {
	const model = mongoose.model(collectionName, schema);
	try {
		await model.createCollection();
	} catch (e) {
		console.log('Error on creating collection', e);
	}
};

module.exports = {
	db,
	models: {
		UserModel,
		SensorModel,
		SettingsModel,
	},
	schemas: {
		sensorSchema,
		readingSchema,
	},
	helpers: {
		createCollection,
		getReadingsCollectionModel,
	},
};
