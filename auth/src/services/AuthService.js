import axios from 'axios';

const AuthService = {
    login: (email, password) =>
        axios.post('/auth/login', { email, password })
            .then(res => res.data),
    register: (userData) =>
        axios.post('/auth/register', userData)
            .then(res => res.data),
};

export default AuthService;
