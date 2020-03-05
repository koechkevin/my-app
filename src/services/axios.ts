import axios from 'axios';

export const baseUrl = 'http://192.168.0.28:5000';

const baseConfig = {
    headers: {
        authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoia29lY2hrZXZpbjkyQGdtYWlsLmNvbSIsImZpcnN0TmFtZSI6IktldmluIiwibGFzdE5hbWUiOiJLb2VjaCIsInVzZXJJZCI6IjQ3NTMwYWQ1LWIzNWMtNDYzMy1hMWRlLTA3YzFkOTBjODQ4NSJ9LCJpYXQiOjE1ODMzMDMyMTgsImV4cCI6MTU4MzM0NjQxOH0.Lly2UaxpYy3TdQehPUQJiM2hCuHvsfd25cXV3aeGBYI'
    },
};

export const api = {
    get: (url:string, config?: any) => {
        const extraConfig = {...config, ...baseConfig};
        return axios.get(`${baseUrl}${url}`, extraConfig);
    },
    post: (url:string, data:any, config?: any) => {
        const extraConfig = {...config, ...baseConfig};
        return axios.post(`${baseUrl}${url}`, data,  extraConfig);
    }, put: (url:string, data:any, config?: any) => {
        const extraConfig = {...config, ...baseConfig};
        return axios.put(`${baseUrl}${url}`, data,  extraConfig);
    },
};