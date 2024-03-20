import { api, requestConfig } from "../utils/config";

//Register an user
export const register = async (user) => {
    const config = requestConfig('POST', user);
    try {
        const response = await fetch(`${api}/users/register`, config);
        const data = await response.json();

        if(data){
            localStorage.setItem('user', JSON.stringify(data));
        }

        return data;
    } catch (error) {
        console.log(error);
    }
}

//logout an user
export const logout = async (user) => {
    localStorage.removeItem('user');
}

//login an user
export const login = async (user) => {
    const config = requestConfig('POST', user);
    try {
        const response = await fetch(`${api}/users/login`, config);
        const data = await response.json();

        if(data._id){
            console.log('salvou');
            localStorage.setItem('user', JSON.stringify(data));
        }

        return data;
    } catch (error) {
        console.log(error);
    }
}

const authService = {
    register,
    logout,
    login
}

export default authService;