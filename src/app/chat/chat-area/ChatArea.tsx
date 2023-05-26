import useRoomStore from "@/stores/useRoomStore"
import { Paper, Stack, Typography } from "@mui/material"
import SelectedRoom from "./SelectedRoom"

const NoRoomSelected = () => {
	return (
		<Stack width='100%' height='100%' justifyContent='center' alignItems='center' bgcolor='background.paper' borderRadius='16px'>
			<Typography>Select a friend to start chatting!</Typography>
		</Stack>
	)
}

const ChatArea = () => {
	const [room] = useRoomStore(state => [state.room])

	return (
		<Stack width='100%' height='100%' alignItems='center' padding={{xs: '16px', md: '32px'}}>
			{/* <Paper sx={{ width: '100%', height: '100%', borderRadius: {xs: 0, md: '16px'} }}> */}
				{room === null ? <NoRoomSelected /> : <SelectedRoom />}
			{/* </Paper> */}
		</Stack>
	)
}

export default ChatArea