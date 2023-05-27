import { create } from "zustand"

type DecodedData = {
	userId: string
	name: string
	username: string
	avatar: string
}

interface SessionStore {
	decoded: DecodedData | null
	setDecoded: (d: DecodedData | null) => void
}

const useSessionStore = create<SessionStore>((set) => ({
	decoded: null,
	setDecoded: (d) => {
		set({decoded: d})
	}
}))

export default useSessionStore