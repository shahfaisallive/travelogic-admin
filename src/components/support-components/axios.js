import axios from 'axios';
const instance = axios.create({
    // baseURL: 'http://localhost:4000/api',
    baseURL: 'https://server.travelogic.pk/api',
    withCredentials: true,
    credentials: 'include'
});

// instance.defaults.headers.delete['Authorization']= 

export const imagePath = 'https://server.travelogic.pk/uploads/images'
export const userImagePath = 'https://server.travelogic.pk/uploads/users'
export const tripImagePath = 'https://server.travelogic.pk/uploads/trips'

export default instance;
