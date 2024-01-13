import axios from 'axios';
import Cookies from 'js-cookie';

const instance = axios.create({
	baseURL: 'http://localhost:3000',
});

instance.interceptors.request.use((request) => {
	const token = Cookies.get('token');

	if (token) {
		request.headers['Authorization'] = `Bearer ${token}`;
	}

	return request;
});

export default instance;
