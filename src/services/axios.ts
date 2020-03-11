import axios from 'axios';
import constants from '../redux/constants';

const environment = process.env.NODE_ENV;

export const baseUrl = environment === 'development' ? 'http://localhost:5000'
  :'https://my-staging-api.herokuapp.com';


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

export const files = {
    post: (url: string, file: any, config?: any) => {
        const apiKey = () => localStorage.getItem(constants.AUTH_KEY_TOKEN);
        const baseConfig = {
            headers: {
                authorization: apiKey(),
                'Content-Type': 'application/x-www-form-urlencoded',
            }};
        const extraConfig = {...config, ...baseConfig};
        const formData = new FormData();
        formData.append('file', file);
        return axios.post(`${baseUrl}${url}`, formData, extraConfig);
    },
};