export type User = {
	id?: string
	name: string
	username: string
	avatar?: string
}

export type FriendStatus = 'PENDING' | 'CONFIRMED'

export type Friend = {
	friendId: string
	status: FriendStatus
	friend: User
}

export type FriendRequest = {
	userId: string
	friendId: string
	user: User
	status: string
}
