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
		verify: () => AuthAPI.get('/user/verify'),
		search: (q: string) => AuthAPI.get('/user/search', {
			params: {
				q: q
			}
		})
	},
	friend: {
		request: (friendId: string) => AuthAPI.post(`/friend/request/${friendId}`),
		list: () => AuthAPI.get('/friend'),
		listFriendRequests: () => AuthAPI.get('/friend/request'),
		deleteFriendRequest: (userId: string, friendId: string) => AuthAPI.delete(`/friend/request/delete/${userId}/${friendId}`),
		acceptFriendRequest: (userId: string, friendId: string) => AuthAPI.get(`/friend/accept/${userId}/${friendId}`),
		delete: (userId: string, friendId: string) => AuthAPI.delete(`/friend/delete/${userId}/${friendId}`),
	},
	room: {
		list: () => AuthAPI.get('/room'),
		fetchRecentChats: (roomId: string) => AuthAPI.get(`/room/${roomId}/chats`)
	}
}

export default baseAPI