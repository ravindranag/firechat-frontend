import { io } from "socket.io-client";

const roomSocket = io(import.meta.env.VITE_ROOM_SOCKET_URL, {
	autoConnect: false,
	path: '/room/'
})

export default roomSocket