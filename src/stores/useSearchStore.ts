import baseAPI from "@/api/base";
import { User } from "@/types/user";
import { create } from "zustand";


interface SearchStore {
	results: User[]
	loading: boolean
	search: (query: string) => void
	removeUserFromSearchResults: (userId: string) => void
	sendFriendRequestToUser: (friendId: string) => void
}

const useSearchStore = create<SearchStore>((set, get) => ({
	results: [],
	loading: false,
	search: async (query) => {
		set({loading: true})
		try {
			const res = (await baseAPI.user.search(query)).data
			set({results: res})
		}
		catch(err: any) {
			console.log('Error searching', err.response.data)
		}
		finally {
			set({loading: false})
		}
	},
	removeUserFromSearchResults: (userId) => {
		let r = get().results.filter(user => user.id !== userId)
		set({results: r})
	},
	sendFriendRequestToUser: async (friendId) => {
		try {
			await baseAPI.friend.request(friendId)
			get().removeUserFromSearchResults(friendId)
		}	
		catch(err: any) {
			console.log('Failed to send request', err.response.data)
		}
	}
}))

export default useSearchStore