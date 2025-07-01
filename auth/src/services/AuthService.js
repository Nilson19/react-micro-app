import api from './api';

const AuthService = {
    login: (email, password) =>
        api.post('/auth/login', { email, password })
            .then(res => res.data),
    register: (userData) =>
        api.post('/auth/register', userData)
            .then(res => res.data),
};

export default AuthService;
