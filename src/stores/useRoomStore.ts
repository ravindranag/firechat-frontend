import baseAPI from "@/api/base";
import { Chat, ChatStatus } from "@/types/chat";
import { Room } from "@/types/room";
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import useSessionStore from "./useSessionStore";
import useSocketStore from "./useSocketStore";
import { Ack } from "@/types/socket";

interface RoomStore {
	room: Room | null
	setRoom: (r: Room | null) => void
	senderId?: string
	receiverId?: string
	loading: boolean
	fetchRecentChats: () => void
	chats: Chat[]
	clearChats: () => void
	updateChatStatus: (idx: number, chat: Chat, s: ChatStatus) => void
	sendChatToRoom: (m: string) => void
	appendToChat: (c: Chat) => void
	joinRoom: (cb: CallableFunction) => void
	leaveRoom: (cb: CallableFunction) => void
}

const useRoomStore = create(subscribeWithSelector<RoomStore>((set, get) => ({
	room: null,
	setRoom: (r) => {
		if(get().room) {
			get().leaveRoom((success: any) => {
				console.log(success)
			})
		}
		set({room: r})
		if(r !== null) {
			const decoded = useSessionStore.getState().decoded
			const senderId = decoded?.userId, receiverId = r?.room.users.filter(user => user.user.id !== decoded?.userId)[0].user.id
			set({senderId: senderId, receiverId: receiverId})
		}
		else {
			set({senderId: undefined, receiverId: undefined})
		}
	},
	loading: true,
	fetchRecentChats: async () => {
		set({chats: []})
		try {
			const chats = (await baseAPI.room.fetchRecentChats(get().room!.roomId)).data
			set({chats: chats})
		}
		catch(err: any) {
			console.log(err.response.data)
		}
		finally {
			set({loading: false})
		}
	},
	chats: [],
	clearChats: () => set({chats: []}),
	updateChatStatus: (idx, chat, s) => {
		chat.status = s
		let cl = get().chats
		cl[idx] = chat
		set({chats: cl})
	},
	senderId: undefined,
	receiverId: undefined,
	sendChatToRoom: async (m) => {
		let targetIdx = get().chats.length
		get().appendToChat({
			message: m,
			senderId: get().senderId!,
			receiverId: get().receiverId!,
			status: ChatStatus.PENDING
		})
		try {
			const res: Ack = await useSocketStore.getState().roomSocket?.emitWithAck('room:send', get().room?.roomId, get().receiverId, m)
			if(res.status === 'OK') {
				get().updateChatStatus(targetIdx, res.payload, ChatStatus.SENT)
			}
		}
		catch(err: any) {
			console.log('No response from the server', err)
		}
	},
	appendToChat: (c) => {
		let ch = get().chats
		ch.push(c)
		set({chats: ch})
	},
	joinRoom: async (cb) => {
		try {
			const res: Ack = await useSocketStore.getState().roomSocket?.emitWithAck('room:join', get().room?.roomId)
			console.log(res)
			cb(res.payload)
		}
		catch(err: any) {
			console.log('No response from the socket')
		}
	},
	leaveRoom: async (cb) => {
		try {
			const res: Ack = await useSocketStore.getState().roomSocket?.emitWithAck('room:leave', get().room?.roomId)
			console.log(res)
			cb(res.payload)
			set({room: null})
		}
		catch(err: any) {
			console.log('No response from the socket')
		}
	}
})))

export default useRoomStore