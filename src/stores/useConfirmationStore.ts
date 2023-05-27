import { MouseEventHandler, ReactNode } from "react"
import { create } from "zustand"

interface ConfirmationStore {
	title: ReactNode | null
	onConfirm?: CallableFunction
	showConfirmationDialog: (title: ReactNode, onConfirm: MouseEventHandler) => void 
	hideConfirmationDialog: () => void
}

const useConfirmationStore = create<ConfirmationStore>((set) => ({
	title: null,
	onConfirm: undefined,
	showConfirmationDialog: (title, onConfirm) => set({title: title, onConfirm: onConfirm}),
	hideConfirmationDialog: () => set({title: null, onConfirm: undefined})
}))

export default useConfirmationStore