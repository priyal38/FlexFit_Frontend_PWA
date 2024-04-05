import axios from 'axios';
// const BASE_URL = 'http://localhost:5000/api';
const BASE_URL = 'https://flexfit-backend.onrender.com';

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});