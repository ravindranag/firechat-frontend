import baseAPI from "@/api/base";
import roomSocket, { emitRoomEvent } from "@/socket/room";
import { Chat, ChatStatus } from "@/types/chat";
import { Room } from "@/types/room";
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

interface RoomStore {
	room: Room | null
	setRoom: (r: Room | null) => void
	loading: boolean
	fetchRecentChats: () => void
	chats: Chat[]
	clearChats: () => void
	updateChatStatus: (idx: number, chatId: string, s: ChatStatus) => void
	sendChatToRoom: (c: Chat) => void
	appendToChat: (c: Chat) => void
	joinRoom: (cb: CallableFunction) => void
	leaveRoom: (cb: CallableFunction) => void
}

const useRoomStore = create(subscribeWithSelector<RoomStore>((set, get) => ({
	room: null,
	setRoom: (r) => {
		set({room: r})
	},
	loading: true,
	fetchRecentChats: async () => {
		set({chats: []})
		try {
			const chats = (await baseAPI.room.fetchRecentChats(get().room!.roomId)).data
			console.log(chats)
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
	updateChatStatus: (idx, chatId, s) => {
		let c = get().chats
		c[idx].status = s
		c[idx].id = chatId
		set({chats: c})
	},
	sendChatToRoom: (c) => {
		let targetIdx = get().chats.length
		get().appendToChat(c)
		emitRoomEvent('room:send', {
			roomId: get().room?.roomId,
			chat: c
		}, (chat: Chat) => {
			console.log(chat)
			get().updateChatStatus(targetIdx, chat.id!, ChatStatus.SENT)
		})
	},
	appendToChat: (c) => {
		let ch = get().chats
		ch.push(c)
		set({chats: ch})
	},
	joinRoom: (cb) => {
		emitRoomEvent('room:join', get().room?.roomId, cb)
	},
	leaveRoom: (cb) => {
		emitRoomEvent('room:leave', get().room?.roomId, cb)
		set({room: null})
	}
})))

export default useRoomStore