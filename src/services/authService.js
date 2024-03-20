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

const authService = {
    register
}

export default authService;