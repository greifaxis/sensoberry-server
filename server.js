const path = require('path');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./server_extensions/router');
const initializeMqtt = require('./server_extensions/mqtt');
const { db } = require('./server_extensions/mongo');
require('dotenv').config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'build')));
app.use('/', router);

const mongoConnectionInterval = setInterval(() => {
	if (db.readyState === 1) {
		initializeMqtt();
		clearInterval(mongoConnectionInterval);
	}
}, 1000);

const port = process.env.REACT_APP_API_PORT;

app.listen(port, () => {
	console.log('serwer startuje na porcie ' + port);
});
