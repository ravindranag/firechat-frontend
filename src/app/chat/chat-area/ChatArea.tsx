import useRoomStore from "@/stores/useRoomStore"
import { Stack } from "@mui/material"
import SelectedRoom from "./SelectedRoom"
import FriendManager from "./FriendManager"



const ChatArea = () => {
	const [room] = useRoomStore(state => [state.room])

	return (
		<Stack width='100%' height='100%' alignItems='center' padding={{xs: '32px 16px', md: '32px'}}>
			{/* <Paper sx={{ width: '100%', height: '100%', borderRadius: {xs: 0, md: '16px'} }}> */}
				{room === null ? <FriendManager /> : <SelectedRoom />}
			{/* </Paper> */}
		</Stack>
	)
}

export default ChatArea