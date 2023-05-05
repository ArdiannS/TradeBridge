import axios from 'axios';

const instance = axios.create({
    // TODO: take this baseURL value from config
    baseURL: 'http://localhost:5000/',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});

export default instance;