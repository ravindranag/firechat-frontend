import useAppStore from "@/stores/useAppStore"
import { CircularProgress, Stack, Typography } from "@mui/material"
import RoomButton from "./RoomButton"
import useRoomStore from "@/stores/useRoomStore"
import { PersonAdd } from "@mui/icons-material"

const ChatList = () => {
	const [rooms, loading] = useAppStore(state => [state.rooms, state.loading])
	const [setRoom] = useRoomStore(state => [state.setRoom])

	return (
		<Stack flexGrow={1} padding='16px 16px' sx={{ overflowY: 'auto' }}>
			{loading && <CircularProgress color="inherit" sx={{alignSelf: 'center'}} />}
			{ rooms.length > 0
			&& rooms.map(room => (
				<RoomButton 
					room={room}
					onClick={() => {
						console.log('join room', room.roomId)
						setRoom(room)
					}}
					key={room.roomId}
				/>
			))
			}
			{!loading && rooms.length === 0 && (
				<Stack justifyContent='center' height='100%'>
					<Typography variant='caption' textAlign='center'>
						<PersonAdd />
						<br />
						Wow such emptiness!
						<br />
						Go to your Profile to add some friends
					</Typography>
				</Stack>
			)}
		</Stack>
	)
}	

export default ChatList