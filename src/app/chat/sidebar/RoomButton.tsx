import useRoomStore from "@/stores/useRoomStore"
import { Room } from "@/types/room"
import { Avatar, Button, Stack, Typography } from "@mui/material"
import { MouseEventHandler } from "react"

type RoomButtonProps = {
	room: Room
	onClick: MouseEventHandler
}

const RoomButton = ({room, onClick}: RoomButtonProps) => {
	const [currRoom] = useRoomStore(state => [state.room])
	const isActive = currRoom?.id === room.id

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
				<Avatar src='broken' alt={room.name} />
				<Typography
					color={isActive ? 'onSecondary.main' : 'onBackground.default'}
				>{room.name}</Typography>
			</Stack>
		</Button>
	)
}

export default RoomButton