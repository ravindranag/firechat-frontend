import useRoomStore from "@/stores/useRoomStore"
import useSessionStore from "@/stores/useSessionStore"
import { Room } from "@/types/room"
import { Avatar, Button, Stack, Typography } from "@mui/material"
import { MouseEventHandler } from "react"

type RoomButtonProps = {
	room: Room
	onClick: MouseEventHandler
}

const RoomButton = ({room, onClick}: RoomButtonProps) => {
	const [decoded] = useSessionStore(state => [state.decoded])
	const [currRoom] = useRoomStore(state => [state.room])
	const isActive = currRoom?.roomId === room.roomId
	const friend = (room.room.users.filter(u => u.user.id !== decoded?.userId))[0]

	return (
		<Button 
			onClick={onClick} 
			sx={{
				padding: '16px',
				'&:hover': {
					bgcolor: 'secondary.main',
					'& .MuiTypography-root': {
						color: 'onSecondary.main'
					}
				},
			}} 
			variant={isActive ? 'contained' : 'text'} 
			color="secondary"
		>
			<Stack direction='row' gap='12px' width='100%'>
				<Avatar src={friend.user.avatar || 'broken'} alt={friend.user.name} />
				<Typography
					color={isActive ? 'onSecondary.main' : 'onBackground.default'}
				>{friend.user.name}</Typography>
			</Stack>
		</Button>
	)
}

export default RoomButton