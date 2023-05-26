import baseAPI from "@/api/base";
import { Room } from "@/types/room";
import { create } from "zustand";

interface AppStore {
	rooms: Room[],
	fetchRoomList: () => void
	loading: boolean
}

const useAppStore = create<AppStore>((set) => ({
	rooms: [],
	fetchRoomList: async () => {
		set({ loading: true })
		try {
			const r = (await baseAPI.publicRooms.fetch()).data
			console.log(r)
			set({rooms: r})
		}
		catch(err: any) {
			console.log('Error fetching rooms', err.response.data)
		}
		finally {
			set({loading: false})
		}
	},
	loading: true
}))

export default useAppStore