import axios from 'axios';

const api = axios.create({
    baseURL: 'https://my-json-server.typicode.com/catmiih/plant-manager',

});

export default api;