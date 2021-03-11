import axios from 'axios';

const { REACT_APP_API_ADDRESS, REACT_APP_API_PORT } = process.env;
const baseURL = `http://${REACT_APP_API_ADDRESS}:${REACT_APP_API_PORT}`;

export const instance = axios.create({
	baseURL,
});

export default instance;
