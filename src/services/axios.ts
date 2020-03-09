import axios from 'axios';
import constants from '../redux/constants';

export const baseUrl = 'http://192.168.0.28:5000';


export const api = {
    get: (url:string, config?: any) => {
        const apiKey = () => localStorage.getItem(constants.AUTH_KEY_TOKEN);
        const baseConfig = {headers: { authorization: apiKey() }};
        const extraConfig = {...config, ...baseConfig};
        return axios.get(`${baseUrl}${url}`, extraConfig);
    },
    post: (url:string, data:any, config?: any) => {
        const apiKey = () => localStorage.getItem(constants.AUTH_KEY_TOKEN);
        const baseConfig = {headers: { authorization: apiKey() }};
        const extraConfig = {...config, ...baseConfig};
        return axios.post(`${baseUrl}${url}`, data,  extraConfig);
    }, put: (url:string, data:any, config?: any) => {
        const apiKey = () => localStorage.getItem(constants.AUTH_KEY_TOKEN);
        const baseConfig = {headers: { authorization: apiKey() }};
        const extraConfig = {...config, ...baseConfig};
        return axios.put(`${baseUrl}${url}`, data,  extraConfig);
    },
};