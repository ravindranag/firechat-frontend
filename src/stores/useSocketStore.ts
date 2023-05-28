import { Socket, io } from "socket.io-client";
import { create } from "zustand";
import useRoomStore from "./useRoomStore";

interface SocketStore {
	roomSocket: Socket | null,
	connectToRoomSocket: (userId: string) => void
	disconnectRoomSocket: () => void
}

const useSocketStore = create<SocketStore>((set, get) => ({
	roomSocket: null,
	connectToRoomSocket: (userId) => {
		const socket = io(import.meta.env.VITE_ROOM_SOCKET_URL, {
			autoConnect: false,
			path: '/room/',
			auth: {
				userId: userId
			}
		})

		socket.on('room:receive', (chat) => {
			useRoomStore.getState().appendToChat(chat)
		})

		socket.connect()
		set({roomSocket: socket})
	},
	disconnectRoomSocket: () => {
		get().roomSocket?.disconnect()
	}
}))

export default useSocketStore