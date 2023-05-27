import { User } from "./user"

export type RoomUser = {
	user: User
}

export type RoomDetail = {
	id: string
	users: RoomUser[]
}

export type Room = {
	roomId: string
	room: RoomDetail
}