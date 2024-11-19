import axios from 'axios';

const SERVER_API_URL = import.meta.env.VITE_SERVER_API_URL;

const axiosClient = axios.create({
    baseURL: SERVER_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem('refreshToken');
                if (!refreshToken) {
                    throw new Error('No refresh token available');
                }

                // const response = await axios.post(`${SERVER_API_URL}/auth/refresh`, { refreshToken });
                // const newToken = response.data.token;
                //
                // localStorage.setItem('token', newToken);
                // originalRequest.headers['Authorization'] = `Bearer ${newToken}`;

                return axiosClient(originalRequest);
            } catch (err) {
                alert('Your session has expired. Please log in again.');
                localStorage.removeItem('token');
                localStorage.removeItem('refreshToken');
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosClient;
