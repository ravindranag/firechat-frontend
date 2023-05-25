import { UserSignUpLoginData } from "@/types/api";
import axios from "axios";

const API = axios.create({
	baseURL: import.meta.env.VITE_API_URL
})

const AuthAPI = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
})

AuthAPI.interceptors.request.use(req => {
	req.headers.Authorization = localStorage.getItem('token')
	return req
})

const baseAPI = {
	user: {
		signup: (data: UserSignUpLoginData) => API.post('/user', data),
		login: (data: UserSignUpLoginData) => API.post('/user/login', data),
		verify: () => AuthAPI.get('/user/verify')
	}
}

export default baseAPI