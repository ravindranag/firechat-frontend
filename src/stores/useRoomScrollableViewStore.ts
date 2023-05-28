import { RefObject } from "react";
import { create } from "zustand";

interface RoomScrollableViewStore {
	scrollableViewRef: RefObject<HTMLDivElement> | null
	setScrollableViewRef: (ref: RefObject<HTMLDivElement>) => void
	initialScrollHeight: number
	scrollToLastChat: (force?: boolean) => void
	shouldScrollOnNewMessage: boolean
	setShouldScrollOnNewMessage: (v: boolean) => void
}

const useRoomScrollableViewStore = create<RoomScrollableViewStore>((set, get) => ({
	scrollableViewRef: null,
	setScrollableViewRef: (ref) => {
		set({scrollableViewRef: ref, initialScrollHeight: ref.current !== null ? ref.current.scrollHeight : 0})
	},
	initialScrollHeight: 0,
	scrollToLastChat: (force=false) => {
		const scrollContainer = get().scrollableViewRef?.current
		if(scrollContainer && (force || get().shouldScrollOnNewMessage)) {
			scrollContainer.scrollBy({
				top: scrollContainer.scrollHeight + scrollContainer.getBoundingClientRect().height
			})
		}
	},
	shouldScrollOnNewMessage: true,
	setShouldScrollOnNewMessage: (v) => set({shouldScrollOnNewMessage: v})
}))

export default useRoomScrollableViewStore