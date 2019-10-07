import axios from 'axios';

const api = axios.create({
    //baseURL:'http://localhost:3333',
    baseURL:'http://192.168.0.112:3333',
    //baseURL:'https:transferentia-backend.herokuapp.com'
})

export default api;