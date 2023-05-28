import useRoomStore from "@/stores/useRoomStore"
import { Close } from "@mui/icons-material"
import { IconButton, Stack, Typography } from "@mui/material"
import RoomAction from "./RoomAction"
import RoomChatScrollView from "./RoomChatScrollView"
import { useEffect } from "react"
import useSessionStore from "@/stores/useSessionStore"


const RoomHeader = () => {
	const [room, leaveRoom] = useRoomStore(state => [state.room, state.leaveRoom])
	const [decoded] = useSessionStore(state => [state.decoded])

	if(room === null) return <></>

	const friend = (room.room.users.filter(u => u.user.id !== decoded?.userId))[0]

	return (
		<Stack direction='row' alignItems='center'>
			<Typography flexGrow={1}>{friend.user.name}</Typography>
			<IconButton onClick={() => leaveRoom((success: any) => console.log('left room', success))}>
				<Close />
			</IconButton>
		</Stack>
	)
}

const SelectedRoom = () => {
	const [joinRoom, leaveRoom] = useRoomStore(state => [state.joinRoom, state.leaveRoom])

	useEffect(() => {
		joinRoom((success: string) => {
			console.log(success)
		})
	}, [])

	return (
		<Stack width='100%' height='100%' gap='24px'>
			<RoomHeader />
			<RoomChatScrollView />
			<RoomAction />
		</Stack>
	)
}

export default SelectedRoom