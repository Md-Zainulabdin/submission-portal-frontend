import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://submission-portal-backend.vercel.app/api/v1/',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default axiosInstance;