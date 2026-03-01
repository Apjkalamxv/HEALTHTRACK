import axios from 'axios';

const api = axios.create({
    baseURL: 'https://healthyfy-0hkm.onrender.com',
});

// Add a request interceptor to include JWT token
api.interceptors.request.use(
    (config) => {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            const { token } = JSON.parse(userInfo);
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
