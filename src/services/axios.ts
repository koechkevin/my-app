import axios from 'axios';

export const baseUrl = 'http://localhost:5000';

export const api = {
    get: (url:string, ...args: any) => axios.get(`${baseUrl}${url}`, ...args),
    post: (url:string, ...args: any) => axios.get(`${baseUrl}${url}`, ...args),
};