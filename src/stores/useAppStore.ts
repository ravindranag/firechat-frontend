import baseAPI from "@/api/base";
import { Room } from "@/types/room";
import { Friend, FriendRequest } from "@/types/user";
import axios from "axios";
import { create } from "zustand";

interface AppStore {
	rooms: Room[]
	setRooms: (r: Room[]) => void
	getRoomByFriendId: (friendId: string) => Room
	removeRoomFromList: (roomId: string) => void
	loading: boolean
	showProfileDashboard: boolean
	setShowProfileDashboard: (v: boolean) => void
	showSearchDialog: boolean,
	setShowSearchDialog: (v: boolean) => void
	showFriendManagerMobile: boolean
	setShowFriendManagerMobile: (v: boolean) => void
	showFriendRequestInbox: boolean
	setShowFriendRequestInbox: (v: boolean) => void
	friends: Friend[]
	friendRequests: FriendRequest[]
	setFriends: (f: Friend[]) => void
	setFriendRequests: (f: FriendRequest[]) => void
	removeFriendRequestFromList: (idx: number) => void
	removeFriendFromList: (userId: string, friendId: string) => void
	removeFriendFromListOffline: (idx: number) => void
	fetchDataForDashboard: () => void
}

const useAppStore = create<AppStore>((set, get) => ({
	rooms: [],
	setRooms: (r) => set({rooms: r}),
	getRoomByFriendId: (friendId) => {
		return get().rooms.filter(room => room.room.users.filter(user => user.user.id === friendId).length > 0)[0]
	},
	removeRoomFromList: async (roomId) => {
		const rl = get().rooms.filter(room => room.roomId !== roomId)
		set({rooms: rl})
	},
	loading: true,
	showProfileDashboard: false,
	setShowProfileDashboard: (v) => set({showProfileDashboard: v}),
	showSearchDialog: false,
	setShowSearchDialog: (v) => set({showSearchDialog: v}),
	showFriendManagerMobile: false,
	setShowFriendManagerMobile: (v) => set({showFriendManagerMobile: v}),
	showFriendRequestInbox: false,
	setShowFriendRequestInbox: (v) => set({showFriendRequestInbox: v}),
	friends: [],
	friendRequests: [],
	setFriends: (f) => set({friends: f}),
	setFriendRequests: (f) => set({friendRequests: f}),
	removeFriendRequestFromList: (idx: number) => {
		const frs = get().friendRequests
		frs.splice(idx, 1)
		set({friendRequests: frs})
	},
	removeFriendFromList: (userId, friendId) => {
		const roomIdToRemove = get().getRoomByFriendId(friendId)
		baseAPI.friend.delete(userId, friendId)
			.then(() => {
				get().removeRoomFromList(roomIdToRemove.roomId)
				const fl = get().friends.filter(f => f.friendId !== friendId)
				set({friends: fl})
			})
			.catch((err: any) => {
				console.log('Failed to remove room', err)
			})
	},
	removeFriendFromListOffline: (idx) => {
		const fl = get().friends
		fl.splice(idx, 1)
		set({friends: fl})
	},
	fetchDataForDashboard: async () => {
		const onSuccessCallable = [
			get().setFriends,
			get().setFriendRequests,
			get().setRooms
		]
		set({loading: true})
		try {
			const res = await axios.all([
				baseAPI.friend.list(),
				baseAPI.friend.listFriendRequests(),
				baseAPI.room.list()
			])
			res.forEach((r, idx) => {
				if(r.status === 200) {
					onSuccessCallable[idx](r.data)
				}
			})
		}
		catch(err) {
			console.log(err)
		}
		finally {
			set({loading: false})
		}
	}
}))

export default useAppStore