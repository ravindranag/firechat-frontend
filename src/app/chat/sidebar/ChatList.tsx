import useAppStore from "@/stores/useAppStore"
import { Room } from "@/types/room"
import { CircularProgress, Stack } from "@mui/material"
import { useEffect } from "react"
import RoomButton from "./RoomButton"
import useRoomStore from "@/stores/useRoomStore"

const r: Room[] = [
	{
		id: 'global',
		name: 'Global'
	},
	{
		id: 'vssut',
		name: 'VSSUT'
	}
]

const ChatList = () => {
	const [rooms, loading, fetchRoomList] = useAppStore(state => [state.rooms, state.loading, state.fetchRoomList])
	const [setRoom] = useRoomStore(state => [state.setRoom])

	useEffect(() => {
		fetchRoomList()
	}, [])

	return (
		<Stack flexGrow={1} padding='16px 16px'>
			{loading && <CircularProgress color="inherit" sx={{alignSelf: 'center'}} />}
			{ rooms.length > 0
			&& rooms.map(room => (
				<RoomButton 
					room={room}
					onClick={() => {
						console.log('join room', room.id)
						setRoom(room)
					}}
					key={room.id}
				/>
			))
			}
		</Stack>
	)
}	

export default ChatList