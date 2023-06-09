import { User } from "./user"

export enum ChatStatus {
	PENDING,
	SENT
}

export type Chat = {
	id?: string
	message: string
	sender?: User
	receiver?: User
	senderId: string
	receiverId: string
	status: ChatStatus
}