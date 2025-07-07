import AuthService from '../services/AuthService';

export const login = async (email, password) => {
    try {
        const user = await AuthService.login(email, password);
        console.log("Usuario logueado contro:", user);
        return user;
    } catch (err) {
        throw err;
    }
};

export const register = async (userData) => {
    try {
        const newUser = await AuthService.register(userData);
        return newUser;
    } catch (err) {
        throw err;
    }
};
