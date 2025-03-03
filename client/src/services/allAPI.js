import { BASE_URL } from "./baseurl";
import { commonAPI } from "./commonAPI";


// SignUp

export const signUpAPI = async (user) => {
    return await commonAPI("POST",`${BASE_URL}/operator/signup`,user,"");
}

//Login

export const loginAPI = async (user) => {
    return await commonAPI("POST",`${BASE_URL}/operator/login`,user,"")
}


