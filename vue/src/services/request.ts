import axios from 'axios';
import authService from './auth';
import { toastError } from '@helpers/toast';
import { useRouter } from 'vue-router';
import { AppRouteNames } from '@enums/route';

const instance = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	headers: {
		'Accept': 'application/json',
	},
});

instance.interceptors.request.use((config) => {
	const token = authService.getToken();

	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}

	return config
});


instance.interceptors.response.use(
	(config) => config,
	async (error) => {
		if (error.response.status === 401) {
			const router = useRouter();
			toastError('Your session expired!');
			router.replace({ name: AppRouteNames.SIGN_IN });
			authService.removeToken();
		}

		throw error
	}
)

export default instance;