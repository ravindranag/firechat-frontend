import { ACK_STATUS, Ack } from "@/types/socket";
import { io } from "socket.io-client";

const roomSocket = io(import.meta.env.VITE_ROOM_SOCKET_URL, {
	autoConnect: false,
	path: '/room/'
})

export default roomSocket

export const emitRoomEvent = async (event: string, payload: any, cb: CallableFunction) => {
	console.log('room event', event, payload)
	const ack: Ack = await roomSocket.emitWithAck(event, payload)
	cb(ack.payload)
}